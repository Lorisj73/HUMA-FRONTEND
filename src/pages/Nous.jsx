export default function Nous(){
  // Static mock content for team view
  const dims = [
    {label:'Cadre de travail', score:7.8, trend:'+1', desc:'95% de satisfaction dans la charge de travail'},
    {label:'Développement professionnel', score:7.5, trend:'+2', desc:'Progression ressentie cette année'},
    {label:'Relations au travail', score:7.0, trend:'−1', desc:'Communication interne en baisse'},
    {label:'Santé et bien‑être', score:6.0, trend:'−2', desc:'48% jugent la charge mentale élevée'},
  ]

  return (
    <div className="container">
      <h2 style={{margin:'4px 0 8px'}}>Nous</h2>
      <div style={{color:'var(--muted)', fontSize:14}}>12 personnes ont répondu aujourd’hui</div>
      <div className="progress"><div className="bar" style={{width:'62%'}}></div><div className="dot"/></div>

      {/* Segmented selector mock */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin:'8px 0 12px'}}>
        <div style={{height:0}}/>
        <div style={{display:'flex', gap:8}}>
          <span className="pill active">Équipe</span>
          <span className="pill">Boîte à idées</span>
        </div>
      </div>

      <div className="grid two" style={{marginTop:4}}>
        <div className="card large">
          <div className="subtle">L’humeur de l’équipe aujourd’hui</div>
          <div className="card panel" style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:140}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:40, opacity:.85, marginBottom:8}}>☁️</div>
              <div style={{display:'flex', gap:8, justifyContent:'center'}}>
                <span className="pill">Content</span>
                <span className="pill">Soutenu</span>
                <span className="pill">Organisation</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card large">
          <div className="subtle">L’interprétation du jour</div>
          <div className="card panel">
            <h3 style={{margin:'0 0 8px'}}>Gérer une journée chargée</h3>
            <p className="muted">Lorem ipsum dolor sit amet consectetur. Augue pulvinar felis ultricies ipsum ullamcorper mauris. Fermentum neque.</p>
            <button className="btn" style={{marginTop:8}}>Lire le conseil complet</button>
          </div>
        </div>
      </div>

      <div className="card large" style={{marginTop:12}}>
        <div className="subtle">Le baromètre QVT à l’instant T</div>
        <div className="card panel" style={{textAlign:'center'}}>
          <div style={{fontSize:18, fontWeight:600, margin:'8px 0'}}>7,05/10</div>
          <div className="muted">Lorem ipsum dolor sit amet consectetur. Augue pulvinar felis ultricies ipsum !</div>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div className="subtle">Le baromètre par dimensions</div>
        <div className="grid cols-4">
          {dims.map((d, i)=> (
            <div key={i} className="card panel" style={{display:'flex', flexDirection:'column', gap:8}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <div style={{fontWeight:600}}>{d.score}</div>
                  <div className="mini" style={{color: d.trend.startsWith('+')? 'var(--success, #16a34a)':'#ef4444'}}>{d.trend}</div>
                </div>
                <div style={{flex:1, marginLeft:8}}>
                  <div className="progress" style={{height:4, margin:0}}>
                    <div className="bar" style={{width: `${Math.max(0, Math.min(10, d.score))*10}%`}}></div>
                  </div>
                </div>
              </div>
              <div style={{fontWeight:600, fontSize:14}}>{d.label}</div>
              <div className="mini muted">{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid two" style={{marginTop:12}}>
        <div className="card panel" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:600}}>Météo de l’humeur</div>
            <div className="mini muted">Mood stable sur 4 semaines</div>
          </div>
          <div style={{fontSize:24}}>🌤️</div>
        </div>
        <div className="card panel" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:600}}>Boîte à idées</div>
            <div className="mini muted">25% adoptées</div>
          </div>
          <div className="muted" style={{textAlign:'right'}}>
            <div style={{fontWeight:600}}>32 idées</div>
          </div>
        </div>
      </div>
    </div>
  )
}
