import React from 'react';
import { Users, Info } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Rétrospective d\'équipe orientée solutions',
    type: 'Atelier collectif (1h–1h30)',
    objective: 'Faire émerger irritants + solutions concrètes',
    efficacy: 15,
    impact: 'Fort car utile, concret, et directement actionnable',
    principles: [
      'Ce qui fonctionne bien',
      'Ce qui fatigue vraiment',
      'Ce qu\'on arrête / ce qu\'on améliore'
    ]
  },
  {
    id: 2,
    title: 'Ice breaker "Reconnaissance croisée"',
    type: 'Court rituel (15–20 min)',
    objective: 'Renforcer la reconnaissance entre pairs',
    efficacy: 10,
    impact: 'Simple, peu coûteux, et très efficace émotionnellement',
    principles: [
      'Chaque personne cite un point positif chez un collègue',
      'Basé sur des faits concrets, pas du flou'
    ]
  },
  {
    id: 3,
    title: 'Activité hors cadre à faible charge mentale',
    type: 'Moment informel (déjeuner d\'équipe, marche, activité légère)',
    objective: 'Décompression sans pression',
    efficacy: 10,
    impact: 'À utiliser en complément, jamais pour "faire oublier" les problèmes',
    principles: [
      'Sur temps de travail',
      'Sans objectif de performance',
      'Sans discours corporate'
    ]
  }
];

const getEfficacyColor = (efficacy: number) => {
  if (efficacy >= 15) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (efficacy >= 10) return 'bg-blue-100 text-blue-700 border-blue-200';
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

export function TeamActivitiesSection() {
  return (
    <section className="bg-slate-50 rounded-lg p-6 md:p-8 border-2 border-dashed border-slate-300">
      <div className="flex items-start gap-3 mb-6">
        <Users className="w-6 h-6 text-slate-600 flex-shrink-0" />
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900">Activités d'équipe recommandées</h2>
          <p className="text-sm text-slate-600 mt-1">Complément, pas substitution</p>
        </div>
      </div>

      <div className="bg-slate-100 rounded-lg p-4 mb-6 border border-slate-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700">
          Ces activités amplifient les effets positifs. Elles ne remplacent jamais une charge maîtrisée et des priorités claires. 
          <span className="font-medium"> Bien utilisées, elles peuvent soutenir jusqu'à +30% d'amélioration perçue.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg p-5 border border-slate-200 hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="flex items-center justify-end mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getEfficacyColor(activity.efficacy)}`}>
                +{activity.efficacy}%
              </span>
            </div>

            <h3 className="font-semibold text-slate-900 mb-2 min-h-[3rem]">{activity.title}</h3>
            
            <p className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded mb-3">
              {activity.type}
            </p>

            <div className="mb-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Objectif</p>
              <p className="text-sm text-slate-700">{activity.objective}</p>
            </div>

            <div className="flex-1">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Principe</p>
              <ul className="space-y-1.5">
                {activity.principles.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <p className="text-xs text-slate-600">
                <span className="font-medium">Impact :</span> {activity.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}