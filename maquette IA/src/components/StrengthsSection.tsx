import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const strengths = [
  { name: 'Bonne ambiance et relations d\'équipe', value: 35 },
  { name: 'Solidarité entre collègues', value: 25 },
  { name: 'Impact positif immédiat des feedbacks', value: 20 },
  { name: 'Capacité de l\'équipe à encaisser la charge', value: 20 }
];

const COLORS = ['#10b981', '#059669', '#34d399', '#6ee7b7'];

export function StrengthsSection() {
  return (
    <section className="bg-white rounded-lg p-6 md:p-8 border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-slate-900">Points forts identifiés</h2>
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 mb-6 border border-emerald-100">
        <p className="text-sm font-medium text-emerald-900">
          L'équipe fonctionne humainement. Il faut capitaliser sur la cohésion.
        </p>
      </div>

      <div className="w-full" style={{ height: '320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={strengths}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {strengths.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-slate-700">{entry.payload.name}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}