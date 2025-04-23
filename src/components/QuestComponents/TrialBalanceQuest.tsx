
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Scale, 
  CheckCircle2, 
  XCircle,
  Coins,
  HelpCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrialBalanceEntry {
  account: string;
  debit: number | null;
  credit: number | null;
}

const trialBalanceData: TrialBalanceEntry[] = [
  { account: 'Cash', debit: 40000, credit: null },
  { account: 'Accounts Receivable', debit: 25000, credit: null },
  { account: 'Office Supplies', debit: 5000, credit: null },
  { account: 'Equipment', debit: 50000, credit: null },
  { account: 'Accumulated Depreciation', debit: null, credit: 10000 },
  { account: 'Accounts Payable', debit: null, credit: 20000 },
  { account: 'Unearned Revenue', debit: null, credit: 15000 },
  { account: "Owner's Equity", debit: null, credit: 50000 },
  { account: 'Revenue', debit: null, credit: 35000 },
  { account: 'Salaries Expense', debit: 10000, credit: null },
  { account: 'Rent Expense', debit: 5000, credit: null }
];

const TrialBalanceQuest = () => {
  const [stage, setStage] = useState<'intro' | 'table' | 'question' | 'action' | 'feedback' | 'reflection'>('intro');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [reflection, setReflection] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);

  const totalDebits = trialBalanceData.reduce((sum, entry) => sum + (entry.debit || 0), 0);
  const totalCredits = trialBalanceData.reduce((sum, entry) => sum + (entry.credit || 0), 0);

  const handleRowSelect = (account: string) => {
    setSelectedRows(prev => 
      prev.includes(account) 
        ? prev.filter(row => row !== account)
        : [...prev, account]
    );
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '';
    return new Intl.NumberFormat('cs-CZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStage = () => {
    switch (stage) {
      case 'intro':
        return (
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                <Scale className="w-6 h-6 text-quest-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Trial Balance Trouble</h2>
                <p className="text-quest-neutral">Duration: 10-15 minutes • XP Reward: +30</p>
              </div>
            </div>
            <p className="text-quest-neutral mb-6">
              Your manager asks you to check a trial balance. Something's off. Can you find the issue?
            </p>
            <Button 
              onClick={() => setStage('table')}
              className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Begin Review
            </Button>
          </Card>
        );

      case 'table':
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Review the Trial Balance</h3>
            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Debit (CZK)</TableHead>
                    <TableHead className="text-right">Credit (CZK)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trialBalanceData.map((entry) => (
                    <TableRow key={entry.account}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(entry.account)}
                          onCheckedChange={() => handleRowSelect(entry.account)}
                        />
                      </TableCell>
                      <TableCell>{entry.account}</TableCell>
                      <TableCell className="text-right">{formatCurrency(entry.debit)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(entry.credit)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell></TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalDebits)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalCredits)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Button 
              onClick={() => setStage('question')}
              className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Continue
            </Button>
          </Card>
        );

      case 'question':
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">What's the cause of the imbalance?</h3>
            <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wrong" id="r1" />
                <label htmlFor="r1">Salaries Expense should be credited</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wrong2" id="r2" />
                <label htmlFor="r2">Duplicate entry</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="correct" id="r3" />
                <label htmlFor="r3">Missing matching credit</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wrong3" id="r4" />
                <label htmlFor="r4">Equipment error</label>
              </div>
            </RadioGroup>
            <Button 
              onClick={() => setStage('action')}
              disabled={!answer}
              className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Submit Answer
            </Button>
          </Card>
        );

      case 'action':
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">What would you do next?</h3>
            <RadioGroup value={action} onValueChange={setAction} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wrong" id="a1" />
                <label htmlFor="a1">Send it back</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="correct" id="a2" />
                <label htmlFor="a2">Flag and suggest journal entry</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wrong2" id="a3" />
                <label htmlFor="a3">Adjust manually</label>
              </div>
            </RadioGroup>
            <Button 
              onClick={() => {
                setStage('feedback');
                setIsCompleted(true);
              }}
              disabled={!action}
              className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Submit Action
            </Button>
          </Card>
        );

      case 'feedback':
        const isCorrect = answer === 'correct' && action === 'correct';
        return (
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Great job!</h3>
                    <p className="text-quest-neutral">
                      You've correctly identified the missing credit entry and chosen the right action.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Not quite right</h3>
                    <p className="text-quest-neutral">
                      Check that each debit has a matching credit.
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {isCorrect && (
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-quest-primary" />
                  <span>+30 XP earned!</span>
                </div>
                <Badge variant="outline" className="flex items-center gap-2 w-fit">
                  <Scale className="w-4 h-4" />
                  Balance Master Badge Unlocked
                </Badge>
              </div>
            )}
            
            <Button 
              onClick={() => setStage('reflection')}
              className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
            >
              Continue
            </Button>
          </Card>
        );

      case 'reflection':
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Optional Reflection</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  How confident did you feel while solving this task?
                </label>
                <div className="flex gap-4 mb-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      variant={confidence === value ? "default" : "outline"}
                      className={`w-10 h-10 p-0 ${
                        confidence === value ? 'bg-quest-primary text-white' : ''
                      }`}
                      onClick={() => setConfidence(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  What would help you feel more confident doing this in a real job?
                </label>
                <textarea
                  className="w-full p-3 border rounded-md"
                  rows={3}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Share your thoughts..."
                />
              </div>
              
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-quest-primary hover:bg-quest-secondary text-white"
              >
                Complete Quest
              </Button>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {renderStage()}
      {stage !== 'intro' && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setStage('intro')}
            className="border-quest-light hover:bg-quest-light"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrialBalanceQuest;
