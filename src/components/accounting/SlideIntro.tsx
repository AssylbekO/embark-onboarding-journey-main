
import React from "react";
import { motion } from "framer-motion";
import { Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SlideIntroProps = {
  onStartLearning: () => void;
};

const SlideIntro: React.FC<SlideIntroProps> = ({ onStartLearning }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <Coins className="h-16 w-16 text-quest-secondary" />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl text-center mb-8"
      >
        Learn the <span className="font-bold text-quest-dark">language of business</span> that helps organizations track, report, and analyze their financial activities.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center"
      >
        <Button
          onClick={onStartLearning}
          size="lg"
          className="bg-quest-primary hover:bg-quest-secondary text-white flex items-center gap-2 text-lg px-8"
        >
          Start Learning <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default SlideIntro;
