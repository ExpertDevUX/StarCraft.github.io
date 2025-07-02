import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Lock, Zap, Shield, Rocket } from 'lucide-react';
import { Ship, Weapon } from '../types/game';

interface ShopProps {
  ships: Ship[];
  weapons: Weapon[];
  playerCredits: number;
  onBack: () => void;
  onPurchase: (item: Ship | Weapon) => void;
}

export default function Shop({ ships, weapons, playerCredits, onBack, onPurchase }: ShopProps) {
  const [activeTab, setActiveTab] = useState<'ships' | 'weapons'>('ships');

  const availableShips = ships.filter(ship => !ship.owned);
  const availableWeapons = weapons.filter(weapon => !weapon.owned);

  const getWeaponColor = (type: string) => {
    switch (type) {
      case 'Laser': return 'text-blue-400';
      case 'Missile': return 'text-red-400';
      case 'Plasma': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getWeaponIcon = (type: string) => {
    switch (type) {
      case 'Laser': return Zap;
      case 'Missile': return Rocket;
      case 'Plasma': return Shield;
      default: return Zap;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <ShoppingCart className="w-8 h-8 mr-3 text-green-400" />
                Starship Shop
              </h1>
              <p className="text-gray-400">Upgrade your arsenal and dominate the battlefield</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{playerCredits.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Credits Available</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-2 mb-8 p-1 bg-slate-800/50 rounded-xl max-w-md">
          <button
            onClick={() => setActiveTab('ships')}
            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
              activeTab === 'ships'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Ships ({availableShips.length})
          </button>
          <button
            onClick={() => setActiveTab('weapons')}
            className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
              activeTab === 'weapons'
                ? 'bg-green-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Weapons ({availableWeapons.length})
          </button>
        </div>

        {/* Ships Tab */}
        {activeTab === 'ships' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableShips.map((ship) => (
              <div key={ship.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video bg-slate-700/50 rounded-lg mb-4 flex items-center justify-center">
                  <Rocket className={`w-16 h-16 ${
                    ship.class === 'Fighter' ? 'text-green-400' :
                    ship.class === 'Cruiser' ? 'text-blue-400' :
                    'text-red-400'
                  }`} />
                </div>

                <h3 className="text-xl font-bold mb-2">{ship.name}</h3>
                <p className={`text-sm mb-4 ${
                  ship.class === 'Fighter' ? 'text-green-400' :
                  ship.class === 'Cruiser' ? 'text-blue-400' :
                  'text-red-400'
                }`}>{ship.class}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>Hull: {ship.maxHealth}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span>Shields: {ship.maxShields}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Power: {ship.firepower}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-green-400" />
                    <span>Speed: {ship.speed}</span>
                  </div>
                </div>

                {/* Purchase */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-400">{ship.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400">Credits</span>
                  </div>
                  
                  <button
                    onClick={() => onPurchase(ship)}
                    disabled={playerCredits < ship.price}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      playerCredits >= ship.price
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-400/25'
                        : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {playerCredits >= ship.price ? 'Purchase' : (
                      <span className="flex items-center justify-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Insufficient Credits
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Weapons Tab */}
        {activeTab === 'weapons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableWeapons.map((weapon) => {
              const IconComponent = getWeaponIcon(weapon.type);
              return (
                <div key={weapon.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-xl mb-4 flex items-center justify-center mx-auto">
                    <IconComponent className={`w-8 h-8 ${getWeaponColor(weapon.type)}`} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-center">{weapon.name}</h3>
                  <p className={`text-sm mb-4 text-center ${getWeaponColor(weapon.type)}`}>{weapon.type}</p>

                  {/* Stats */}
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Damage:</span>
                      <span className="font-semibold">{weapon.damage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cooldown:</span>
                      <span className="font-semibold">{weapon.cooldown}s</span>
                    </div>
                  </div>

                  {/* Purchase */}
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-xl font-bold text-green-400">{weapon.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 ml-1">Credits</span>
                    </div>
                    
                    <button
                      onClick={() => onPurchase(weapon)}
                      disabled={playerCredits < weapon.price}
                      className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        playerCredits >= weapon.price
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-400/25'
                          : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {playerCredits >= weapon.price ? 'Purchase' : (
                        <span className="flex items-center justify-center">
                          <Lock className="w-3 h-3 mr-1" />
                          Low Credits
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Featured Deals */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8 border border-purple-400/30">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <Star className="w-6 h-6 inline mr-2 text-yellow-400" />
            Daily Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-3xl font-bold text-green-400 mb-2">50% OFF</div>
              <div className="text-lg font-semibold mb-2">All Fighter Ships</div>
              <div className="text-sm text-gray-400">Limited time offer</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">2X</div>
              <div className="text-lg font-semibold mb-2">Credit Rewards</div>
              <div className="text-sm text-gray-400">This weekend only</div>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">FREE</div>
              <div className="text-lg font-semibold mb-2">Weapon Upgrades</div>
              <div className="text-sm text-gray-400">With ship purchase</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}