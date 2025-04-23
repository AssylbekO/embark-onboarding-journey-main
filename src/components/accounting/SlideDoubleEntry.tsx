import React from "react";
import { BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type DragDropForm = {
  debit: string;
  credit: string;
};

type SlideDoubleEntryProps = {
  form: UseFormReturn<DragDropForm>;
  dragSuccess: boolean;
  onSubmit: (data: DragDropForm) => void;
  onReset: () => void;
};

const SlideDoubleEntry: React.FC<SlideDoubleEntryProps> = ({
  form,
  dragSuccess,
  onSubmit,
  onReset,
}) => (
  <div className="space-y-6">
    <div className="flex justify-center mb-6">
      <BookmarkCheck className="h-12 w-12 text-quest-secondary" />
    </div>
    <p className="text-lg mb-4 bg-quest-pink/30 p-4 rounded-md">
      Every transaction affects at least two accounts and must keep the accounting equation balanced.
    </p>

    <div className="bg-white p-6 rounded-md shadow-md">
      <p className="font-medium mb-4">Record the following transaction:</p>
      <div className="bg-quest-yellow/30 p-3 rounded-md mb-6">
        <p className="text-center font-medium">Paid rent €1,000</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Debit side */}
            <div className="space-y-4">
              <h3 className="font-bold text-center">Debit (Increase)</h3>
              <FormField
                control={form.control}
                name="debit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter account to debit"
                        className="w-full text-center"
                        disabled={dragSuccess}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Credit side */}
            <div className="space-y-4">
              <h3 className="font-bold text-center">Credit (Decrease)</h3>
              <FormField
                control={form.control}
                name="credit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter account to credit"
                        className="w-full text-center"
                        disabled={dragSuccess}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {dragSuccess ? (
            <div className="mt-6 bg-green-50 p-3 rounded-md text-center text-green-700">
              <p className="font-medium">
                Correct! You've recorded the transaction properly.
              </p>
              <p className="mt-1">
                Debit: Rent Expense €1,000 | Credit: Cash €1,000
              </p>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-quest-primary hover:bg-quest-secondary text-white"
                disabled={!form.getValues().debit || !form.getValues().credit}
              >
                Check Answer
              </Button>
              <Button
                type="button"
                onClick={onReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                disabled={!form.getValues().debit && !form.getValues().credit}
              >
                Reset
              </Button>
            </div>
          )}
        </form>
      </Form>

      <div className="mt-4 bg-quest-light/30 p-3 rounded-md">
        <p className="text-sm text-quest-neutral">
          <strong>Hint:</strong> When you pay rent, which account increases (debit) and which account decreases (credit)?
        </p>
      </div>
    </div>
  </div>
);

export default SlideDoubleEntry;
