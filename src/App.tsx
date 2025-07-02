import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import ShipHangar from './components/ShipHangar';
import BattleInterface from './components/BattleInterface';
import Shop from './components/Shop';
import SettingsPage from './components/SettingsPage';
import CreditRechargePage from './components/CreditRechargePage';
import AvatarCustomization from './components/AvatarCustomization';
import SecuritySettings from './components/SecuritySettings';
import { GameState, Ship, Weapon } from './types/game';
import { mockPlayer, mockShips, mockWeapons } from './data/gameData';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentView: 'landing',
    player: null,
    isAuthenticated: false,
    ships: mockShips,
    weapons: mockWeapons,
    battles: []
  });

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    const authenticatedPlayer = {
      ...mockPlayer,
      email: email
    };
    
    setGameState(prev => ({
      ...prev,
      player: authenticatedPlayer,
      isAuthenticated: true,
      currentView: 'dashboard'
    }));
  };

  const handleRegister = (username: string, email: string, password: string) => {
    // In a real app, this would create a new user account
    const newPlayer = {
      ...mockPlayer,
      username: username,
      email: email,
      credits: 10000 // Starting credits for new players
    };
    
    setGameState(prev => ({
      ...prev,
      player: newPlayer,
      isAuthenticated: true,
      currentView: 'dashboard'
    }));
  };

  const handleGuestPlay = () => {
    const guestPlayer = {
      ...mockPlayer,
      username: 'Guest_' + Math.floor(Math.random() * 1000),
      email: undefined,
      credits: 5000 // Limited credits for guests
    };
    setGameState(prev => ({
      ...prev,
      player: guestPlayer,
      isAuthenticated: false,
      currentView: 'dashboard'
    }));
  };

  const handleLogout = () => {
    setGameState(prev => ({
      ...prev,
      player: null,
      isAuthenticated: false,
      currentView: 'landing'
    }));
  };

  const handleNavigate = (view: string) => {
    setGameState(prev => ({
      ...prev,
      currentView: view as any
    }));
  };

  const handleSelectShip = (ship: Ship) => {
    setGameState(prev => ({
      ...prev,
      ships: prev.ships.map(s => ({
        ...s,
        equipped: s.id === ship.id
      }))
    }));
  };

  const handlePurchase = (item: Ship | Weapon) => {
    if (!gameState.player || gameState.player.credits < item.price) return;

    setGameState(prev => ({
      ...prev,
      player: prev.player ? {
        ...prev.player,
        credits: prev.player.credits - item.price
      } : prev.player,
      ships: 'class' in item ? prev.ships.map(s => 
        s.id === item.id ? { ...s, owned: true } : s
      ) : prev.ships,
      weapons: 'type' in item ? prev.weapons.map(w => 
        w.id === item.id ? { ...w, owned: true } : w
      ) : prev.weapons
    }));
  };

  const handleCreditPurchase = (packageId: string) => {
    // Credit packages mapping
    const creditPackages = {
      'starter': 5000,
      'popular': 14000, // 12000 + 2000 bonus
      'value': 30000,   // 25000 + 5000 bonus
      'premium': 65000, // 50000 + 15000 bonus
      'ultimate': 135000 // 100000 + 35000 bonus
    };

    const creditsToAdd = creditPackages[packageId as keyof typeof creditPackages] || 0;

    if (creditsToAdd > 0 && gameState.player) {
      setGameState(prev => ({
        ...prev,
        player: prev.player ? {
          ...prev.player,
          credits: prev.player.credits + creditsToAdd
        } : prev.player,
        currentView: 'dashboard' // Return to dashboard after purchase
      }));
    }
  };

  const handleUpdateAvatar = (avatar: string, type: 'preset' | 'uploaded') => {
    setGameState(prev => ({
      ...prev,
      player: prev.player ? {
        ...prev.player,
        avatar: avatar,
        avatarType: type
      } : prev.player,
      currentView: 'settings'
    }));
  };

  const handleUpdateSecurity = (settings: any) => {
    setGameState(prev => ({
      ...prev,
      player: prev.player ? {
        ...prev.player,
        ...settings
      } : prev.player
    }));
  };

  const handleBack = () => {
    setGameState(prev => ({
      ...prev,
      currentView: 'dashboard'
    }));
  };

  // Landing page flow
  if (gameState.currentView === 'landing') {
    return (
      <LandingPage
        onLogin={() => handleNavigate('login')}
        onRegister={() => handleNavigate('register')}
        onGuestPlay={handleGuestPlay}
      />
    );
  }

  // Authentication pages
  if (gameState.currentView === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={() => handleNavigate('landing')}
        onSwitchToRegister={() => handleNavigate('register')}
        onGuestPlay={handleGuestPlay}
      />
    );
  }

  if (gameState.currentView === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onBack={() => handleNavigate('landing')}
        onSwitchToLogin={() => handleNavigate('login')}
        onGuestPlay={handleGuestPlay}
      />
    );
  }

  // Require player for all other views
  if (!gameState.player) return null;

  // Main application views
  switch (gameState.currentView) {
    case 'dashboard':
      return (
        <Dashboard
          player={gameState.player}
          onNavigate={handleNavigate}
        />
      );
    case 'hangar':
      return (
        <ShipHangar
          ships={gameState.ships}
          onBack={handleBack}
          onSelectShip={handleSelectShip}
        />
      );
    case 'battle':
      return (
        <BattleInterface
          player={gameState.player}
          onBack={handleBack}
        />
      );
    case 'shop':
      return (
        <Shop
          ships={gameState.ships}
          weapons={gameState.weapons}
          playerCredits={gameState.player.credits}
          onBack={handleBack}
          onPurchase={handlePurchase}
        />
      );
    case 'settings':
      return (
        <SettingsPage
          player={gameState.player}
          onBack={handleBack}
          onLogout={handleLogout}
          onRecharge={() => handleNavigate('recharge')}
          onNavigate={handleNavigate}
        />
      );
    case 'recharge':
      return (
        <CreditRechargePage
          onBack={handleBack}
          onPurchase={handleCreditPurchase}
          playerCredits={gameState.player.credits}
        />
      );
    case 'avatar':
      return (
        <AvatarCustomization
          player={gameState.player}
          onBack={() => handleNavigate('settings')}
          onUpdateAvatar={handleUpdateAvatar}
        />
      );
    case 'security':
      return (
        <SecuritySettings
          player={gameState.player}
          onBack={() => handleNavigate('settings')}
          onUpdateSecurity={handleUpdateSecurity}
        />
      );
    default:
      return (
        <Dashboard
          player={gameState.player}
          onNavigate={handleNavigate}
        />
      );
  }
}

export default App;