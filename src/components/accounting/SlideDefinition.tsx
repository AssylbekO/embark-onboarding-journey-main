import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const SlideDefinition: React.FC = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.7 }}
      className="flex justify-center mb-6"
    >
      <BookOpen className="h-12 w-12 text-quest-secondary" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-quest-light/30 p-6 rounded-md border-l-4 border-quest-primary"
    >
      <p className="text-lg">
        Accounting is the process of{" "}
        <span className="font-bold">
          recording, summarizing, analyzing, and reporting
        </span>{" "}
        financial transactions of a business.
      </p>
      <p className="text-lg mt-4">
        It provides a clear picture of a company's financial health, helping stakeholders make informed decisions.
      </p>
    </motion.div>
  </div>
);

export default SlideDefinition;
