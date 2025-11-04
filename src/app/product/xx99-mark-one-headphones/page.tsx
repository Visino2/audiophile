'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getOrCreateSessionId } from '@/app/lib/session';

export default function XX99MarkOnePage() {
  const [quantity, setQuantity] = useState(1);
  const [sessionId, setSessionId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const addToCart = useMutation(api.carts.addToCart);

  const product = {
    id: 'xx99-mark-one',
    name: 'XX99 MARK I HEADPHONES',
    shortName: 'XX99 MK I',
    price: 1750,
    image: '/Bitmap-10.png',
  };

  const handleAddToCart = async () => {
    if (!sessionId || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart({
        sessionId,
        productId: product.id,
        quantity,
      });
      
      setQuantity(1);
      // Optional: trigger a toast notification instead of alert
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error instanceof Error ? error.message : 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

      {/* Go Back */}
      <div className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[16px] md:mt-[33px] lg:mt-[79px]">
        <Link
          href="/headphones"
          className="text-[15px] text-black/50 hover:text-[#D87D4A] transition-colors"
        >
          Go Back
        </Link>
      </div>

      {/* Product Detail Section */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[24px] md:mt-[24px] lg:mt-[56px] mb-[88px] md:mb-[120px] lg:mb-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[69px] lg:gap-[125px] items-center">
          {/* Image */}
          <div className="relative w-full h-[327px] md:h-[480px] bg-[#F1F1F1] rounded-lg overflow-hidden flex items-center justify-center">
            <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px]">
              <Image src={product.image} alt={product.name} fill className="object-contain" />
            </div>
          </div>

          {/* Info */}
          <div className="w-full text-center md:text-left">
            <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[24px] md:mb-[32px]">
              XX99 MARK I <br />
              HEADPHONES
            </h1>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[32px]">
              As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.
            </p>
            <p className="font-bold text-[18px] tracking-[1.29px] mb-[31px] md:mb-[47px]">
              $ {product.price.toLocaleString()}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center bg-[#F1F1F1] h-[48px]">
                <button
                  onClick={decrementQuantity}
                  className="px-[15px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] tracking-[1px] transition-colors"
                  type="button"
                >
                  -
                </button>
                <span className="px-[20px] h-full flex items-center font-bold text-[13px] tracking-[1px] min-w-[60px] justify-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-[15px] h-full text-black/25 hover:text-[#D87D4A] font-bold text-[13px] tracking-[1px] transition-colors"
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!sessionId || isAdding}
                className="bg-[#D87D4A] text-white px-[31px] h-[48px] text-[13px] font-bold tracking-[1px] uppercase hover:bg-[#FBAF85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? 'ADDING...' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES + IN THE BOX */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[88px] md:mb-[120px] lg:mb-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[88px] md:gap-[120px] lg:gap-[125px]">
          <div className="lg:col-span-2">
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-[24px] md:mb-[32px]">
              FEATURES
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[32px]">
              As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. These closed-back headphones are made for the competitive music lover who wants to be transported into the sound experience.
            </p>
            <p className="text-black/50 text-[15px] leading-[25px]">
              Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation.
            </p>
          </div>

          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-[24px] md:mb-[32px]">
              IN THE BOX
            </h2>
            <ul className="space-y-2">
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">Headphone Unit</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">2x</span>
                <span className="text-black/50">Replacement Earcups</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">User Manual</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">3.5mm Audio Cable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO LIKE */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[120px] md:mb-[120px] lg:mb-[160px]">
        <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase text-center mb-[40px] md:mb-[56px] lg:mb-[64px]">
          YOU MAY ALSO LIKE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[56px] md:gap-[11px] lg:gap-[30px]">
          {[
            { name: 'XX99 MARK II', image: '/Bitmap-9.png', link: '/product/xx99-mark-two-headphones' },
            { name: 'XX59', image: '/Bitmap-11.png', link: '/product/xx59-headphones' },
            { name: 'ZX9 SPEAKER', image: '/Bitmap-4.png', link: '/product/zx9-speaker' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-full h-[120px] md:h-[318px] bg-[#F1F1F1] rounded-lg overflow-hidden mb-[32px] md:mb-[40px] flex items-center justify-center">
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
              </div>
              <h3 className="text-[24px] font-bold tracking-[1.71px] uppercase mb-[32px] text-center">
                {item.name}
              </h3>
              <Link
                href={item.link}
                className="bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
              >
                SEE PRODUCT
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
