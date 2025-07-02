import React, { useState } from 'react';
import { ArrowLeft, Shield, Smartphone, Key, Eye, Clock, MapPin, Monitor, Globe, Users, Lock } from 'lucide-react';
import { Player, SecurityLog } from '../types/game';

interface SecuritySettingsProps {
  player: Player;
  onBack: () => void;
  onUpdateSecurity: (settings: any) => void;
}

export default function SecuritySettings({ player, onBack, onUpdateSecurity }: SecuritySettingsProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(player.twoFactorEnabled || false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [profileVisibility, setProfileVisibility] = useState('everyone');
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [battleHistory, setBattleHistory] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);

  const securityLogs: SecurityLog[] = [
    {
      id: '1',
      action: 'Login via Google',
      timestamp: '2024-01-15 14:30:22',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows 11',
      location: 'New York, USA',
      success: true
    },
    {
      id: '2',
      action: 'Password Change',
      timestamp: '2024-01-14 09:15:45',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows 11',
      location: 'New York, USA',
      success: true
    },
    {
      id: '3',
      action: 'Failed Login Attempt',
      timestamp: '2024-01-13 22:45:12',
      ipAddress: '203.0.113.45',
      device: 'Unknown Browser',
      location: 'Moscow, Russia',
      success: false
    },
    {
      id: '4',
      action: 'Avatar Update',
      timestamp: '2024-01-12 16:20:33',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows 11',
      location: 'New York, USA',
      success: true
    },
    {
      id: '5',
      action: 'Login via Facebook',
      timestamp: '2024-01-11 11:22:15',
      ipAddress: '192.168.1.100',
      device: 'Firefox on Windows 11',
      location: 'New York, USA',
      success: true
    },
    {
      id: '6',
      action: 'Account Settings Modified',
      timestamp: '2024-01-10 08:45:30',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows 11',
      location: 'New York, USA',
      success: true
    }
  ];

  const connectedAccounts = [
    {
      provider: 'Google',
      email: 'commander@gmail.com',
      connected: true,
      lastUsed: '2024-01-15 14:30:22'
    },
    {
      provider: 'Facebook',
      email: 'commander@facebook.com',
      connected: true,
      lastUsed: '2024-01-11 11:22:15'
    }
  ];

  const handleEnable2FA = () => {
    setShowQRCode(true);
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowQRCode(false);
      onUpdateSecurity({ twoFactorEnabled: true });
    }
  };

  const handleDisable2FA = () => {
    if (window.confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      setTwoFactorEnabled(false);
      onUpdateSecurity({ twoFactorEnabled: false });
    }
  };

  const handleDisconnectAccount = (provider: string) => {
    if (window.confirm(`Are you sure you want to disconnect your ${provider} account?`)) {
      // Handle disconnection logic here
      console.log(`Disconnecting ${provider} account`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 p-6">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Shield className="w-8 h-8 mr-3 text-blue-400" />
              Security & Privacy Settings
            </h1>
            <p className="text-gray-400">Protect your account with advanced security features</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Security Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connected Accounts */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-green-400" />
                Connected Accounts
              </h2>
              
              <div className="space-y-4">
                {connectedAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        account.provider === 'Google' ? 'bg-white' : 'bg-[#1877F2]'
                      }`}>
                        {account.provider === 'Google' ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{account.provider}</div>
                        <div className="text-sm text-gray-400">{account.email}</div>
                        <div className="text-xs text-gray-500">Last used: {account.lastUsed}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-semibold">
                        Connected
                      </span>
                      <button
                        onClick={() => handleDisconnectAccount(account.provider)}
                        className="px-3 py-1 border border-red-500 text-red-400 rounded text-sm hover:bg-red-900/20 transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-green-400" />
                Two-Factor Authentication
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Authenticator App</div>
                    <div className="text-sm text-gray-400">
                      {twoFactorEnabled ? 'Enabled - Your account is protected' : 'Add an extra layer of security'}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    twoFactorEnabled ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>

                {!twoFactorEnabled && !showQRCode && (
                  <button
                    onClick={handleEnable2FA}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Enable Two-Factor Authentication
                  </button>
                )}

                {showQRCode && (
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4">Setup Authenticator App</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg w-48 h-48 mx-auto flex items-center justify-center">
                        <div className="text-black text-center">
                          <div className="text-xs mb-2">QR Code</div>
                          <div className="w-32 h-32 bg-gray-200 rounded border-2 border-dashed border-gray-400 flex items-center justify-center">
                            QR
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400 text-center">
                        Scan this QR code with your authenticator app
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Enter verification code
                        </label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="000000"
                          maxLength={6}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all text-center text-lg font-mono"
                        />
                      </div>
                      <button
                        onClick={handleVerify2FA}
                        disabled={verificationCode.length !== 6}
                        className="w-full py-3 px-4 bg-green-500 hover:bg-green-400 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                      >
                        Verify and Enable
                      </button>
                    </div>
                  </div>
                )}

                {twoFactorEnabled && (
                  <button
                    onClick={handleDisable2FA}
                    className="w-full py-3 px-4 border border-red-500 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors"
                  >
                    Disable Two-Factor Authentication
                  </button>
                )}
              </div>
            </div>

            {/* Password Security */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-yellow-400" />
                Password Security
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Password Strength</div>
                    <div className="text-sm text-gray-400">Last changed 7 days ago</div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold bg-green-900/30 text-green-400">
                    Strong
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                    Change Password
                  </button>
                  <button className="py-3 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Privacy Settings */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-400" />
                Privacy Settings
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      Profile Visibility
                    </div>
                    <div className="text-sm text-gray-400">Who can see your profile and stats</div>
                  </div>
                  <select 
                    value={profileVisibility}
                    onChange={(e) => setProfileVisibility(e.target.value)}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-400"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-green-400" />
                      Online Status
                    </div>
                    <div className="text-sm text-gray-400">Show when you're online</div>
                  </div>
                  <button 
                    onClick={() => setOnlineStatus(!onlineStatus)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      onlineStatus ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      onlineStatus ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold flex items-center">
                      <Monitor className="w-4 h-4 mr-2 text-cyan-400" />
                      Battle History
                    </div>
                    <div className="text-sm text-gray-400">Allow others to view your battle history</div>
                  </div>
                  <button 
                    onClick={() => setBattleHistory(!battleHistory)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      battleHistory ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      battleHistory ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold flex items-center">
                      <Users className="w-4 h-4 mr-2 text-yellow-400" />
                      Friend Requests
                    </div>
                    <div className="text-sm text-gray-400">Allow others to send friend requests</div>
                  </div>
                  <button 
                    onClick={() => setFriendRequests(!friendRequests)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      friendRequests ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      friendRequests ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Lock className="w-4 h-4 mr-2 text-red-400" />
                    Data Protection
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="py-2 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm">
                      Download My Data
                    </button>
                    <button className="py-2 px-4 border border-red-600 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status & Activity */}
          <div className="space-y-6">
            {/* Security Score */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4">Security Score</h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-400 mb-2">92/100</div>
                <div className="text-sm text-gray-400">Excellent Security</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Strong Password</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Two-Factor Auth</span>
                  <span className={twoFactorEnabled ? 'text-green-400' : 'text-red-400'}>
                    {twoFactorEnabled ? '✓' : '✗'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Email Verified</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Social Accounts</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Recent Activity</span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {securityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 text-sm">
                    <div className={`w-2 h-2 rounded-full mt-2 ${log.success ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{log.action}</div>
                      <div className="text-gray-400 text-xs">{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 px-4 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm">
                View Full Activity Log
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Login History */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
            Detailed Login History
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">IP Address</th>
                  <th className="text-left py-3 px-4">Device & Browser</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {securityLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-800 hover:bg-slate-700/30">
                    <td className="py-3 px-4 font-medium">{log.action}</td>
                    <td className="py-3 px-4 text-gray-400">{log.timestamp}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-gray-400">{log.device}</td>
                    <td className="py-3 px-4 text-gray-400 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {log.location}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.success 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {log.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}