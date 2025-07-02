import React from 'react';
import { Rocket, Shield, Zap, Users, Trophy, Star } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
  onGuestPlay: () => void;
}

export default function LandingPage({ onLogin, onRegister, onGuestPlay }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Rocket className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Starship Battle
          </span>
        </div>
        <div className="space-x-4">
          <button 
            onClick={onLogin}
            className="px-6 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
          >
            Login
          </button>
          <button 
            onClick={onRegister}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            SPACE WARFARE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Command epic starships in real-time multiplayer battles. 
            Customize your fleet, master tactical combat, and dominate the galaxy.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={onGuestPlay}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-lg font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-2xl hover:shadow-cyan-400/50 transform hover:scale-105"
            >
              <Zap className="w-5 h-5 inline mr-2" />
              Play Now
            </button>
            <button 
              onClick={onRegister}
              className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-xl text-lg font-semibold hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 inline mr-2" />
              Join Community
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Shield className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Ship Customization</h3>
              <p className="text-gray-400">Design and upgrade your starships with advanced weapons and defense systems.</p>
            </div>
            
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Zap className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Combat</h3>
              <p className="text-gray-400">Engage in fast-paced battles with physics-based combat mechanics.</p>
            </div>
            
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Trophy className="w-12 h-12 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Competitive Rankings</h3>
              <p className="text-gray-400">Climb the leaderboards and prove your tactical superiority.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-16 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400">50K+</div>
              <div className="text-gray-400">Active Pilots</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">100K+</div>
              <div className="text-gray-400">Battles Fought</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">25+</div>
              <div className="text-gray-400">Ship Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-gray-400">Online Battles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}