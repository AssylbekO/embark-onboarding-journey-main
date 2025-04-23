
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BrainCircuit, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Buddy = () => {
  const [activeTab, setActiveTab] = useState<"human" | "ai">("human");
  const [message, setMessage] = useState("");
  
  // Mock data for chat messages
  const [humanMessages, setHumanMessages] = useState([
    { sender: 'buddy', content: "Hi there! I'm Alex, your onboarding buddy. How can I help you today?" }
  ]);
  
  const [aiMessages, setAiMessages] = useState([
    { sender: 'ai', content: "Hello! I'm QuickAssist, your AI onboarding assistant. Feel free to ask me anything about the company or your onboarding process!" }
  ]);
  
  // Mock buddy data
  const humanBuddy = {
    name: 'Alex Johnson',
    role: 'Senior Product Designer',
    profilePicture: 'https://api.dicebear.com/7.x/personas/svg?seed=buddy',
  };

  const aiBuddy = {
    name: 'QuickAssist',
    role: 'AI Onboarding Assistant',
    profilePicture: 'https://api.dicebear.com/7.x/bottts/svg?seed=aibuddy',
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    if (activeTab === "human") {
      setHumanMessages([
        ...humanMessages,
        { sender: 'user', content: message }
      ]);
      
      // Mock response from human buddy (in a real app, this might come from a backend)
      setTimeout(() => {
        setHumanMessages(prev => [
          ...prev,
          { sender: 'buddy', content: "Thanks for reaching out! I'll check and get back to you on that soon." }
        ]);
      }, 1000);
    } else {
      setAiMessages([
        ...aiMessages,
        { sender: 'user', content: message }
      ]);
      
      // Mock response from AI (in a real app, this might use an AI model)
      setTimeout(() => {
        setAiMessages(prev => [
          ...prev,
          { sender: 'ai', content: "That's a great question! Here's what I know about that topic based on the company knowledge base..." }
        ]);
      }, 500);
    }
    
    setMessage("");
  };

  const currentMessages = activeTab === "human" ? humanMessages : aiMessages;
  const currentBuddy = activeTab === "human" ? humanBuddy : aiBuddy;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-quest-dark">Buddy System</h1>
        
        <Card className="h-[calc(100vh-260px)] flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                  <User className="w-6 h-6 text-quest-primary" />
                </div>
                <div>
                  <CardTitle>Your Buddy</CardTitle>
                  <CardDescription>Connect with your assigned buddy for guidance and support</CardDescription>
                </div>
              </div>
              
              <Tabs defaultValue="human" onValueChange={(value) => setActiveTab(value as "human" | "ai")} className="w-[240px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="human" className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>Person</span>
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4" />
                    <span>AI Assistant</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 pb-3 border-b">
              <Avatar>
                <AvatarImage src={currentBuddy.profilePicture} alt={currentBuddy.name} />
                <AvatarFallback>{currentBuddy.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{currentBuddy.name}</div>
                <div className="text-sm text-muted-foreground">{currentBuddy.role}</div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {currentMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-quest-primary text-white'
                        : 'bg-gray-100 text-quest-dark'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3 mt-auto">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${currentBuddy.name}...`}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Buddy;
