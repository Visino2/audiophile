'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function Headphones() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#191919] text-white hidden md:block">
        <div className="max-w-[1110px] mx-auto px-6 lg:px-0">
          <div className="py-[98px] text-center">
            <h1 className="text-[28px] md:text-[40px] font-bold tracking-[2px] md:tracking-[1.43px] uppercase text-white">
              HEADPHONES
            </h1>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 py-[64px] md:py-[120px] lg:py-[160px]">
        {/* XX99 Mark II */}
        <div className="flex flex-col md:flex-row items-center gap-[32px] md:gap-[69px] lg:gap-[125px] mb-[120px]">
          <div className="relative w-full md:w-1/2 h-[352px] md:h-[352px] lg:h-[560px] bg-[#F1F1F1] rounded-lg overflow-hidden">
            <Image
              src="/Bitmap-9.png"
              alt="XX99 Mark II Headphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-[#D87D4A] text-[14px] tracking-[10px] uppercase mb-[16px] md:mb-[24px]">
              NEW PRODUCT
            </p>
            <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[24px] md:mb-[32px]">
              XX99 MARK II<br />HEADPHONES
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[40px]">
              The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.
            </p>
            <Link
              href="/product/xx99-mark-two-headphones"
              className="inline-block bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        {/* XX99 Mark I */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-[32px] md:gap-[69px] lg:gap-[125px] mb-[120px]">
          <div className="relative w-full md:w-1/2 h-[352px] md:h-[352px] lg:h-[560px] bg-[#F1F1F1] rounded-lg overflow-hidden">
            <Image
              src="/Bitmap-10.png"
              alt="XX99 Mark I Headphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[24px] md:mb-[32px]">
              XX99 MARK I<br />HEADPHONES
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[40px]">
              As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.
            </p>
            <Link
              href="/product/xx99-mark-one-headphones"
              className="inline-block bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>

        {/* XX59 */}
        <div className="flex flex-col md:flex-row items-center gap-[32px] md:gap-[69px] lg:gap-[125px] mb-[120px] md:mb-0">
          <div className="relative w-full md:w-1/2 h-[352px] md:h-[352px] lg:h-[560px] bg-[#F1F1F1] rounded-lg overflow-hidden">
            <Image
              src="/Bitmap-11.png"
              alt="XX59 Headphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-[28px] md:text-[40px] leading-[38px] md:leading-[44px] font-bold tracking-[1px] md:tracking-[1.43px] uppercase mb-[24px] md:mb-[32px]">
              XX59<br />HEADPHONES
            </h2>
            <p className="text-black/50 text-[15px] leading-[25px] mb-[24px] md:mb-[40px]">
              Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.
            </p>
            <Link
              href="/product/xx59-headphones"
              className="inline-block bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
            >
              SEE PRODUCT
            </Link>
          </div>
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
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-contain" 
                />
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
              Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products.
            </p>
          </div>
          <div className="relative w-full h-[300px] md:h-[300px] lg:h-[588px] rounded-lg overflow-hidden order-1 lg:order-2">
            <Image 
              src="/Bitmap-8.png" 
              alt="Best Audio Gear" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}