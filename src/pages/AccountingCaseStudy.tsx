import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

type AnswerStatus = 'not_submitted' | 'submitted' | 'completed';

interface CaseStudyAnswers {
  lemonadeStand: string;
  supplies: string;
  cash: string;
  totalAssets: string;
  liabilities: string;
  equity: string;
  je1_debitAcct: string;
  je1_debitAmt: string;
  je1_creditAcct: string;
  je1_creditAmt: string;
  je2_debitAcct: string;
  je2_debitAmt: string;
  je2_creditAcct: string;
  je2_creditAmt: string;
  je3_debitAcct: string;
  je3_debitAmt: string;
  je3_creditAcct: string;
  je3_creditAmt: string;
}

const AccountingCaseStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('not_submitted');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const form = useForm<CaseStudyAnswers>({
    defaultValues: {
      lemonadeStand: '',
      supplies: '',
      cash: '',
      totalAssets: '',
      liabilities: '',
      equity: '',
      je1_debitAcct: '',
      je1_debitAmt: '',
      je1_creditAcct: '',
      je1_creditAmt: '',
      je2_debitAcct: '',
      je2_debitAmt: '',
      je2_creditAcct: '',
      je2_creditAmt: '',
      je3_debitAcct: '',
      je3_debitAmt: '',
      je3_creditAcct: '',
      je3_creditAmt: '',
    },
  });

  const handleSubmitAnswers = form.handleSubmit((data) => {
    setAnswerStatus('submitted');

    const assetsOk =
      data.lemonadeStand === '80' &&
      data.supplies === '50' &&
      data.cash === '70' &&
      data.totalAssets === '200';
    const liabilitiesOk = data.liabilities === '0' || /none|zero/.test(data.liabilities);
    const equityOk = data.equity === '200' && /owner/i.test(data.equity);
    const jeOk =
      /cash/i.test(data.je1_debitAcct) &&
      data.je1_debitAmt === '200' &&
      /owner/i.test(data.je1_creditAcct) &&
      data.je1_creditAmt === '200';

    if (assetsOk && liabilitiesOk && equityOk && jeOk) {
      setFeedbackMessage(
        "Great job! You've correctly populated the asset line items, liabilities, equity, and at least the first journal entry."
      );
      toast({
        title: 'Well done!',
        description: "You've demonstrated solid understanding of how initial investment flows through the accounting equation.",
      });
    } else {
      setFeedbackMessage(
        'Some entries don’t match the model answers—double-check your numbers and account names.'
      );
      toast({
        variant: 'destructive',
        description:
          'Keep practicing! Make sure Assets = Liabilities + Equity and each journal entry debits and credits correctly.',
      });
    }
  });

  const handleComplete = () => {
    setAnswerStatus('completed');
    toast({
      title: 'Module Complete! 🎉',
      description: 'You’ve finished the lemonade stand accounting case study.',
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/learn/accounting/quiz')}
            className="border-quest-light hover:bg-quest-light"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-quest-dark">Accounting Case Study</h1>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                {/* Scenario */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">The Lemonade Stand</h2>
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Scenario</h3>
                  <p className="mb-3">
                    You decide to start a lemonade stand. You invest €200 of your own money to get it started. With that money, you purchase:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A second-hand lemonade stand for €80</li>
                    <li>Supplies (lemons, sugar, cups) for €50</li>
                    <li>The remaining €70 is kept as cash for making change</li>
                  </ul>
                </div>

                {/* Task */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Task</h3>
  <p className="text-lg mb-6">
    Using the accounting equation <code>Assets = Liabilities + Equity</code> and double-entry bookkeeping, fill in the tables below:
  </p>

  {answerStatus === 'not_submitted' && (
    <Form {...form}>
      <form onSubmit={handleSubmitAnswers} className="space-y-8">
        {/* Q1: Assets */}
        <div>
          <h4 className="font-medium mb-3">1. What are your assets?</h4>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-1 text-left">Asset</th>
                <th className="border px-3 py-1">Amount (€)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Lemonade Stand (Equipment)', name: 'lemonadeStand' },
                { label: 'Supplies',               name: 'supplies'       },
                { label: 'Cash',                   name: 'cash'           },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="border px-3 py-2">{row.label}</td>
                  <td className="border px-3 py-2">
                    <FormField
                      control={form.control}
                      name={row.name as keyof CaseStudyAnswers}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="0"
                            type="number"
                            className="w-full placeholder-opacity-[0.65]"
                          />
                        </FormControl>
                      )}
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="border px-3 py-2 font-medium">Total Assets</td>
                <td className="border px-3 py-2">
                  <FormField
                    control={form.control}
                    name="totalAssets"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          className="w-full placeholder-opacity-[0.65]"
                        />
                      </FormControl>
                    )}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Q2: Liabilities */}
        <div>
          <h4 className="font-medium mb-3">2. What are your liabilities?</h4>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-1 text-left">Liability</th>
                <th className="border px-3 py-1">Amount (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Liability</td>
                <td className="border px-3 py-2">
                  <FormField
                    control={form.control}
                    name="liabilities"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          className="w-full placeholder-opacity-[0.65]"
                        />
                      </FormControl>
                    )}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Q3: Equity */}
        <div>
          <h4 className="font-medium mb-3">3. What is your equity?</h4>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-1 text-left">Equity</th>
                <th className="border px-3 py-1">Amount (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Owner’s Investment</td>
                <td className="border px-3 py-2">
                  <FormField
                    control={form.control}
                    name="equity"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          className="w-full placeholder-opacity-[0.65]"
                        />
                      </FormControl>
                    )}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Q4: Journal Entries */}
        <div>
          <h4 className="font-medium mb-3">4. What journal entries record these?</h4>
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Account</th>
                <th className="border px-2 py-1">Debit</th>
                <th className="border px-2 py-1">Credit</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: 'Entry 1: Initial Investment',
                  debitName: 'je1_debitAcct',
                  debitPlaceholder: 'Cash',
                  creditName: 'je1_creditAcct',
                  creditPlaceholder: "Owner's Equity",
                },
                {
                  label: 'Entry 2: Purchase of Equipment',
                  debitName: 'je2_debitAcct',
                  debitPlaceholder: 'Equipment',
                  creditName: 'je2_creditAcct',
                  creditPlaceholder: 'Cash',
                },
                {
                  label: 'Entry 3: Purchase of Supplies',
                  debitName: 'je3_debitAcct',
                  debitPlaceholder: 'Supplies',
                  creditName: 'je3_creditAcct',
                  creditPlaceholder: 'Cash',
                },
              ].map(({ label, debitName, debitPlaceholder, creditName, creditPlaceholder }) => (
                <tr key={debitName}>
                  <td className="border px-2 py-1">{label}</td>
                  <td className="border px-2 py-1">
                    <FormField
                      control={form.control}
                      name={debitName as keyof CaseStudyAnswers}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={debitPlaceholder}
                            className="w-full placeholder-opacity-[0.65]"
                          />
                        </FormControl>
                      )}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <FormField
                      control={form.control}
                      name={creditName as keyof CaseStudyAnswers}
                      render={({ field }) => (
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={creditPlaceholder}
                            className="w-full placeholder-opacity-[0.65]"
                          />
                        </FormControl>
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          type="submit"
          className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
          disabled={!form.formState.isValid}
        >
          Submit Answers
        </Button>
      </form>
    </Form>
  )}

