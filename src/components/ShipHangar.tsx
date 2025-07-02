import React, { useState } from 'react';
import { ArrowLeft, Rocket, Shield, Zap, Gauge, Star, Lock, Wrench, Target, Flame } from 'lucide-react';
import { Ship } from '../types/game';

interface ShipHangarProps {
  ships: Ship[];
  onBack: () => void;
  onSelectShip: (ship: Ship) => void;
}

export default function ShipHangar({ ships, onBack, onSelectShip }: ShipHangarProps) {
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);

  const classes = ['All', 'Fighter', 'Cruiser', 'Battleship'];
  const filteredShips = selectedClass === 'All' ? ships : ships.filter(ship => ship.class === selectedClass);

  const getClassColor = (shipClass: string) => {
    switch (shipClass) {
      case 'Fighter': return 'text-green-400';
      case 'Cruiser': return 'text-blue-400';
      case 'Battleship': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getClassGradient = (shipClass: string) => {
    switch (shipClass) {
      case 'Fighter': return 'from-green-500 to-emerald-500';
      case 'Cruiser': return 'from-blue-500 to-cyan-500';
      case 'Battleship': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getShipIcon = (shipName: string, shipClass: string) => {
    // Different icons based on ship name and class
    if (shipName.includes('Phoenix') || shipName.includes('Viper')) return Rocket;
    if (shipName.includes('Stealth') || shipName.includes('Phantom')) return Target;
    if (shipName.includes('Storm') || shipName.includes('Thunder')) return Zap;
    if (shipName.includes('Titan') || shipName.includes('Battleship')) return Shield;
    if (shipName.includes('Nova') || shipName.includes('Star')) return Star;
    if (shipName.includes('Flame') || shipName.includes('Fire')) return Flame;
    
    // Default based on class
    switch (shipClass) {
      case 'Fighter': return Rocket;
      case 'Cruiser': return Star;
      case 'Battleship': return Shield;
      default: return Rocket;
    }
  };

  const getShipDesign = (shipName: string, shipClass: string) => {
    // Create unique visual designs for each ship
    const designs = {
      'Phoenix Fighter': {
        primary: 'from-orange-500 to-red-500',
        secondary: 'from-yellow-400 to-orange-500',
        pattern: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)'
      },
      'Viper Interceptor': {
        primary: 'from-green-500 to-emerald-600',
        secondary: 'from-lime-400 to-green-500',
        pattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)'
      },
      'Nova Cruiser': {
        primary: 'from-blue-500 to-purple-600',
        secondary: 'from-cyan-400 to-blue-500',
        pattern: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
      },
      'Titan Battleship': {
        primary: 'from-red-600 to-gray-800',
        secondary: 'from-red-400 to-red-600',
        pattern: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
      },
      'Stealth Phantom': {
        primary: 'from-purple-600 to-black',
        secondary: 'from-purple-400 to-purple-600',
        pattern: 'conic-gradient(from 45deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
      },
      'Storm Cruiser': {
        primary: 'from-indigo-500 to-blue-700',
        secondary: 'from-cyan-300 to-indigo-500',
        pattern: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3) 0%, transparent 40%)'
      }
    };

    return designs[shipName as keyof typeof designs] || {
      primary: getClassGradient(shipClass),
      secondary: 'from-gray-400 to-gray-600',
      pattern: 'none'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Rocket className="w-8 h-8 mr-3 text-cyan-400" />
              Ship Hangar
            </h1>
            <p className="text-gray-400">Manage and customize your starship fleet</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ship List */}
          <div className="lg:col-span-2">
            {/* Class Filter */}
            <div className="flex space-x-2 mb-6 p-1 bg-slate-800/50 rounded-xl">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                    selectedClass === cls
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            {/* Ships Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredShips.map((ship) => {
                const ShipIcon = getShipIcon(ship.name, ship.class);
                const design = getShipDesign(ship.name, ship.class);
                
                return (
                  <div
                    key={ship.id}
                    onClick={() => setSelectedShip(ship)}
                    className={`relative p-6 bg-slate-800/50 rounded-xl border transition-all duration-300 cursor-pointer hover:transform hover:scale-105 ${
                      selectedShip?.id === ship.id
                        ? 'border-cyan-400 bg-cyan-900/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {!ship.owned && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    
                    {ship.equipped && (
                      <div className="absolute top-4 left-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                    )}

                    {/* Ship Visual */}
                    <div className="aspect-video bg-slate-700/50 rounded-lg mb-4 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{ background: design.pattern }}
                      ></div>
                      
                      {/* Ship Silhouette */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${design.primary} opacity-80`}></div>
                      
                      {/* Ship Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`relative bg-gradient-to-r ${design.secondary} rounded-full p-4 shadow-2xl`}>
                          <ShipIcon className="w-12 h-12 text-white" />
                          
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${design.secondary} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                        </div>
                      </div>
                      
                      {/* Engine Trails */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="flex space-x-1">
                          <div className="w-1 h-8 bg-gradient-to-t from-blue-400 to-transparent opacity-70 animate-pulse"></div>
                          <div className="w-1 h-6 bg-gradient-to-t from-cyan-400 to-transparent opacity-70 animate-pulse delay-100"></div>
                          <div className="w-1 h-8 bg-gradient-to-t from-blue-400 to-transparent opacity-70 animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{ship.name}</h3>
                    <p className={`text-sm mb-3 ${getClassColor(ship.class)}`}>{ship.class}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span>{ship.maxHealth}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>{ship.firepower}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-green-400" />
                        <span>{ship.speed}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span>{ship.maxShields}</span>
                      </div>
                    </div>

                    {!ship.owned && (
                      <div className="mt-4 pt-3 border-t border-slate-700">
                        <span className="text-green-400 font-semibold">{ship.price.toLocaleString()} Credits</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ship Details */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 h-fit">
            {selectedShip ? (
              <div>
                {/* Ship Visual Detail */}
                <div className="aspect-video bg-slate-700/50 rounded-lg mb-6 relative overflow-hidden">
                  {(() => {
                    const ShipIcon = getShipIcon(selectedShip.name, selectedShip.class);
                    const design = getShipDesign(selectedShip.name, selectedShip.class);
                    
                    return (
                      <>
                        <div 
                          className="absolute inset-0 opacity-40"
                          style={{ background: design.pattern }}
                        ></div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${design.primary} opacity-90`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`relative bg-gradient-to-r ${design.secondary} rounded-full p-6 shadow-2xl`}>
                            <ShipIcon className="w-16 h-16 text-white" />
                            <div className={`absolute inset-0 bg-gradient-to-r ${design.secondary} rounded-full blur-xl opacity-60 animate-pulse`}></div>
                          </div>
                        </div>
                        
                        {/* Enhanced Engine Effects */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                          <div className="flex space-x-2">
                            <div className="w-2 h-12 bg-gradient-to-t from-blue-500 to-transparent opacity-80 animate-pulse"></div>
                            <div className="w-2 h-10 bg-gradient-to-t from-cyan-500 to-transparent opacity-80 animate-pulse delay-150"></div>
                            <div className="w-2 h-12 bg-gradient-to-t from-blue-500 to-transparent opacity-80 animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedShip.name}</h2>
                <p className={`text-lg mb-6 ${getClassColor(selectedShip.class)}`}>{selectedShip.class}</p>

                {/* Detailed Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <span>Hull Integrity</span>
                    </span>
                    <span className="font-semibold">{selectedShip.maxHealth}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span>Shield Capacity</span>
                    </span>
                    <span className="font-semibold">{selectedShip.maxShields}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Firepower</span>
                    </span>
                    <span className="font-semibold">{selectedShip.firepower}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-green-400" />
                      <span>Speed</span>
                    </span>
                    <span className="font-semibold">{selectedShip.speed}</span>
                  </div>
                </div>

                {/* Ship Specifications */}
                <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Wrench className="w-4 h-4 mr-2 text-cyan-400" />
                    Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Class:</span>
                      <span>{selectedShip.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={selectedShip.equipped ? 'text-green-400' : 'text-gray-400'}>
                        {selectedShip.equipped ? 'Active' : 'Docked'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Condition:</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Upgrades:</span>
                      <span className="text-yellow-400">3/5</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {selectedShip.owned ? (
                    <>
                      {!selectedShip.equipped && (
                        <button 
                          onClick={() => onSelectShip(selectedShip)}
                          className={`w-full py-3 px-4 bg-gradient-to-r ${getClassGradient(selectedShip.class)} rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                        >
                          Deploy Ship
                        </button>
                      )}
                      {selectedShip.equipped && (
                        <div className="w-full py-3 px-4 bg-green-900/30 border border-green-400/30 rounded-lg font-semibold text-green-400 text-center">
                          Currently Deployed
                        </div>
                      )}
                      <button className="w-full py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-all duration-300">
                        Customize Loadout
                      </button>
                      <button className="w-full py-3 px-4 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/20 transition-all duration-300">
                        Upgrade Ship
                      </button>
                    </>
                  ) : (
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      Purchase ({selectedShip.price.toLocaleString()} Credits)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <Rocket className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a ship to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}