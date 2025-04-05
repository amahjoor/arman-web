'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Navbar from '@/components/Navbar';
import { FaHome, FaCode, FaReact, FaNodeJs, FaJs, FaCodeBranch, FaDatabase, FaGamepad } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript } from 'react-icons/si';
import { GiSnake } from 'react-icons/gi';

// Array of tech icons for the catch game
const FALLING_ICONS = [
  FaCode, FaReact, FaNodeJs, FaJs, FaCodeBranch, FaDatabase, SiTailwindcss, SiTypescript
];

// Types for games
interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  icon: React.ComponentType;
  counted?: boolean; // Track if this item has been counted for lives
}

type GameType = 'none' | 'catch' | 'snake';
type Direction = 'up' | 'down' | 'left' | 'right';
type Position = { x: number; y: number };

export default function NotFound() {
  // Shared game state
  const [gameType, setGameType] = useState<GameType>('none');
  const [score, setScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);
  
  // Catch game state
  const [catchGameStarted, setCatchGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [bucketPosition, setBucketPosition] = useState(50);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const catchAnimationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const itemIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const processedItemsRef = useRef<Set<number>>(new Set());

  // Snake game state
  const [snakeGameStarted, setSnakeGameStarted] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('right');
  const [speed, setSpeed] = useState(120); // Faster initial speed (was 150)
  const snakeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gridSize = 20; // 20x20 grid
  const cellSize = 100 / gridSize; // percentage of grid

  // Select game type
  const selectGame = (type: GameType) => {
    setGameType(type);
    setScore(0);
    
    if (type === 'catch') {
      startCatchGame();
    } else if (type === 'snake') {
      startSnakeGame();
    }
  };

  // Return to game selection
  const backToSelection = () => {
    endCatchGame();
    endSnakeGame();
    setGameType('none');
  };

  // ---------- CATCH GAME LOGIC ----------
  const startCatchGame = () => {
    setCatchGameStarted(true);
    setScore(0);
    setLives(3);
    setFallingItems([]);
    lastTimeRef.current = 0;
    processedItemsRef.current = new Set();
  };

  const endCatchGame = () => {
    setCatchGameStarted(false);
    if (catchAnimationRef.current) {
      cancelAnimationFrame(catchAnimationRef.current);
    }
    if (itemIntervalRef.current) {
      clearInterval(itemIntervalRef.current);
    }
  };

  // Handle keydown events for moving the bucket
  useEffect(() => {
    if (!catchGameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBucketPosition(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setBucketPosition(prev => Math.min(90, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [catchGameStarted]);

  // Handle mouse/touch movement for mobile
  useEffect(() => {
    if (!catchGameStarted || !gameRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = gameRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setBucketPosition(Math.min(90, Math.max(0, percentage)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0] && gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        setBucketPosition(Math.min(90, Math.max(0, percentage)));
      }
    };

    const currentGameRef = gameRef.current;
    
    currentGameRef.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
    currentGameRef.addEventListener('touchmove', handleTouchMove as unknown as EventListener);
    
    return () => {
      if (currentGameRef) {
        currentGameRef.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        currentGameRef.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      }
    };
  }, [catchGameStarted]);

  // Create falling items at random intervals
  useEffect(() => {
    if (!catchGameStarted) return;

    itemIntervalRef.current = setInterval(() => {
      const IconComponent = FALLING_ICONS[Math.floor(Math.random() * FALLING_ICONS.length)];
      setFallingItems(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 90, // Random x position
          y: 0, // Start at top
          speed: 1 + Math.random() * 2, // Random speed
          icon: IconComponent,
          counted: false
        }
      ]);
    }, 1200);

    return () => {
      if (itemIntervalRef.current) clearInterval(itemIntervalRef.current);
    };
  }, [catchGameStarted]);

  // Game animation loop for catch game
  useEffect(() => {
    if (!catchGameStarted) return;

    // Reset processed items when game starts
    processedItemsRef.current = new Set();

    const gameLoop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Update falling items
      setFallingItems(prev => {
        // Items that will be removed from game
        const itemsToRemove: number[] = [];
        // Items that were caught (for scoring)
        const caughtItems: number[] = [];
        // Count of newly missed items in this frame (for lives)
        let newlyMissedItems = 0;

        const updatedItems = prev.map(item => {
          // Update position
          const newY = item.y + (item.speed * deltaTime * 0.02);
          
          // Check for items that need processing
          if (newY >= 85 && !item.counted) {
            // Item reached bottom zone and hasn't been counted yet
            if (Math.abs(item.x - bucketPosition) < 10) {
              // Item caught
              caughtItems.push(item.id);
              itemsToRemove.push(item.id);
            } else if (!processedItemsRef.current.has(item.id)) {
              // Item missed and not previously processed
              processedItemsRef.current.add(item.id);
              newlyMissedItems++;
              
              // If beyond screen, remove it
              if (newY >= 100) {
                itemsToRemove.push(item.id);
              }
            }
          } else if (newY >= 100) {
            // Items that have gone completely off screen
            itemsToRemove.push(item.id);
          }
          
          return {
            ...item,
            y: newY,
            counted: item.counted || newY >= 85
          };
        });

        // Update score for caught items
        if (caughtItems.length > 0) {
          setScore(s => s + (caughtItems.length * 10));
        }

        // Update lives for missed items - exactly one life per item
        if (newlyMissedItems > 0) {
          setLives(l => Math.max(0, l - newlyMissedItems));
        }

        // Remove items that were caught or went off screen
        return updatedItems.filter(item => !itemsToRemove.includes(item.id));
      });

      if (lives > 0) {
        catchAnimationRef.current = requestAnimationFrame(gameLoop);
      } else {
        endCatchGame();
      }
    };

    catchAnimationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (catchAnimationRef.current) {
        cancelAnimationFrame(catchAnimationRef.current);
      }
    };
  }, [catchGameStarted, bucketPosition, lives]);

  // ---------- SNAKE GAME LOGIC ----------
  // Generate random food position that's not on the snake
  const generateFood = () => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  };

  const startSnakeGame = () => {
    setSnakeGameStarted(true);
    setScore(0);
    setSnake([{ x: 5, y: 5 }]);
    setFood(generateFood());
    setDirection('right');
    setSpeed(120); // Faster initial speed (was 150)
  };

  const endSnakeGame = () => {
    setSnakeGameStarted(false);
    if (snakeIntervalRef.current) {
      clearInterval(snakeIntervalRef.current);
    }
  };

  // Handle key presses for snake direction
  useEffect(() => {
    if (!snakeGameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snakeGameStarted, direction]);

  // Snake game loop
  useEffect(() => {
    if (!snakeGameStarted) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        // Create new head based on current direction
        const head = { ...prevSnake[0] };
        
        switch (direction) {
          case 'up':
            head.y = head.y - 1;
            break;
          case 'down':
            head.y = head.y + 1;
            break;
          case 'left':
            head.x = head.x - 1;
            break;
          case 'right':
            head.x = head.x + 1;
            break;
        }

        // Check for wall collision (no more wrapping)
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          endSnakeGame();
          return prevSnake;
        }

        // Check for collision with self
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          endSnakeGame();
          return prevSnake;
        }

        // Create new snake
        const newSnake = [head, ...prevSnake];
        
        // Check for food collision
        if (head.x === food.x && head.y === food.y) {
          // Increase score and speed
          setScore(s => s + 10);
          setFood(generateFood());
          
          // Make game faster as you get more points
          if (score > 0 && score % 30 === 0) { // Changed from 50 to 30
            setSpeed(s => Math.max(50, s - 10));
          }
        } else {
          // Remove tail if no food eaten
          newSnake.pop();
        }
        
        return newSnake;
      });
    };

    // Set interval for snake movement
    snakeIntervalRef.current = setInterval(moveSnake, speed);
    
    return () => {
      if (snakeIntervalRef.current) {
        clearInterval(snakeIntervalRef.current);
      }
    };
  }, [snakeGameStarted, direction, food, speed, score]);

  // Render the game UI
  return (
    <>
      <Navbar />
      <PageLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Page Not Found
          </h2>
          
          {gameType === 'none' ? (
            <>
              <p className="text-gray-400 max-w-md mb-6 md:mb-8 text-lg">
                While you're here, why not play a game?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
                <button 
                  onClick={() => selectGame('catch')}
                  className="group flex flex-col items-center bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
                >
                  <div className="text-4xl text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <FaGamepad />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Catch the Code</h3>
                  <p className="text-gray-400 text-sm">Move the bucket to catch falling code elements</p>
                </button>
                
                <button 
                  onClick={() => selectGame('snake')}
                  className="group flex flex-col items-center bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
                >
                  <div className="text-4xl text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <GiSnake />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Snake</h3>
                  <p className="text-gray-400 text-sm">Classic snake game - use arrow keys to control</p>
                </button>
              </div>
              <div className="mt-10 border-gray-800 text-gray-400 text-lg">
                or, <Link href="/" className="text-purple-400 hover:text-purple-300 hover:underline">return home</Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 max-w-md mb-6 md:mb-8 text-lg">
                {gameType === 'catch' ? 'Catch the falling code!' : 'Use arrow keys to control the snake'}
              </p>
              
              <div 
                ref={gameRef}
                className="relative w-full max-w-md aspect-square bg-gray-900/50 rounded-lg mb-6 overflow-hidden border border-gray-800"
                style={{ touchAction: (catchGameStarted || snakeGameStarted) ? 'none' : 'auto' }}
              >
                {/* Game container */}
                {gameType === 'catch' && !catchGameStarted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <button
                      onClick={startCatchGame}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      Start Game
                    </button>
                    <p className="text-gray-400 mt-4 text-sm px-4">
                      {score > 0 ? `Last score: ${score}` : 'Use arrow keys or mouse to move'}
                    </p>
                  </div>
                )}
                
                {gameType === 'catch' && catchGameStarted && (
                  <>
                    {/* Status display */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between text-white text-sm">
                      <div>Score: {score}</div>
                      <div>
                        {Array(Math.max(0, lives)).fill('❤️').join(' ')}
                      </div>
                    </div>
                    
                    {/* Falling items */}
                    {fallingItems.map(item => {
                      const IconComponent = item.icon;
                      return (
                        <div 
                          key={item.id}
                          className="absolute text-white text-2xl"
                          style={{ left: `${item.x}%`, top: `${item.y}%` }}
                        >
                          <IconComponent />
                        </div>
                      );
                    })}
                    
                    {/* Bucket */}
                    <div 
                      className="absolute bottom-0 w-20 h-8 bg-purple-500 rounded-t-lg"
                      style={{ 
                        left: `calc(${bucketPosition}% - 40px)`,
                        transform: 'translateX(0)'
                      }}
                    />
                  </>
                )}
                
                {gameType === 'snake' && !snakeGameStarted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <button
                      onClick={startSnakeGame}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      Start Game
                    </button>
                    <p className="text-gray-400 mt-4 text-sm px-4">
                      {score > 0 ? `Last score: ${score}` : 'Use arrow keys to move the snake'}
                    </p>
                  </div>
                )}
                
                {gameType === 'snake' && snakeGameStarted && (
                  <>
                    {/* Status display - moved to top of the container with padding */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between text-white text-sm bg-gray-900/80 p-2 z-10">
                      <div>Score: {score}</div>
                      <div>Speed: {Math.round(1000/speed)} blocks/s</div>
                    </div>
                    
                    {/* Snake game grid */}
                    <div className="absolute inset-0 pt-8"> {/* Added padding top */}
                      {/* Food */}
                      <div 
                        className="absolute bg-red-500 rounded-full"
                        style={{ 
                          left: `${food.x * cellSize}%`,
                          top: `${food.y * cellSize}%`,
                          width: `${cellSize * 0.8}%`, 
                          height: `${cellSize * 0.8}%`,
                          transform: 'translate(10%, 10%)'
                        }}
                      />
                      
                      {/* Snake */}
                      {snake.map((segment, index) => (
                        <div 
                          key={index}
                          className={`absolute ${index === 0 ? 'bg-purple-400' : 'bg-purple-600'} rounded-sm`}
                          style={{ 
                            left: `${segment.x * cellSize}%`,
                            top: `${segment.y * cellSize}%`,
                            width: `${cellSize * 0.9}%`,
                            height: `${cellSize * 0.9}%`,
                            transform: 'translate(5%, 5%)'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-16 pt-6 border-t border-gray-800 text-gray-400 text-lg">
                or, <Link href="/" className="text-purple-400 hover:text-purple-300 hover:underline">return home</Link>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    backToSelection();
                  }}
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors"
                >
                  Choose Different Game
                </Link>
                
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors"
                >
                  <FaHome /> Return Home
                </Link>
              </div>
            </>
          )}
        </div>
      </PageLayout>
    </>
  );
} 