'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('e-money');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2); // 20% VAT
  const grandTotal = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleBackToHome = () => {
    clearCart();
    setShowSuccessModal(false);
    router.push('/');
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <div className="max-w-[1110px] mx-auto px-6 lg:px-0 py-32 text-center">
          <h1 className="text-[32px] font-bold mb-6">Your cart is empty</h1>
          <Link
            href="/"
            className="inline-block bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase px-[30px] py-[15px] hover:bg-[#FBAF85] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <Navbar />

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg p-[32px] md:p-[48px] w-full max-w-[540px] max-h-[90vh] overflow-y-auto">
              {/* Success Icon */}
              <div className="w-[64px] h-[64px] bg-[#D87D4A] rounded-full flex items-center justify-center mb-[23px] md:mb-[33px]">
                <Image
                  src="/order.svg"
                  alt="Success"
                  width={60}
                  height={40}
                />
              </div>

              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase leading-[28px] md:leading-[36px] mb-[16px] md:mb-[24px]">
                THANK YOU<br />FOR YOUR ORDER
              </h2>

              <p className="text-[15px] leading-[25px] text-black/50 mb-[24px] md:mb-[33px]">
                You will receive an email confirmation shortly.
              </p>

              {/* Order Summary */}
              <div className="rounded-lg overflow-hidden mb-[23px] md:mb-[46px]">
                <div className="bg-[#F1F1F1] p-[24px]">
                  {/* First Item */}
                  <div className="flex items-center gap-[16px] pb-[12px]">
                    <div className="relative w-[50px] h-[50px] bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={cart[0].image}
                        alt={cart[0].name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold leading-[25px]">
                        {cart[0].name.split(' ').slice(0, 2).join(' ')}
                      </h3>
                      <p className="text-[14px] text-black/50 font-bold">
                        $ {cart[0].price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[15px] text-black/50 font-bold">
                      x{cart[0].quantity}
                    </span>
                  </div>

                  {/* Other Items Count */}
                  {cart.length > 1 && (
                    <>
                      <div className="border-t border-black/10 my-[12px]" />
                      <p className="text-[12px] font-bold text-black/50 text-center">
                        and {cart.length - 1} other item(s)
                      </p>
                    </>
                  )}
                </div>

                {/* Grand Total */}
                <div className="bg-black p-[24px]">
                  <p className="text-white/50 text-[15px] uppercase mb-[8px]">
                    GRAND TOTAL
                  </p>
                  <p className="text-white text-[18px] font-bold">
                    $ {grandTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Back to Home Button */}
              <button
                onClick={handleBackToHome}
                className="w-full bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase py-[15px] hover:bg-[#FBAF85] transition-colors"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        </>
      )}

      {/* Go Back */}
      <div className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[16px] md:mt-[33px] lg:mt-[79px]">
        <Link href="/" className="text-[15px] text-black/50 hover:text-[#D87D4A] transition-colors">
          Go Back
        </Link>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[24px] md:mt-[38px] mb-[97px] md:mb-[116px] lg:mb-[141px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 bg-white rounded-lg p-[24px] md:p-[48px]">
            <h1 className="text-[28px] md:text-[32px] font-bold tracking-[1px] md:tracking-[1.14px] uppercase mb-[32px] md:mb-[41px]">
              CHECKOUT
            </h1>

            {/* Billing Details */}
            <div className="mb-[32px] md:mb-[53px]">
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-[#D87D4A] mb-[16px]">
                BILLING DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alexei Ward"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="alexei@mail.com"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 202-555-0136"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-[32px] md:mb-[61px]">
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-[#D87D4A] mb-[16px]">
                SHIPPING INFO
              </h2>
              <div className="grid grid-cols-1 gap-[24px]">
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                    Your Address
                  </label>
                  <input
                    type="text"
                    placeholder="1137 Williams Avenue"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div>
                    <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      placeholder="10001"
                      required
                      className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      required
                      className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="United States"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-[13px] font-bold tracking-[0.93px] uppercase text-[#D87D4A] mb-[16px]">
                PAYMENT DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
                <div>
                  <label className="text-[12px] font-bold tracking-[-0.21px] mb-[17px] block text-black">
                    Payment Method
                  </label>
                </div>
                <div className="space-y-[16px]">
                  <label className={`flex items-center border ${paymentMethod === 'e-money' ? 'border-[#D87D4A]' : 'border-[#CFCFCF]'} rounded-lg px-[24px] py-[18px] cursor-pointer hover:border-[#D87D4A] transition-colors text-black`}>
                    <input
                      type="radio"
                      name="payment"
                      value="e-money"
                      checked={paymentMethod === 'e-money'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-[16px] w-[20px] h-[20px] accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">e-Money</span>
                  </label>
                  <label className={`flex items-center border ${paymentMethod === 'cash' ? 'border-[#D87D4A]' : 'border-[#CFCFCF]'} rounded-lg px-[24px] py-[18px] cursor-pointer hover:border-[#D87D4A] transition-colors text-black`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-[16px] w-[20px] h-[20px] accent-[#D87D4A]"
                    />
                    <span className="text-[14px] font-bold">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'e-money' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px] mt-[24px] md:mt-[32px]">
                  <div>
                    <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                      e-Money Number
                    </label>
                    <input
                      type="text"
                      placeholder="238521993"
                      className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold tracking-[-0.21px] mb-[9px] block text-black">
                      e-Money PIN
                    </label>
                    <input
                      type="text"
                      placeholder="6891"
                      className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="bg-white rounded-lg p-[24px] md:p-[32px] h-fit">
            <h2 className="text-[18px] font-bold tracking-[1.29px] uppercase mb-[31px]">
              SUMMARY
            </h2>

            {/* Cart Items */}
            <div className="space-y-[24px] mb-[32px]">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-[16px]">
                  <div className="relative w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold leading-[25px] truncate">
                      {item.name.split(' ').slice(0, 2).join(' ')}
                    </h3>
                    <p className="text-[14px] text-black/50 font-bold">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-[15px] text-black/50 font-bold">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-[8px] mb-[24px]">
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-black/50 uppercase">TOTAL</span>
                <span className="text-[18px] font-bold">$ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-black/50 uppercase">SHIPPING</span>
                <span className="text-[18px] font-bold">$ {shipping}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-black/50 uppercase">VAT (INCLUDED)</span>
                <span className="text-[18px] font-bold">$ {vat.toLocaleString()}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex items-center justify-between mb-[32px]">
              <span className="text-[15px] text-black/50 uppercase">GRAND TOTAL</span>
              <span className="text-[18px] font-bold text-[#D87D4A]">
                $ {grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase py-[15px] hover:bg-[#FBAF85] transition-colors"
            >
              CONTINUE & PAY
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}