import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  
  products: defineTable({
    id: v.string(),
    name: v.string(),
    shortName: v.string(),
    price: v.number(),
    image: v.optional(v.string()),
    inStock: v.number(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
  }).index("by_product_id", ["id"]),

 
  carts: defineTable({
    sessionId: v.string(),
    productId: v.string(),
    quantity: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_session_product", ["sessionId", "productId"]),

 
  orders: defineTable({
    sessionId: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        shortName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.optional(v.string()),
      })
    ),
    totalAmount: v.number(),
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
    status: v.string(), 
    createdAt: v.number(), 
  }).index("by_session", ["sessionId"]),
});
