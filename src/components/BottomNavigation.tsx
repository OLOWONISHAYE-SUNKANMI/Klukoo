import React from 'react';
import {
  Home,
  BarChart3,
  BookOpen,
  User,
  Users,
  FileText,
  MessageCircle,
  Stethoscope,
  Brain,
  PillBottle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isFamilyMember?: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  isFamilyMember = false,
}) => {
  const { t } = useTranslation();

  const allTabs = [
    { id: 'home', label: t('nav.home'), icon: Home, color: 'teal' },
    { id: 'charts', label: t('nav.charts'), icon: BarChart3, color: 'orange' },
    { id: 'journal', label: t('nav.journal'), icon: FileText, color: 'coral' },
    { id: 'predictive', label: 'AI alert', icon: Brain, color: 'orange' },
    { id: 'profile', label: t('nav.profile'), icon: User, color: 'teal' },
  ];
  
  // Filter tabs for family members - remove restricted ones
  const tabs = isFamilyMember 
    ? allTabs.filter(tab => !['journal'].includes(tab.id))
    : allTabs;

  const colorVariants = {
    teal: {
      base: 'text-teal-500',
      active: 'bg-teal-100 text-teal-700',
      hover: 'hover:bg-teal-50',
    },
    coral: {
      base: 'text-rose-500',
      active: 'bg-rose-100 text-rose-600',
      hover: 'hover:bg-rose-50',
    },
    orange: {
      base: 'text-orange-500',
      active: 'bg-orange-100 text-orange-600',
      hover: 'hover:bg-orange-50',
    },
    green: {
      base: 'text-green-700',
      active: 'bg-green-100 text-green-800',
      hover: 'hover:bg-green-50',
    },
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-semantic-bg backdrop-blur-md shadow-md bg-semantic-bg">
      <div className="px-4 py-2">
        <ul className="flex justify-around items-center gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const colors = colorVariants[tab.color];

            return (
              <li key={tab.id} className="flex-shrink-0">
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-300 min-w-[56px] ${
                    isActive ? colors.active : `${colors.base} ${colors.hover}`
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-6 h-6 mb-1 transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <span className="text-xs font-medium truncate max-w-[70px] text-center">
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavigation;
