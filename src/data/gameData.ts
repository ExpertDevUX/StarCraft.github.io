import { Ship, Weapon, Player } from '../types/game';

export const mockPlayer: Player = {
  id: '1',
  username: 'SpaceCommander',
  email: 'commander@starfleet.com',
  level: 15,
  credits: 25000,
  wins: 42,
  losses: 18,
  rank: 'Admiral',
  avatar: 'commander1',
  avatarType: 'preset',
  twoFactorEnabled: false,
  lastLogin: '2024-01-15 14:30:22',
  accountCreated: '2023-06-15 10:00:00'
};

export const mockShips: Ship[] = [
  {
    id: '1',
    name: 'Phoenix Fighter',
    class: 'Fighter',
    health: 100,
    maxHealth: 100,
    shields: 50,
    maxShields: 50,
    speed: 85,
    firepower: 60,
    price: 5000,
    owned: true,
    equipped: true,
    image: 'phoenix-fighter.jpg'
  },
  {
    id: '2',
    name: 'Viper Interceptor',
    class: 'Fighter',
    health: 90,
    maxHealth: 90,
    shields: 40,
    maxShields: 40,
    speed: 95,
    firepower: 70,
    price: 7500,
    owned: true,
    equipped: false,
    image: 'viper-interceptor.jpg'
  },
  {
    id: '3',
    name: 'Nova Cruiser',
    class: 'Cruiser',
    health: 200,
    maxHealth: 200,
    shields: 120,
    maxShields: 120,
    speed: 60,
    firepower: 85,
    price: 15000,
    owned: true,
    equipped: false,
    image: 'nova-cruiser.jpg'
  },
  {
    id: '4',
    name: 'Titan Battleship',
    class: 'Battleship',
    health: 350,
    maxHealth: 350,
    shields: 200,
    maxShields: 200,
    speed: 35,
    firepower: 120,
    price: 35000,
    owned: false,
    equipped: false,
    image: 'titan-battleship.jpg'
  },
  {
    id: '5',
    name: 'Stealth Phantom',
    class: 'Fighter',
    health: 80,
    maxHealth: 80,
    shields: 60,
    maxShields: 60,
    speed: 90,
    firepower: 75,
    price: 12000,
    owned: false,
    equipped: false,
    image: 'stealth-phantom.jpg'
  },
  {
    id: '6',
    name: 'Storm Cruiser',
    class: 'Cruiser',
    health: 250,
    maxHealth: 250,
    shields: 150,
    maxShields: 150,
    speed: 55,
    firepower: 95,
    price: 22000,
    owned: false,
    equipped: false,
    image: 'storm-cruiser.jpg'
  }
];

export const mockWeapons: Weapon[] = [
  {
    id: '1',
    name: 'Pulse Laser',
    type: 'Laser',
    damage: 25,
    cooldown: 1,
    price: 2000,
    owned: true,
    equipped: true
  },
  {
    id: '2',
    name: 'Plasma Cannon',
    type: 'Plasma',
    damage: 45,
    cooldown: 3,
    price: 5000,
    owned: true,
    equipped: false
  },
  {
    id: '3',
    name: 'Fusion Missile',
    type: 'Missile',
    damage: 80,
    cooldown: 5,
    price: 8000,
    owned: false,
    equipped: false
  },
  {
    id: '4',
    name: 'Ion Beam',
    type: 'Laser',
    damage: 35,
    cooldown: 2,
    price: 3500,
    owned: false,
    equipped: false
  },
  {
    id: '5',
    name: 'Quantum Torpedo',
    type: 'Missile',
    damage: 120,
    cooldown: 8,
    price: 15000,
    owned: false,
    equipped: false
  },
  {
    id: '6',
    name: 'Plasma Storm',
    type: 'Plasma',
    damage: 65,
    cooldown: 4,
    price: 10000,
    owned: false,
    equipped: false
  }
];