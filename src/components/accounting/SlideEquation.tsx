import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormControl, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type EquationQuizForm = {
  equity: string;
};

type SlideEquationProps = {
  form: UseFormReturn<EquationQuizForm>;
  submitted: boolean;
  correct: boolean;
  animateEquation: boolean;
  onSubmit: (data: EquationQuizForm) => void;
};

const SlideEquation: React.FC<SlideEquationProps> = ({
  form,
  submitted,
  correct,
  animateEquation,
  onSubmit,
}) => (
  <div className="space-y-6">
    <div className="flex justify-center mb-6">
      <Scale className="h-12 w-12 text-quest-secondary" />
    </div>
    <div className="bg-quest-light/20 p-6 rounded-md text-center">
      <div className="flex flex-col space-y-6 items-center">
        {animateEquation ? (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold text-quest-dark"
            >
              Assets = Liabilities + Equity
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-lg"
            >
              This fundamental equation must always be balanced
            </motion.p>
          </div>
        ) : (
          <div className="text-2xl font-bold text-quest-dark mb-4">
            Assets = Liabilities + Equity
          </div>
        )}
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: animateEquation ? 1 : 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="bg-gray-50 p-4 rounded-md mt-6"
    >
      <p className="font-medium mb-2">Example:</p>
      <p>
        If you start a business with €10,000 cash (asset) and take a loan of €5,000 (liability):
      </p>
      <p className="font-bold mt-2">€10,000 = €5,000 + €5,000</p>
      <p className="mt-1 text-sm text-gray-600">Your equity is €5,000</p>
    </motion.div>

    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: animateEquation ? "auto" : 0,
        opacity: animateEquation ? 1 : 0,
      }}
      transition={{ delay: 2, duration: 0.5 }}
      className="bg-quest-green/30 p-6 rounded-md overflow-hidden"
    >
      <h3 className="font-bold text-lg mb-4">Practice Question:</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="equity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">
                  If Assets = €9,000 and Liabilities = €4,000, what is the Equity?
                </FormLabel>
                <div className="flex items-center gap-2">
                  <span>€</span>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Enter amount"
                      className="w-32 px-3 py-2 border rounded-md"
                      {...field}
                      disabled={submitted}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          {!submitted ? (
            <Button className="bg-quest-primary hover:bg-quest-secondary text-white" type="submit">
              Check Answer
            </Button>
          ) : (
            <div
              className={`p-3 rounded-md ${
                correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {correct
                ? "Correct! Equity = Assets - Liabilities = €9,000 - €4,000 = €5,000"
                : "Not quite. Remember: Equity = Assets - Liabilities = €9,000 - €4,000 = €5,000"}
            </div>
          )}
        </form>
      </Form>
    </motion.div>
  </div>
);

export default SlideEquation;