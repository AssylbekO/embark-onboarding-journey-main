
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const SlideWhyMatters: React.FC = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mb-6"
    >
      <CheckCircle2 className="h-12 w-12 text-quest-secondary" />
    </motion.div>
    <motion.ul
      className="space-y-4 text-lg"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
    >
      {[
        { icon: "→", text: "Helps track income and expenses" },
        { icon: "→", text: "Ensures legal compliance with tax laws" },
        { icon: "→", text: "Provides data for decision-making" },
        { icon: "→", text: "Attracts investors by showing financial health" },
      ].map((item, index) => (
        <motion.li
          key={index}
          className="flex gap-2 bg-quest-yellow/30 p-3 rounded-md"
          variants={{
            visible: {
              opacity: 1,
              x: 0,
              transition: { delay: index * 0.2 },
            },
            hidden: { opacity: 0, x: -20 },
          }}
        >
          <span className="text-quest-secondary font-bold">{item.icon}</span>
          <span>
            <span className="font-bold">{item.text}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  </div>
);

export default SlideWhyMatters;
