import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

const actions = [
  {
    id: 1,
    title: 'Clarifier et réduire la charge de travail',
    priority: 'Critique',
    priorityLevel: 30,
    efficacy: '+35%',
    items: [
      'Réduction du nombre de sujets en parallèle',
      'Priorisation explicite et assumée',
      'Suppression des tâches à faible valeur'
    ]
  },
  {
    id: 2,
    title: 'Protéger l\'équilibre vie pro / vie perso',
    priority: 'Très élevée',
    priorityLevel: 25,
    efficacy: '+30%',
    items: [
      'Cadre clair sur les horaires',
      'Limitation des urgences artificielles',
      'Exemplarité côté management'
    ]
  },
  {
    id: 3,
    title: 'Mettre en place une reconnaissance régulière',
    priority: 'Élevée',
    priorityLevel: 20,
    efficacy: '+25%',
    items: [
      'Feedbacks courts et fréquents',
      'Valorisation des efforts',
      'Reconnaissance visible'
    ]
  },
  {
    id: 4,
    title: 'Redonner du sens et de la visibilité',
    priority: 'Moyenne',
    priorityLevel: 15,
    efficacy: '+20%',
    items: [
      'Explication des décisions',
      'Mise en lumière de l\'impact du travail',
      'Implication dans certaines orientations'
    ]
  },
  {
    id: 5,
    title: 'Prévenir l\'épuisement mental',
    priority: 'Complémentaire',
    priorityLevel: 10,
    efficacy: '+15%',
    items: [
      'Pauses régulières',
      'Points d\'écoute individuels',
      'Anticipation des pics de charge'
    ]
  }
];

const getPriorityColor = (level: number) => {
  if (level >= 30) return 'bg-red-100 text-red-700 border-red-200';
  if (level >= 25) return 'bg-orange-100 text-orange-700 border-orange-200';
  if (level >= 20) return 'bg-amber-100 text-amber-700 border-amber-200';
  if (level >= 15) return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

export function ActionsSection() {
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (actionId: number, itemIndex: number) => {
    const key = `${actionId}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="bg-white rounded-lg p-6 md:p-8 border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-slate-900">Actions concrètes recommandées</h2>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
        <p className="text-sm font-medium text-blue-900">
          Classement par priorité et efficacité corrective estimée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => (
          <div key={action.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-shadow flex flex-col h-full">
            <h3 className="font-semibold text-slate-900 mb-3 min-h-[3rem]">{action.title}</h3>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(action.priorityLevel)}`}>
                {action.priority}
              </span>
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3 text-emerald-700" />
                <span className="text-sm font-semibold text-emerald-700">{action.efficacy}</span>
              </div>
            </div>

            <ul className="space-y-2 flex-1">
              {action.items.map((item, idx) => {
                const key = `${action.id}-${idx}`;
                const isChecked = checkedItems[key] || false;
                
                return (
                  <li key={idx} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id={key}
                      checked={isChecked}
                      onChange={() => toggleItem(action.id, idx)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label
                      htmlFor={key}
                      className={`text-sm cursor-pointer select-none ${
                        isChecked 
                          ? 'line-through text-slate-400' 
                          : 'text-slate-700'
                      }`}
                    >
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}