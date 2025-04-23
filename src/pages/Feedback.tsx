
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, SmilePlus, Smile, Meh, Frown, HelpCircle, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Mood = 'great' | 'good' | 'okay' | 'challenging';

const Feedback = () => {
  const [activeTab, setActiveTab] = useState<"mood" | "faq" | "suggestions">("mood");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [challengeRating, setChallengeRating] = useState<string>("3");
  const [feedbackText, setFeedbackText] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  
  const handleMoodSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Let us know how you're feeling today",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feedback submitted",
      description: "Thank you for sharing how you're feeling today!",
    });
  };
  
  const handleSuggestionSubmit = () => {
    if (!suggestionText.trim()) {
      toast({
        title: "Empty suggestion",
        description: "Please enter your suggestion before submitting",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Suggestion received",
      description: "Thank you for helping us improve!",
    });
    setSuggestionText("");
  };

  const moods = [
    { value: 'great', label: 'Great', icon: <SmilePlus className="w-8 h-8" />, color: 'bg-green-100 text-green-600' },
    { value: 'good', label: 'Good', icon: <Smile className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
    { value: 'okay', label: 'Okay', icon: <Meh className="w-8 h-8" />, color: 'bg-yellow-100 text-yellow-600' },
    { value: 'challenging', label: 'Challenging', icon: <Frown className="w-8 h-8" />, color: 'bg-red-100 text-red-600' },
  ];

  const faqs = [
    { 
      question: "How long is the onboarding process?", 
      answer: "Our onboarding process typically takes 4-6 weeks to complete all levels, but you can progress at your own pace." 
    },
    { 
      question: "Who can I reach out to if I'm struggling?", 
      answer: "You can contact your assigned buddy, your manager, or use the AI assistant for immediate help." 
    },
    { 
      question: "Are all quests mandatory?", 
      answer: "Core quests are mandatory, while some additional quests are optional but recommended for a comprehensive onboarding experience." 
    },
    { 
      question: "How do I reset my progress?", 
      answer: "Please contact IT support or your HR representative to reset your onboarding progress if needed." 
    },
    { 
      question: "Can I revisit completed levels?", 
      answer: "Yes, all completed levels and content remain accessible even after you've finished them." 
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-quest-dark">Feedback</h1>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-quest-primary" />
                </div>
                <div>
                  <CardTitle>Share Your Thoughts</CardTitle>
                  <CardDescription>Provide feedback on your onboarding experience</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="mood" onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mood">Daily Mood</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mood" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">How are you feeling today?</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {moods.map((mood) => (
                        <div
                          key={mood.value}
                          className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
                            selectedMood === mood.value
                              ? `${mood.color} border-2`
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                          onClick={() => setSelectedMood(mood.value as Mood)}
                        >
                          <div className={`mb-2 ${selectedMood === mood.value ? 'text-current' : 'text-gray-400'}`}>
                            {mood.icon}
                          </div>
                          <span className={`text-sm font-medium ${selectedMood === mood.value ? 'text-current' : 'text-gray-500'}`}>
                            {mood.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">How challenging is your onboarding right now?</h3>
                    
                    <RadioGroup value={challengeRating} onValueChange={setChallengeRating} className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem value={value.toString()} id={`r${value}`} />
                          <Label htmlFor={`r${value}`}>{value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Not challenging</span>
                      <span>Very challenging</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Additional Comments</h3>
                    <Textarea 
                      placeholder="Share any additional thoughts about your onboarding experience..." 
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleMoodSubmit} className="w-full">Submit Feedback</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-quest-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium text-quest-dark">{faq.question}</h4>
                            <p className="text-sm text-quest-neutral mt-1">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="link">View All FAQs</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Improvement Suggestions</h3>
                  <p className="text-sm text-quest-neutral">
                    We're constantly working to improve our onboarding process. 
                    Please share your ideas on how we can make this experience better for you and future employees.
                  </p>
                  
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Your suggestion for improving the onboarding process..." 
                      className="min-h-[120px]"
                      value={suggestionText}
                      onChange={(e) => setSuggestionText(e.target.value)}
                    />
                    
                    <Button onClick={handleSuggestionSubmit} className="w-full flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Suggestion
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Feedback;
