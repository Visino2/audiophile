# 🎧 Audiophile E-commerce

A premium, fully-responsive e-commerce web application for high-end audio equipment built with Next.js 14, TypeScript, and Tailwind CSS.



## ✨ Features

### 🛍️ Core E-commerce Functionality
- **Product Catalog**: Browse headphones, speakers, and earphones with detailed product pages
- **Shopping Cart**: Add items, adjust quantities, and manage your cart with real-time updates
- **Checkout Flow**: Complete order form with billing, shipping, and payment details
- **Order Confirmation**: Beautiful success modal with order summary

### 🎨 Design & UX
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices
- **Modern UI**: Clean, minimalist design following a professional design system
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support

### 🚀 Technical Highlights
- **Next.js 14**: App Router with server and client components
- **TypeScript**: Full type safety throughout the application
- **Context API**: Global state management for shopping cart
- **Image Optimization**: Next.js Image component for optimized loading
- **Tailwind CSS**: Utility-first styling with custom design tokens

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Font**: [Manrope](https://fonts.google.com/specimen/Manrope) from Google Fonts
- **State Management**: React Context API
- **Image Handling**: Next.js Image Optimization

## 📦 Project Structure

```
audiophile/
├── src/
│   └── app/
│       ├── components/
│       │   ├── Navbar.tsx          # Navigation header
│       │   ├── Footer.tsx          # Footer component
│       │   └── CartModal.tsx       # Shopping cart modal
│       ├── context/
│       │   └── CartContext.tsx     # Cart state management
│       ├── product/
│       │   ├── xx99-mark-two-headphones/
│       │   ├── xx99-mark-one-headphones/
│       │   ├── xx59-headphones/
│       │   ├── zx9-speaker/
│       │   ├── zx7-speaker/
│       │   └── yx1-earphones/
│       ├── headphones/
│       │   └── page.tsx            # Headphones category
│       ├── speakers/
│       │   └── page.tsx            # Speakers category
│       ├── earphones/
│       │   └── page.tsx            # Earphones category
│       ├── checkout/
│       │   └── page.tsx            # Checkout page
│       ├── layout.tsx              # Root layout with providers
│       ├── page.tsx                # Home page
│       └── globals.css             # Global styles
├── public/                          # Static assets (images)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Visino2/audiophile.git
   cd audiophile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
```css
Primary Orange:   #D87D4A
Orange Hover:     #FBAF85
Dark Background:  #191919
Light Gray:       #F1F1F1
Body Background:  #FAFAFA
Black:            #000000
White:            #FFFFFF
```

### Typography
- **Font Family**: Manrope
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
- **Button Text**: 13px, Bold, 1px letter-spacing
- **Body Text**: 15px, 25px line-height

### Breakpoints
```css
Mobile:   < 768px
Tablet:   768px - 1023px
Desktop:  ≥ 1024px
```

## 🛒 Cart Features

### Add to Cart
- Select quantity with +/- controls
- Add multiple items at once
- Auto-opens cart modal on add

### Cart Management
- View all items with thumbnails
- Adjust quantities inline
- Remove individual items
- Clear entire cart
- Real-time price calculations

### Checkout
- Form validation
- Multiple payment methods (e-Money, Cash on Delivery)
- Shipping cost calculation
- VAT calculation (20%)
- Order summary with grand total

## 📱 Responsive Design

### Mobile (< 768px)
- Hamburger menu navigation
- Stacked product layouts
- Touch-optimized controls
- Optimized image sizes

### Tablet (768px - 1023px)
- 2-column product grids
- Balanced image and text layouts
- Medium-sized category cards

### Desktop (≥ 1024px)
- Full navigation bar
- 3-column category grids
- Side-by-side product displays
- Large product images

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration with the design system colors:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'audiophile-orange': '#D87D4A',
        'audiophile-orange-light': '#FBAF85',
        'audiophile-dark': '#191919',
        'audiophile-gray': '#F1F1F1',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
}
```

## 📄 Pages Overview

### Home (`/`)
- Hero section with featured product
- Category navigation cards
- Featured product showcases
- About section

### Category Pages (`/headphones`, `/speakers`, `/earphones`)
- Product listings with images
- Product descriptions
- CTA buttons to product details

### Product Detail Pages (`/product/[slug]`)
- Large product images
- Detailed specifications
- Features section
- "In the Box" contents
- Product gallery
- "You May Also Like" recommendations
- Add to cart functionality

### Checkout (`/checkout`)
- Billing details form
- Shipping information
- Payment method selection
- Order summary sidebar
- Success modal on completion

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Backend API integration
- [ ] Product search functionality
- [ ] Filtering and sorting
- [ ] Email notifications
- [ ] Dark mode support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Design inspiration from Frontend Mentor
- Icons and images are for demonstration purposes
- Manrope font by Google Fonts

## 📧 Contact

victor aba - [@visino twitter](https://twitter.com/Smithvictor_2)

Project Link: [https://github.com/yourusername/audiophile](https://github.com/Visino2/audiophile)

