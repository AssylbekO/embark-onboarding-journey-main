
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmilePlus, Smile, Meh, Frown } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'challenging';

type DailyCheckInProps = {
  onMoodSelected: (mood: Mood) => void;
  lastCheckIn: Date | null;
};

const DailyCheckIn: React.FC<DailyCheckInProps> = ({ onMoodSelected, lastCheckIn }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [submitted, setSubmitted] = useState(!!lastCheckIn);
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };
  
  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood);
      setSubmitted(true);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const moods = [
    { value: 'great', label: 'Great', icon: <SmilePlus className="w-8 h-8" />, color: 'bg-quest-green text-green-600' },
    { value: 'good', label: 'Good', icon: <Smile className="w-8 h-8" />, color: 'bg-quest-yellow text-yellow-600' },
    { value: 'okay', label: 'Okay', icon: <Meh className="w-8 h-8" />, color: 'bg-quest-orange text-orange-600' },
    { value: 'challenging', label: 'Challenging', icon: <Frown className="w-8 h-8" />, color: 'bg-quest-pink text-red-600' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-quest-dark mb-4">Daily Check-In</h2>
      
      {submitted ? (
        <div className="text-center py-4">
          <div className="text-quest-neutral mb-2">
            Thank you for checking in today!
          </div>
          {lastCheckIn && (
            <div className="text-xs text-quest-neutral">
              Last check-in: {formatDate(lastCheckIn)}
            </div>
          )}
          <Button 
            variant="link" 
            onClick={() => setSubmitted(false)} 
            className="text-quest-primary mt-2"
          >
            Update my mood
          </Button>
        </div>
      ) : (
        <>
          <p className="text-quest-neutral mb-4">How are you feeling today?</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {moods.map((mood) => (
              <div
                key={mood.value}
                className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                  selectedMood === mood.value
                    ? `${mood.color} border-2`
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleMoodSelect(mood.value as Mood)}
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
          
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full bg-quest-primary hover:bg-quest-secondary"
          >
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default DailyCheckIn;
