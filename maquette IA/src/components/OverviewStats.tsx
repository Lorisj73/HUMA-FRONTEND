import React from 'react';
import { TrendingUp, AlertTriangle, Target } from 'lucide-react';

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-50 rounded">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600">Points forts identifiés</p>
            <p className="text-3xl font-semibold text-slate-900 mt-1">4</p>
            <p className="text-xs text-slate-500 mt-1">École fonctionnelle</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-50 rounded">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600">Causes du mal-être</p>
            <p className="text-3xl font-semibold text-slate-900 mt-1">5</p>
            <p className="text-xs text-slate-500 mt-1">À traiter en priorité</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600">Actions recommandées</p>
            <p className="text-3xl font-semibold text-slate-900 mt-1">5</p>
            <p className="text-xs text-slate-500 mt-1">Gain estimé +35%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
