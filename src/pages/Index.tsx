import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeScreen from '@/components/WelcomeScreen';
import { ProgressMap } from '@/components/ProgressMap';
import QuestCard from '@/components/QuestCard';
import BadgeSection from '@/components/BadgeSection';
import BuddyPanel from '@/components/BuddyPanel';
import DailyCheckIn from '@/components/DailyCheckIn';
import { BrainCircuit, Laptop, Users, Building } from 'lucide-react';

// Mock quests data
const questsData = [
  {
    id: '1',
    title: 'Learn how to use Slack',
    description: 'Get familiar with our main communication tool',
    timeEstimate: '5 minutes',
    status: 'complete',
    xpReward: 10,
  },
  {
    id: '2',
    title: 'Set up your workstation',
    description: 'Configure your computer with all necessary software',
    timeEstimate: '15 minutes',
    status: 'in_progress',
    xpReward: 25,
  },
  {
    id: '3',
    title: 'Review the company handbook',
    description: 'Learn about our policies and procedures',
    timeEstimate: '10 minutes',
    status: 'not_started',
    xpReward: 15,
  },
  {
    id: '4',
    title: 'Schedule 1:1 with your manager',
    description: 'Set up your first meeting with your direct supervisor',
    timeEstimate: '5 minutes',
    status: 'not_started',
    xpReward: 10,
  }
];

// Mock badges data
const badgesData = [
  {
    id: '1',
    name: 'First Steps',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=badge1',
    description: 'Completed your first task',
    unlocked: true,
  },
  {
    id: '2',
    name: 'Tech Savvy',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=badge2',
    description: 'Set up all your tools',
    unlocked: true,
  },
  {
    id: '3',
    name: 'Team Player',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=badge3',
    description: 'Met your team members',
    unlocked: false,
  },
  {
    id: '4',
    name: 'Knowledge Base',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=badge4',
    description: 'Read all documentation',
    unlocked: false,
  },
  {
    id: '5',
    name: 'Fast Learner',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=badge5',
    description: 'Completed Level 1 in record time',
    unlocked: false,
  }
];

// Mock buddy data (human and AI)
const humanBuddyData = {
  name: 'Alex Johnson',
  role: 'Senior Product Designer',
  profilePicture: 'https://api.dicebear.com/7.x/personas/svg?seed=buddy',
  email: 'alex.johnson@company.com',
  phone: '+1 (555) 123-4567',
  isAI: false,
};

const aiBuddyData = {
  name: 'QuickAssist',
  role: 'AI Onboarding Assistant',
  profilePicture: 'https://api.dicebear.com/7.x/bottts/svg?seed=aibuddy',
  email: 'quickassist@company.com',
  phone: '',
  isAI: true,
};

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [quests, setQuests] = useState(questsData);
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);
  
  // Handle quest status change
  const handleQuestStatusChange = (id: string, status: 'not_started' | 'in_progress' | 'complete') => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === id ? { ...quest, status } : quest
      )
    );
  };
  
  // Handle mood selection
  const handleMoodSelected = (mood: 'great' | 'good' | 'okay' | 'challenging') => {
    console.log(`Mood selected: ${mood}`);
    setLastCheckIn(new Date());
  };
  
  // Handle welcome screen start button
  const handleStartJourney = () => {
    setShowWelcome(false);
  };
  
  // Calculating XP based on completed quests
  const totalXp = quests.reduce((sum, quest) => {
    return sum + (quest.status === 'complete' ? quest.xpReward : 0);
  }, 0);
  
  // Maximum possible XP
  const maxXp = quests.reduce((sum, quest) => sum + quest.xpReward, 0);
  
  const levels = [
    {
      id: 1,
      title: "Meet the Company",
      description: "Learn about our history and values",
      icon: <Building size={32} />,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Tools & Platforms",
      description: "Get familiar with our tech stack",
      icon: <Laptop size={32} />,
      completed: false,
      active: true,
    },
    {
      id: 3,
      title: "Your Role",
      description: "Understanding your responsibilities",
      icon: <BrainCircuit size={32} />,
      completed: false,
      active: true,
    },
    {
      id: 4,
      title: "Meet the Team",
      description: "Connect with your colleagues",
      icon: <Users size={32} />,
      completed: false,
      active: false,
    },
  ];
  
  const handleLevelSelect = (levelId: number) => {
    console.log(`Level ${levelId} selected`);
  };
  
  return (
    <Layout>
      {showWelcome ? (
        <div className="max-w-4xl mx-auto">
          <WelcomeScreen userName="Sarah" onStart={handleStartJourney} />
        </div>
      ) : (
        <div className="space-y-8">
          <ProgressMap 
            xp={totalXp} 
            maxXp={maxXp} 
            levels={levels} 
            onLevelSelect={handleLevelSelect} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-quest-dark mb-4">Current Quests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    id={quest.id}
                    title={quest.title}
                    description={quest.description}
                    timeEstimate={quest.timeEstimate}
                    status={quest.status as 'not_started' | 'in_progress' | 'complete'}
                    onStatusChange={handleQuestStatusChange}
                    xpReward={quest.xpReward}
                  />
                ))}
              </div>
              
              <BadgeSection badges={badgesData} />
            </div>
            
            <div className="space-y-6">
              <DailyCheckIn 
                onMoodSelected={handleMoodSelected}
                lastCheckIn={lastCheckIn}
              />
              <BuddyPanel 
                humanBuddy={humanBuddyData} 
                aiBuddy={aiBuddyData} 
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
