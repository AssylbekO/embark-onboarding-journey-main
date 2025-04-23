import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronLeft, FileText, BrainCircuit, ClipboardCheck, FileSpreadsheet, Users, Calendar, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

type Responsibility = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
};

type ResponsibilityCategory = {
  id: string;
  name: string;
  responsibilities: Responsibility[];
};

type KT = {
  id: string;
  title: string;
  date: string;
  presenter: string;
  attendees: string[];
  completed: boolean;
};

type Note = {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
};

type RelatedPerson = {
  id: string;
  name: string;
  role: string;
  team: string;
  region: string;
  email: string;
};

type Course = {
  id: string;
  title: string;
  provider: string;
  duration: string;
  completed: boolean;
};

type QuizFormValues = {
  q1: string;
  q2: string;
  q3: string;
};

const Level3 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('responsibilities');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [expandedCases, setExpandedCases] = useState<Record<string, boolean>>({
    'case1': false,
    'case2': false,
    'case3': false
  });
  
  const form = useForm<QuizFormValues>({
    defaultValues: {
      q1: "",
      q2: "",
      q3: ""
    },
  });
  
  const onSubmitQuiz = (data: QuizFormValues) => {
    let score = 0;
    if (data.q1 === "c") score++;
    if (data.q2 === "b") score++;
    if (data.q3 === "b") score++;
    
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score === 3) {
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === 'core'
            ? {
                ...category,
                responsibilities: category.responsibilities.map(responsibility => 
                  responsibility.id === 'accounting-intro'
                    ? { ...responsibility, completed: true }
                    : responsibility
                )
              }
            : category
        )
      );
    }
  };
  
  const toggleCase = (caseId: string) => {
    setExpandedCases(prev => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
  };
  
  const [categories, setCategories] = useState<ResponsibilityCategory[]>([
    {
      id: 'core',
      name: 'Core Responsibilities',
      responsibilities: [
        {
          id: 'financial-analysis',
          title: 'Financial Analysis',
          description: 'Analyze financial data to provide insights for decision making and forecasting.',
          icon: <FileSpreadsheet className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'accounting-intro',
          title: 'Intro to Accounting',
          description: 'Learn the basics of accounting through simple, text-based lecture slides followed by a quick test and hands-on practice cases.',
          icon: <FileText className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'performance-monitoring',
          title: 'Performance Monitoring',
          description: 'Track financial KPIs and provide variance analysis against budgets and forecasts.',
          icon: <ClipboardCheck className="w-6 h-6" />,
          completed: false,
        }
      ]
    },
    {
      id: 'collaboration',
      name: 'Collaboration & Communication',
      responsibilities: [
        {
          id: 'stakeholder-communication',
          title: 'Stakeholder Communication',
          description: 'Effectively communicate financial information to non-financial stakeholders.',
          icon: <Users className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'cross-functional',
          title: 'Cross-Functional Collaboration',
          description: 'Work with other departments to provide financial insights for business decisions.',
          icon: <Users className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'meetings',
          title: 'Financial Review Meetings',
          description: 'Prepare for and participate in regular financial review meetings.',
          icon: <Calendar className="w-6 h-6" />,
          completed: false,
        }
      ]
    },
    {
      id: 'development',
      name: 'Professional Development',
      responsibilities: [
        {
          id: 'continuous-learning',
          title: 'Continuous Learning',
          description: 'Stay updated with financial regulations, accounting standards, and industry trends.',
          icon: <BookOpen className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'skills-development',
          title: 'Analytical Skills',
          description: 'Develop and refine analytical and problem-solving skills for financial challenges.',
          icon: <BrainCircuit className="w-6 h-6" />,
          completed: false,
        },
        {
          id: 'certifications',
          title: 'Professional Certifications',
          description: 'Pursue relevant certifications to enhance credibility and expertise.',
          icon: <BookOpen className="w-6 h-6" />,
          completed: false,
        }
      ]
    }
  ]);

  const [ktSessions, setKtSessions] = useState<KT[]>([
    {
      id: '1',
      title: 'Monthly Reporting Process',
      date: '2025-04-18T10:00',
      presenter: 'Maria Johnson',
      attendees: ['You', 'Alex Chen', 'Sarah Williams'],
      completed: false
    },
    {
      id: '2',
      title: 'Budget Analysis Tools',
      date: '2025-04-22T14:00',
      presenter: 'David Lee',
      attendees: ['You', 'Chris Taylor', 'Emma Brown'],
      completed: false
    },
    {
      id: '3',
      title: 'Variance Analysis Techniques',
      date: '2025-04-25T11:00',
      presenter: 'Anna Rodriguez',
      attendees: ['You', 'Michael Smith', 'Jennifer Davis'],
      completed: false
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Month-end Close Process Tips',
      author: 'James Wilson (Previous Role Holder)',
      content: 'Start reconciliations early in the day to resolve discrepancies before the deadline. Double-check all manual journal entries with the team lead before posting. Keep a checklist of all required reports and their submission deadlines.',
      date: '2025-03-15'
    },
    {
      id: '2',
      title: 'Stakeholder Communication Guide',
      author: 'Emily Thompson (Previous Role Holder)',
      content: 'Always translate financial terms into business impact when communicating with non-finance teams. Prepare a one-page executive summary for complex reports. Schedule regular check-ins with key department heads to understand their financial concerns.',
      date: '2025-03-10'
    },
    {
      id: '3',
      title: 'System Access Requirements',
      author: 'Robert Johnson (IT Support)',
      content: 'Ensure you have access to SAP Financial modules, Excel financial template library, and PowerBI dashboards. Request elevated permissions for posting journal entries at least one week before month-end.',
      date: '2025-03-05'
    }
  ]);

  const [relatedPeople, setRelatedPeople] = useState<RelatedPerson[]>([
    {
      id: '1',
      name: 'Patricia Miller',
      role: 'Finance Director',
      team: 'Finance Leadership',
      region: 'North America',
      email: 'p.miller@company.com'
    },
    {
      id: '2',
      name: 'Thomas Chen',
      role: 'Financial Analyst',
      team: 'Financial Planning & Analysis',
      region: 'APAC',
      email: 't.chen@company.com'
    },
    {
      id: '3',
      name: 'Sophia Martinez',
      role: 'Financial Analyst',
      team: 'Financial Planning & Analysis',
      region: 'North America',
      email: 's.martinez@company.com'
    },
    {
      id: '4',
      name: 'William Johnson',
      role: 'Controller',
      team: 'Accounting',
      region: 'North America',
      email: 'w.johnson@company.com'
    },
    {
      id: '5',
      name: 'Olivia Brown',
      role: 'Financial Analyst',
      team: 'Financial Planning & Analysis',
      region: 'EMEA',
      email: 'o.brown@company.com'
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Financial Analysis Fundamentals',
      provider: 'SUMMIT Learning',
      duration: '4 hours',
      completed: false
    },
    {
      id: '2',
      title: 'Advanced Excel for Finance Professionals',
      provider: 'SUMMIT Learning',
      duration: '6 hours',
      completed: false
    },
    {
      id: '3',
      title: 'SAP Financial Modules Deep Dive',
      provider: 'SUMMIT Learning',
      duration: '8 hours',
      completed: false
    },
    {
      id: '4',
      title: 'Effective Financial Communication',
      provider: 'SUMMIT Learning',
      duration: '3 hours',
      completed: false
    },
    {
      id: '5',
      title: 'Financial Forecasting and Modeling',
      provider: 'SUMMIT Learning',
      duration: '5 hours',
      completed: false
    }
  ]);

  const totalResponsibilities = categories.reduce((sum, category) => sum + category.responsibilities.length, 0);
  const completedResponsibilities = categories.reduce((sum, category) => 
    sum + category.responsibilities.filter(responsibility => responsibility.completed).length, 0);
  
  const completedCourses = courses.filter(course => course.completed).length;
  
  const completedKTs = ktSessions.filter(kt => kt.completed).length;
  
  const totalItems = totalResponsibilities + courses.length + ktSessions.length;
  const completedItems = completedResponsibilities + completedCourses + completedKTs;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const toggleResponsibilityCompletion = (categoryId: string, responsibilityId: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              responsibilities: category.responsibilities.map(responsibility => 
                responsibility.id === responsibilityId
                  ? { ...responsibility, completed: !responsibility.completed }
                  : responsibility
              )
            }
          : category
      )
    );
  };

  const toggleCourseCompletion = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, completed: !course.completed }
          : course
      )
    );
  };

  const toggleKTCompletion = (ktId: string) => {
    setKtSessions(prevKTs =>
      prevKTs.map(kt =>
        kt.id === ktId
          ? { ...kt, completed: !kt.completed }
          : kt
      )
    );
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleBackToLevel2 = () => {
    navigate('/level/2');
  };

  const handleCompleteLevel = () => {
    console.log('Level 3 completed');
    navigate('/');
  };

  const lectureSlides = [
    {
      title: "What is Accounting?",
      content: "Accounting is the process of recording, classifying, and summarizing financial transactions to provide information that is useful in making business decisions."
    },
    {
      title: "Why Accounting Matters",
      content: "Accounting provides crucial information for decision-making, helps businesses track performance, ensures compliance with laws, and communicates financial health to stakeholders."
    },
    {
      title: "Key Terms",
      content: "Assets: Resources owned by a business (cash, inventory, equipment).\nLiabilities: Debts or obligations owed to others.\nEquity: Owner's claim on business assets after liabilities.\nRevenue: Income from selling goods or services.\nExpenses: Costs incurred to generate revenue."
    },
    {
      title: "The Accounting Equation",
      content: "Assets = Liabilities + Equity. This fundamental equation must always balance and forms the basis of the balance sheet."
    },
    {
      title: "Double-Entry Bookkeeping",
      content: "Each transaction affects at least two accounts. The total debits must equal the total credits, ensuring the accounting equation remains balanced."
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBackToDashboard}
              className="border-quest-light hover:bg-quest-light"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-quest-dark">Level 3: Your Role</h1>
          </div>
          <div className="bg-quest-light rounded-full px-4 py-2">
            <span className="text-quest-primary font-medium">
              Progress: {completedItems}/{totalItems} ({progressPercentage}%)
            </span>
          </div>
        </div>

        <Card className="border-2 border-quest-primary bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-quest-primary" />
              </div>
              <div>
                <CardTitle className="text-quest-dark">Understanding Your Responsibilities</CardTitle>
                <CardDescription>Learn about your key areas of responsibility and performance expectations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-quest-neutral">
              Welcome to Level 3 of your onboarding journey! This level focuses on your specific role and 
              responsibilities within the Finance team at Johnson & Johnson. By the end of this level, 
              you should have a clear understanding of what's expected from you and how your role 
              contributes to the broader organizational goals.
            </p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="responsibilities" className="flex items-center gap-1.5">
              Responsibilities
            </TabsTrigger>
            <TabsTrigger value="kt-schedule" className="flex items-center gap-1.5">
              KT Sessions
            </TabsTrigger>
            <TabsTrigger value="previous-notes" className="flex items-center gap-1.5">
              Previous Notes
            </TabsTrigger>
            <TabsTrigger value="related-people" className="flex items-center gap-1.5">
              Related People
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-1.5">
              Courses
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="responsibilities">
            <Tabs defaultValue="core" className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-x-auto">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.responsibilities.map(responsibility => {
                      if (responsibility.id === 'accounting-intro') {
                        return (
                          <Card key={responsibility.id} className={`transition-all hover:shadow-md ${
                            responsibility.completed ? 'border-quest-primary border-2' : ''
                          }`}>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-quest-light text-quest-primary">
                                    {responsibility.icon}
                                  </div>
                                  <CardTitle className="text-lg">Intro to Accounting</CardTitle>
                                </div>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className={`${responsibility.completed ? 'bg-quest-primary text-white hover:bg-quest-secondary' : 'border-quest-light'}`}
                                  onClick={() => toggleResponsibilityCompletion(category.id, responsibility.id)}
                                >
                                  {responsibility.completed ? (
                                    <Check className="w-4 h-4 mr-1" />
                                  ) : null}
                                  {responsibility.completed ? 'Completed' : 'Mark as Complete'}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-quest-neutral mb-4">
                                Learn the basics of accounting through simple, text-based lecture slides followed by a quick test and hands-on practice cases.
                              </p>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-2"
                                  onClick={() => navigate('/learn/accounting')}
                                >
                                  <FileText className="w-4 h-4" />
                                  Learn More
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      } else {
                        return (
                          <Card key={responsibility.id} className={`transition-all hover:shadow-md ${
                            responsibility.completed ? 'border-quest-primary border-2' : ''
                          }`}>
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-quest-light text-quest-primary">
                                    {responsibility.icon}
                                  </div>
                                  <CardTitle className="text-lg">{responsibility.title}</CardTitle>
                                </div>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className={`${responsibility.completed ? 'bg-quest-primary text-white hover:bg-quest-secondary' : 'border-quest-light'}`}
                                  onClick={() => toggleResponsibilityCompletion(category.id, responsibility.id)}
                                >
                                  {responsibility.completed ? (
                                    <Check className="w-4 h-4 mr-1" />
                                  ) : null}
                                  {responsibility.completed ? 'Understood' : 'Mark as Understood'}
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-quest-neutral mb-4">{responsibility.description}</p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                  <FileText className="w-4 h-4" />
                                  Learn More
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      }
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          
          <TabsContent value="kt-schedule">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Transfer Sessions</CardTitle>
                <CardDescription>Upcoming and past scheduled KT sessions for your role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ktSessions.map(kt => {
                    const sessionDate = new Date(kt.date);
                    const formattedDate = sessionDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });
                    const formattedTime = sessionDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    
                    return (
                      <Card key={kt.id} className={`transition-all hover:shadow-md ${kt.completed ? 'border-quest-primary border-2' : ''}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle>{kt.title}</CardTitle>
                            <Button 
                              variant="outline"
                              size="sm"
                              className={`${kt.completed ? 'bg-quest-primary text-white hover:bg-quest-secondary' : 'border-quest-light'}`}
                              onClick={() => toggleKTCompletion(kt.id)}
                            >
                              {kt.completed ? (
                                <Check className="w-4 h-4 mr-1" />
                              ) : null}
                              {kt.completed ? 'Completed' : 'Mark Complete'}
                            </Button>
                          </div>
                          <CardDescription>{formattedDate} at {formattedTime}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-quest-neutral">
                              <span className="font-semibold">Presenter:</span> {kt.presenter}
                            </p>
                            <div>
                              <p className="text-sm font-semibold text-quest-neutral">Attendees:</p>
                              <ul className="list-disc list-inside text-sm text-quest-neutral pl-2">
                                {kt.attendees.map((attendee, index) => (
                                  <li key={index}>{attendee}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Add to Calendar
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Session Materials
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  <Button className="w-full bg-quest-light text-quest-primary hover:bg-quest-primary hover:text-white">
                    Schedule Additional KT Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="previous-notes">
            <Card>
              <CardHeader>
                <CardTitle>Previous Role Holder Notes</CardTitle>
                <CardDescription>Knowledge documentation from previous team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.map(note => (
                    <Card key={note.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <span className="text-xs text-quest-neutral">{note.date}</span>
                        </div>
                        <CardDescription>{note.author}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-quest-neutral whitespace-pre-line">{note.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="related-people">
            <Card>
              <CardHeader>
                <CardTitle>Role-Related Contacts</CardTitle>
                <CardDescription>People you'll be working with or who can help you succeed in your role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedPeople.map(person => (
                    <Card key={person.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{person.name}</CardTitle>
                        <CardDescription>{person.role}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Team:</span> {person.team}</p>
                          <p><span className="font-semibold">Region:</span> {person.region}</p>
                          <p><span className="font-semibold">Contact:</span> {person.email}</p>
                          <div className="pt-2">
                            <Button variant="outline" size="sm">
                              Schedule Meeting
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Finance Courses</CardTitle>
                <CardDescription>Training materials to help you excel in your role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map(course => (
                    <Card key={course.id} className={`transition-all hover:shadow-md ${course.completed ? 'border-quest-primary border-2' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <Button 
                            variant="outline"
                            size="sm"
                            className={`${course.completed ? 'bg-quest-primary text-white hover:bg-quest-secondary' : 'border-quest-light'}`}
                            onClick={() => toggleCourseCompletion(course.id)}
                          >
                            {course.completed ? (
                              <Check className="w-4 h-4 mr-1" />
                            ) : null}
                            {course.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </div>
                        <CardDescription>{course.provider}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-quest-neutral">Duration: {course.duration}</p>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Start Course
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleBackToLevel2}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Level 2
          </Button>
          
          <Button
            className="bg-quest-primary hover:bg-quest-secondary text-white"
            disabled={progressPercentage < 100}
            onClick={handleCompleteLevel}
          >
            {progressPercentage < 100 ? 'Complete All Items to Continue' : 'Complete Level 3'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Level3;
