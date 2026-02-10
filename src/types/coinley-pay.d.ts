declare module 'coinley-pay' {
  import { ComponentType } from 'react';

  export interface PaymentConfig {
    amount: number;
    currency?: string;
    customerEmail?: string;
    merchantName?: string;
    merchantWalletAddresses?: Record<string, string>;
    callbackUrl?: string;
    metadata?: Record<string, unknown>;
  }

  export interface RedesignedCoinleyPaymentProps {
    publicKey?: string;
    apiKey?: string;
    apiSecret?: string;
    apiUrl: string;
    config: PaymentConfig;
    onSuccess: (paymentId: string, transactionHash: string, paymentDetails: unknown) => void;
    onError: (error: string) => void;
    onClose: () => void;
    isOpen: boolean;
    theme?: 'light' | 'dark';
  }

  export const RedesignedCoinleyPayment: ComponentType<RedesignedCoinleyPaymentProps>;

  export class PaymentAPI {
    constructor(apiUrl: string, publicKeyOrApiKey: string, apiSecret?: string);
    api: {
      get: (url: string) => Promise<{ data: { wallets?: Array<{ networkShortName: string; walletAddress: string }> } }>;
    };
    createPayment: (payload: unknown) => Promise<{ payment: unknown }>;
  }

  export const CoinleyProvider: ComponentType<{ children: React.ReactNode }>;
  export const CoinleyCheckout: ComponentType<unknown>;
  export const ThemeProvider: ComponentType<{ children: React.ReactNode }>;
  export const useCoinley: () => unknown;
  export const EnhancedSimpleCoinleyPayment: ComponentType<unknown>;
  export const QRCodePayment: ComponentType<unknown>;
  export const SimpleCoinleyProvider: ComponentType<{ children: React.ReactNode }>;
  export const CoinleyVanilla: unknown;
  export const PaymentQRGenerator: unknown;
  export const paymentQR: unknown;
  export const generatePaymentQR: unknown;
  export const generatePaymentURL: unknown;
  export const sdkAnalytics: unknown;
  export const clarityAnalytics: unknown;
  export const convertToUSD: (amount: number, fromCurrency: string) => Promise<{ usdAmount: number; rate: number; fromCurrency: string }>;
  export const convertFromUSD: (usdAmount: number, toCurrency: string) => Promise<{ localAmount: number; rate: number; toCurrency: string }>;
  export const formatCurrency: (amount: number, currency: string) => string;
  export const isSupportedCurrency: (currency: string) => boolean;
  export const getCurrencyInfo: (currency: string) => { id: number; symbol: string; name: string; sign: string } | null;
  export const getSupportedCurrencies: () => Record<string, { id: number; symbol: string; name: string; sign: string }>;
  export const prefetchRates: () => Promise<boolean>;
  export const VERSION: string;
  export const utils: {
    formatAmount: (amount: number, decimals?: number) => string;
    truncateAddress: (address: string, startChars?: number, endChars?: number) => string;
    isValidAddress: (address: string, network: string) => boolean;
    copyToClipboard: (text: string) => Promise<boolean>;
  };
  export class CoinleyError extends Error {
    code: string;
  }
  export const DEFAULT_CONFIG: {
    theme: string;
    debug: boolean;
    testMode: boolean;
    autoOpen: boolean;
  };
  export const USAGE_EXAMPLES: {
    react: string;
    vanilla: string;
  };
}

declare module 'coinley-pay/dist/style.css';
