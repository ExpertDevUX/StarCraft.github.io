import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Star, Zap, Crown, Gift } from 'lucide-react';
import { CreditPackage } from '../types/game';

interface CreditRechargePageProps {
  onBack: () => void;
  onPurchase: (packageId: string) => void;
  playerCredits: number;
}

export default function CreditRechargePage({ onBack, onPurchase, playerCredits }: CreditRechargePageProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const creditPackages: CreditPackage[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 5000,
      price: 4.99,
    },
    {
      id: 'popular',
      name: 'Popular Choice',
      credits: 12000,
      price: 9.99,
      bonus: 2000,
      popular: true,
    },
    {
      id: 'value',
      name: 'Best Value',
      credits: 25000,
      price: 19.99,
      bonus: 5000,
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      credits: 50000,
      price: 34.99,
      bonus: 15000,
    },
    {
      id: 'ultimate',
      name: 'Ultimate Pack',
      credits: 100000,
      price: 59.99,
      bonus: 35000,
    },
  ];

  const handlePurchase = async (packageId: string) => {
    setSelectedPackage(packageId);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPurchase(packageId);
      setIsProcessing(false);
      setSelectedPackage(null);
    }, 2000);
  };

  const getPackageIcon = (packageId: string) => {
    switch (packageId) {
      case 'starter': return Star;
      case 'popular': return Zap;
      case 'value': return Gift;
      case 'premium': return Crown;
      case 'ultimate': return Crown;
      default: return Star;
    }
  };

  const getPackageColor = (packageId: string) => {
    switch (packageId) {
      case 'starter': return 'from-blue-500 to-cyan-500';
      case 'popular': return 'from-purple-500 to-pink-500';
      case 'value': return 'from-green-500 to-emerald-500';
      case 'premium': return 'from-yellow-500 to-orange-500';
      case 'ultimate': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <CreditCard className="w-8 h-8 mr-3 text-green-400" />
                Credit Recharge
              </h1>
              <p className="text-gray-400">Purchase credits to upgrade your fleet and dominate the galaxy</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{playerCredits.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Current Credits</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Special Offers Banner */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-400/30 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              <Gift className="w-8 h-8 inline mr-2 text-yellow-400" />
              Limited Time Offers
            </h2>
            <p className="text-lg text-gray-300 mb-6">Get bonus credits with every purchase this week!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400 mb-2">+20%</div>
                <div className="text-sm text-gray-300">Bonus Credits</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-2">FREE</div>
                <div className="text-sm text-gray-300">Ship Upgrade</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400 mb-2">2X</div>
                <div className="text-sm text-gray-300">Battle Rewards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {creditPackages.map((pkg) => {
            const IconComponent = getPackageIcon(pkg.id);
            const isSelected = selectedPackage === pkg.id;
            const isProcessingThis = isProcessing && isSelected;
            
            return (
              <div
                key={pkg.id}
                className={`relative bg-slate-800/50 rounded-xl border transition-all duration-300 hover:transform hover:scale-105 ${
                  pkg.popular 
                    ? 'border-purple-400 ring-2 ring-purple-400/20' 
                    : 'border-slate-700 hover:border-slate-600'
                } ${isSelected ? 'ring-2 ring-cyan-400/50' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Package Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${getPackageColor(pkg.id)} rounded-xl mb-4 flex items-center justify-center mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Package Info */}
                  <h3 className="text-xl font-bold text-center mb-2">{pkg.name}</h3>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                      {pkg.credits.toLocaleString()}
                    </div>
                    {pkg.bonus && (
                      <div className="text-sm text-yellow-400 font-semibold">
                        +{pkg.bonus.toLocaleString()} Bonus!
                      </div>
                    )}
                    <div className="text-sm text-gray-400">Credits</div>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-white">${pkg.price}</div>
                    <div className="text-sm text-gray-400">USD</div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      isProcessingThis
                        ? 'bg-slate-600 cursor-not-allowed'
                        : `bg-gradient-to-r ${getPackageColor(pkg.id)} hover:shadow-lg`
                    }`}
                  >
                    {isProcessingThis ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Purchase'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-center">Secure Payment Methods</h3>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm">Credit Card</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
                PP
              </div>
              <div className="text-sm">PayPal</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
                GP
              </div>
              <div className="text-sm">Google Pay</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-black rounded flex items-center justify-center text-white font-bold text-xs">
                AP
              </div>
              <div className="text-sm">Apple Pay</div>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-gray-400">
            All transactions are secured with 256-bit SSL encryption
          </div>
        </div>
      </main>
    </div>
  );
}