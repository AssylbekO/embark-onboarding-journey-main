import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import EquationSlideContainer from '@/components/accounting/EquationSlideContainer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Coins, DollarSign, Banknote, BookOpen, ScrollText, ArrowRight, CheckCircle2, Scale, BookmarkCheck, X, ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from '@/hooks/use-toast';
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import SlideIntro from "@/components/accounting/SlideIntro";
import SlideDefinition from "@/components/accounting/SlideDefinition";
import SlideWhyMatters from "@/components/accounting/SlideWhyMatters";
import SlideKeyTerms from "@/components/accounting/SlideKeyTerms";
import SlideMiniQuiz from "@/components/accounting/SlideMiniQuiz";
import SlideEquation from "@/components/accounting/SlideEquation";
import SlideAccountTypes from "@/components/accounting/SlideAccountTypes";
import SlideDoubleEntry from "@/components/accounting/SlideDoubleEntry";
import SlideWrapUp from "@/components/accounting/SlideWrapUp";

type MiniQuizAnswer = {
  q1: string;
};

type EquationQuizAnswer = {
  equity: string;
};

type DragDropAnswer = {
  debit: string;
  credit: string;
};

type AccountType = {
  title: string;
  icon: React.ReactNode;
  examples: Array<{name: string, icon: React.ReactNode}>;
};

