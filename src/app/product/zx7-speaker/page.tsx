'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getOrCreateSessionId } from '@/app/lib/session';

export default function ZX7SpeakerPage() {
  const [quantity, setQuantity] = useState(1);
  const [sessionId, setSessionId] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const addToCart = useMutation(api.carts.addToCart);

  const product = {
    id: 'zx7-speaker',
    name: 'ZX7 SPEAKER',
    shortName: 'ZX7',
    price: 3500,
    image: '/Bitmap-12.jpg',
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

      <div className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[16px] md:mt-[33px] lg:mt-[79px]">
        <Link href="/speakers" className="text-[15px] text-black/50 hover:text-[#D87D4A] transition-colors">
          Go Back
        </Link>
      </div>

      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[24px] md:mt-[24px] lg:mt-[56px] mb-[88px] md:mb-[120px] lg:mb-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[69px] lg:gap-[125px] items-center">
          <div className="relative w-full h-[327px] md:h-[480px] bg-[#F1F1F1] rounded-lg overflow-hidden flex items-center justify-center">
            <div className="relative w-[200px] h-[240px] md:w-[280px] md:h-[320px] lg:w-[350px] lg:h-[420px]">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain" 
              />
            </div>
          </div>

          <div className="w-full text-center md:text-left">
            <h1 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[24px] md:mb-[32px]">
              ZX7<br />SPEAKER
            </h1>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[32px]">
              Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.
            </p>
            <p className="font-bold text-[18px] tracking-[1.29px] mb-[31px] md:mb-[47px]">
              $ {product.price.toLocaleString()}
            </p>

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
      
      {/* Features + In the Box */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[88px] md:mb-[120px] lg:mb-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[88px] md:gap-[120px] lg:gap-[125px]">
          <div className="lg:col-span-2">
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-[24px] md:mb-[32px]">
              FEATURES
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[32px]">
              Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.
            </p>
            <p className="text-black/50 text-[15px] leading-[25px]">
              The ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.
            </p>
          </div>

          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-[24px] md:mb-[32px]">
              IN THE BOX
            </h2>
            <ul className="space-y-2">
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">2x</span>
                <span className="text-black/50">Speaker Unit</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">2x</span>
                <span className="text-black/50">Speaker Cloth Panel</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">User Manual</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">3.5mm 7.5m Audio Cable</span>
              </li>
              <li className="text-[15px] leading-[25px]">
                <span className="text-[#D87D4A] font-bold mr-[21px]">1x</span>
                <span className="text-black/50">7.5m Optical Cable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[120px] md:mb-[120px] lg:mb-[160px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[18px] lg:gap-[30px]">
          <div className="flex flex-col gap-[20px] md:gap-[18px] lg:gap-[30px] lg:col-span-1">
            <div className="relative w-full h-[174px] md:h-[174px] lg:h-[280px] bg-[#F1F1F1] rounded-lg overflow-hidden">
              <Image src="/Bitmap-24.png" alt="Product gallery 1" fill className="object-cover" />
            </div>
            <div className="relative w-full h-[174px] md:h-[174px] lg:h-[280px] bg-[#F1F1F1] rounded-lg overflow-hidden">
              <Image src="/Bitmap-25.png" alt="Product gallery 2" fill className="object-cover" />
            </div>
          </div>
          <div className="relative w-full h-[368px] md:h-[368px] lg:h-[592px] lg:col-span-2 bg-[#F1F1F1] rounded-lg overflow-hidden">
            <Image src="/Bitmap-26.png" alt="Product gallery 3" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[120px] md:mb-[120px] lg:mb-[160px]">
        <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase text-center mb-[40px] md:mb-[56px] lg:mb-[64px]">
          YOU MAY ALSO LIKE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[56px] md:gap-[11px] lg:gap-[30px]">
          {[
            { name: 'ZX9 SPEAKER', image: '/Bitmap-4.png', link: '/product/zx9-speaker' },
            { name: 'XX99 MARK I', image: '/Bitmap-10.png', link: '/product/xx99-mark-one-headphones' },
            { name: 'XX59', image: '/Bitmap-11.png', link: '/product/xx59-headphones' },
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

      {/* Category Cards */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 py-[120px] md:py-[96px] lg:py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[68px] md:gap-[10px] lg:gap-[30px]">
          {[
            { name: 'HEADPHONES', image: '/Bitmap-5.png', link: '/headphones' },
            { name: 'SPEAKERS', image: '/Bitmap-2.png', link: '/speakers' },
            { name: 'EARPHONES', image: '/Bitmap-3.png', link: '/earphones' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="relative w-[150px] h-[150px] mb-[-30px]">
                <Image src={item.image} alt={item.name} fill className="object-contain" />
              </div>
              <h3 className="text-[15px] md:text-[18px] font-bold tracking-[1.07px] md:tracking-[1.29px] uppercase mb-[17px] mt-12">
                {item.name}
              </h3>
              <div className="flex items-center text-[13px] font-bold tracking-[1px] uppercase text-black/50 group-hover:text-[#D87D4A] transition-colors">
                SHOP
                <svg width="8" height="12" className="ml-3 text-[#D87D4A]" fill="currentColor">
                  <path d="M1.5 0L0 1.5 4.5 6 0 10.5 1.5 12l6-6z"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Audio Gear Section */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[120px] md:mb-[96px] lg:mb-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] md:gap-[63px] lg:gap-[125px] items-center">
          <div className="max-w-[445px] order-2 lg:order-1 text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[32px]">
              BRINGING YOU THE <span className="text-[#D87D4A]">BEST</span> AUDIO GEAR
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px]">
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
            </p>
          </div>
          <div className="relative w-full h-[300px] md:h-[300px] lg:h-[588px] rounded-lg overflow-hidden order-1 lg:order-2">
            <Image src="/Bitmap-8.png" alt="Best Audio Gear" fill className="object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}