import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


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

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Validate and map cart items to order items
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db
          .query("products")
          .withIndex("by_product_id", (q) => q.eq("id", item.productId))
          .first();

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.inStock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        return {
          productId: product.id,
          name: product.name,
          shortName: product.shortName,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
        };
      })
    );

   
    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    
    const orderId = await ctx.db.insert("orders", {
      sessionId: args.sessionId,
      items: orderItems,
      totalAmount,
      customerInfo: args.customerInfo,
      paymentMethod: args.paymentMethod,
      status: "pending",
      createdAt: Date.now(),
    });


    await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db
          .query("products")
          .withIndex("by_product_id", (q) => q.eq("id", item.productId))
          .first();

        if (product) {
          await ctx.db.patch(product._id, {
            inStock: product.inStock - item.quantity,
          });
        }
      })
    );

    
    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    return orderId;
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    return order;
  },
});


export const getOrdersBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("desc")
      .collect();
  },
});
