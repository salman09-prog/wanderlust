
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  
  const emojis = ['🌄', '🌈', '🎯', '⭐', '📸', '🧩', '🎁', '⚽'];
  
  const initializeGame = () => {
    const shuffledEmojis = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
  };
  
  useEffect(() => {
    initializeGame();
  }, []);
  
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);
  
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameWon(true);
      toast({
        title: "Congratulations!",
        description: `You won in ${moves} moves!`,
      });
    }
  }, [cards, moves, toast]);
  
  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Memory Match Game
          </h3>
          <p className="text-gray-600">
            Find all the matching pairs!
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <span className="text-sm">Moves: {moves}</span>
          </div>
        </div>
        
        {gameWon && (
          <div className="text-center mb-6 p-4 bg-green-100 rounded-lg">
            <Trophy size={32} className="mx-auto mb-2 text-yellow-500" />
            <h4 className="text-lg font-bold text-green-800">You Won!</h4>
            <p className="text-green-600">Completed in {moves} moves</p>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`
                relative w-16 h-16 cursor-pointer transition-transform duration-300
                ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
              `}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {card.isFlipped || card.isMatched ? (
                  <span className="text-2xl">{card.emoji}</span>
                ) : (
                  <span className="text-white text-xl">?</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button onClick={initializeGame} variant="outline">
            <RotateCcw size={16} className="mr-2" />
            New Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryMatch;
