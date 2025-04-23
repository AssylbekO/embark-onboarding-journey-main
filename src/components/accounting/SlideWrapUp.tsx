
import React from "react";
import { motion } from "framer-motion";
import { Banknote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SlideWrapUpProps = {
  onStartQuiz: () => void;
};

const SlideWrapUp: React.FC<SlideWrapUpProps> = ({ onStartQuiz }) => (
  <div className="space-y-6 flex flex-col items-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mb-6"
    >
      <Banknote className="h-16 w-16 text-quest-secondary" />
    </motion.div>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-xl text-center mb-8"
    >
      You've learned the basics of accounting! Now let's test your understanding with a comprehensive quiz.
    </motion.p>
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Button
        onClick={onStartQuiz}
        size="lg"
        className="bg-quest-primary hover:bg-quest-secondary text-white mt-4 text-lg px-8 py-6 flex items-center gap-2"
      >
        Start Quiz <ArrowRight className="ml-2" />
      </Button>
    </motion.div>
  </div>
);

export default SlideWrapUp;
