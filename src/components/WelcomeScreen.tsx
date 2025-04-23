
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

type WelcomeScreenProps = {
  userName: string;
  onStart: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ userName, onStart }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-quest-light rounded-2xl shadow-xl p-8 md:p-12">
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-quest-primary/10 rounded-full"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-quest-blue/10 rounded-full"></div>
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-quest-dark mb-3">
          Welcome, <span className="text-quest-primary">{userName}!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-quest-neutral max-w-2xl mb-6">
          Get ready to explore your new company through a series of fun, interactive quests.
          This gamified onboarding experience will help you learn everything you need to know!
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-sm text-quest-secondary">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-quest-light text-quest-primary">
              1
            </div>
            <span>Complete quests to gain experience</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-quest-secondary">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-quest-light text-quest-primary">
              2
            </div>
            <span>Earn badges as you progress</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-quest-secondary">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-quest-light text-quest-primary">
              3
            </div>
            <span>Connect with your buddy for help</span>
          </div>
        </div>
        
        <div className="mt-8">
          <Button 
            onClick={onStart}
            className="bg-quest-primary hover:bg-quest-secondary text-white px-8 py-6 rounded-xl text-lg font-medium flex items-center transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
            <ChevronRight className="ml-2 animate-pulse" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
