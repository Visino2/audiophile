'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems, openCart } = useCart();
  
  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/headphones', label: 'HEADPHONES' },
    { href: '/speakers', label: 'SPEAKERS' },
    { href: '/earphones', label: 'EARPHONES' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const totalItems = getTotalItems();

  return (
    <nav className="bg-[#191919] border-b border-[#979797]/20 relative z-50 sticky top-0">
      <div className="max-w-[1110px] mx-auto px-6 lg:px-0">
        <div className="flex items-center justify-between h-[90px]">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="lg:hidden text-white hover:text-[#D87D4A] transition-colors" 
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="text-white text-[24px] font-bold uppercase hover:text-[#D87D4A] transition-colors"
            onClick={handleLinkClick}
          >
            <Image src="/aug.svg" alt="logo" width={143} height={25} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-[34px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold tracking-[2px] hover:text-[#D87D4A] transition-colors uppercase ${
                  pathname === link.href ? 'text-[#D87D4A]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          <button 
            onClick={openCart}
            className="text-white hover:text-[#D87D4A] transition-colors relative" 
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={23} strokeWidth={2} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 top-[90px] lg:hidden z-40" 
            onClick={handleLinkClick} 
          />
          
          {/* Menu Content */}
          <div className="absolute top-[90px] left-0 w-full bg-white lg:hidden z-50 rounded-b-lg">
            <div className="max-w-[1110px] mx-auto px-6 py-[84px]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[68px] sm:gap-[10px]">
                {[
                  { name: 'HEADPHONES', image: '/Bitmap-5.png', link: '/headphones' },
                  { name: 'SPEAKERS', image: '/Bitmap-2.png', link: '/speakers' },
                  { name: 'EARPHONES', image: '/Bitmap-3.png', link: '/earphones' },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    onClick={handleLinkClick}
                    className="bg-[#F1F1F1] rounded-lg pt-[88px] pb-[22px] flex flex-col items-center hover:opacity-80 transition-opacity"
                  >
                    <div className="relative w-[150px] h-[150px] mb-[-30px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-[15px] font-bold tracking-[1.07px] uppercase mb-[17px] mt-12">
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
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;