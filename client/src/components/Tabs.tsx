import { useState } from 'react';
import './Tabs.css';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

const Tabs = ({ tabs, defaultTab = 0 }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;