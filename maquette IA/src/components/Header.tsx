import React from 'react';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-slate-900">Rapport d'analyse</h1>
        <p className="text-slate-600 mt-1">Vue d'ensemble des performances et recommandations</p>
      </div>
    </header>
  );
}