{answerStatus === 'submitted' && (
        <div className="mt-6 space-y-6 animate-accordion-down">
          {/* Model Answer Panel */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-1" />
              <h4 className="text-lg font-medium text-green-800">Model Answer</h4>
            </div>

            <div className="mt-4 space-y-6">
              {/* Assets */}
              <div>
                <h5 className="font-medium text-green-700">Assets</h5>
                <div className="mt-2 bg-white p-3 rounded-md border border-green-100">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Lemonade Stand (Equipment)</span>
                      <span className="font-medium">€80</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Supplies</span>
                      <span className="font-medium">€50</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cash</span>
                      <span className="font-medium">€70</span>
                    </li>
                    <li className="flex justify-between border-t border-green-100 pt-2 mt-2">
                      <span className="font-medium">Total Assets</span>
                      <span className="font-bold">€200</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Liabilities */}
              <div>
                <h5 className="font-medium text-green-700">Liabilities</h5>
                <div className="mt-2 bg-white p-3 rounded-md border border-green-100">
                  <p>€0 (You don't owe anything to others)</p>
                </div>
              </div>

              {/* Equity */}
              <div>
                <h5 className="font-medium text-green-700">Equity</h5>
                <div className="mt-2 bg-white p-3 rounded-md border border-green-100">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Owner's Investment</span>
                      <span className="font-medium">€200</span>
                    </li>
                    <li className="flex justify-between border-t border-green-100 pt-2 mt-2">
                      <span className="font-medium">Total Equity</span>
                      <span className="font-bold">€200</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Journal Entries */}
              <div>
                <h5 className="font-medium text-green-700">Journal Entries</h5>
                <div className="mt-2 space-y-4">
                  {/* Entry 1 */}
                  <div className="bg-white p-4 rounded-md border border-green-100">
                    <p className="font-medium mb-2">Entry 1: Initial Investment</p>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Cash</td>
                          <td className="py-2 text-right">€200</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="py-2 pl-8">Owner's Equity</td>
                          <td></td>
                          <td className="py-2 text-right">€200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Entry 2 */}
                  <div className="bg-white p-4 rounded-md border border-green-100">
                    <p className="font-medium mb-2">Entry 2: Purchase of Equipment</p>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Equipment</td>
                          <td className="py-2 text-right">€80</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="py-2 pl-8">Cash</td>
                          <td></td>
                          <td className="py-2 text-right">€80</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Entry 3 */}
                  <div className="bg-white p-4 rounded-md border border-green-100">
                    <p className="font-medium mb-2">Entry 3: Purchase of Supplies</p>
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Supplies</td>
                          <td className="py-2 text-right">€50</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td className="py-2 pl-8">Cash</td>
                          <td></td>
                          <td className="py-2 text-right">€50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
            <h5 className="font-medium text-amber-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Feedback
            </h5>
            <p className="mt-2">{feedbackMessage}</p>
          </div>

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
          >
            Complete Case Study
          </Button>
        </div>
      )}

  {answerStatus === 'completed' && (
    <div className="mt-6 animate-accordion-down">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center space-y-4">
      <CheckCircle2 className="h-12 w-12 mx-auto text-green-600" />
      <h3 className="text-xl font-bold text-green-800">
        Congratulations!
      </h3>
      <p className="text-green-700">
        You've completed the Accounting Case Study module. 
        Your understanding of basic accounting principles will serve as a strong foundation for more advanced concepts.
      </p>
      <Button
        onClick={() => navigate('/level/3')}
        className="bg-quest-primary hover:bg-quest-secondary text-white flex items-center gap-2 mx-auto"
      >
        Continue to Next Level <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
    </div>
  )}
</div>
</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountingCaseStudy;

