import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';

type QuizFormValues = {
  q1: string;
  q2: string;
  q3: string;
};

const AccountingQuiz = () => {
  const navigate = useNavigate();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const form = useForm<QuizFormValues>({
    defaultValues: {
      q1: "",
      q2: "",
      q3: ""
    },
  });

  const onSubmitQuiz = (data: QuizFormValues) => {
    let score = 0;
    if (data.q1 === "c") score++;
    if (data.q2 === "b") score++;
    if (data.q3 === "b") score++;
    
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/learn/accounting')}
            className="border-quest-light hover:bg-quest-light"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-quest-dark">Accounting Quiz</h1>
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Test Your Knowledge</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitQuiz)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="q1"
                      render={({ field }) => (
                        <FormItem className="space-y-3 border-b pb-6">
                          <FormLabel className="text-lg font-medium">Q1: Which of the following is an asset?</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="a" id="q1-a" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q1-a">
                                  A) Rent expense
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="b" id="q1-b" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q1-b">
                                  B) Bank loan
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="c" id="q1-c" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q1-c">
                                  C) Office furniture
                                </FormLabel>
                                {quizSubmitted && field.value === "c" && (
                                  <span className="ml-2 text-green-600 flex items-center">
                                    <CheckCircle2 className="h-4 w-4 mr-1" /> Correct
                                  </span>
                                )}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="d" id="q1-d" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q1-d">
                                  D) Utilities
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          {quizSubmitted && field.value !== "c" && (
                            <p className="text-orange-600 text-sm">
                              The correct answer is C) Office furniture. Furniture is something the business owns (an asset).
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="q2"
                      render={({ field }) => (
                        <FormItem className="space-y-3 border-b pb-6">
                          <FormLabel className="text-lg font-medium">Q2: What is the accounting equation?</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="a" id="q2-a" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q2-a">
                                  A) Revenue = Expenses + Profit
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="b" id="q2-b" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q2-b">
                                  B) Assets = Liabilities + Equity
                                </FormLabel>
                                {quizSubmitted && field.value === "b" && (
                                  <span className="ml-2 text-green-600 flex items-center">
                                    <CheckCircle2 className="h-4 w-4 mr-1" /> Correct
                                  </span>
                                )}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="c" id="q2-c" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q2-c">
                                  C) Cash = Revenue - Expenses
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="d" id="q2-d" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q2-d">
                                  D) Assets = Income + Liabilities
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          {quizSubmitted && field.value !== "b" && (
                            <p className="text-orange-600 text-sm">
                              The correct answer is B) Assets = Liabilities + Equity. This is the fundamental equation in accounting.
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="q3"
                      render={({ field }) => (
                        <FormItem className="space-y-3 border-b pb-6">
                          <FormLabel className="text-lg font-medium">Q3: If a company pays €200 for electricity, which is correct?</FormLabel>
                          <FormControl>
                            <RadioGroup 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="a" id="q3-a" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q3-a">
                                  A) Debit: Cash; Credit: Expense
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="b" id="q3-b" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q3-b">
                                  B) Debit: Utilities Expense; Credit: Cash
                                </FormLabel>
                                {quizSubmitted && field.value === "b" && (
                                  <span className="ml-2 text-green-600 flex items-center">
                                    <CheckCircle2 className="h-4 w-4 mr-1" /> Correct
                                  </span>
                                )}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="c" id="q3-c" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q3-c">
                                  C) Debit: Revenue; Credit: Utilities
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="d" id="q3-d" />
                                </FormControl>
                                <FormLabel className="font-normal" htmlFor="q3-d">
                                  D) Debit: Equity; Credit: Liability
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          {quizSubmitted && field.value !== "b" && (
                            <p className="text-orange-600 text-sm">
                              The correct answer is B) Debit: Utilities Expense; Credit: Cash. When you pay for expenses, you increase expenses (debit) and decrease cash (credit).
                            </p>
                          )}
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col items-center space-y-4">
                      {!quizSubmitted ? (
                        <Button type="submit" className="w-full md:w-auto bg-quest-primary hover:bg-quest-secondary text-white px-8 py-6 text-lg">
                          Submit Answers
                        </Button>
                      ) : (
                        <>
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md text-center w-full">
                            <p className="font-medium text-xl mb-2">Your score: {quizScore}/3</p>
                            {quizScore === 3 ? (
                              <p className="text-green-600">Perfect! You've mastered the basics! 🎉</p>
                            ) : quizScore >= 2 ? (
                              <p className="text-blue-600">Well done! Let's continue learning!</p>
                            ) : (
                              <p className="text-orange-600">Keep reviewing and try again!</p>
                            )}
                          </div>
                          
                          <div className="flex gap-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                form.reset();
                                setQuizSubmitted(false);
                              }}
                            >
                              Try Again
                            </Button>
                            
                            <Button 
                              type="button"
                              onClick={() => navigate('/learn/accounting/case-study')}
                              className="bg-quest-primary hover:bg-quest-secondary text-white flex items-center gap-2"
                            >
                              Continue to Case Study <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountingQuiz;
