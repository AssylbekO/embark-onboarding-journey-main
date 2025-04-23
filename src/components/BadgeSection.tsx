
import React from 'react';
import { Lock } from 'lucide-react';

type Badge = {
  id: string;
  name: string;
  image: string;
  description: string;
  unlocked: boolean;
};

type BadgeSectionProps = {
  badges: Badge[];
};

const BadgeSection: React.FC<BadgeSectionProps> = ({ badges }) => {
  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-quest-dark">Your Badges</h2>
        <span className="text-sm text-quest-neutral">
          {unlockedCount} of {badges.length} collected
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`relative flex flex-col items-center p-4 rounded-lg ${
              badge.unlocked 
                ? "bg-white border border-quest-light" 
                : "bg-gray-100 border border-gray-200"
            }`}
          >
            <div className={`relative w-16 h-16 mb-2 ${badge.unlocked ? "" : "opacity-50"}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.unlocked ? "badge-glow" : ""}`}>
                {/* Badge image as bg */}
                <div 
                  className={`w-14 h-14 rounded-full bg-contain bg-center bg-no-repeat ${
                    badge.unlocked ? "" : "grayscale"
                  }`}
                  style={{ backgroundImage: `url(${badge.image})` }}
                ></div>
              </div>
              
              {!badge.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <h4 className={`text-sm font-medium text-center ${badge.unlocked ? "text-quest-dark" : "text-gray-400"}`}>
              {badge.name}
            </h4>
            
            <p className={`text-xs text-center mt-1 ${badge.unlocked ? "text-quest-neutral" : "text-gray-400"}`}>
              {badge.unlocked ? badge.description : "Coming soon"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeSection;
