'use client';

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartModal() {
  const { cart, isCartOpen, closeCart, updateQuantity, getTotalPrice, clearCart, openCart } = useCart();

  if (!isCartOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] top-[90px]"
        onClick={closeCart}
      />

      {/* Modal - Positioned below navbar */}
      <div className="fixed top-[114px] right-[24px] md:right-[39px] lg:right-[165px] w-[327px] md:w-[377px] bg-white rounded-lg shadow-2xl z-[70]">
        <div className="p-[24px] md:p-[32px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-[32px]">
            <h2 className="text-[18px] font-bold tracking-[1.29px] uppercase">
              CART ({totalItems})
            </h2>
            <button
              onClick={() => clearCart()}
              className="text-[15px] text-black/50 hover:text-[#D87D4A] underline decoration-1 underline-offset-2 transition-colors"
            >
              Remove all
            </button>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-[40px]">
              <p className="text-black/50 text-[15px] leading-[25px]">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-[24px] mb-[32px] max-h-[320px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-[16px]">
                    {/* Product Image */}
                    <div className="relative w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-[8px]"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold leading-[25px] truncate">
                        {item.shortName}
                      </h3>
                      <p className="text-[14px] text-black/50 font-bold leading-[25px]">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#F1F1F1] h-[32px]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-[12px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] tracking-[1px] transition-colors"
                        type="button"
                      >
                        -
                      </button>
                      <span className="px-[16px] h-full flex items-center font-bold text-[13px] tracking-[1px] min-w-[40px] justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-[12px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] tracking-[1px] transition-colors"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-[24px]">
                <span className="text-[15px] text-black/50 uppercase leading-[25px]">TOTAL</span>
                <span className="text-[18px] font-bold">
                  $ {getTotalPrice().toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase py-[15px] text-center hover:bg-[#FBAF85] transition-colors rounded-none"
              >
                CHECKOUT
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}