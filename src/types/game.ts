export interface Player {
  id: string;
  username: string;
  email?: string;
  level: number;
  credits: number;
  wins: number;
  losses: number;
  rank: string;
  avatar?: string;
  avatarType?: 'preset' | 'uploaded';
  twoFactorEnabled?: boolean;
  lastLogin?: string;
  accountCreated?: string;
}

export interface Ship {
  id: string;
  name: string;
  class: 'Fighter' | 'Cruiser' | 'Battleship';
  health: number;
  maxHealth: number;
  shields: number;
  maxShields: number;
  speed: number;
  firepower: number;
  price: number;
  owned: boolean;
  equipped: boolean;
  image: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: 'Laser' | 'Missile' | 'Plasma';
  damage: number;
  cooldown: number;
  price: number;
  owned: boolean;
  equipped: boolean;
}

export interface Battle {
  id: string;
  mode: 'Quick Match' | 'Private' | 'Tournament';
  players: Player[];
  status: 'Waiting' | 'In Progress' | 'Completed';
  duration: number;
  map: string;
}

export interface GameState {
  currentView: 'landing' | 'login' | 'register' | 'dashboard' | 'hangar' | 'battle' | 'shop' | 'settings' | 'recharge' | 'avatar' | 'security';
  player: Player | null;
  isAuthenticated: boolean;
  ships: Ship[];
  weapons: Weapon[];
  battles: Battle[];
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus?: number;
  popular?: boolean;
}

export interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
  success: boolean;
}