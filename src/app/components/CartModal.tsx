'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Id } from '../../../convex/_generated/dataModel';
import { getOrCreateSessionId } from '@/app/lib/session';

export default function CartModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const sid = getOrCreateSessionId();
      setSessionId(sid);
    };
    init();
  }, []);

  const cartData = useQuery(api.carts.getCart, sessionId ? { sessionId } : 'skip');
  const updateQuantity = useMutation(api.carts.updateCartItem);
  const clearCart = useMutation(api.carts.clearCart);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

 type CartItem = {
  _id: Id<'carts'>;
  productId: string;
  image?: string;
  name?: string;
  shortName?: string;
  price: number;
  quantity: number;
};


  const cart: CartItem[] = cartData?.items || [];
  const totalItems = cartData?.totalItems ?? 0;
  const totalPrice = cartData?.total ?? 0;

const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
  try {
    await updateQuantity({
      sessionId,
      productId,
      quantity: newQuantity,
    });
  } catch (error) {
    console.error('Error updating quantity:', error);
    alert(error instanceof Error ? error.message : 'Failed to update quantity');
  }
};

  const handleClearCart = async () => {
    if (!sessionId) return;
    try {
      await clearCart({ sessionId });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-60 animate-fadeIn"
        onClick={onClose}
      />

     
<div
  className="
    fixed 
    z-[70]
    left-1/2 -translate-x-1/2
    top-[100px] sm:top-[110px]
    lg:left-auto lg:translate-x-0
    lg:right-[165px]
    lg:top-[120px]
    w-[90%] max-w-[377px]
    bg-white 
    rounded-[8px] 
    shadow-2xl 
    animate-slideDown
  "
>
  

        <div className="p-[24px] md:p-[32px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-[32px]">
            <h2 className="text-[18px] font-bold tracking-[1.29px] uppercase">
              CART ({totalItems})
            </h2>
            <button
              onClick={handleClearCart}
              className="text-[15px] text-black/50 hover:text-[#D87D4A] underline transition-colors"
            >
              Remove all
            </button>
          </div>

          {/* Empty State */}
          {cart.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[15px] text-black/50 mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-[13px] font-bold text-[#D87D4A] uppercase tracking-[1px] hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {/* Items */}
          {cart.length > 0 && (
            <>
              <div className="flex flex-col gap-[24px] mb-[32px] max-h-[300px] overflow-y-auto">
                {cart.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-[16px]"
                  >
                    {/* Image */}
                    <div className="relative w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.png'}
                        alt={item.name || 'Product'}
                        fill
                        className="object-contain p-[8px]"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold leading-[25px] truncate">
                        {item.shortName || item.name || 'Product'}
                      </h3>
                      <p className="text-[14px] text-black/50 font-bold">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center bg-[#F1F1F1] h-[32px] rounded">
                         <button
                      onClick={() =>
                      item.quantity > 1 &&
                      handleUpdateQuantity(item.productId, item.quantity - 1)
                       }
                      className="px-[12px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] transition-colors disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                      >
                      -
                     </button>

                      <span className="px-[16px] h-full flex items-center font-bold text-[13px] min-w-[40px] justify-center text-[#000000]">
                      {item.quantity}
                      </span>


                      <button
                       onClick={() =>
                       handleUpdateQuantity(item.productId, item.quantity + 1)
                        }
                       className="px-[12px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] transition-colors"
                        >
                        +
                     </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-[24px]">
                <span className="text-[15px] text-black/50 uppercase">TOTAL</span>
                <span className="text-[18px] font-bold">
                  $ {totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Checkout */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase py-[15px] text-center hover:bg-[#FBAF85] transition-colors"
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