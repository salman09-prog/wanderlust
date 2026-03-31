
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, Shuffle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LanguageQuestion {
  phrase: string;
  language: string;
  options: string[];
}

const GuessTheLanguage = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const questions: LanguageQuestion[] = [
    {
      phrase: "Namaste",
      language: "Hindi",
      options: ["Hindi", "Nepali", "Bengali", "Malayalam"]
    },
    {
      phrase: "Ciao",
      language: "Italian",
      options: ["Italian", "Spanish", "French", "Portuguese"]
    },
    {
      phrase: "Nǐ hǎo",
      language: "Mandarin Chinese",
      options: ["Cantonese", "Japanese", "Korean", "Mandarin Chinese"]
    },
    {
      phrase: "Nomoskar",
      language: "Bengali",
      options: ["Bengali", "Hindi", "Odia", "Assamese"]
    },
    {
      phrase: "Vanakkam",
      language: "Tamil",
      options: ["Tamil", "Telugu", "Kannada", "Malayalam"]
    },
    {
      phrase: "Konnichiwa",
      language: "Japanese",
      options: ["Korean", "Japanese", "Mandarin Chinese", "Vietnamese"]
    },
    {
      phrase: "Hola",
      language: "Spanish",
      options: ["Portuguese", "Italian", "Spanish", "French"]
    },
    {
      phrase: "Zdravstvuyte",
      language: "Russian",
      options: ["Polish", "Ukrainian", "Russian", "Czech"]
    },
    {
      phrase: "Guten Tag",
      language: "German",
      options: ["Dutch", "German", "Danish", "Swedish"]
    },
    {
      phrase: "As-salamu alaykum",
      language: "Arabic",
      options: ["Arabic", "Persian", "Turkish", "Hebrew"]
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
    
    if (answer === questions[currentQuestion].language) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: `"${questions[currentQuestion].phrase}" is ${answer}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer is ${questions[currentQuestion].language}`,
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
                Guess The Language
              </h3>
              <p className="text-gray-600">
                Which language does this greeting/phrase belong to?
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
              <div className="bg-gray-100 p-6 rounded-xl shadow-inner w-full max-w-md mb-6 text-center">
                <h2 className="text-3xl font-bold text-india-blue mb-2">{questions[currentQuestion].phrase}</h2>
                <p className="text-gray-500 italic">What language is this?</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showAnswer 
                        ? option === questions[currentQuestion].language 
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
                    {showAnswer && option === questions[currentQuestion].language && (
                      <Check size={16} className="ml-1 text-green-500" />
                    )}
                    {showAnswer && option === selectedAnswer && option !== questions[currentQuestion].language && (
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

export default GuessTheLanguage;
