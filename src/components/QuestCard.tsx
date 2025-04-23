
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, PlayCircle, PauseCircle } from 'lucide-react';

type QuestStatus = 'not_started' | 'in_progress' | 'complete';

type QuestCardProps = {
  id: string;
  title: string;
  description: string;
  timeEstimate: string;
  status: QuestStatus;
  onStatusChange: (id: string, status: QuestStatus) => void;
  xpReward: number;
};

const QuestCard: React.FC<QuestCardProps> = ({
  id,
  title,
  description,
  timeEstimate,
  status,
  onStatusChange,
  xpReward,
}) => {
  const navigate = useNavigate();
  
  const handleStartQuest = () => {
    if (id === 'trial-balance') {
      navigate('/quests/trial-balance');
    } else if (id === 'trial-balance-lessons') {
      navigate('/quests/trial-balance-lessons');
    } else {
      onStatusChange(id, 'in_progress');
    }
  };

  const renderStatusButton = () => {
    switch (status) {
      case 'not_started':
        return (
          <Button 
            onClick={handleStartQuest} 
            className="w-full bg-quest-primary hover:bg-quest-secondary text-white mt-4"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Quest
          </Button>
        );
      case 'in_progress':
        return (
          <div className="flex space-x-2 mt-4">
            <Button 
              onClick={() => onStatusChange(id, 'complete')} 
              className="flex-1 bg-quest-green text-quest-dark border border-green-300 hover:bg-green-200"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete
            </Button>
            <Button 
              onClick={() => onStatusChange(id, 'not_started')} 
              variant="outline" 
              className="flex-1"
            >
              <PauseCircle className="w-4 h-4 mr-2" />
              Pause
            </Button>
          </div>
        );
      case 'complete':
        return (
          <Button 
            disabled 
            className="w-full bg-quest-light text-quest-primary mt-4 cursor-default"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Completed
          </Button>
        );
    }
  };

  return (
    <div className={`quest-card ${status === 'complete' ? 'border-quest-green bg-quest-green/5' : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-quest-dark">{title}</h3>
        <div className="bg-quest-light text-quest-primary text-xs font-medium px-2 py-1 rounded-full">
          +{xpReward} XP
        </div>
      </div>
      
      <p className="text-quest-neutral text-sm mt-2">{description}</p>
      
      <div className="flex items-center mt-4 text-xs text-quest-neutral">
        <Clock className="w-3 h-3 mr-1" />
        <span>{timeEstimate}</span>
      </div>
      
      {renderStatusButton()}
    </div>
  );
};

export default QuestCard;
