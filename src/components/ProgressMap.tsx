
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Laptop, Users, Building } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type Level = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
};

type ProgressMapProps = {
  xp: number;
  maxXp: number;
  levels: Level[];
  onLevelSelect: (levelId: number) => void;
};

const ProgressMap: React.FC<ProgressMapProps> = ({ xp, maxXp, levels, onLevelSelect }) => {
  const xpPercentage = Math.min(Math.round((xp / maxXp) * 100), 100);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLevelClick = (levelId: number) => {
    onLevelSelect(levelId);
    
    // Navigate to the appropriate level page
    if (levelId === 2) {
      navigate('/level/2');
    } else if (levelId === 3) {
      navigate('/level/3');
    } else if (levelId === 4) {
      // To be implemented when level 4 is created
      console.log('Level 4 selected');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-quest-dark">Your Progress</h2>
        <div className="bg-quest-light rounded-full px-4 py-1 text-sm">
          <span className="text-quest-primary font-medium">{xp} XP</span> / {maxXp} XP
        </div>
      </div>
      
      <Progress value={xpPercentage} className="h-2 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`relative cursor-pointer card-hover ${
              level.completed
                ? "bg-quest-light border-quest-primary"
                : level.active
                ? "bg-white border-quest-primary border-2 shadow-md" // Updated to make Level 3 more prominent and clickable
                : "bg-gray-100 border-gray-200"
            } border-2 rounded-xl p-4 flex flex-col items-center justify-center text-center`}
            onClick={() => handleLevelClick(level.id)}
          >
            {level.completed && (
              <div className="absolute top-2 right-2 bg-quest-primary text-white rounded-full p-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
            
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                level.completed
                  ? "bg-quest-primary text-white"
                  : level.active
                  ? "bg-quest-light text-quest-primary"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {level.icon}
            </div>
            
            <h3 className={`font-medium mb-1 ${level.completed || level.active ? "text-quest-dark" : "text-gray-400"}`}>
              Level {level.id}: {level.title}
            </h3>
            
            <p className={`text-sm ${level.completed || level.active ? "text-quest-neutral" : "text-gray-400"}`}>
              {level.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default export uses the levels data
const ProgressMapWithData = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
      completed: currentPath === '/level/3',
      active: currentPath === '/level/2',
    },
    {
      id: 3,
      title: "Your Role",
      description: "Understanding your responsibilities",
      icon: <BrainCircuit size={32} />,
      completed: false,
      active: currentPath === '/level/3',
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
    <ProgressMap 
      xp={150} 
      maxXp={500} 
      levels={levels} 
      onLevelSelect={handleLevelSelect} 
    />
  );
};

// Export both components
export { ProgressMap };
export default ProgressMapWithData;

