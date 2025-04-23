import React from "react";
import {
  DollarSign,
  Scale,
  Coins,
  ScrollText,
  Banknote,
  BookOpen,
  Calculator,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type AccountType = {
  title: string;
  icon: React.ReactNode;
  examples: Array<{ name: string; icon: React.ReactNode }>;
};

type SlideAccountTypesProps = {
  accountTypes: AccountType[];
  expanded: { [key: string]: boolean };
  onToggle: (id: string) => void;
};

const SlideAccountTypes: React.FC<SlideAccountTypesProps> = ({
  accountTypes,
  expanded,
  onToggle,
}) => (
  <div className="space-y-6">
    <div className="flex justify-center mb-6">
      <DollarSign className="h-12 w-12 text-quest-secondary" />
    </div>
    <div className="grid grid-cols-1 gap-4">
      {accountTypes.map((type, index) => (
        <div
          key={index}
          className={`
            rounded-md overflow-hidden transition-all duration-300
            ${expanded[type.title] ? "shadow-md" : "shadow-sm hover:shadow-md"}
            ${index % 4 === 0 ? "bg-quest-light/30" : ""}
            ${index % 4 === 1 ? "bg-quest-green/30" : ""}
            ${index % 4 === 2 ? "bg-quest-yellow/30" : ""}
            ${index % 4 === 3 ? "bg-quest-pink/30" : ""}
          `}
        >
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div
                onClick={() => onToggle(type.title)}
                className="p-4 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {type.icon}
                  <h3 className="font-bold text-lg">{type.title}</h3>
                </div>
                {expanded[type.title] ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-0 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {type.examples.map((example, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white p-3 rounded-md shadow-sm"
                    >
                      {example.icon}
                      <span>{example.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
    <p className="text-sm text-center mt-2 text-quest-neutral">
      Click on each account type to see examples
    </p>
  </div>
);

export default SlideAccountTypes;
