'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/headphones', label: 'HEADPHONES' },
    { href: '/speakers', label: 'SPEAKERS' },
    { href: '/earphones', label: 'EARPHONES' },
  ];

  return (
    <footer className="bg-[#101010] text-white">
      <div className="max-w-[1110px] mx-auto px-6 lg:px-0">
        {/* Orange accent bar */}
        <div className="h-[4px] w-[101px] bg-[#D87D4A]"></div>
        
        <div className="pt-[71px] pb-[48px]">
          {/* Top Section - Logo and Nav */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-[36px]">
            {/* Logo */}
            <Link href="/" className="text-white text-[40px] font-bold lowercase mb-[48px] lg:mb-0">
              <Image src="/aug.svg" alt="logo" width={143} height={25} />
            </Link>

            {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-row space-x-[34px]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-[13px] font-bold tracking-[2px] hover:text-[#D87D4A] transition-colors uppercase leading-[25px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Only visible on mobile */}
          <div className="flex md:hidden flex-col space-y-[16px] mb-[48px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-[13px] font-bold tracking-[2px] hover:text-[#D87D4A] transition-colors uppercase leading-[25px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Middle Section - Description and Social Icons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-0 mb-[48px] lg:mb-[56px]">
            {/* Description */}
            <div className="max-w-[540px]">
              <p className="text-white/50 text-[15px] leading-[25px] font-medium">
                Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we&apos;re open 7 days a week.
              </p>
            </div>

            {/* Social Icons - Desktop */}
            <div className="hidden lg:flex justify-end items-end">
              <div className="flex space-x-[16px]">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D87D4A] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Social Icons (Mobile/Tablet) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-white/50 text-[15px] font-bold leading-[25px] mb-[48px] md:mb-0">
              Copyright 2021. All Rights Reserved
            </p>

            {/* Social Icons - Mobile/Tablet */}
            <div className="flex lg:hidden space-x-[16px]">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D87D4A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D87D4A] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D87D4A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;