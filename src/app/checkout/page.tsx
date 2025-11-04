'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getOrCreateSessionId } from '@/app/lib/session';

export default function CheckoutPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('e-money');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const cartData = useQuery(
    api.carts.getCart,
    sessionId ? { sessionId } : 'skip'
  );
  const createOrder = useMutation(api.order.createOrder);

  const cart = cartData?.items || [];
  const subtotal = cartData?.total || 0;
  const shipping = 50;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionId || isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      await createOrder({
        sessionId,
        customerInfo: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          address: formData.get('address') as string,
          city: formData.get('city') as string,
          zipCode: formData.get('zipCode') as string,
          country: formData.get('country') as string,
        },
        paymentMethod,
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error creating order:', error);
      alert(error instanceof Error ? error.message : 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
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

      {showSuccessModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg p-[32px] md:p-[48px] w-full max-w-[540px] max-h-[90vh] overflow-y-auto">
              <div className="w-[64px] h-[64px] bg-[#D87D4A] rounded-full flex items-center justify-center mb-[23px] md:mb-[33px]">
                <Image src="/order.svg" alt="Success" width={60} height={40} />
              </div>

              <h2 className="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase leading-[28px] md:leading-[36px] mb-[16px] md:mb-[24px]">
                THANK YOU<br />FOR YOUR ORDER
              </h2>

              <p className="text-[15px] leading-[25px] text-black/50 mb-[24px] md:mb-[33px]">
                You will receive an email confirmation shortly.
              </p>

              <div className="rounded-lg overflow-hidden mb-[23px] md:mb-[46px]">
                <div className="bg-[#F1F1F1] p-[24px]">
                  {cart.length > 0 && cart[0] && (
                    <>
                      <div className="flex items-center gap-[16px] pb-[12px]">
                        {cart[0].image && (
                          <div className="relative w-[50px] h-[50px] bg-white rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={cart[0].image}
                              alt={cart[0].name || 'Product image'}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold leading-[25px]">
                            {cart[0].shortName || cart[0].name || 'Product'}
                          </h3>
                          <p className="text-[14px] text-black/50 font-bold">
                            $ {cart[0].price.toLocaleString()}
                          </p>
                        </div>
                        <span className="text-[15px] text-black/50 font-bold">
                          x{cart[0].quantity}
                        </span>
                      </div>

                      {cart.length > 1 && (
                        <>
                          <div className="border-t border-black/10 my-[12px]" />
                          <p className="text-[12px] font-bold text-black/50 text-center">
                            and {cart.length - 1} other item(s)
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="bg-black p-[24px]">
                  <p className="text-white/50 text-[15px] uppercase mb-[8px]">
                    GRAND TOTAL
                  </p>
                  <p className="text-white text-[18px] font-bold">
                    $ {grandTotal.toLocaleString()}
                  </p>
                </div>
              </div>

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

      <div className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[16px] md:mt-[33px] lg:mt-[79px]">
        <Link href="/" className="text-[15px] text-black/50 hover:text-[#D87D4A] transition-colors">
          Go Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[1110px] mx-auto px-6 lg:px-0 mt-[24px] md:mt-[38px] mb-[97px] md:mb-[116px] lg:mb-[141px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
          <div className="lg:col-span-2 bg-white rounded-lg p-[24px] md:p-[48px]">
            <h1 className="text-[28px] md:text-[32px] font-bold tracking-[1px] md:tracking-[1.14px] uppercase mb-[32px] md:mb-[41px]">
              CHECKOUT
            </h1>

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
                    name="name"
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
                    name="email"
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
                    name="phone"
                    placeholder="+1 202-555-0136"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
              </div>
            </div>

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
                    name="address"
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
                      name="zipCode"
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
                      name="city"
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
                    name="country"
                    placeholder="United States"
                    required
                    className="w-full border border-[#CFCFCF] rounded-lg px-[24px] py-[18px] text-[14px] font-bold placeholder:text-black/40 placeholder:font-bold focus:border-[#D87D4A] outline-none"
                  />
                </div>
              </div>
            </div>

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

          <div className="bg-white rounded-lg p-[24px] md:p-[32px] h-fit">
            <h2 className="text-[18px] font-bold tracking-[1.29px] uppercase mb-[31px]">
              SUMMARY
            </h2>

            <div className="space-y-[24px] mb-[32px]">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-[16px]">
                  <div className="relative w-[64px] h-[64px] bg-[#F1F1F1] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image ?? '/placeholder.png'}
                      alt={item.name || 'Product'}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold leading-[25px] truncate">
                      {item.shortName || item.name || 'Product'}
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

            <div className="flex items-center justify-between mb-[32px]">
              <span className="text-[15px] text-black/50 uppercase">GRAND TOTAL</span>
              <span className="text-[18px] font-bold text-[#D87D4A]">
                $ {grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D87D4A] text-white text-[13px] font-bold tracking-[1px] uppercase py-[15px] hover:bg-[#FBAF85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'PROCESSING...' : 'CONTINUE & PAY'}
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}