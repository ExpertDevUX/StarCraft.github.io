import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Camera, User, Star, Shield, Rocket, Crown, Zap, Target } from 'lucide-react';
import { Player } from '../types/game';

interface AvatarCustomizationProps {
  player: Player;
  onBack: () => void;
  onUpdateAvatar: (avatar: string, type: 'preset' | 'uploaded') => void;
}

export default function AvatarCustomization({ player, onBack, onUpdateAvatar }: AvatarCustomizationProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload'>('presets');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetAvatars = [
    { id: 'commander1', icon: User, color: 'from-blue-500 to-cyan-500', name: 'Space Commander' },
    { id: 'pilot1', icon: Rocket, color: 'from-green-500 to-emerald-500', name: 'Ace Pilot' },
    { id: 'admiral1', icon: Crown, color: 'from-yellow-500 to-orange-500', name: 'Fleet Admiral' },
    { id: 'warrior1', icon: Shield, color: 'from-red-500 to-pink-500', name: 'Battle Warrior' },
    { id: 'sniper1', icon: Target, color: 'from-purple-500 to-indigo-500', name: 'Precision Sniper' },
    { id: 'elite1', icon: Star, color: 'from-cyan-500 to-blue-500', name: 'Elite Officer' },
    { id: 'storm1', icon: Zap, color: 'from-pink-500 to-purple-500', name: 'Storm Trooper' },
    { id: 'guardian1', icon: Shield, color: 'from-emerald-500 to-green-500', name: 'Guardian' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setSelectedPreset(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (activeTab === 'presets' && selectedPreset) {
      onUpdateAvatar(selectedPreset, 'preset');
    } else if (activeTab === 'upload' && uploadedImage) {
      onUpdateAvatar(uploadedImage, 'uploaded');
    }
  };

  const getCurrentAvatar = () => {
    if (activeTab === 'presets' && selectedPreset) {
      const preset = presetAvatars.find(p => p.id === selectedPreset);
      return preset;
    }
    if (activeTab === 'upload' && uploadedImage) {
      return { image: uploadedImage };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
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
              <Camera className="w-8 h-8 mr-3 text-purple-400" />
              Avatar Customization
            </h1>
            <p className="text-gray-400">Personalize your commander profile</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Preview */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 text-center">Preview</h2>
            
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-400/30">
                {getCurrentAvatar() ? (
                  activeTab === 'presets' && selectedPreset ? (
                    <div className={`w-full h-full bg-gradient-to-r ${getCurrentAvatar()?.color} flex items-center justify-center`}>
                      {React.createElement(getCurrentAvatar()?.icon as any, { className: "w-16 h-16 text-white" })}
                    </div>
                  ) : (
                    <img 
                      src={uploadedImage || ''} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold">{player.username}</h3>
              <p className="text-gray-400">{player.rank}</p>
            </div>

            <button
              onClick={handleSaveAvatar}
              disabled={!getCurrentAvatar()}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                getCurrentAvatar()
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-400/25'
                  : 'bg-slate-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save Avatar
            </button>
          </div>

          {/* Avatar Options */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 p-1 bg-slate-700/50 rounded-xl">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === 'presets'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-600'
                }`}
              >
                Preset Avatars
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-600'
                }`}
              >
                Upload Image
              </button>
            </div>

            {/* Preset Avatars */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {presetAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedPreset(avatar.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:transform hover:scale-105 ${
                      selectedPreset === avatar.id
                        ? 'border-purple-400 bg-purple-900/30'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${avatar.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <avatar.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-medium text-center">{avatar.name}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Upload Section */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Upload Your Avatar</h3>
                  <p className="text-gray-400 mb-4">Click to select an image file</p>
                  <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {uploadedImage && (
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Uploaded Image Preview</h4>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded avatar" 
                        className="w-20 h-20 rounded-full object-cover border-2 border-purple-400/30"
                      />
                      <div>
                        <p className="text-green-400 font-semibold">Image uploaded successfully!</p>
                        <p className="text-sm text-gray-400">Click "Save Avatar" to apply changes</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-400" />
                    Image Guidelines
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Use a square image for best results</li>
                    <li>• Minimum resolution: 200x200 pixels</li>
                    <li>• Keep file size under 5MB</li>
                    <li>• Avoid inappropriate content</li>
                    <li>• Images are automatically moderated</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Avatar History */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold mb-4">Recent Avatars</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {presetAvatars.slice(0, 6).map((avatar) => (
              <button
                key={`recent-${avatar.id}`}
                onClick={() => {
                  setActiveTab('presets');
                  setSelectedPreset(avatar.id);
                }}
                className="flex-shrink-0 p-2 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${avatar.color} rounded-full flex items-center justify-center`}>
                  <avatar.icon className="w-6 h-6 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}