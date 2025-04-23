
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
import Quests from "./pages/Quests";
import Badges from "./pages/Badges";
import Buddy from "./pages/Buddy";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import TrialBalanceQuest from "./components/QuestComponents/TrialBalanceQuest";
import TrialBalanceLessons from "./components/QuestComponents/TrialBalanceLessons";
import LearnAccounting from "./pages/LearnAccounting";
import AccountingQuiz from "./pages/AccountingQuiz";
import AccountingCaseStudy from "./pages/AccountingCaseStudy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/level/2" element={<Level2 />} />
          <Route path="/level/3" element={<Level3 />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/buddy" element={<Buddy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/quests/trial-balance" element={<TrialBalanceQuest />} />
          <Route path="/quests/trial-balance-lessons" element={<TrialBalanceLessons />} />
          <Route path="/learn/accounting" element={<LearnAccounting />} />
          <Route path="/learn/accounting/quiz" element={<AccountingQuiz />} />
          <Route path="/learn/accounting/case-study" element={<AccountingCaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
