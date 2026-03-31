
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Shuffle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GuessTheFlag = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Sample questions - in a real app, we'd have more and better images
  const questions = [
    {
      flag: "https://img.freepik.com/premium-photo/republic-south-africa-national-flag-3d-illustration-close-up-view_509581-390.jpg",
      country: "South Africa",
      options: ["South Africa", "Tanzania", "Madagascar", "Argentina"]
    },
    {
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png",
      country: "Japan",
      options: ["China", "Japan", "South Korea", "Vietnam"]
    },
    {
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/330px-Flag_of_Italy.svg.png",
      country: "Italy",
      options: ["France", "Italy", "Spain", "Germany"]
    },
    {
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEDbtRz0cZVLaaG7c7sk7M_nzFEqLTfZe3gQ&s",
      country: "Brazil",
      options: ["Argentina", "Brazil", "Colombia", "Peru"]
    },
    {
      flag: "https://www.thoughtco.com/thmb/ecXwD0oYdJEzLh6da-ouWm5HsqY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/national-flag-canada-lge2-56a0e57f5f9b58eba4b4f422.jpg",
      country: "Canada",
      options: ["USA", "Canada", "Russia", "Australia"]
    },
    {
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBPu8fbYRu7NK3KqXxS2mGuELUOZKKi1HE9g&s",
      country: "Egypt",
      options: ["Egypt", "Algeria", "Morocco", "Tunisia"]
    },
    {
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbeF0JhXCRRuNz93BW9MUEgFnVkzdmQZfnQ&s",
      country: "Thailand",
      options: ["Malaysia", "Indonesia", "Singapore", "Thailand"]
    },
    {
      flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFATPIlLk_HfI-OTWotJALFMXl8KJVQzn9gw&s",
      country: "Turkey",
      options: ["Greece", "Turkey", "Cyprus", "Lebanon"]
    }
  ];
  
  useEffect(() => {
    // Shuffle the questions initially
    shuffleQuestions();
  }, []);
  
  const shuffleQuestions = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setGameOver(false);
  };
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === questions[currentQuestion].country) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: `That's the flag of ${answer}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer is ${questions[currentQuestion].country}`,
        variant: "destructive",
      });
    }
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameOver(true);
    }
  };
  
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        {gameOver ? (
          <div className="text-center py-8">
            <Trophy size={64} className="mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Game Complete!
            </h3>
            <p className="text-gray-600 mb-6">
              Your score: {score} out of {questions.length}
            </p>
            <Button onClick={shuffleQuestions}>
              <Shuffle size={16} className="mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Guess The Flag
              </h3>
              <p className="text-gray-600">
                Which country does this flag belong to?
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <span className="text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm">
                  Score: {score}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <img 
                src={questions[currentQuestion].flag} 
                alt="Flag" 
                className="w-full max-w-xs h-auto rounded-lg shadow-md mb-6"
              />
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showAnswer 
                        ? option === questions[currentQuestion].country 
                          ? "default" 
                          : option === selectedAnswer 
                            ? "destructive" 
                            : "outline"
                        : selectedAnswer === option 
                          ? "secondary" 
                          : "outline"
                    }
                    className={`h-auto py-3 px-4 ${showAnswer && "pointer-events-none"}`}
                    onClick={() => handleAnswer(option)}
                    disabled={showAnswer}
                  >
                    {option}
                    {showAnswer && option === questions[currentQuestion].country && (
                      <Check size={16} className="ml-1 text-green-500" />
                    )}
                    {showAnswer && option === selectedAnswer && option !== questions[currentQuestion].country && (
                      <X size={16} className="ml-1 text-red-500" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            {showAnswer && (
              <div className="flex justify-center">
                <Button onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GuessTheFlag;
