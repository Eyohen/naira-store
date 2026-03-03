declare module 'coinley-test' {
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

  export interface EnhancedSimpleCoinleyPaymentProps {
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
    debug?: boolean;
    testMode?: boolean;
    autoOpen?: boolean;
  }

  export const EnhancedSimpleCoinleyPayment: ComponentType<EnhancedSimpleCoinleyPaymentProps>;

  export class PaymentAPI {
    constructor(apiUrl: string, publicKeyOrApiKey: string, apiSecret?: string);
    api: {
      get: (url: string) => Promise<{ data: { wallets?: Array<{ networkShortName: string; walletAddress: string }> } }>;
    };
    createPayment: (payload: unknown) => Promise<{ payment: unknown }>;
    getPayment: (paymentId: string) => Promise<unknown>;
    getNetworks: () => Promise<{ networks: unknown[] }>;
    getStablecoins: () => Promise<{ stablecoins: unknown[] }>;
    verifyQRPayment: (paymentId: string) => Promise<unknown>;
    processPayment: (paymentId: string, txHash: string, network: string, senderAddress: string) => Promise<unknown>;
    getContractInfo: (chainId: number) => Promise<unknown>;
    getPaymentSplitterStatus: (paymentId: string) => Promise<unknown>;
    checkPaymentSplitterHealth: () => Promise<unknown>;
    request: (endpoint: string, options?: unknown) => Promise<unknown>;
  }

  export const CoinleyProvider: ComponentType<{
    children: React.ReactNode;
    publicKey?: string;
    apiKey?: string;
    apiSecret?: string;
    apiUrl?: string;
    theme?: 'light' | 'dark';
    debug?: boolean;
  }>;
  export const CoinleyCheckout: ComponentType<unknown>;
  export const ThemeProvider: ComponentType<{ children: React.ReactNode }>;
  export const useCoinley: () => unknown;
  export const QRCodePayment: ComponentType<unknown>;
  export const SimpleCoinleyProvider: ComponentType<{ children: React.ReactNode }>;
  export const CoinleyVanilla: unknown;
  export const PaymentQRGenerator: unknown;
  export const paymentQR: unknown;
  export const generatePaymentQR: unknown;
  export const generatePaymentURL: unknown;
  export const sdkAnalytics: unknown;
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
}

declare module 'coinley-test/dist/style.css';
