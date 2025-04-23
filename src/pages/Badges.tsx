
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Lock } from 'lucide-react';

const Badges = () => {
  // Badge data from Level 1
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

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-quest-dark">Badges</h1>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                <Award className="w-6 h-6 text-quest-primary" />
              </div>
              <div>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements you've earned through your onboarding journey</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badgesData.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center p-4 border border-gray-100 rounded-lg text-center">
                  <div className="relative w-16 h-16 mb-3">
                    <div className={`w-full h-full rounded-full overflow-hidden ${badge.unlocked ? '' : 'opacity-40'}`}>
                      <img src={badge.image} alt={badge.name} className="w-full h-full object-cover" />
                    </div>
                    {!badge.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-quest-dark">{badge.name}</h3>
                  <p className="text-sm text-quest-neutral mt-1">{badge.description}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${badge.unlocked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {badge.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
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

export default Badges;
