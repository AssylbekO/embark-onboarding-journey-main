
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronLeft, ExternalLink, Laptop, Bookmark, FileSpreadsheet, FileText, CalendarDays, PresentationIcon, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the tool interface
type Tool = {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
  completed: boolean;
};

// Tool categories
type ToolCategory = {
  id: string;
  name: string;
  tools: Tool[];
};

const Level2 = () => {
  const navigate = useNavigate();
  const [toolCategories, setToolCategories] = useState<ToolCategory[]>([
    {
      id: 'essentials',
      name: 'Essential Tools',
      tools: [
        {
          id: 'outlook',
          name: 'Outlook',
          description: 'Email client for all company communications and calendar management.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=outlook',
          link: 'https://outlook.office.com',
          completed: false,
        },
        {
          id: 'teams',
          name: 'Microsoft Teams',
          description: 'Video conferencing and virtual meetings platform.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=teams',
          link: 'https://teams.microsoft.com',
          completed: false,
        },
        {
          id: 'summit',
          name: 'SUMMIT Training',
          description: 'Our central learning management system for all training courses and certifications.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=summit',
          link: 'https://summit.jnj.com',
          completed: false,
        }
      ]
    },
    {
      id: 'productivity',
      name: 'Productivity Tools',
      tools: [
        {
          id: 'excel',
          name: 'Microsoft Excel',
          description: 'Spreadsheet software for data analysis, reporting, and financial modeling.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=excel',
          link: 'https://office.com/excel',
          completed: false,
        },
        {
          id: 'powerpoint',
          name: 'PowerPoint',
          description: 'Presentation software for creating impactful slideshows and presentations.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=powerpoint',
          link: 'https://office.com/powerpoint',
          completed: false,
        },
        {
          id: 'kt-storage',
          name: 'KT Storage',
          description: 'Central repository for storing and accessing knowledge transfer documents.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=ktstorage',
          link: 'https://sharepoint.jnj.com',
          completed: false,
        }
      ]
    },
    {
      id: 'business',
      name: 'Business Systems',
      tools: [
        {
          id: 'sap',
          name: 'SAP',
          description: 'Enterprise resource planning system for finance, supply chain, and operations.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=sap',
          link: 'https://sap.jnj.com',
          completed: false,
        },
        {
          id: 'finance-courses',
          name: 'Finance Courses',
          description: 'Specialized training modules for financial processes and reporting.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=finance',
          link: 'https://summit.jnj.com/finance',
          completed: false,
        },
        {
          id: 'scheduler',
          name: 'Meeting Scheduler',
          description: 'Tool for scheduling and managing meetings, training sessions, and knowledge transfers.',
          logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=scheduler',
          link: 'https://calendar.office.com',
          completed: false,
        }
      ]
    }
  ]);

  // Track progress
  const totalTools = toolCategories.reduce((sum, category) => sum + category.tools.length, 0);
  const completedTools = toolCategories.reduce((sum, category) => 
    sum + category.tools.filter(tool => tool.completed).length, 0);
  const progressPercentage = Math.round((completedTools / totalTools) * 100);

  // Handle tool completion toggle
  const toggleToolCompletion = (categoryId: string, toolId: string) => {
    setToolCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              tools: category.tools.map(tool => 
                tool.id === toolId
                  ? { ...tool, completed: !tool.completed }
                  : tool
              )
            }
          : category
      )
    );
  };

  // Return to dashboard
  const handleBackToDashboard = () => {
    navigate('/');
  };

  // Handle completing Level 2 and navigating to Level 3
  const handleCompleteLevel = () => {
    navigate('/level/3');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
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
            <h1 className="text-2xl font-semibold text-quest-dark">Level 2: Tools & Platforms</h1>
          </div>
          <div className="bg-quest-light rounded-full px-4 py-2">
            <span className="text-quest-primary font-medium">Progress: {completedTools}/{totalTools} ({progressPercentage}%)</span>
          </div>
        </div>

        {/* Level description */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-light flex items-center justify-center">
                <Laptop className="w-6 h-6 text-quest-primary" />
              </div>
              <div>
                <CardTitle>Get familiar with our tech stack</CardTitle>
                <CardDescription>Learn about the essential tools you'll be using at Johnson & Johnson</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-quest-neutral">
              Welcome to Level 2 of your onboarding journey! In this section, you'll learn about all the 
              digital tools and platforms we use at Johnson & Johnson. By the end of this level, 
              you should be comfortable with all the essential technology systems needed for your role.
            </p>
          </CardContent>
        </Card>

        {/* Tool Categories */}
        <Tabs defaultValue="essentials" className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            {toolCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {toolCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {category.tools.map(tool => (
                  <Card key={tool.id} className={`transition-all hover:shadow-md ${tool.completed ? 'border-quest-primary border-2' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-quest-light text-quest-primary">
                            {tool.id === 'excel' && <FileSpreadsheet className="w-6 h-6" />}
                            {tool.id === 'powerpoint' && <PresentationIcon className="w-6 h-6" />}
                            {tool.id === 'summit' && <BookOpen className="w-6 h-6" />}
                            {tool.id === 'kt-storage' && <FileText className="w-6 h-6" />}
                            {tool.id === 'scheduler' && <CalendarDays className="w-6 h-6" />}
                            {!['excel', 'powerpoint', 'summit', 'kt-storage', 'scheduler'].includes(tool.id) && (
                              <img src={tool.logo} alt={tool.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className={`${tool.completed ? 'bg-quest-primary text-white hover:bg-quest-secondary' : 'border-quest-light'}`}
                          onClick={() => toggleToolCompletion(category.id, tool.id)}
                        >
                          {tool.completed ? (
                            <Check className="w-4 h-4 mr-1" />
                          ) : null}
                          {tool.completed ? 'Completed' : 'Mark Complete'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-quest-neutral mb-4">{tool.description}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          Tutorial
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                          <a href={tool.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Open Tool
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <Button
            className="bg-quest-primary hover:bg-quest-secondary text-white"
            disabled={progressPercentage < 100}
            onClick={handleCompleteLevel}
          >
            {progressPercentage < 100 ? 'Complete All Tools to Continue' : 'Complete Level 2'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Level2;
