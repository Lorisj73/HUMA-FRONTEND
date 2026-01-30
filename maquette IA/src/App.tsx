import React from 'react';
import { Header } from './components/Header';
import { OverviewStats } from './components/OverviewStats';
import { StrengthsSection } from './components/StrengthsSection';
import { WeaknessesSection } from './components/WeaknessesSection';
import { ActionsSection } from './components/ActionsSection';
import { TeamActivitiesSection } from './components/TeamActivitiesSection';
import { KeyMessage } from './components/KeyMessage';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <OverviewStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StrengthsSection />
          <WeaknessesSection />
        </div>
        
        <ActionsSection />
        <TeamActivitiesSection />
        <KeyMessage />
      </main>
    </div>
  );
}