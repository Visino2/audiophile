import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Resend } from "resend";

// Create a Resend client (make sure RESEND_API_KEY is set in Convex env)
const resend = new Resend(process.env.RESEND_API_KEY || "re_9dEstuht_FMqP7CrUNj2rqxUNpm4i5bBT");

export const createOrder = mutation({
  args: {
    sessionId: v.string(),
    customerInfo: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    paymentMethod: v.string(),
  },
  handler: async (ctx, args) => {
    
    const cartItems = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    if (cartItems.length === 0) throw new Error("Cart is empty");

    //Build order items and update product stock
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db
          .query("products")
          .withIndex("by_product_id", (q) => q.eq("id", item.productId))
          .first();

        if (!product) throw new Error("Product not found");

      
        await ctx.db.patch(product._id, {
          inStock: product.inStock - item.quantity,
        });

        return {
          productId: item.productId,
          name: product.name,
          shortName: product.shortName,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
        };
      })
    );

    //  Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    //  Insert new order record
    const orderId = await ctx.db.insert("orders", {
      sessionId: args.sessionId,
      items: orderItems,
      totalAmount,
      customerInfo: args.customerInfo,
      paymentMethod: args.paymentMethod,
      status: "pending",
      createdAt: Date.now(),
    });

    //  Clear cart
    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    // Send order confirmation email via Resend
    try {
      const html = `
        <div style="font-family: Arial, sans-serif; color: #111;">
          <h2>Thank you for your order, ${escapeHtml(args.customerInfo.name)}!</h2>
          <p>We've received your order. Order ID: <strong>${orderId}</strong></p>
          <h3>Order summary</h3>
          <ul>
            ${orderItems
              .map(
                (it) =>
                  `<li>${escapeHtml(it.shortName || it.name)} — $${it.price} × ${it.quantity}</li>`
              )
              .join("")}
          </ul>
          <p><strong>Total:</strong> $${totalAmount}</p>
          <p>Shipping to: ${escapeHtml(args.customerInfo.address)}, ${escapeHtml(
        args.customerInfo.city
      )}</p>
          <p>We’ll notify you when your order ships.</p>
          <p>— The Audiophile Team</p>
        </div>
      `;

      await resend.emails.send({
        from: "orders@yourdomain.com", 
        to: args.customerInfo.email,
        subject: "Your order confirmation",
        html,
      });
    } catch (err) {
      console.error("Failed to send order email:", err);
      
    }

    return { success: true, totalAmount, orderId };
  },
});


function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
