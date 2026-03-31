
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RotateCcw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GuessTheNumber = () => {
  const { toast } = useToast();
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [guessHistory, setGuessHistory] = useState<number[]>([]);
  
  const initializeGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setGameWon(false);
    setFeedback('Guess a number between 1 and 100!');
    setGuessHistory([]);
  };
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      toast({
        title: "Invalid Input",
        description: "Please enter a number between 1 and 100",
        variant: "destructive",
      });
      return;
    }
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory(prev => [...prev, guessNumber]);
    
    if (guessNumber === targetNumber) {
      setGameWon(true);
      setFeedback(`🎉 Correct! You guessed it in ${newAttempts} attempts!`);
      toast({
        title: "Congratulations!",
        description: `You found the number in ${newAttempts} attempts!`,
      });
    } else if (guessNumber < targetNumber) {
      setFeedback('📈 Too low! Try a higher number.');
    } else {
      setFeedback('📉 Too high! Try a lower number.');
    }
    
    setGuess('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameWon) {
      handleGuess();
    }
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Guess the Number
          </h3>
          <p className="text-gray-600">
            I'm thinking of a number between 1 and 100
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <span className="text-sm">Attempts: {attempts}</span>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-lg">{feedback}</p>
          </div>
          
          {gameWon && (
            <div className="text-center mb-6 p-4 bg-green-100 rounded-lg">
              <Trophy size={32} className="mx-auto mb-2 text-yellow-500" />
              <h4 className="text-lg font-bold text-green-800">You Won!</h4>
              <p className="text-green-600">The number was {targetNumber}</p>
            </div>
          )}
          
          {!gameWon && (
            <div className="flex space-x-2 mb-4">
              <Input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess"
                min="1"
                max="100"
                className="flex-1"
              />
              <Button onClick={handleGuess}>
                Guess
              </Button>
            </div>
          )}
          
          {guessHistory.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Previous guesses:</p>
              <div className="flex flex-wrap gap-2">
                {guessHistory.map((prevGuess, index) => (
                  <span
                    key={index}
                    className={`
                      px-2 py-1 rounded text-sm
                      ${prevGuess === targetNumber 
                        ? 'bg-green-200 text-green-800' 
                        : prevGuess < targetNumber 
                          ? 'bg-blue-200 text-blue-800' 
                          : 'bg-red-200 text-red-800'
                      }
                    `}
                  >
                    {prevGuess}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button onClick={initializeGame} variant="outline">
              <RotateCcw size={16} className="mr-2" />
              New Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuessTheNumber;
