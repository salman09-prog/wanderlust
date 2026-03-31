
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SpotTheDifference = () => {
  const { toast } = useToast();
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Sample puzzles - in a real app, these would have proper images
  const puzzles = [
    {
      id: 1,
      name: "Taj Mahal",
      baseImage: "https://placehold.co/600x400/e4e4e4/333333?text=Taj+Mahal+A",
      diffImage: "https://placehold.co/600x400/e4e4e4/333333?text=Taj+Mahal+B",
      differences: [
        { id: 1, x: 25, y: 35, radius: 15 },
        { id: 2, x: 75, y: 45, radius: 15 },
        { id: 3, x: 55, y: 75, radius: 15 }
      ]
    },
    {
      id: 2,
      name: "Kerala Backwaters",
      baseImage: "https://placehold.co/600x400/e4e4e4/333333?text=Kerala+A",
      diffImage: "https://placehold.co/600x400/e4e4e4/333333?text=Kerala+B",
      differences: [
        { id: 1, x: 35, y: 25, radius: 15 },
        { id: 2, x: 65, y: 55, radius: 15 },
        { id: 3, x: 45, y: 65, radius: 15 }
      ]
    },
    {
      id: 3,
      name: "Varanasi Ghats",
      baseImage: "https://placehold.co/600x400/e4e4e4/333333?text=Varanasi+A",
      diffImage: "https://placehold.co/600x400/e4e4e4/333333?text=Varanasi+B",
      differences: [
        { id: 1, x: 15, y: 45, radius: 15 },
        { id: 2, x: 55, y: 35, radius: 15 },
        { id: 3, x: 75, y: 65, radius: 15 }
      ]
    },
    {
      id: 4,
      name: "Jaipur Palace",
      baseImage: "https://placehold.co/600x400/e4e4e4/333333?text=Jaipur+A",
      diffImage: "https://placehold.co/600x400/e4e4e4/333333?text=Jaipur+B",
      differences: [
        { id: 1, x: 25, y: 55, radius: 15 },
        { id: 2, x: 45, y: 25, radius: 15 },
        { id: 3, x: 85, y: 75, radius: 15 }
      ]
    },
    {
      id: 5,
      name: "Goa Beaches",
      baseImage: "https://placehold.co/600x400/e4e4e4/333333?text=Goa+A",
      diffImage: "https://placehold.co/600x400/e4e4e4/333333?text=Goa+B",
      differences: [
        { id: 1, x: 35, y: 65, radius: 15 },
        { id: 2, x: 75, y: 35, radius: 15 },
        { id: 3, x: 15, y: 15, radius: 15 }
      ]
    },
  ];
  
  const currentPuzzleData = puzzles[currentPuzzle];
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, isLeftImage: boolean) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const differences = currentPuzzleData.differences;
    
    for (const diff of differences) {
      const distance = Math.sqrt(Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2));
      
      if (distance <= diff.radius && !foundDifferences.includes(diff.id)) {
        // Found a difference
        const newFoundDifferences = [...foundDifferences, diff.id];
        setFoundDifferences(newFoundDifferences);
        
        toast({
          title: "Correct!",
          description: `You found difference ${newFoundDifferences.length} of 3`,
          variant: "default",
        });
        
        if (newFoundDifferences.length === 3) {
          // All differences found
          if (currentPuzzle === puzzles.length - 1) {
            setGameCompleted(true);
          } else {
            setTimeout(() => {
              setCurrentPuzzle(currentPuzzle + 1);
              setFoundDifferences([]);
            }, 1500);
          }
        }
        return;
      }
    }
    
    // If we reach here, no difference was found at the clicked location
    toast({
      title: "Try again",
      description: "No difference found at this spot",
      variant: "destructive",
    });
  };
  
  const handleNextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setFoundDifferences([]);
    }
  };
  
  const handlePrevPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle(currentPuzzle - 1);
      setFoundDifferences([]);
    }
  };
  
  const resetGame = () => {
    setCurrentPuzzle(0);
    setFoundDifferences([]);
    setGameCompleted(false);
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Spot the Difference: {currentPuzzleData.name}
          </h3>
          <p className="text-gray-600">
            Find the 3 differences between these two images
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <span className="text-sm">
              Puzzle {currentPuzzle + 1} of {puzzles.length}
            </span>
            <span className="text-sm">
              Found: {foundDifferences.length} / 3
            </span>
          </div>
        </div>
        
        {gameCompleted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-india-blue mb-4">
              Congratulations!
            </h3>
            <p className="text-gray-600 mb-6">
              You've completed all the puzzles!
            </p>
            <Button onClick={resetGame}>
              Play Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="relative cursor-crosshair" 
              onClick={(e) => handleClick(e, true)}
            >
              <img 
                src={currentPuzzleData.baseImage} 
                alt={`${currentPuzzleData.name} A`}
                className="w-full h-auto rounded-lg"
              />
              {foundDifferences.map(diffId => {
                const diff = currentPuzzleData.differences.find(d => d.id === diffId);
                if (!diff) return null;
                return (
                  <div 
                    key={`left-${diffId}`}
                    className="absolute w-8 h-8 bg-green-500/50 rounded-full border-2 border-green-500 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${diff.x}%`, 
                      top: `${diff.y}%`,
                    }}
                  >
                    <Check size={16} className="text-white" />
                  </div>
                );
              })}
            </div>
            <div 
              className="relative cursor-crosshair" 
              onClick={(e) => handleClick(e, false)}
            >
              <img 
                src={currentPuzzleData.diffImage} 
                alt={`${currentPuzzleData.name} B`}
                className="w-full h-auto rounded-lg"
              />
              {foundDifferences.map(diffId => {
                const diff = currentPuzzleData.differences.find(d => d.id === diffId);
                if (!diff) return null;
                return (
                  <div 
                    key={`right-${diffId}`}
                    className="absolute w-8 h-8 bg-green-500/50 rounded-full border-2 border-green-500 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${diff.x}%`, 
                      top: `${diff.y}%`,
                    }}
                  >
                    <Check size={16} className="text-white" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevPuzzle}
            disabled={currentPuzzle === 0}
          >
            <ArrowLeft size={16} className="mr-1" />
            Previous
          </Button>
          
          <Button
            onClick={handleNextPuzzle}
            disabled={currentPuzzle === puzzles.length - 1 || foundDifferences.length < 3}
          >
            Next
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpotTheDifference;
