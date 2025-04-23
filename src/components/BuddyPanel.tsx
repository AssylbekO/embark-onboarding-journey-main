
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, HelpCircle, BrainCircuit, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Buddy = {
  name: string;
  role: string;
  profilePicture: string;
  email: string;
  phone: string;
  isAI?: boolean;
};

type BuddyPanelProps = {
  humanBuddy: Buddy;
  aiBuddy: Buddy;
};

const BuddyPanel: React.FC<BuddyPanelProps> = ({ humanBuddy, aiBuddy }) => {
  const [activeTab, setActiveTab] = useState<"human" | "ai">("human");
  
  const currentBuddy = activeTab === "human" ? humanBuddy : aiBuddy;
  
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-quest-dark mb-4">Your Buddy</h2>
        
        <Tabs defaultValue="human" onValueChange={(value) => setActiveTab(value as "human" | "ai")} className="mb-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="human" className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Person</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="human">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-quest-light">
                <img 
                  src={humanBuddy.profilePicture} 
                  alt={humanBuddy.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-medium text-quest-dark text-lg">{humanBuddy.name}</h3>
                <p className="text-quest-neutral">{humanBuddy.role}</p>
                
                <div className="mt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto flex items-center text-quest-primary border-quest-light hover:bg-quest-light"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 flex items-center justify-center text-quest-secondary border-quest-light hover:bg-quest-light"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 flex items-center justify-center text-quest-secondary border-quest-light hover:bg-quest-light"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-quest-light bg-quest-light flex items-center justify-center">
                <BrainCircuit size={48} className="text-quest-primary" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-medium text-quest-dark text-lg">{aiBuddy.name}</h3>
                <p className="text-quest-neutral">{aiBuddy.role}</p>
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto flex items-center text-quest-primary border-quest-light hover:bg-quest-light"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-quest-neutral mt-3">
              Available 24/7 to answer any questions about your onboarding process
            </p>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-6">
        <h3 className="font-medium text-quest-dark flex items-center mb-3">
          <HelpCircle className="w-4 h-4 mr-2 text-quest-primary" />
          Need Help?
        </h3>
        
        <div className="space-y-2 text-sm">
          <a href="#" className="block p-2 bg-quest-light rounded-lg hover:bg-quest-light/70 transition-colors">
            How to complete quests?
          </a>
          <a href="#" className="block p-2 bg-quest-light rounded-lg hover:bg-quest-light/70 transition-colors">
            What are badges for?
          </a>
          <a href="#" className="block p-2 bg-quest-light rounded-lg hover:bg-quest-light/70 transition-colors">
            Having technical issues?
          </a>
          <a href="#" className="block p-2 text-center text-quest-primary hover:underline">
            View all FAQs
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuddyPanel;
