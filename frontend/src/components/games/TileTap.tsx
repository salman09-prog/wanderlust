
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Trophy, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TileTap = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const playSound = useCallback(() => {
    // Create a simple beep sound using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioCtx();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log('Boop!');
    }
  }, []);

  const getRandomTile = useCallback(() => {
    return Math.floor(Math.random() * 9);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
    setActiveTile(getRandomTile());
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setGameOver(true);
    setActiveTile(null);

    if (score > highScore) {
      setHighScore(score);
      toast({
        title: "New High Score!",
        description: `You scored ${score} points!`,
      });
    } else {
      toast({
        title: "Game Over!",
        description: `Final score: ${score} points`,
      });
    }
  }, [score, highScore, toast]);

  const handleTileClick = (tileIndex: number) => {
    if (!gameActive || activeTile !== tileIndex) return;

    playSound();
    setScore(prev => prev + 1);
    setActiveTile(getRandomTile());
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }

    return () => clearInterval(interval);
  }, [gameActive, timeLeft, endGame]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (gameActive && activeTile !== null) {
      timeout = setTimeout(() => {
        setActiveTile(getRandomTile());
      }, 1000 + Math.random() * 1000); // Random interval between 1-2 seconds
    }

    return () => clearTimeout(timeout);
  }, [gameActive, activeTile, getRandomTile]);

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Tile Tap Game
          </h3>
          <p className="text-gray-600">
            Tap the bright tile as fast as you can!
          </p>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Score: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer size={16} />
              <span className="text-sm font-medium">{timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-sm font-medium">Best: {highScore}</span>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="text-center mb-6 p-4 bg-green-100 rounded-lg">
            <Trophy size={32} className="mx-auto mb-2 text-yellow-500" />
            <h4 className="text-lg font-bold text-green-800">Game Over!</h4>
            <p className="text-green-600">Final Score: {score}</p>
            {score === highScore && score > 0 && (
              <p className="text-green-600 font-bold">New High Score! 🎉</p>
            )}
          </div>
        )}

        <div className="max-w-xs mx-auto mb-6">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`
                  w-20 h-20 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-lg
                  ${activeTile === index && gameActive
                    ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-200 hover:bg-gray-300'
                  }
                  ${!gameActive ? 'cursor-not-allowed opacity-50' : ''}
                `}
                onClick={() => handleTileClick(index)}
              >
                {activeTile === index && gameActive && '💥'}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-2">
          {!gameActive && !gameOver && (
            <Button onClick={startGame} className="w-full max-w-xs">
              Start Game
            </Button>
          )}

          {gameActive && (
            <Button
              onClick={endGame}
              variant="outline"
              className="w-full max-w-xs"
            >
              Stop Game
            </Button>
          )}

          {gameOver && (
            <Button onClick={startGame} className="w-full max-w-xs">
              <RotateCcw size={16} className="mr-2" />
              Play Again
            </Button>
          )}
        </div>

        <div className="text-center mt-4 text-xs text-gray-500">
          <p>💡 Tip: Tap the bright purple tile quickly to score points!</p>
          <p>🎵 Sound effects included - unmute for the full experience</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TileTap;
