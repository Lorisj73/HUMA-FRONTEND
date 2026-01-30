import React from 'react';
import { AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const weaknesses = [
  { name: 'Insatisfaction globale', impact: 'Charge excessive / mal priorisée', value: 30 },
  { name: 'Déséquilibre vie pro/perso', impact: 'Manque de reconnaissance', value: 25 },
  { name: 'Manque de clarté et de sens', impact: 'Fatigue mentale accumulée', value: 15 },
  { name: 'Manque de reconnaissance', impact: 'Poids sur le moral', value: 20 },
  { name: 'Fatigue mentale', impact: 'Épuisement progressif', value: 10 }
];

const COLORS = ['#f59e0b', '#f97316', '#fb923c', '#fdba74', '#fed7aa'];

export function WeaknessesSection() {
  return (
    <section className="bg-white rounded-lg p-6 md:p-8 border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-6 h-6 text-amber-600" />
        <h2 className="text-xl font-semibold text-slate-900">Points faibles majeurs</h2>
        <span className="ml-auto text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Causes du mal-être</span>
      </div>

      <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
        <p className="text-sm font-medium text-amber-900">
          ⚠️ Tant que la charge et le rythme ne sont pas traités, aucune activité d'équipe ne compensera durablement.
        </p>
      </div>

      <div className="w-full" style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weaknesses} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" label={{ value: 'Impact (%)', position: 'insideBottom', offset: -5 }} />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: any) => `${value}%`}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-slate-200 rounded shadow-lg">
                      <p className="font-medium text-slate-900">{payload[0].payload.name}</p>
                      <p className="text-sm text-slate-600 mt-1">{payload[0].payload.impact}</p>
                      <p className="text-sm font-semibold text-amber-600 mt-1">Impact: {payload[0].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {weaknesses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}