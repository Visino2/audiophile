import { mutation } from "./_generated/server";


export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    const products = [
      {
        id: "xx99-mark-two",
        name: "XX99 MARK II HEADPHONES",
        shortName: "XX99 MK II",
        price: 2999,
        image: "/Bitmap-9.png",
        category: "headphones",
        description: "The pinnacle of pristine audio",
        inStock: 10,
      },
      {
        id: "xx99-mark-one",
        name: "XX99 MARK I HEADPHONES",
        shortName: "XX99 MK I",
        price: 1750,
        image: "/Bitmap-10.png",
        category: "headphones",
        description: "The gold standard for headphones",
        inStock: 15,
      },
      {
        id: "xx59",
        name: "XX59 HEADPHONES",
        shortName: "XX59",
        price: 899,
        image: "/Bitmap-11.png",
        category: "headphones",
        description: "Versatile wireless headset",
        inStock: 20,
      },
      {
        id: "yx1-earphones",
        name: "YX1 WIRELESS EARPHONES",
        shortName: "YX1",
        price: 599,
        image: "/Bitmap-12.png",
        category: "earphones",
        description: "Tailor your listening experience",
        inStock: 25,
      },
      {
        id: "zx7-speaker",
        name: "ZX7 SPEAKER",
        shortName: "ZX7",
        price: 3500,
        image: "/Bitmap-12.jpg",
        category: "speakers",
        description: "Wireless streaming with minimal loss",
        inStock: 8,
      },
      {
        id: "zx9-speaker",
        name: "ZX9 SPEAKER",
        shortName: "ZX9",
        price: 4500,
        image: "/Bitmap-4.png",
        category: "speakers",
        description: "Truly wireless connectivity",
        inStock: 5,
      },
    ];

    for (const product of products) {
      await ctx.db.insert("products", product);
    }

    return { success: true, count: products.length };
  },
});