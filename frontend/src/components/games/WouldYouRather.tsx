import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer, Award, RotateCcw, Waves, Mountain, Tent, FerrisWheel } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Option {
  text: string;
  icon: React.ReactNode;
  trait: 'adventure' | 'relaxation' | 'culture' | 'luxury';
}

interface Question {
  option1: Option;
  option2: Option;
}

const WouldYouRather = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [choices, setChoices] = useState<Record<string, number>>({
    adventure: 0,
    relaxation: 0,
    culture: 0,
    luxury: 0
  });
  const [answered, setAnswered] = useState(0);
  const [result, setResult] = useState("");
  
  const questions: Question[] = [
    {
      option1: {
        text: "Beach",
        icon: <Waves className="h-8 w-8 text-blue-500" />,
        trait: "relaxation"
      },
      option2: {
        text: "Mountains",
        icon: <Mountain className="h-8 w-8 text-green-700" />,
        trait: "adventure"
      }
    },
    {
      option1: {
        text: "Backwaters",
        icon: <Tent className="h-8 w-8 text-teal-600" />,
        trait: "relaxation"
      },
      option2: {
        text: "Theme Park",
        icon: <FerrisWheel className="h-8 w-8 text-purple-500" />,
        trait: "adventure"
      }
    },
    {
      option1: {
        text: "Luxury Resort",
        icon: <Tent className="h-8 w-8 text-yellow-500" />,
        trait: "luxury"
      },
      option2: {
        text: "Historic Site",
        icon: <Tent className="h-8 w-8 text-gray-700" />,
        trait: "culture"
      }
    },
    {
      option1: {
        text: "Street Food",
        icon: <Tent className="h-8 w-8 text-red-500" />,
        trait: "culture"
      },
      option2: {
        text: "Fine Dining",
        icon: <Tent className="h-8 w-8 text-pink-500" />,
        trait: "luxury"
      }
    },
    {
      option1: {
        text: "Ancient Ruins",
        icon: <Tent className="h-8 w-8 text-brown-500" />,
        trait: "culture"
      },
      option2: {
        text: "Adventure Sports",
        icon: <Tent className="h-8 w-8 text-green-500" />,
        trait: "adventure"
      }
    },
    {
      option1: {
        text: "Spa Day",
        icon: <Tent className="h-8 w-8 text-blue-300" />,
        trait: "relaxation"
      },
      option2: {
        text: "Shopping",
        icon: <Tent className="h-8 w-8 text-pink-300" />,
        trait: "luxury"
      }
    },
    {
      option1: {
        text: "Local Festival",
        icon: <Tent className="h-8 w-8 text-orange-500" />,
        trait: "culture"
      },
      option2: {
        text: "Beach Resort",
        icon: <Tent className="h-8 w-8 text-cyan-500" />,
        trait: "relaxation"
      }
    },
    {
      option1: {
        text: "Hiking",
        icon: <Tent className="h-8 w-8 text-green-600" />,
        trait: "adventure"
      },
      option2: {
        text: "Cruise",
        icon: <Tent className="h-8 w-8 text-blue-600" />,
        trait: "luxury"
      }
    },
  ];
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (gameActive && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            handleTimeout();
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameActive, gameOver, currentQuestion]);
  
  const handleTimeout = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(10);
    } else {
      endGame();
    }
  };
  
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setCurrentQuestion(0);
    setTimeRemaining(10);
    setChoices({
      adventure: 0,
      relaxation: 0,
      culture: 0,
      luxury: 0
    });
    setAnswered(0);
    setResult("");
  };
  
  const makeChoice = (trait: 'adventure' | 'relaxation' | 'culture' | 'luxury') => {
    setChoices({
      ...choices,
      [trait]: choices[trait] + 1
    });
    
    setAnswered(answered + 1);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(10);
    } else {
      endGame();
    }
  };
  
  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    
    const totalAnswered = answered + 1;
    const percentages = {
      adventure: Math.round((choices.adventure / totalAnswered) * 100),
      relaxation: Math.round((choices.relaxation / totalAnswered) * 100),
      culture: Math.round((choices.culture / totalAnswered) * 100),
      luxury: Math.round((choices.luxury / totalAnswered) * 100)
    };
    
    let dominantTrait = "adventure";
    let highestPercentage = percentages.adventure;
    
    if (percentages.relaxation > highestPercentage) {
      dominantTrait = "relaxation";
      highestPercentage = percentages.relaxation;
    }
    if (percentages.culture > highestPercentage) {
      dominantTrait = "culture";
      highestPercentage = percentages.culture;
    }
    if (percentages.luxury > highestPercentage) {
      dominantTrait = "luxury";
      highestPercentage = percentages.luxury;
    }
    
    let resultMessage = "";
    switch(dominantTrait) {
      case "adventure":
        resultMessage = `You're ${highestPercentage}% an adventurous explorer seeking thrills and excitement!`;
        break;
      case "relaxation":
        resultMessage = `You're ${highestPercentage}% a chill traveler who values peace and unwinding!`;
        break;
      case "culture":
        resultMessage = `You're ${highestPercentage}% a cultural enthusiast who loves authentic experiences!`;
        break;
      case "luxury":
        resultMessage = `You're ${highestPercentage}% a luxury seeker who enjoys the finer things in travel!`;
        break;
    }
    
    setResult(resultMessage);
    
    toast({
      title: "Game Complete!",
      description: "Your travel personality has been revealed!",
      variant: "default",
    });
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Would You Rather: Travel Edition
          </h3>
          <p className="text-gray-600">
            Quick! Make your choice before the timer runs out!
          </p>
        </div>
        
        {!gameActive && !gameOver ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Choose quickly between travel options to reveal your travel personality!
            </h3>
            <Button onClick={startGame} size="lg">
              Start Game
            </Button>
          </div>
        ) : gameOver ? (
          <div className="text-center py-8">
            <Award size={64} className="mx-auto mb-4 text-india-saffron" />
            <h3 className="text-2xl font-bold text-india-blue mb-4">
              Your Travel Personality
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              {result}
            </p>
            
            <div className="mb-8 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Adventure</span>
                <span className="text-sm font-medium">{Math.round((choices.adventure / answered) * 100)}%</span>
              </div>
              <Progress value={Math.round((choices.adventure / answered) * 100)} className="h-2 mb-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Relaxation</span>
                <span className="text-sm font-medium">{Math.round((choices.relaxation / answered) * 100)}%</span>
              </div>
              <Progress value={Math.round((choices.relaxation / answered) * 100)} className="h-2 mb-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Culture</span>
                <span className="text-sm font-medium">{Math.round((choices.culture / answered) * 100)}%</span>
              </div>
              <Progress value={Math.round((choices.culture / answered) * 100)} className="h-2 mb-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Luxury</span>
                <span className="text-sm font-medium">{Math.round((choices.luxury / answered) * 100)}%</span>
              </div>
              <Progress value={Math.round((choices.luxury / answered) * 100)} className="h-2" />
            </div>
            
            <Button onClick={startGame}>
              <RotateCcw size={16} className="mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-100 rounded-full px-4 py-1 flex items-center">
                <Timer size={16} className="mr-1 text-red-500" />
                <span className="font-medium">{timeRemaining}s</span>
              </div>
              <div className="mx-4 text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            
            <Progress value={(timeRemaining / 10) * 100} className="h-2 mb-6" />
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-8'} mb-6`}>
              <Button
                onClick={() => makeChoice(questions[currentQuestion].option1.trait)}
                variant="outline"
                className="p-8 h-auto flex flex-col items-center text-center border-2 hover:bg-gray-50 hover:border-india-blue transition-all"
              >
                {questions[currentQuestion].option1.icon}
                <span className="text-xl font-medium mt-3">{questions[currentQuestion].option1.text}</span>
              </Button>
              
              <Button
                onClick={() => makeChoice(questions[currentQuestion].option2.trait)}
                variant="outline"
                className="p-8 h-auto flex flex-col items-center text-center border-2 hover:bg-gray-50 hover:border-india-blue transition-all"
              >
                {questions[currentQuestion].option2.icon}
                <span className="text-xl font-medium mt-3">{questions[currentQuestion].option2.text}</span>
              </Button>
            </div>
            
            <p className="text-center text-gray-500 text-sm italic">
              Choose quickly! The timer is counting down...
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WouldYouRather;
