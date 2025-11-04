'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

        {/* Hero Section */}
  <section className="bg-[#191919] text-white overflow-hidden">
  <div className="max-w-[1110px] mx-auto px-6 lg:px-0">
    <div className="flex flex-col md:flex-row items-center justify-between py-[112px] md:py-[126px] lg:py-[128px]">
      
      {/* Image First on Mobile */}
      <div className="relative w-[200px] h-[200px] md:w-[360px] md:h-[360px] lg:w-[410px] lg:h-[410px] order-1 md:order-2 mb-8 md:mb-0">
        <Image
          src="/Bitmap-9.png"
          alt="XX99 Mark II Headphones"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text Second on Mobile */}
      <div className="max-w-[398px] order-2 md:order-1 text-center md:text-left">
        <p className="text-white/50 text-[14px] tracking-[10px] uppercase mb-[24px]">
          NEW PRODUCT
        </p>
        <h1 className="text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] font-bold tracking-[1.29px] md:tracking-[2px] uppercase mb-[24px] hover:text-white">
          XX99 MARK II<br />HEADPHONES
        </h1>
        <p className="text-white/75 text-[15px] leading-[25px] mb-[28px] md:mb-[40px]">
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
        </p>
        <Link
          href="/product/xx99-mark-two-headphones"
          className="inline-block bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  </div>
  </section>

      {/* Category Cards */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 py-[92px] md:py-[96px] lg:py-[120px]">
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

      {/* ZX9 Speaker Section */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[24px] md:mb-[32px] lg:mb-[48px]">
        <div className="bg-[#D87D4A] rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between py-[55px] md:py-[64px] lg:py-[96px] px-[24px] md:px-[62px] lg:px-[95px] text-center md:text-left">
            <div className="relative w-[172px] h-[207px] md:w-[197px] md:h-[237px] lg:w-[410px] lg:h-[493px] mb-[32px] md:mb-0">
              <Image
                src="/Bitmap-4.png"
                alt="ZX9 Speaker"
                fill
                className="object-contain"
              />
            </div>
            <div className="max-w-[349px]">
              <h2 className="text-[36px] md:text-[56px] leading-[40px] md:leading-[58px] font-bold tracking-[1.29px] md:tracking-[2px] uppercase text-white mb-[24px]">
                ZX9<br />SPEAKER
              </h2>
              <p className="text-white/75 text-[15px] leading-[25px] mb-[24px] md:mb-[40px]">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link
                href="/product/zx9-speaker"
                className="inline-block bg-[#000000] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#4C4C4C] transition-colors"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ZX7 Speaker Section */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[24px] md:mb-[32px] lg:mb-[48px]">
        <div className="relative bg-[#F1F1F1] rounded-lg overflow-hidden h-[320px]">
          <Image
            src="/Bitmap-6.png"
            alt="ZX7 Speaker"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-[24px] md:px-[62px] lg:px-[95px]">
            <h2 className="text-[28px] font-bold tracking-[2px] uppercase mb-[32px]">
              ZX7 SPEAKER
            </h2>
            <Link
              href="/product/zx7-speaker"
              className="inline-block border-2 border-black text-black text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-black hover:text-white transition-all w-fit"
            >
              SEE PRODUCT
            </Link>
          </div>
        </div>
      </section>

      {/* YX1 Earphones Section */}
      <section className="max-w-[1110px] mx-auto px-6 lg:px-0 mb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[11px] lg:gap-[30px]">
          <div className="relative bg-[#F1F1F1] rounded-lg overflow-hidden h-[200px] md:h-[320px]">
            <Image
              src="/Bitmap-7.jpg"
              alt="YX1 Earphones"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-[#F1F1F1] rounded-lg flex flex-col justify-center px-[24px] md:px-[41px] lg:px-[95px] h-[200px] md:h-[320px]">
            <h2 className="text-[28px] font-bold tracking-[2px] uppercase mb-[32px]">
              YX1 EARPHONES
            </h2>
            <Link
              href="/product/yx1-earphones"
              className="inline-block border-2 border-black text-black text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-black hover:text-white transition-all w-fit"
            >
              SEE PRODUCT
            </Link>
          </div>
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