
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type MiniQuizForm = {
  q1: string;
};

type SlideMiniQuizProps = {
  form: UseFormReturn<MiniQuizForm>;
  submitted: boolean;
  correct: boolean;
  onSubmit: (data: MiniQuizForm) => void;
  onContinue: () => void;
};

const SlideMiniQuiz: React.FC<SlideMiniQuizProps> = ({
  form,
  submitted,
  correct,
  onSubmit,
  onContinue,
}) => (
  <div className="space-y-6">
    <div className="flex justify-center mb-6">
      <CheckCircle2 className="h-12 w-12 text-quest-secondary" />
    </div>

    <div className="bg-gradient-to-br from-quest-green/50 to-white p-6 rounded-md shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="q1"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-medium">
                  What is the primary purpose of accounting?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                    disabled={submitted}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="a" id="q1-a" />
                      </FormControl>
                      <FormLabel className="font-normal" htmlFor="q1-a">
                        To maximize business profits
                      </FormLabel>
                      {submitted && field.value === "a" && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="b" id="q1-b" />
                      </FormControl>
                      <FormLabel className="font-normal" htmlFor="q1-b">
                        To record, analyze, and report financial information
                      </FormLabel>
                      {submitted && field.value === "b" && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="c" id="q1-c" />
                      </FormControl>
                      <FormLabel className="font-normal" htmlFor="q1-c">
                        To handle marketing and sales activities
                      </FormLabel>
                      {submitted && field.value === "c" && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                {submitted && (
                  <div
                    className={`p-3 rounded-md mt-2 ${
                      correct
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {correct
                      ? "Correct! Accounting is all about recording, analyzing, and reporting financial information."
                      : "Not quite. Accounting is primarily about recording, analyzing, and reporting financial information - not about maximizing profits or handling marketing."}
                  </div>
                )}
              </FormItem>
            )}
          />

          {!submitted ? (
            <Button
              type="submit"
              className="w-full md:w-auto bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onContinue}
              className="w-full md:w-auto bg-quest-primary hover:bg-quest-secondary text-white flex items-center gap-2"
            >
              Continue Learning <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </form>
      </Form>
    </div>
  </div>
);

export default SlideMiniQuiz;
