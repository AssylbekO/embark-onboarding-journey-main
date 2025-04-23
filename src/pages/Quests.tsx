
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Check, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Quests = () => {
  // Quest data from Level 1
  const level1Quests = [
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

  // Function to render status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'not_started':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-quest-dark">Quests</h1>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                <Map className="w-6 h-6 text-quest-primary" />
              </div>
              <div>
                <CardTitle>Available Quests</CardTitle>
                <CardDescription>Complete quests to earn XP and badges</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-lg font-medium text-quest-dark">Level 1: Meet the Company</h3>
                <Badge variant="outline" className="bg-quest-light text-quest-primary">Introductory</Badge>
              </div>
              
              {level1Quests.map((quest) => (
                <div key={quest.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-quest-dark">{quest.title}</h4>
                        <Badge variant="outline" className="text-xs">{quest.xpReward} XP</Badge>
                      </div>
                      <p className="text-sm text-quest-neutral">{quest.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-quest-neutral">
                        <Clock className="w-3 h-3" />
                        <span>{quest.timeEstimate}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderStatusIcon(quest.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quests;
