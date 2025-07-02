import React from 'react';
import { User, Gamepad2, ShoppingCart, Users, Trophy, Settings, Rocket, Shield, Zap } from 'lucide-react';
import { Player } from '../types/game';

interface DashboardProps {
  player: Player;
  onNavigate: (view: string) => void;
}

export default function Dashboard({ player, onNavigate }: DashboardProps) {
  const quickStats = [
    { label: 'Level', value: player.level, color: 'text-cyan-400' },
    { label: 'Credits', value: player.credits.toLocaleString(), color: 'text-green-400' },
    { label: 'Wins', value: player.wins, color: 'text-purple-400' },
    { label: 'Rank', value: player.rank, color: 'text-yellow-400' },
  ];

  const menuItems = [
    { id: 'hangar', title: 'Ship Hangar', subtitle: 'Manage your fleet', icon: Rocket, color: 'from-cyan-500 to-blue-500' },
    { id: 'battle', title: 'Battle Arena', subtitle: 'Join the fight', icon: Gamepad2, color: 'from-red-500 to-pink-500' },
    { id: 'shop', title: 'Starship Shop', subtitle: 'Upgrade your arsenal', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
    { id: 'friends', title: 'Squadron', subtitle: 'Team up with allies', icon: Users, color: 'from-purple-500 to-indigo-500' },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center overflow-hidden">
              {getAvatarDisplay()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{player.username}</h1>
              <p className="text-gray-400">Commander • {player.rank}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate('settings')}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <item.icon className="w-12 h-12 mb-4 text-gray-400 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Battle Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Gamepad2 className="w-6 h-6 mr-2 text-cyan-400" />
              Active Battles
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((battle) => (
                <div key={battle} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="font-semibold">Sector {battle} - Quick Match</div>
                      <div className="text-sm text-gray-400">4/6 players • 2 minutes remaining</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg transition-colors">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
              Leaderboard
            </h2>
            <div className="space-y-3">
              {[
                { name: 'StarLord', score: '2,450', rank: 1 },
                { name: 'VoidHunter', score: '2,310', rank: 2 },
                { name: 'CosmicAce', score: '2,180', rank: 3 },
                { name: player.username, score: '1,890', rank: 12 },
              ].map((entry, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${entry.name === player.username ? 'bg-cyan-900/30 border border-cyan-400/30' : 'bg-slate-700/30'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1 ? 'bg-yellow-400 text-black' :
                      entry.rank === 2 ? 'bg-gray-400 text-black' :
                      entry.rank === 3 ? 'bg-orange-400 text-black' :
                      'bg-slate-600 text-white'
                    }`}>
                      {entry.rank}
                    </div>
                    <span className={entry.name === player.username ? 'text-cyan-400 font-semibold' : ''}>{entry.name}</span>
                  </div>
                  <span className="text-gray-400">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-purple-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'Victory in Quick Match', time: '2 minutes ago', reward: '+125 Credits', color: 'text-green-400' },
              { action: 'Ship Upgrade Completed', time: '15 minutes ago', reward: 'Cruiser MK-II', color: 'text-blue-400' },
              { action: 'Daily Challenge Complete', time: '1 hour ago', reward: '+50 Credits', color: 'text-yellow-400' },
              { action: 'Joined Squadron "StarForce"', time: '2 hours ago', reward: 'Team Bonus Active', color: 'text-purple-400' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-400">{activity.time}</div>
                  </div>
                </div>
                <div className={`font-semibold ${activity.color}`}>
                  {activity.reward}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}