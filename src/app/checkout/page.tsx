'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';

// Dynamically import the Coinley payment component to avoid SSR issues
const RedesignedCoinleyPayment = dynamic(
  () => import('coinley-pay').then(mod => mod.RedesignedCoinleyPayment),
  { ssr: false }
);

// Import PaymentAPI for fetching merchant wallets
import { PaymentAPI } from 'coinley-pay';

// Import Coinley styles
import 'coinley-pay/dist/style.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCart();

  const [customerEmail, setCustomerEmail] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [merchantWallets, setMerchantWallets] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string | null>(null);

  // Merchant configuration (same as elite-web)
  const MERCHANT_PUBLIC_KEY = 'pk_6ed51328523d9bc9d8f69e73271342bd';
  const API_URL = 'https://hub.coinley.io';

  // Fetch merchant wallet configuration on component mount
  useEffect(() => {
    const fetchMerchantConfig = async () => {
      try {
        const paymentAPI = new PaymentAPI(API_URL, MERCHANT_PUBLIC_KEY);
        const walletsResponse = await paymentAPI.api.get('/api/merchants/wallets');

        if (walletsResponse.data && walletsResponse.data.wallets) {
          const walletMap: Record<string, string> = {};
          walletsResponse.data.wallets.forEach((wallet: { networkShortName: string; walletAddress: string }) => {
            if (wallet.walletAddress && wallet.walletAddress.trim() !== '') {
              walletMap[wallet.networkShortName] = wallet.walletAddress;
            }
          });
          setMerchantWallets(walletMap);
        }
      } catch (error) {
        console.error('Failed to fetch merchant wallet config:', error);
        setMerchantWallets({});
      }
    };

    fetchMerchantConfig();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      if (!customerEmail) {
        throw new Error('Please enter your email address');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail)) {
        throw new Error('Please enter a valid email address');
      }

      // Generate a simple order ID
      const newOrderId = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setOrderId(newOrderId);

      // Open the payment modal
      setIsPaymentModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string, transactionHash: string, paymentDetails: unknown) => {
    console.log('Payment success:', { paymentId, transactionHash, paymentDetails });
    setPaymentSuccess(true);
    clearCart();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    setError(`Payment failed: ${error}`);
    setProcessing(false);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setProcessing(false);

    if (paymentSuccess) {
      router.push(`/order-success?orderId=${orderId}`);
    }
  };

  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                <input
                  type="radio"
                  id="crypto"
                  name="payment"
                  checked
                  readOnly
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="crypto" className="flex-1">
                  <span className="font-medium text-gray-800">Pay with Cryptocurrency</span>
                  <p className="text-sm text-gray-500">
                    USDT, USDC, ETH, and more via Coinley
                  </p>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Success Message */}
            {paymentSuccess && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                Payment successful! Redirecting...
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || paymentSuccess}
              className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ${formatPrice(subtotal)}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="max-h-80 overflow-y-auto mb-4">
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-green-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-green-600">{formatPrice(subtotal)}</span>
              </div>
            </div>

            {/* Currency Notice */}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your total of {formatPrice(subtotal)} will be automatically converted to USD for crypto payment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coinley Payment Modal */}
      <RedesignedCoinleyPayment
        publicKey={MERCHANT_PUBLIC_KEY}
        apiUrl={API_URL}
        config={{
          amount: subtotal,
          currency: 'NGN', // Nigerian Naira - will be converted to USD
          customerEmail: customerEmail,
          merchantName: 'NairaElectronics',
          merchantWalletAddresses: merchantWallets,
          metadata: {
            orderId: orderId,
            customerEmail: customerEmail,
            items: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onClose={handleCloseModal}
        isOpen={isPaymentModalOpen}
        theme="light"
      />
    </div>
  );
}
