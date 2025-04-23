
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, ChevronRight, AlertCircle, CheckCircle, 
  FileCheck, Download, MessageCircle, PenTool, ArrowRight, BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type TrialBalanceEntry = {
  account: string;
  debit: number | null;
  credit: number | null;
  suspicious?: boolean;
};

type JournalEntryItem = {
  account: string;
  debit: number | null;
  credit: number | null;
};

type LectureContent = {
  title: string;
  content: string[];
};

type Case = {
  id: string;
  title: string;
  narrative: string;
  sender: string;
  lecture: LectureContent;
  trialBalance: TrialBalanceEntry[];
  errorType: string;
  correctJournalEntry: JournalEntryItem[];
  impactQuestion?: {
    question: string;
    correctAnswer: string;
    options: string[];
  };
  xpReward: number;
  completed: boolean;
};

const TrialBalanceLessons: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: cases, 2: completion, 3: reflection
  const [currentSection, setCurrentSection] = useState(0); // 0: lecture, 1: case
  const [selectedErrorType, setSelectedErrorType] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [journalEntryItems, setJournalEntryItems] = useState<JournalEntryItem[]>([
    { account: '', debit: null, credit: null },
    { account: '', debit: null, credit: null },
  ]);
  const [impactAnswer, setImpactAnswer] = useState<string | null>(null);
  const [earnedXP, setEarnedXP] = useState(0);
  const [reflection, setReflection] = useState({
    mostDifficult: '',
    confidence: ''
  });
  const [casesCompleted, setCasesCompleted] = useState({
    'case1': false,
    'case2': false,
    'case3': false
  });
  
  const [currentCase, setCurrentCase] = useState<Case | null>(null);

  // Introduction content
  const introContent = {
    title: "Trial Balance Troubleshooting",
    description: "Learn to identify and fix common trial balance errors",
    content: [
      "A trial balance is a report listing all ledger accounts and their debit or credit balances.",
      "It ensures total debits = total credits and helps catch basic errors before preparing financial statements.",
      "However, trial balances don't catch everything. That's where you come in.",
      "In this lesson, you'll learn to identify three common types of trial balance errors and how to fix them."
    ]
  };

  // Example of a simple balanced trial balance for the intro
  const sampleTrialBalance: TrialBalanceEntry[] = [
    { account: "Cash", debit: 50000, credit: null },
    { account: "Accounts Receivable", debit: 35000, credit: null },
    { account: "Equipment", debit: 120000, credit: null },
    { account: "Accumulated Depreciation", debit: null, credit: 15000 },
    { account: "Accounts Payable", debit: null, credit: 25000 },
    { account: "Unearned Revenue", debit: null, credit: 10000 },
    { account: "Common Stock", debit: null, credit: 100000 },
    { account: "Retained Earnings", debit: null, credit: 30000 },
    { account: "Revenue", debit: null, credit: 75000 },
    { account: "Salaries Expense", debit: 40000, credit: null },
    { account: "Utilities Expense", debit: 5000, credit: null },
    { account: "Office Supplies Expense", debit: 5000, credit: null },
  ];

  const cases: Case[] = [
    {
      id: 'case1',
      title: "The Rent That Vanished",
      narrative: "Hi team, I was reviewing the trial balance and noticed that we didn't record the office rent payment for this month. Can you check and fix this issue? The payment is 10,000 CZK to our landlord as usual. Thanks!",
      sender: "Markéta Nováková, Accounts Manager",
      lecture: {
        title: "Omitted Entries",
        content: [
          "Sometimes a transaction is simply forgotten. If both the debit and credit sides of a journal entry are missing, the trial balance still balances—but it's wrong.",
          "This is dangerous, especially with expenses that affect net income.",
          "In this case, we need to recognize both the expense and the corresponding liability."
        ]
      },
      trialBalance: [
        { account: "Cash", debit: 50000, credit: null },
        { account: "Accounts Receivable", debit: 35000, credit: null },
        { account: "Equipment", debit: 120000, credit: null },
        { account: "Accumulated Depreciation", debit: null, credit: 15000 },
        { account: "Accounts Payable", debit: null, credit: 25000, suspicious: true },
        { account: "Unearned Revenue", debit: null, credit: 10000 },
        { account: "Common Stock", debit: null, credit: 100000 },
        { account: "Retained Earnings", debit: null, credit: 30000 },
        { account: "Revenue", debit: null, credit: 75000 },
        { account: "Salaries Expense", debit: 40000, credit: null },
        { account: "Utilities Expense", debit: 5000, credit: null },
        { account: "Office Supplies Expense", debit: 5000, credit: null },
        // Note: Rent Expense is missing
      ],
      errorType: "Omitted expense",
      correctJournalEntry: [
        { account: "Rent Expense", debit: 10000, credit: null },
        { account: "Accounts Payable", debit: null, credit: 10000 }
      ],
      xpReward: 20,
      completed: false
    },
    {
      id: 'case2',
      title: "Depreciation Dilemma",
      narrative: "I've been reviewing our financial statements and I think our depreciation might be understated. Our equipment has a total cost basis of 200,000 CZK with a 5-year useful life using straight-line depreciation. We've only recorded 35,000 CZK of depreciation expense this year, but I think it should be 40,000 CZK. Can you check the trial balance and make any necessary corrections?",
      sender: "Petr Svoboda, Financial Controller",
      lecture: {
        title: "Understatements",
        content: [
          "Errors in timing or estimation can cause values to be too low or too high.",
          "Understating expenses like depreciation inflates net income, giving a misleading view of profitability.",
          "Trial balances may look right, but comparing entries to policy reveals the gap."
        ]
      },
      trialBalance: [
        { account: "Cash", debit: 45000, credit: null },
        { account: "Accounts Receivable", debit: 30000, credit: null },
        { account: "Equipment", debit: 200000, credit: null },
        { account: "Accumulated Depreciation", debit: null, credit: 75000, suspicious: true },
        { account: "Accounts Payable", debit: null, credit: 20000 },
        { account: "Unearned Revenue", debit: null, credit: 15000 },
        { account: "Common Stock", debit: null, credit: 100000 },
        { account: "Retained Earnings", debit: null, credit: 30000 },
        { account: "Revenue", debit: null, credit: 80000 },
        { account: "Salaries Expense", debit: 35000, credit: null },
        { account: "Depreciation Expense", debit: 35000, credit: null, suspicious: true },
        { account: "Rent Expense", debit: 10000, credit: null },
        { account: "Utilities Expense", debit: 5000, credit: null },
      ],
      errorType: "Understated depreciation",
      correctJournalEntry: [
        { account: "Depreciation Expense", debit: 5000, credit: null },
        { account: "Accumulated Depreciation", debit: null, credit: 5000 }
      ],
      impactQuestion: {
        question: "What is the impact of this correction on net income?",
        correctAnswer: "Net income is overstated",
        options: ["Net income is overstated", "Net income is understated", "No impact on net income", "Cannot determine from the information given"]
      },
      xpReward: 30,
      completed: false
    },
    {
      id: 'case3',
      title: "The Revenue Reversal",
      narrative: "We need your help with an urgent issue. A client canceled a service contract yesterday, but we already recognized 10,000 CZK of revenue for it in this period. We need to reverse this and record it as unearned revenue since we'll have to refund the client. Can you prepare the necessary journal entry and update the trial balance?",
      sender: "Jana Černá, Revenue Manager",
      lecture: {
        title: "Revenue Recognition Errors",
        content: [
          "Recognizing revenue too early—or failing to reverse it when it's unearned—can significantly distort financials.",
          "Mistakes like these are common in services and subscription-based models.",
          "In this case, we need to remove revenue that was incorrectly recognized and record the amount as unearned until it's properly earned or refunded."
        ]
      },
      trialBalance: [
        { account: "Cash", debit: 60000, credit: null },
        { account: "Accounts Receivable", debit: 25000, credit: null },
        { account: "Equipment", debit: 180000, credit: null },
        { account: "Accumulated Depreciation", debit: null, credit: 80000 },
        { account: "Accounts Payable", debit: null, credit: 30000 },
        { account: "Unearned Revenue", debit: null, credit: 5000, suspicious: true },
        { account: "Common Stock", debit: null, credit: 100000 },
        { account: "Retained Earnings", debit: null, credit: 35000 },
        { account: "Revenue", debit: null, credit: 95000, suspicious: true },
        { account: "Salaries Expense", debit: 45000, credit: null },
        { account: "Depreciation Expense", debit: 40000, credit: null },
        { account: "Rent Expense", debit: 10000, credit: null },
        { account: "Utilities Expense", debit: 5000, credit: null },
      ],
      errorType: "Overstated revenue",
      correctJournalEntry: [
        { account: "Revenue", debit: 10000, credit: null },
        { account: "Unearned Revenue", debit: null, credit: 10000 }
      ],
      xpReward: 50,
      completed: false
    }
  ];

  React.useEffect(() => {
    // Set the first case when the component mounts
    if (cases.length > 0 && !currentCase) {
      setCurrentCase(cases[0]);
    }
  }, [cases]);

  const errorTypes = [
    "Omitted expense",
    "Duplicated transaction",
    "Misclassified account",
    "Understated depreciation",
    "Overstated revenue",
    "Mathematical error"
  ];

  const handleBackToLevel3 = () => {
    navigate('/level/3');
  };

  const handleAccountClick = (account: string) => {
    setSelectedAccount(account === selectedAccount ? null : account);
  };

  const handleErrorTypeSelect = (errorType: string) => {
    setSelectedErrorType(errorType);
  };

  const handleJournalEntryChange = (index: number, field: keyof JournalEntryItem, value: string) => {
    const updatedItems = [...journalEntryItems];
    
    if (field === 'account') {
      updatedItems[index].account = value;
    } else if (field === 'debit') {
      updatedItems[index].debit = value === '' ? null : Number(value);
      updatedItems[index].credit = null; // Clear credit if debit is entered
    } else if (field === 'credit') {
      updatedItems[index].credit = value === '' ? null : Number(value);
      updatedItems[index].debit = null; // Clear debit if credit is entered
    }
    
    setJournalEntryItems(updatedItems);
  };

  const addJournalEntryItem = () => {
    setJournalEntryItems([...journalEntryItems, { account: '', debit: null, credit: null }]);
  };

  const removeJournalEntryItem = (index: number) => {
    if (journalEntryItems.length <= 2) return; // Keep at least 2 entries
    const updatedItems = [...journalEntryItems];
    updatedItems.splice(index, 1);
    setJournalEntryItems(updatedItems);
  };

  const checkJournalEntryBalance = (): boolean => {
    const totalDebit = journalEntryItems.reduce((sum, item) => sum + (item.debit || 0), 0);
    const totalCredit = journalEntryItems.reduce((sum, item) => sum + (item.credit || 0), 0);
    return totalDebit === totalCredit;
  };

  const validateJournalEntry = (): boolean => {
    // Check if all entries have an account and either a debit or credit (not both)
    const validEntries = journalEntryItems.every(item => 
      item.account && ((item.debit !== null && item.credit === null) || (item.credit !== null && item.debit === null))
    );
    
    // Check if the journal entry is balanced
    const balanced = checkJournalEntryBalance();
    
    return validEntries && balanced;
  };

  const handleImpactAnswerSelect = (answer: string) => {
    setImpactAnswer(answer);
  };

  const handleStartCases = () => {
    setCurrentStep(1);
  };

  const handleNextSection = () => {
    if (currentSection === 0) {
      setCurrentSection(1); // Move from lecture to case
    }
  };

  const handleSubmit = () => {
    if (!currentCase) return;

    // Validate error type selection
    if (selectedErrorType !== currentCase.errorType) {
      toast({
        title: "Incorrect error type",
        description: `Try again. Hint: Look at the message from ${currentCase.sender}.`,
        variant: "destructive",
      });
      return;
    }

    // Validate journal entry
    if (!validateJournalEntry()) {
      toast({
        title: "Invalid journal entry",
        description: "Make sure all accounts are filled, debits equal credits, and each line has either a debit or a credit (not both).",
        variant: "destructive",
      });
      return;
    }

    // Check for correct journal entry
    const correctAccounts = currentCase.correctJournalEntry.every(correctItem => {
      return journalEntryItems.some(userItem => 
        userItem.account.toLowerCase() === correctItem.account.toLowerCase() &&
        userItem.debit === correctItem.debit &&
        userItem.credit === correctItem.credit
      );
    });

    if (!correctAccounts) {
      toast({
        title: "Incorrect journal entry",
        description: "Check your accounts and amounts. Remember: debits on the left, credits on the right.",
        variant: "destructive",
      });
      return;
    }

    // Check impact question if it exists
    if (currentCase.impactQuestion && impactAnswer !== currentCase.impactQuestion.correctAnswer) {
      toast({
        title: "Incorrect impact assessment",
        description: "Reconsider how this adjustment affects the financial statements.",
        variant: "destructive",
      });
      return;
    }

    // If everything is correct
    const newXp = earnedXP + currentCase.xpReward;
    setEarnedXP(newXp);
    
    // Mark current case as completed
    setCasesCompleted({
      ...casesCompleted,
      [currentCase.id]: true
    });

    toast({
      title: "Correct!",
      description: `You earned ${currentCase.xpReward} XP for solving "${currentCase.title}"`,
    });

    // Move to the next case or to the completion screen
    const currentIndex = cases.findIndex(c => c.id === currentCase.id);
    if (currentIndex < cases.length - 1) {
      setCurrentCase(cases[currentIndex + 1]);
      // Reset state for next case
      setSelectedErrorType(null);
      setSelectedAccount(null);
      setJournalEntryItems([
        { account: '', debit: null, credit: null },
        { account: '', debit: null, credit: null },
      ]);
      setImpactAnswer(null);
      setCurrentSection(0); // Reset to lecture mode for the next case
    } else {
      // All cases completed, show completion screen
      setCurrentStep(2);
    }
  };

  const handleReflectionChange = (field: keyof typeof reflection, value: string) => {
    setReflection({
      ...reflection,
      [field]: value
    });
  };

  const handleReflectionSubmit = () => {
    toast({
      title: "Reflection Submitted",
      description: "Thank you for your feedback!",
    });
    setCurrentStep(3);
  };

  // Trial Balance Utils
  const getTotalDebit = (entries: TrialBalanceEntry[]) => {
    return entries.reduce((sum, item) => sum + (item.debit || 0), 0);
  };
  
  const getTotalCredit = (entries: TrialBalanceEntry[]) => {
    return entries.reduce((sum, item) => sum + (item.credit || 0), 0);
  };
  
  const isBalanced = currentCase ? 
    getTotalDebit(currentCase.trialBalance) === getTotalCredit(currentCase.trialBalance) : 
    getTotalDebit(sampleTrialBalance) === getTotalCredit(sampleTrialBalance);

  // Render intro screen
  if (currentStep === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToLevel3}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Level 3
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{introContent.title}</CardTitle>
                <CardDescription>{introContent.description}</CardDescription>
              </div>
              <Badge variant="default" className="bg-quest-primary text-white px-3 py-1">
                XP Reward: +100
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center p-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-quest-light flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-quest-primary" />
              </div>
            </div>
          
            <div className="space-y-4">
              {introContent.content.map((paragraph, idx) => (
                <p key={idx} className="text-quest-neutral">{paragraph}</p>
              ))}
            </div>
            
            <div className="border rounded-md overflow-hidden mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Debit (CZK)</TableHead>
                    <TableHead className="text-right">Credit (CZK)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleTrialBalance.map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{entry.account}</TableCell>
                      <TableCell className="text-right">{entry.debit ? entry.debit.toLocaleString() : '-'}</TableCell>
                      <TableCell className="text-right">{entry.credit ? entry.credit.toLocaleString() : '-'}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold bg-gray-50">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{getTotalDebit(sampleTrialBalance).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{getTotalCredit(sampleTrialBalance).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-quest-light/20 p-4 rounded-md">
              <p className="text-quest-dark font-medium mb-2">What you'll learn:</p>
              <ul className="list-disc list-inside space-y-1 text-quest-neutral">
                <li>How to identify three common types of trial balance errors</li>
                <li>Proper journal entries to correct each type of error</li>
                <li>Impact of these errors on financial statements</li>
                <li>Best practices for trial balance review</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={handleStartCases} 
              className="bg-quest-primary text-white hover:bg-quest-secondary"
            >
              Begin Case 1: The Rent That Vanished
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Completion screen
  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToLevel3}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Level 3
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Lesson Complete!
                </CardTitle>
                <CardDescription>You've successfully completed all trial balance cases!</CardDescription>
              </div>
              <Badge variant="default" className="bg-quest-primary text-white px-3 py-1">
                +{earnedXP} XP
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-quest-light rounded-full p-8 mb-4">
                <FileCheck className="h-16 w-16 text-quest-primary" />
              </div>
              <h3 className="text-xl font-bold text-center">You earned the "Audit-Ready" badge!</h3>
              <p className="text-quest-neutral text-center mt-2">
                You've demonstrated exceptional skill in identifying and correcting trial balance errors.
              </p>
            </div>

            <Card className="bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Which type of error was most difficult to catch?
                    </label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-quest-primary focus:border-quest-primary sm:text-sm rounded-md"
                      value={reflection.mostDifficult}
                      onChange={(e) => handleReflectionChange('mostDifficult', e.target.value)}
                    >
                      <option value="">Select an error type</option>
                      <option value="Omitted expense">Omitted expense</option>
                      <option value="Understated depreciation">Understated depreciation</option>
                      <option value="Overstated revenue">Overstated revenue</option>
                      <option value="Other">Other (specify)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Would you feel confident reviewing these issues in a real company?
                    </label>
                    <select 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-quest-primary focus:border-quest-primary sm:text-sm rounded-md"
                      value={reflection.confidence}
                      onChange={(e) => handleReflectionChange('confidence', e.target.value)}
                    >
                      <option value="">Select your confidence level</option>
                      <option value="Very confident">Very confident</option>
                      <option value="Somewhat confident">Somewhat confident</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Not very confident">Not very confident</option>
                      <option value="Not at all confident">Not at all confident</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleReflectionSubmit} 
                  className="bg-quest-primary text-white hover:bg-quest-secondary"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
              </CardFooter>
            </Card>

            <div className="flex justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Trial Balance Corrections Cheat Sheet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Final screen after reflection
  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToLevel3}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Level 3
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>Your progress has been saved.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold">Lesson Complete</h3>
            <p className="text-quest-neutral text-center mt-2 max-w-md">
              You've successfully completed the Trial Balance Troubles lesson and earned {earnedXP} XP.
              Continue your journey through Level 3 to learn more about financial reporting.
            </p>
            <Button 
              onClick={handleBackToLevel3} 
              className="mt-8 bg-quest-primary text-white hover:bg-quest-secondary"
            >
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Case with lecture and challenge
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBackToLevel3}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Level 3
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-quest-neutral">
            Case {cases.findIndex(c => c.id === currentCase?.id) + 1} of {cases.length}
          </span>
          <div className="bg-quest-light rounded-full px-3 py-1">
            <span className="text-quest-primary font-medium text-sm">
              XP: {earnedXP}
            </span>
          </div>
        </div>
      </div>
      
      {currentCase && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentCase.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={currentSection === 0 ? "default" : "outline"} className={currentSection === 0 ? "bg-quest-primary" : ""}>
                  <BookOpen className="w-3 h-3 mr-1" />
                  Lecture
                </Badge>
                <span className="text-gray-300">→</span>
                <Badge variant={currentSection === 1 ? "default" : "outline"} className={currentSection === 1 ? "bg-quest-primary" : ""}>
                  <PenTool className="w-3 h-3 mr-1" />
                  Exercise
                </Badge>
              </div>
            </div>
            <CardDescription>Advanced Trial Balance Analysis</CardDescription>
          </CardHeader>

          {currentSection === 0 ? (
            // Lecture section
            <CardContent className="space-y-6">
              <div className="bg-quest-light/10 rounded-md p-6 space-y-4">
                <h3 className="text-lg font-medium text-quest-dark flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-quest-primary" />
                  {currentCase.lecture.title}
                </h3>

                <div className="space-y-3">
                  {currentCase.lecture.content.map((paragraph, idx) => (
                    <p key={idx} className="text-quest-neutral">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Progress value={50} className="w-1/2 h-1" />
              </div>
            </CardContent>
          ) : (
            // Case exercise section  
            <CardContent className="space-y-6">
              {/* Narrative Message */}
              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardDescription>Message from</CardDescription>
                  <CardTitle className="text-lg">{currentCase.sender}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-quest-neutral">{currentCase.narrative}</p>
                </CardContent>
              </Card>

              {/* Trial Balance */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Trial Balance</h3>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isBalanced ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {isBalanced ? "Balanced" : "Imbalanced"}
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Debit (CZK)</TableHead>
                        <TableHead className="text-right">Credit (CZK)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCase.trialBalance.map((entry, idx) => (
                        <TableRow 
                          key={idx} 
                          className={`cursor-pointer ${entry.suspicious ? 'hover:bg-amber-50' : 'hover:bg-gray-50'} ${
                            selectedAccount === entry.account ? 'bg-amber-100' : ''
                          }`}
                          onClick={() => handleAccountClick(entry.account)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {entry.suspicious && <AlertCircle className="text-amber-500 w-4 h-4" />}
                              {entry.account}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{entry.debit ? entry.debit.toLocaleString() : '-'}</TableCell>
                          <TableCell className="text-right">{entry.credit ? entry.credit.toLocaleString() : '-'}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-gray-50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">{getTotalDebit(currentCase.trialBalance).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{getTotalCredit(currentCase.trialBalance).toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Error Type Selection */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 1: Identify the Error Type</h3>
                <p className="text-sm text-quest-neutral mb-3">
                  Based on the trial balance and the message, what type of error do you suspect?
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {errorTypes.map((errorType, idx) => (
                    <Button 
                      key={idx} 
                      variant={selectedErrorType === errorType ? "default" : "outline"}
                      className={`justify-start ${selectedErrorType === errorType ? 'bg-quest-primary text-white' : ''}`}
                      onClick={() => handleErrorTypeSelect(errorType)}
                    >
                      {errorType}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Journal Entry */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Step 2: Create the Correcting Journal Entry</h3>
                <p className="text-sm text-quest-neutral mb-3">
                  Prepare a journal entry to correct the error. Make sure debits equal credits.
                </p>

                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead className="text-right">Debit (CZK)</TableHead>
                        <TableHead className="text-right">Credit (CZK)</TableHead>
                        <TableHead className="w-16"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {journalEntryItems.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <input
                              type="text"
                              className="w-full border-0 bg-transparent focus:ring-0"
                              value={item.account}
                              onChange={(e) => handleJournalEntryChange(idx, 'account', e.target.value)}
                              placeholder="Enter account name"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <input
                              type="number"
                              className="w-full border-0 bg-transparent focus:ring-0 text-right"
                              value={item.debit !== null ? item.debit : ''}
                              onChange={(e) => handleJournalEntryChange(idx, 'debit', e.target.value)}
                              placeholder="-"
                              disabled={item.credit !== null}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <input
                              type="number"
                              className="w-full border-0 bg-transparent focus:ring-0 text-right"
                              value={item.credit !== null ? item.credit : ''}
                              onChange={(e) => handleJournalEntryChange(idx, 'credit', e.target.value)}
                              placeholder="-"
                              disabled={item.debit !== null}
                            />
                          </TableCell>
                          <TableCell>
                            {journalEntryItems.length > 2 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700 px-2 h-8"
                                onClick={() => removeJournalEntryItem(idx)}
                              >
                                ×
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-quest-primary w-full justify-start"
                            onClick={addJournalEntryItem}
                          >
                            + Add line item
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="font-bold bg-gray-50">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-right">
                          {journalEntryItems.reduce((sum, item) => sum + (item.debit || 0), 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {journalEntryItems.reduce((sum, item) => sum + (item.credit || 0), 0).toLocaleString()}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {!checkJournalEntryBalance() && (
                  <div className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Journal entry doesn't balance. Debits must equal credits.
                  </div>
                )}
              </div>

              {/* Impact Analysis Question (Optional) */}
              {currentCase.impactQuestion && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Step 3: Impact Analysis</h3>
                  <p className="text-sm text-quest-neutral mb-3">{currentCase.impactQuestion.question}</p>

                  <div className="space-y-2">
                    {currentCase.impactQuestion.options.map((option, idx) => (
                      <Button
                        key={idx}
                        variant={impactAnswer === option ? "default" : "outline"}
                        className={`w-full justify-start ${impactAnswer === option ? 'bg-quest-primary text-white' : ''}`}
                        onClick={() => handleImpactAnswerSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          )}

          <CardFooter className="flex justify-between border-t p-6">
            {currentSection === 0 ? (
              // Lecture section footer
              <>
                <div className="text-sm text-muted-foreground">
                  Read the lecture before moving on to the exercise
                </div>
                <Button 
                  onClick={handleNextSection}
                  className="bg-quest-primary hover:bg-quest-secondary"
                >
                  Continue to Exercise
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              // Case exercise section footer
              <>
                <div className="text-sm text-muted-foreground">
                  {casesCompleted[currentCase.id] ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Case completed
                    </span>
                  ) : (
                    "Review your answers carefully before submitting"
                  )}
                </div>
                <Button 
                  onClick={handleSubmit}
                  className="bg-quest-primary hover:bg-quest-secondary"
                  disabled={casesCompleted[currentCase.id]}
                >
                  {casesCompleted[currentCase.id] ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Submit Answer
                    </>
                  )}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TrialBalanceLessons;