const LearnAccounting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [miniQuizSubmitted, setMiniQuizSubmitted] = useState(false);
  const [miniQuizCorrect, setMiniQuizCorrect] = useState(false);
  const [equationQuizSubmitted, setEquationQuizSubmitted] = useState(false);
  const [equationQuizCorrect, setEquationQuizCorrect] = useState(false);
  const [flippedCards, setFlippedCards] = useState<{[key: string]: boolean}>({});
  const [expandedAccounts, setExpandedAccounts] = useState<{[key: string]: boolean}>({});
  const [dragSuccess, setDragSuccess] = useState(false);
  const [animateEquation, setAnimateEquation] = useState(false);
  
  const dragDropForm = useForm<DragDropAnswer>({
    defaultValues: {
      debit: "",
      credit: ""
    }
  });

  const miniQuizForm = useForm<MiniQuizAnswer>({
    defaultValues: {
      q1: "",
    },
  });

  const equationQuizForm = useForm<EquationQuizAnswer>({
    defaultValues: {
      equity: "",
    },
  });
  
  const [carouselApi, setCarouselApi] = React.useState<any>(null);

  useEffect(() => {
    if (carouselApi && currentSlideIndex > 0) {
      carouselApi.scrollTo(currentSlideIndex);
    }
  }, [carouselApi, currentSlideIndex]);

  const handleStartQuiz = () => {
    navigate('/learn/accounting/quiz');
  };

  const handleChange = (index: number) => {
    setCurrentSlideIndex(index);
    
    if (index === 5) {
      setTimeout(() => setAnimateEquation(true), 500);
    } else {
      setAnimateEquation(false);
    }
  };

  const onSubmitMiniQuiz = (data: MiniQuizAnswer) => {
    setMiniQuizSubmitted(true);
    const isCorrect = data.q1 === "b";
    setMiniQuizCorrect(isCorrect);
    
    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect 
        ? "Well done! You understand the fundamental purpose of accounting." 
        : "Accounting is primarily about recording, analyzing, and reporting financial information.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const onSubmitEquationQuiz = (data: EquationQuizAnswer) => {
    setEquationQuizSubmitted(true);
    const isCorrect = data.equity === "5000";
    setEquationQuizCorrect(isCorrect);
    
    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect 
        ? "Well done! You correctly calculated Equity = Assets - Liabilities = €9000 - €4000 = €5000." 
        : "Remember: Equity = Assets - Liabilities = €9000 - €4000 = €5000.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleAccount = (id: string) => {
    setExpandedAccounts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const onSubmitDragDrop = (data: DragDropAnswer) => {
    const isCorrect = 
      data.debit.toLowerCase().includes("rent") && 
      data.debit.toLowerCase().includes("expense") &&
      data.credit.toLowerCase().includes("cash");
    
    setDragSuccess(isCorrect);
    
    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect 
        ? "You've correctly recorded this transaction using double-entry bookkeeping." 
        : "Remember: When you pay rent, you debit Rent Expense and credit Cash.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const resetDragDrop = () => {
    dragDropForm.reset();
    setDragSuccess(false);
  };

  const handleStartLearning = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
      setCurrentSlideIndex(1);
    }
  };

  const accountTypes: AccountType[] = [
    {
      title: "Asset Accounts",
      icon: <DollarSign className="h-6 w-6" />,
      examples: [
        { name: "Cash", icon: <Banknote className="h-5 w-5" /> },
        { name: "Inventory", icon: <ScrollText className="h-5 w-5" /> },
        { name: "Equipment", icon: <Calculator className="h-5 w-5" /> }
      ]
    },
    {
      title: "Liability Accounts",
      icon: <Scale className="h-6 w-6" />,
      examples: [
        { name: "Accounts Payable", icon: <ScrollText className="h-5 w-5" /> },
        { name: "Loans", icon: <Banknote className="h-5 w-5" /> },
        { name: "Mortgages", icon: <BookOpen className="h-5 w-5" /> }
      ]
    },
    {
      title: "Equity Accounts",
      icon: <Coins className="h-6 w-6" />,
      examples: [
        { name: "Owner's Capital", icon: <Coins className="h-5 w-5" /> },
        { name: "Retained Earnings", icon: <Banknote className="h-5 w-5" /> },
        { name: "Common Stock", icon: <ScrollText className="h-5 w-5" /> }
      ]
    },
    {
      title: "Revenue & Expense Accounts",
      icon: <DollarSign className="h-6 w-6" />,
      examples: [
        { name: "Sales Revenue", icon: <Banknote className="h-5 w-5" /> },
        { name: "Rent Expense", icon: <ScrollText className="h-5 w-5" /> },
        { name: "Utilities", icon: <Calculator className="h-5 w-5" /> }
      ]
    }
  ];

  const keyTerms = [
    { id: "assets", term: "Assets", definition: "Resources owned by a business that have economic value" },
    { id: "liabilities", term: "Liabilities", definition: "Obligations or debts owed by the business to others" },
    { id: "equity", term: "Equity", definition: "Owner's claim on business assets after liabilities" },
    { id: "revenue", term: "Revenue", definition: "Income earned from business activities" }
  ];

  const slides = [
    {
      id: "intro",
      title: "Introduction to Accounting",
      content: (
        <SlideIntro onStartLearning={handleStartLearning} />
      ),
    },
    {
      id: "definition",
      title: "What is Accounting?",
      content: <SlideDefinition />,
    },
    {
      id: "why-matters",
      title: "Why Accounting Matters",
      content: <SlideWhyMatters />,
    },
    {
      id: "key-terms",
      title: "Key Accounting Terms",
      content: (
        <SlideKeyTerms
          keyTerms={keyTerms}
          flippedCards={flippedCards}
          onFlipCard={handleFlipCard}
        />
      ),
    },
    {
      id: "mini-quiz",
      title: "Quick Check: Test Your Understanding",
      content: (
        <SlideMiniQuiz
          form={miniQuizForm}
          submitted={miniQuizSubmitted}
          correct={miniQuizCorrect}
          onSubmit={onSubmitMiniQuiz}
          onContinue={() => handleChange(5)}
        />
      ),
    },
    {
      id: "equation",
      title: "The Accounting Equation",
      // Only one `content` property allowed:
      content: <EquationSlideContainer />,
    },
    {
      id: "account-types",
      title: "Types of Accounts",
      content: (
        <SlideAccountTypes
          accountTypes={accountTypes}
          expanded={expandedAccounts}
          onToggle={handleToggleAccount}
        />
      ),
    },
    {
      id: "double-entry",
      title: "Double-Entry Bookkeeping",
      content: (
        <SlideDoubleEntry
          form={dragDropForm}
          dragSuccess={dragSuccess}
          onSubmit={onSubmitDragDrop}
          onReset={resetDragDrop}
        />
      ),
    },
    {
      id: "wrap-up",
      title: "Ready to Test Your Knowledge?",
      content: (
        <SlideWrapUp onStartQuiz={handleStartQuiz} />
      ),
      isLastSlide: true,
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold text-quest-dark">Intro to Accounting</h1>
        </div>
        
        <div className="flex-1 p-4 md:p-8 pt-8 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto relative">
            <Carousel 
              className="w-full"
              setApi={setCarouselApi}
              opts={{
                align: "center",
              }}
            >
              <div className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10">
                <CarouselPrevious className="relative left-0 right-auto translate-y-0" />
              </div>
              <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10">
                <CarouselNext className="relative right-0 left-auto translate-y-0" />
              </div>
              
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={slide.id} className="flex justify-center">
                    <Card className="w-full max-w-3xl border-none shadow-lg">
                      <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-center text-quest-dark mb-8">
                          {slide.title}
                        </h2>
                        {index === 0 ? (
                          <div className="space-y-6">
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="flex justify-center mb-8"
                            >
                              <Coins className="h-16 w-16 text-quest-secondary" />
                            </motion.div>
                            <motion.p 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="text-xl text-center mb-8"
                            >
                              Learn the <span className="font-bold text-quest-dark">language of business</span> that helps organizations track, report, and analyze their financial activities.
                            </motion.p>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.6, duration: 0.5 }}
                              className="flex justify-center"
                            >
                              <Button 
                                onClick={handleStartLearning}
                                size="lg"
                                className="bg-quest-primary hover:bg-quest-secondary text-white flex items-center gap-2 text-lg px-8"
                              >
                                Start Learning <ArrowRight className="ml-2" />
                              </Button>
                            </motion.div>
                          </div>
                        ) : (
                          slide.content
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="flex items-center gap-1">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlideIndex ? "w-8 bg-quest-primary" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        `}
      </style>
    </Layout>
  );
};

export default LearnAccounting;
