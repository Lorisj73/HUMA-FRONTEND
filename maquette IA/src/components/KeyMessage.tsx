import React from 'react';
import { MessageSquare, CheckSquare, Calendar } from 'lucide-react';

export function KeyMessage() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 md:p-8 text-white">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Message clé à retenir</h2>
        <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">Manager</span>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
          <p className="text-white/90">
            Les activités d'équipe amplifient les effets positifs.
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
          <p className="text-white/90">
            Elles ne remplacent jamais une charge maîtrisée et des priorités claires.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
          <p className="text-white/90">
            Bien utilisées, elles peuvent soutenir jusqu'à <span className="font-semibold">+30% d'amélioration perçue</span>, mais uniquement si les actions structurelles sont engagées.
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 pt-6">
        <p className="text-sm font-medium text-white/70 mb-4">Si tu veux, je peux aussi :</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors">
            <p className="text-sm font-medium mb-1">📊 Présentation managériale</p>
            <p className="text-xs text-white/70">Transformer ce rapport en présentation</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors flex items-start gap-3">
            <Calendar className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Calendrier combinant actions + activités sur 3 mois</p>
              <p className="text-xs text-white/70">Planification concrète</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
