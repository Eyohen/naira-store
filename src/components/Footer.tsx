import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-white">NairaElectronics</span>
          </div>

          <p className="text-sm text-center">
            Pay with crypto using <span className="text-green-500 font-medium">Coinley</span>
          </p>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} NairaElectronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
