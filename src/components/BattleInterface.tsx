import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Shield, Zap, Target, Users, Clock, MessageCircle, Crosshair, Activity, AlertTriangle, Settings, Volume2, Pause, Play } from 'lucide-react';
import { Player } from '../types/game';

interface BattleInterfaceProps {
  player: Player;
  onBack: () => void;
}

interface PlayerShip {
  id: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  health: number;
  maxHealth: number;
  shields: number;
  maxShields: number;
  team: 'Alpha' | 'Beta';
  alive: boolean;
  velocity: { x: number; y: number };
  isPlayer: boolean;
}

interface Projectile {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  type: 'laser' | 'missile' | 'plasma';
  damage: number;
  speed: number;
  color: string;
}

interface Explosion {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: 'hit' | 'destruction' | 'shield';
}

export default function BattleInterface({ player, onBack }: BattleInterfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [battleTime, setBattleTime] = useState(300);
  const [isPaused, setIsPaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);
  
  // Player ship state
  const [playerShip, setPlayerShip] = useState<PlayerShip>({
    id: 'player',
    name: player.username,
    x: 400,
    y: 300,
    rotation: 0,
    health: 100,
    maxHealth: 100,
    shields: 100,
    maxShields: 100,
    team: 'Alpha',
    alive: true,
    velocity: { x: 0, y: 0 },
    isPlayer: true
  });

  // Enemy ships
  const [enemyShips, setEnemyShips] = useState<PlayerShip[]>([
    {
      id: 'enemy1',
      name: 'StarLord',
      x: 200,
      y: 150,
      rotation: 45,
      health: 85,
      maxHealth: 100,
      shields: 60,
      maxShields: 80,
      team: 'Alpha',
      alive: true,
      velocity: { x: 1, y: 0.5 },
      isPlayer: false
    },
    {
      id: 'enemy2',
      name: 'VoidHunter',
      x: 600,
      y: 450,
      rotation: 180,
      health: 0,
      maxHealth: 90,
      shields: 0,
      maxShields: 70,
      team: 'Beta',
      alive: false,
      velocity: { x: 0, y: 0 },
      isPlayer: false
    },
    {
      id: 'enemy3',
      name: 'CosmicAce',
      x: 700,
      y: 200,
      rotation: 270,
      health: 100,
      maxHealth: 120,
      shields: 90,
      maxShields: 100,
      team: 'Beta',
      alive: true,
      velocity: { x: -0.8, y: 1.2 },
      isPlayer: false
    }
  ]);

  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Weapon states
  const [weapons, setWeapons] = useState([
    { name: 'Pulse Laser', key: '1', cooldown: 0, maxCooldown: 1000, damage: 25, color: '#00ffff', type: 'laser' as const },
    { name: 'Plasma Cannon', key: '2', cooldown: 0, maxCooldown: 3000, damage: 45, color: '#ff00ff', type: 'plasma' as const },
    { name: 'Fusion Missile', key: '3', cooldown: 0, maxCooldown: 5000, damage: 80, color: '#ff4444', type: 'missile' as const },
  ]);

  // Combat stats
  const [combatStats, setCombatStats] = useState({
    kills: 0,
    deaths: 0,
    damageDealt: 0,
    damageTaken: 0,
    accuracy: 100,
    shotsHit: 0,
    shotsFired: 0
  });

  // Chat and kill feed
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'team', player: 'StarLord', message: 'Nice shot!', timestamp: Date.now() - 30000 },
    { type: 'team', player: player.username, message: 'Thanks, covering you', timestamp: Date.now() - 20000 },
    { type: 'all', player: 'CosmicAce', message: 'gg wp', timestamp: Date.now() - 10000 },
  ]);

  const [killFeed, setKillFeed] = useState([
    { killer: 'CosmicAce', victim: 'VoidHunter', weapon: 'Plasma Cannon', timestamp: Date.now() - 45000 },
    { killer: player.username, victim: 'NebulaPirate', weapon: 'Laser Burst', timestamp: Date.now() - 25000 },
    { killer: 'StarLord', victim: 'GalaxyRaider', weapon: 'Missile Strike', timestamp: Date.now() - 12000 },
  ]);

  // Game loop
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setBattleTime(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Weapon cooldowns
  useEffect(() => {
    const interval = setInterval(() => {
      setWeapons(prev => prev.map(weapon => ({
        ...weapon,
        cooldown: Math.max(0, weapon.cooldown - 50)
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (isPaused) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw starfield
      drawStarfield(ctx, canvas.width, canvas.height);

      // Update and draw projectiles
      updateProjectiles();
      drawProjectiles(ctx);

      // Update and draw explosions
      updateExplosions();
      drawExplosions(ctx);

      // Update enemy ships
      updateEnemyShips();

      // Draw ships
      drawShip(ctx, playerShip, true);
      enemyShips.forEach(ship => drawShip(ctx, ship, false));

      // Draw targeting system
      drawTargetingSystem(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, playerShip, enemyShips, projectiles, explosions, selectedTarget, mousePos]);

  const drawStarfield = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 100; i++) {
      const x = (i * 37) % width;
      const y = (i * 73) % height;
      const size = Math.sin(Date.now() * 0.001 + i) * 0.5 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawShip = (ctx: CanvasRenderingContext2D, ship: PlayerShip, isPlayer: boolean) => {
    if (!ship.alive) return;

    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate((ship.rotation * Math.PI) / 180);

    // Ship body
    const shipColor = ship.team === 'Alpha' ? '#00ff88' : '#ff4444';
    const shipSize = isPlayer ? 20 : 15;

    // Engine trail
    if (ship.velocity.x !== 0 || ship.velocity.y !== 0) {
      ctx.fillStyle = `rgba(0, 150, 255, ${0.3 + Math.sin(Date.now() * 0.01) * 0.2})`;
      ctx.fillRect(-shipSize - 10, -3, 8, 6);
    }

    // Ship hull
    ctx.fillStyle = shipColor;
    ctx.beginPath();
    ctx.moveTo(shipSize, 0);
    ctx.lineTo(-shipSize, -shipSize/2);
    ctx.lineTo(-shipSize/2, 0);
    ctx.lineTo(-shipSize, shipSize/2);
    ctx.closePath();
    ctx.fill();

    // Ship outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Shield effect
    if (ship.shields > 0) {
      ctx.strokeStyle = `rgba(0, 255, 255, ${ship.shields / ship.maxShields * 0.5})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, shipSize + 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();

    // Health and shield bars
    if (!isPlayer) {
      drawHealthBar(ctx, ship.x, ship.y - 30, ship.health, ship.maxHealth, ship.shields, ship.maxShields);
    }

    // Name tag
    ctx.fillStyle = ship.team === 'Alpha' ? '#00ff88' : '#ff4444';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(ship.name, ship.x, ship.y - 40);
  };

  const drawHealthBar = (ctx: CanvasRenderingContext2D, x: number, y: number, health: number, maxHealth: number, shields: number, maxShields: number) => {
    const barWidth = 40;
    const barHeight = 4;

    // Health bar background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - barWidth/2, y, barWidth, barHeight);

    // Health bar
    ctx.fillStyle = health > 50 ? '#00ff00' : health > 25 ? '#ffff00' : '#ff0000';
    ctx.fillRect(x - barWidth/2, y, (health / maxHealth) * barWidth, barHeight);

    // Shield bar
    if (maxShields > 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(x - barWidth/2, y - 6, barWidth, barHeight);
      
      ctx.fillStyle = '#00ffff';
      ctx.fillRect(x - barWidth/2, y - 6, (shields / maxShields) * barWidth, barHeight);
    }
  };

  const drawProjectiles = (ctx: CanvasRenderingContext2D) => {
    projectiles.forEach(projectile => {
      ctx.save();
      
      if (projectile.type === 'laser') {
        ctx.strokeStyle = projectile.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = projectile.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(projectile.x - 10, projectile.y);
        ctx.lineTo(projectile.x + 10, projectile.y);
        ctx.stroke();
      } else if (projectile.type === 'missile') {
        ctx.fillStyle = projectile.color;
        ctx.shadowColor = projectile.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Missile trail
        ctx.fillStyle = 'rgba(255, 100, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(projectile.x - 8, projectile.y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (projectile.type === 'plasma') {
        ctx.fillStyle = projectile.color;
        ctx.shadowColor = projectile.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Plasma glow
        ctx.fillStyle = `rgba(255, 0, 255, 0.3)`;
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  };

  const drawExplosions = (ctx: CanvasRenderingContext2D) => {
    explosions.forEach(explosion => {
      ctx.save();
      ctx.globalAlpha = explosion.opacity;
      
      if (explosion.type === 'hit') {
        ctx.fillStyle = '#ffff00';
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 20;
      } else if (explosion.type === 'destruction') {
        ctx.fillStyle = '#ff4444';
        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 30;
      } else {
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
      }
      
      ctx.beginPath();
      ctx.arc(explosion.x, explosion.y, explosion.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  };

  const drawTargetingSystem = (ctx: CanvasRenderingContext2D) => {
    if (selectedTarget) {
      const target = enemyShips.find(ship => ship.id === selectedTarget);
      if (target && target.alive) {
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(target.x, target.y, 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Crosshair at mouse position
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mousePos.x - 10, mousePos.y);
    ctx.lineTo(mousePos.x + 10, mousePos.y);
    ctx.moveTo(mousePos.x, mousePos.y - 10);
    ctx.lineTo(mousePos.x, mousePos.y + 10);
    ctx.stroke();
  };

  const updateProjectiles = () => {
    setProjectiles(prev => {
      const updated = prev.map(projectile => {
        const dx = projectile.targetX - projectile.x;
        const dy = projectile.targetY - projectile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < projectile.speed) {
          // Hit target
          createExplosion(projectile.targetX, projectile.targetY, 'hit');
          return null;
        }
        
        const moveX = (dx / distance) * projectile.speed;
        const moveY = (dy / distance) * projectile.speed;
        
        return {
          ...projectile,
          x: projectile.x + moveX,
          y: projectile.y + moveY
        };
      }).filter(Boolean) as Projectile[];
      
      return updated;
    });
  };

  const updateExplosions = () => {
    setExplosions(prev => {
      return prev.map(explosion => ({
        ...explosion,
        size: explosion.size + 2,
        opacity: explosion.opacity - 0.05
      })).filter(explosion => explosion.opacity > 0);
    });
  };

  const updateEnemyShips = () => {
    setEnemyShips(prev => prev.map(ship => {
      if (!ship.alive) return ship;
      
      // Simple AI movement
      const newX = ship.x + ship.velocity.x * gameSpeed;
      const newY = ship.y + ship.velocity.y * gameSpeed;
      
      // Bounce off walls
      let newVelX = ship.velocity.x;
      let newVelY = ship.velocity.y;
      
      if (newX < 50 || newX > 750) newVelX = -newVelX;
      if (newY < 50 || newY > 550) newVelY = -newVelY;
      
      return {
        ...ship,
        x: Math.max(50, Math.min(750, newX)),
        y: Math.max(50, Math.min(550, newY)),
        velocity: { x: newVelX, y: newVelY },
        rotation: ship.rotation + 1
      };
    }));
  };

  const createExplosion = (x: number, y: number, type: 'hit' | 'destruction' | 'shield') => {
    const explosion: Explosion = {
      id: Date.now().toString(),
      x,
      y,
      size: type === 'destruction' ? 20 : 10,
      opacity: 1,
      type
    };
    setExplosions(prev => [...prev, explosion]);
  };

  const fireWeapon = (weaponIndex: number, targetX: number, targetY: number) => {
    const weapon = weapons[weaponIndex];
    if (weapon.cooldown > 0) return;

    const projectile: Projectile = {
      id: Date.now().toString(),
      x: playerShip.x,
      y: playerShip.y,
      targetX,
      targetY,
      type: weapon.type,
      damage: weapon.damage,
      speed: weapon.type === 'missile' ? 3 : weapon.type === 'laser' ? 8 : 5,
      color: weapon.color
    };

    setProjectiles(prev => [...prev, projectile]);
    setWeapons(prev => prev.map((w, i) => 
      i === weaponIndex ? { ...w, cooldown: w.maxCooldown } : w
    ));

    setCombatStats(prev => ({
      ...prev,
      shotsFired: prev.shotsFired + 1
    }));
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if clicking on an enemy ship
    const clickedShip = enemyShips.find(ship => {
      const distance = Math.sqrt((ship.x - x) ** 2 + (ship.y - y) ** 2);
      return distance < 25 && ship.alive;
    });

    if (clickedShip) {
      setSelectedTarget(clickedShip.id);
    } else {
      // Fire primary weapon at click location
      fireWeapon(0, x, y);
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const key = event.key;
    const weaponIndex = parseInt(key) - 1;
    
    if (weaponIndex >= 0 && weaponIndex < weapons.length && selectedTarget) {
      const target = enemyShips.find(ship => ship.id === selectedTarget);
      if (target && target.alive) {
        fireWeapon(weaponIndex, target.x, target.y);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory(prev => [...prev, {
        type: 'team',
        player: player.username,
        message: chatMessage,
        timestamp: Date.now()
      }]);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white relative overflow-hidden" onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Enhanced Battle HUD */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-start">
          {/* Top Left - Enhanced Player Status */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700 min-w-[300px]">
            <div className="flex items-center space-x-4 mb-3">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">Hull Integrity</div>
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-300"
                    style={{ width: `${playerShip.health}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {playerShip.health}/{playerShip.maxHealth}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">Shield Status</div>
                <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${playerShip.shields}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {playerShip.shields}/{playerShip.maxShields}
                  </div>
                </div>
              </div>
            </div>

            {/* Combat Stats */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="text-center">
                <div className="text-green-400 font-bold">{combatStats.damageDealt}</div>
                <div className="text-gray-400">DMG</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold">{combatStats.accuracy}%</div>
                <div className="text-gray-400">ACC</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold">{combatStats.shotsHit}/{combatStats.shotsFired}</div>
                <div className="text-gray-400">HITS</div>
              </div>
            </div>
          </div>

          {/* Top Center - Enhanced Battle Info */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">{formatTime(battleTime)}</div>
            <div className="text-sm text-gray-400 mb-2">Sector 7 - Quick Match</div>
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="text-green-400 font-semibold">Alpha: 12</div>
              <div className="text-red-400 font-semibold">Beta: 8</div>
            </div>
            
            {/* Battle Controls */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Top Right - Enhanced Player Stats */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
            <div className="flex space-x-6 text-center mb-3">
              <div>
                <div className="text-2xl font-bold text-green-400">{combatStats.kills}</div>
                <div className="text-xs text-gray-400">KILLS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{combatStats.deaths}</div>
                <div className="text-xs text-gray-400">DEATHS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {combatStats.deaths > 0 ? (combatStats.kills / combatStats.deaths).toFixed(1) : combatStats.kills}
                </div>
                <div className="text-xs text-gray-400">K/D</div>
              </div>
            </div>
            
            {/* Performance Indicators */}
            <div className="flex items-center justify-center space-x-2 text-xs">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Battle Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-slate-700 rounded-lg bg-slate-900/50 cursor-crosshair"
        style={{ zIndex: 10 }}
      />

      {/* Enhanced Radar/Mini Map */}
      <div className="absolute bottom-4 right-4 w-56 h-40 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-3">
        <div className="text-xs text-gray-400 mb-2 flex items-center justify-between">
          <span>TACTICAL RADAR</span>
          <Target className="w-3 h-3" />
        </div>
        <div className="relative w-full h-full bg-slate-800 rounded overflow-hidden">
          {/* Radar sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse"></div>
          
          {/* Player ship */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          
          {/* Enemy ships */}
          {enemyShips.map(ship => (
            <div
              key={ship.id}
              className={`absolute w-2 h-2 rounded-full ${
                ship.alive 
                  ? ship.team === 'Alpha' ? 'bg-green-400' : 'bg-red-400'
                  : 'bg-gray-600'
              }`}
              style={{
                left: `${(ship.x / 800) * 100}%`,
                top: `${(ship.y / 600) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          ))}
          
          {/* Radar grid */}
          <div className="absolute inset-0 border border-green-400/30"></div>
          <div className="absolute top-1/2 left-0 right-0 border-t border-green-400/20"></div>
          <div className="absolute top-0 bottom-0 left-1/2 border-l border-green-400/20"></div>
        </div>
      </div>

      {/* Enhanced Weapon Loadout */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {weapons.map((weapon, index) => (
          <div key={index} className="relative">
            <button 
              onClick={() => selectedTarget && fireWeapon(index, 0, 0)}
              disabled={weapon.cooldown > 0}
              className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                weapon.cooldown > 0 
                  ? 'bg-slate-800 border-slate-600 cursor-not-allowed' 
                  : 'bg-slate-700 border-slate-500 hover:border-cyan-400 hover:bg-slate-600'
              }`}
            >
              <Zap className="w-6 h-6 mb-1" style={{ color: weapon.color }} />
              <span className="text-xs font-bold">{weapon.key}</span>
              <span className="text-xs text-gray-400">{weapon.damage}</span>
            </button>
            
            {weapon.cooldown > 0 && (
              <div className="absolute inset-0 bg-slate-900/70 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-red-400">
                    {Math.ceil(weapon.cooldown / 1000)}s
                  </div>
                  <div className="w-12 h-1 bg-slate-700 rounded-full mt-1">
                    <div 
                      className="h-full bg-red-400 rounded-full transition-all duration-100"
                      style={{ width: `${((weapon.maxCooldown - weapon.cooldown) / weapon.maxCooldown) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Scoreboard */}
      <div className="absolute top-24 right-4 w-72 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="text-sm font-semibold mb-3 flex items-center justify-between">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            PLAYERS
          </span>
          <span className="text-xs text-gray-400">4/6</span>
        </div>
        <div className="space-y-2">
          {[playerShip, ...enemyShips].map((ship, index) => (
            <div 
              key={ship.id} 
              className={`flex items-center justify-between text-xs p-2 rounded cursor-pointer transition-colors ${
                ship.team === 'Alpha' ? 'bg-green-900/30 hover:bg-green-900/50' : 'bg-red-900/30 hover:bg-red-900/50'
              } ${selectedTarget === ship.id ? 'ring-2 ring-cyan-400' : ''}`}
              onClick={() => ship.id !== 'player' && setSelectedTarget(ship.id)}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${ship.alive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className={ship.isPlayer ? 'text-cyan-400 font-semibold' : ''}>{ship.name}</span>
                {selectedTarget === ship.id && <Crosshair className="w-3 h-3 text-red-400" />}
              </div>
              <div className="flex items-center space-x-2">
                <span>{ship.isPlayer ? combatStats.kills : Math.floor(Math.random() * 5)}/0</span>
                <div className="w-8 h-1 bg-slate-700 rounded-full">
                  <div 
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${(ship.health / ship.maxHealth) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Kill Feed */}
      <div className="absolute top-24 left-4 w-80 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="text-sm font-semibold mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2 text-red-400" />
          KILL FEED
        </div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {killFeed.map((kill, index) => (
            <div key={index} className="text-xs p-2 bg-slate-800/50 rounded flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-red-400 font-semibold">{kill.killer}</span>
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-gray-300">{kill.victim}</span>
              </div>
              <span className="text-gray-500">{Math.floor((Date.now() - kill.timestamp) / 1000)}s</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Chat */}
      <div className="absolute bottom-4 left-4 w-80 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4">
        <div className="text-sm font-semibold mb-3 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          TEAM CHAT
        </div>
        <div className="h-24 mb-3 overflow-y-auto text-xs space-y-1">
          {chatHistory.map((msg, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className={`text-xs font-semibold ${
                msg.type === 'team' ? 'text-green-400' : 'text-cyan-400'
              }`}>
                [{msg.type.toUpperCase()}]
              </span>
              <span className="text-white font-semibold">{msg.player}:</span>
              <span className="text-gray-300">{msg.message}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
            placeholder="Type message..."
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-sm focus:outline-none focus:border-cyan-400"
          />
          <button 
            onClick={sendChatMessage}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded text-sm font-semibold transition-colors"
          >
            Send
          </button>
        </div>
      </div>

      {/* Battle Instructions */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 w-64">
        <div className="text-sm font-semibold mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
          CONTROLS
        </div>
        <div className="text-xs space-y-2 text-gray-300">
          <div>• Click enemies to target them</div>
          <div>• Click empty space to fire primary weapon</div>
          <div>• Press 1, 2, 3 to fire weapons at selected target</div>
          <div>• Red outline = selected target</div>
          <div>• Watch weapon cooldowns</div>
          <div>• Use radar to track enemies</div>
        </div>
      </div>

      {/* Game Paused Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 rounded-xl p-8 border border-slate-700 text-center">
            <Pause className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-2xl font-bold mb-4">Battle Paused</h2>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-semibold transition-colors"
            >
              Resume Battle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}