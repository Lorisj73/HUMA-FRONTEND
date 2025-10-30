import { frequentFeelings } from '@/services/userInsights'
import WordCloud from '@/components/WordCloud'

export default function Me(){
  return (
    <div className="container">
      <h2 style={{margin:'4px 0 8px'}}>Moi</h2>
      <div style={{color:'var(--muted)', fontSize:14}}>Tu as contribué 150 fois à améliorer ton bien‑être dans l’entreprise</div>
      <div className="progress"><div className="bar" style={{width:'60%'}}></div><div className="dot"/></div>

      {/* Tabs row (static for mock) */}
      <div className="grid two" style={{margin:'12px 0'}}>
        <div className="card panel"><div className="subtle" style={{textAlign:'center'}}>Mes stats</div></div>
        <div className="card panel"><div className="subtle" style={{textAlign:'center'}}>Mes inspirations</div></div>
      </div>

      {/* Frequent feelings word cloud */}
      <div className="card" style={{marginTop:8}}>
        <div className="subtle">Tes ressentis les plus fréquents</div>
        <div className="muted" style={{fontSize:13, marginBottom:8}}>Basé sur les 60 derniers jours</div>
        <div className="card panel" style={{minHeight:160, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <WordCloud items={frequentFeelings} />
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:8}}>
          <button className="btn">Top 6 détaillé ▾</button>
        </div>
      </div>

      {/* Personalized analysis placeholder */}
      <div className="card" style={{marginTop:12}}>
        <div className="subtle">Ton analyse personnalisée</div>
        <div className="card panel">
          Tu ressens principalement <strong>Content</strong> et <strong>Motivé</strong>. Huma te propose d’entretenir ces émotions positives.
          <div style={{marginTop:12}}><button className="btn primary">Voir les actions suggérées par Huma</button></div>
        </div>
      </div>
    </div>
  )
}
