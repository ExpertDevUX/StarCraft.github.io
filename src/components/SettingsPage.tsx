import React, { useState } from 'react';
import { ArrowLeft, User, Settings, LogOut, Bell, Shield, Volume2, Monitor, CreditCard, Camera, Key } from 'lucide-react';
import { Player } from '../types/game';

interface SettingsPageProps {
  player: Player;
  onBack: () => void;
  onLogout: () => void;
  onRecharge: () => void;
  onNavigate: (view: string) => void;
}

export default function SettingsPage({ player, onBack, onLogout, onRecharge, onNavigate }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(75);
  const [effectsVolume, setEffectsVolume] = useState(85);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const getAvatarDisplay = () => {
    if (player.avatarType === 'uploaded' && player.avatar) {
      return (
        <img 
          src={player.avatar} 
          alt="Avatar" 
          className="w-full h-full object-cover"
        />
      );
    } else {
      return <User className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Settings className="w-8 h-8 mr-3 text-indigo-400" />
              Settings
            </h1>
            <p className="text-gray-400">Manage your account and game preferences</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Information */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-cyan-400" />
                Account Information
              </h2>
              
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center overflow-hidden">
                      {getAvatarDisplay()}
                    </div>
                    <button 
                      onClick={() => onNavigate('avatar')}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{player.username}</h3>
                    <p className="text-gray-400">{player.rank} • Level {player.level}</p>
                    <button 
                      onClick={() => onNavigate('avatar')}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Commander Name
                    </label>
                    <input
                      type="text"
                      value={player.username}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={player.email || 'commander@starfleet.com'}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Level
                    </label>
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-cyan-400 font-semibold">
                      Level {player.level}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Rank
                    </label>
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-yellow-400 font-semibold">
                      {player.rank}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Win Rate
                    </label>
                    <div className="px-4 py-3 bg-slate-700/30 border border-slate-600 rounded-lg text-green-400 font-semibold">
                      {Math.round((player.wins / (player.wins + player.losses)) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors font-semibold">
                    Update Profile
                  </button>
                  <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Game Settings */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Monitor className="w-6 h-6 mr-2 text-purple-400" />
                Game Settings
              </h2>
              
              <div className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="font-semibold">Battle Notifications</div>
                      <div className="text-sm text-gray-400">Get notified when battles are ready</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? 'bg-cyan-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Sound Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="font-semibold">Sound Effects</div>
                        <div className="text-sm text-gray-400">Enable game sound effects</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        soundEnabled ? 'bg-cyan-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          soundEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {soundEnabled && (
                    <div className="ml-8 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-300">Music Volume</span>
                          <span className="text-sm text-cyan-400">{musicVolume}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={musicVolume}
                          onChange={(e) => setMusicVolume(Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-300">Effects Volume</span>
                          <span className="text-sm text-cyan-400">{effectsVolume}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={effectsVolume}
                          onChange={(e) => setEffectsVolume(Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Credits & Recharge */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                Credits
              </h3>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {player.credits.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Available Credits</div>
              </div>
              
              <button
                onClick={onRecharge}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300"
              >
                Recharge Credits
              </button>
            </div>

            {/* Security */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Security
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('security')}
                  className="w-full py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-left flex items-center"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Security Settings
                </button>
                <button className="w-full py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-left">
                  Login History
                </button>
                <button className="w-full py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-left">
                  Privacy Settings
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Account Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  <span className="text-green-400 text-sm">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2FA Enabled</span>
                  <span className={`text-sm ${player.twoFactorEnabled ? 'text-green-400' : 'text-red-400'}`}>
                    {player.twoFactorEnabled ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Premium Member</span>
                  <span className="text-yellow-400 text-sm">★</span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-400/25 transition-all duration-300 flex items-center justify-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}