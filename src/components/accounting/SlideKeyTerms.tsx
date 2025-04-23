
import React from "react";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";

type FlipState = { [id: string]: boolean };
type Term = { id: string; term: string; definition: string };

type SlideKeyTermsProps = {
  keyTerms: Term[];
  flippedCards: FlipState;
  onFlipCard: (id: string) => void;
};

const SlideKeyTerms: React.FC<SlideKeyTermsProps> = ({
  keyTerms,
  flippedCards,
  onFlipCard,
}) => (
  <div className="space-y-6">
    <div className="flex justify-center mb-6">
      <ScrollText className="h-12 w-12 text-quest-secondary" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {keyTerms.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer h-32 w-full perspective-1000"
          onClick={() => onFlipCard(item.id)}
        >
          <motion.div
            className="relative w-full h-full transition-all duration-500"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flippedCards[item.id] ? 180 : 0 }}
          >
            <div
              className="absolute w-full h-full flex items-center justify-center 
                bg-gradient-to-br from-quest-light to-white rounded-md p-5 
                shadow-md border border-quest-neutral/20"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-xl font-semibold text-quest-dark">
                {item.term}
              </p>
            </div>

            <div
              className="absolute w-full h-full flex items-center justify-center 
                bg-gradient-to-br from-white to-quest-light/50 rounded-md p-5
                shadow-md border border-quest-neutral/20"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-md text-quest-dark">{item.definition}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
    <p className="text-sm text-center mt-4 text-quest-neutral">
      Click on a term to see its definition
    </p>
  </div>
);

export default SlideKeyTerms;
