import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

//  Get Cart
export const getCart = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db
          .query("products")
          .withIndex("by_product_id", (q) => q.eq("id", item.productId))
          .first();

        if (!product) return null;

        return {
          _id: item._id,
          productId: item.productId,
          quantity: item.quantity,
          name: product.name,
          shortName: product.shortName,
          price: product.price,
          image: product.image,
          inStock: product.inStock,
          subtotal: product.price * item.quantity,
        };
      })
    );

    // ✅ Filter out nulls safely
    const validItems = itemsWithDetails.filter(
      (item): item is NonNullable<typeof item> => item !== null
    );

    const total = validItems.reduce((sum, i) => sum + i.subtotal, 0);
    const totalItems = validItems.reduce((sum, i) => sum + i.quantity, 0);

    return { items: validItems, total, totalItems };
  },
});

// 🛍️ Add to Cart
export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    productId: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) throw new Error("Quantity must be greater than 0");

    const product = await ctx.db
      .query("products")
      .withIndex("by_product_id", (q) => q.eq("id", args.productId))
      .first();

    if (!product) throw new Error("Product not found");

    const existing = await ctx.db
      .query("carts")
      .withIndex("by_session_product", (q) =>
        q.eq("sessionId", args.sessionId).eq("productId", args.productId)
      )
      .first();

    const newQuantity = existing ? existing.quantity + args.quantity : args.quantity;

    if (newQuantity > product.inStock) {
      throw new Error(`Only ${product.inStock} items available in stock`);
    }

    if (existing) {
      await ctx.db.patch(existing._id, { quantity: newQuantity });
      return existing._id;
    } else {
      return await ctx.db.insert("carts", {
        sessionId: args.sessionId,
        productId: args.productId,
        quantity: args.quantity,
      });
    }
  },
});

// 🔄 Update quantity
export const updateCartItem = mutation({
  args: {
    sessionId: v.string(),
    productId: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("carts")
      .withIndex("by_session_product", (q) =>
        q.eq("sessionId", args.sessionId).eq("productId", args.productId)
      )
      .first();

    if (!item) throw new Error("Cart item not found");

    if (args.quantity <= 0) {
      await ctx.db.delete(item._id);
      return null;
    }

    const product = await ctx.db
      .query("products")
      .withIndex("by_product_id", (q) => q.eq("id", args.productId))
      .first();

    if (product && args.quantity > product.inStock) {
      throw new Error(`Only ${product.inStock} items available in stock`);
    }

    await ctx.db.patch(item._id, { quantity: args.quantity });
    return item._id;
  },
});

// ❌ Remove item
export const removeFromCart = mutation({
  args: { sessionId: v.string(), productId: v.string() },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("carts")
      .withIndex("by_session_product", (q) =>
        q.eq("sessionId", args.sessionId).eq("productId", args.productId)
      )
      .first();
    if (item) await ctx.db.delete(item._id);
  },
});

// Clear entire cart
export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    await Promise.all(items.map((item) => ctx.db.delete(item._id)));
  },
});

// Create Order 
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
    // 1️⃣ Fetch cart items
    const cartItems = await ctx.db
      .query("carts")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    if (cartItems.length === 0) throw new Error("Cart is empty");

    // Build order items and calculate total
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db
          .query("products")
          .withIndex("by_product_id", (q) => q.eq("id", item.productId))
          .first();

        if (!product) throw new Error("Product not found");

        // reduce stock
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

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // 3️⃣ Create the order
    await ctx.db.insert("orders", {
      sessionId: args.sessionId,
      items: orderItems,
      totalAmount,
      customerInfo: args.customerInfo,
      paymentMethod: args.paymentMethod,
      status: "pending",
      createdAt: Date.now(),
    });

    // 4️⃣ Clear cart after order creation
    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    return { success: true, totalAmount };
  },

  
});
