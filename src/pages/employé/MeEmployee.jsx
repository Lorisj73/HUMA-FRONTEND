export default function MeEmployee() {
  return (
    <div className="container" style={{paddingTop:24}}>
      <h1 style={{fontSize:32, margin:'0 0 32px', fontWeight:600}}>Ton espace personnel</h1>
      
      {/* Section: Ta synthèse ce mois-ci */}
      <div style={{marginBottom:24}}>
        <h2 style={{fontSize:22, margin:'0 0 8px', fontWeight:600}}>Ta synthèse ce mois-ci</h2>
        <div style={{fontSize:16, color:'var(--text)', marginBottom:20}}>Novembre 2025</div>
        
        {/* Grille des 3 cartes stats */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          
          {/* Humeur moyenne */}
          <div className="card" style={{padding:'24px'}}>
            <div style={{display:'flex', alignItems:'flex-start', gap:16, marginBottom:16}}>
              <div style={{
                width:48,
                height:48,
                border:'1px solid var(--border)',
                borderRadius:8,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                background:'var(--bg)'
              }}>
                <div style={{width:24,height:24,border:'1px solid var(--border)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  🖼️
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, color:'var(--muted)', marginBottom:4}}>Humeur moyenne</div>
                <div style={{fontSize:32, fontWeight:700, lineHeight:1}}>7,2/10</div>
              </div>
            </div>
            <div style={{fontSize:14, color:'var(--text)'}}>+0,8 vs Octobre</div>
          </div>

          {/* Participation */}
          <div className="card" style={{padding:'24px'}}>
            <div style={{display:'flex', alignItems:'flex-start', gap:16, marginBottom:16}}>
              <div style={{
                width:48,
                height:48,
                border:'1px solid var(--border)',
                borderRadius:8,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                background:'var(--bg)'
              }}>
                <div style={{width:24,height:24,border:'1px solid var(--border)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  🖼️
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, color:'var(--muted)', marginBottom:4}}>Participation</div>
                <div style={{fontSize:32, fontWeight:700, lineHeight:1}}>28/28 jours</div>
              </div>
            </div>
            <div style={{fontSize:14, color:'var(--text)'}}>100% ce mois</div>
          </div>

          {/* Niveau */}
          <div className="card" style={{padding:'24px'}}>
            <div style={{display:'flex', alignItems:'flex-start', gap:16, marginBottom:16}}>
              <div style={{
                width:48,
                height:48,
                border:'1px solid var(--border)',
                borderRadius:8,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                background:'var(--bg)'
              }}>
                <div style={{width:24,height:24,border:'1px solid var(--border)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  🖼️
                </div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, color:'var(--muted)', marginBottom:4}}>Niveau</div>
                <div style={{fontSize:32, fontWeight:700, lineHeight:1}}>Niv 5</div>
              </div>
            </div>
            <div style={{fontSize:14, color:'var(--text)'}}>Barre de progression ici</div>
          </div>

        </div>
      </div>

      {/* Section: Evolution et Facteurs */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24}}>
        
        {/* Evolution sur le mois */}
        <div className="card" style={{padding:'32px'}}>
          <h2 style={{fontSize:20, margin:'0 0 8px', fontWeight:600}}>Evolution sur le mois</h2>
          <div style={{fontSize:14, color:'var(--muted)', marginBottom:32}}>Tes humeurs quotidiennes en Novembre</div>
          
          {/* Graphique avec données fictives */}
          <div style={{marginBottom:32}}>
            {/* Jours du mois */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(31, 1fr)', gap:2, marginBottom:8}}>
              {Array.from({length:31}, (_, i) => (
                <div key={i} style={{
                  fontSize:9,
                  textAlign:'center',
                  color:'var(--muted)'
                }}>
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Barres du graphique */}
            <div style={{display:'flex', alignItems:'flex-end', height:120, gap:2}}>
              {[8,7,9,6,8,9,7,8,6,9,8,7,9,8,7,6,8,9,7,8,9,6,8,7,9,8,7,4,0,0,0].map((value, i) => (
                <div key={i} style={{flex:1, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                  {value > 0 ? (
                    <div style={{
                      width:'100%',
                      height: (value / 10) * 120,
                      background: value >= 8 ? '#3738ff' : value >= 6 ? '#e6ebff' : '#ff5408',
                      borderRadius:'2px 2px 0 0',
                      transition:'height .3s'
                    }} />
                  ) : (
                    <div style={{
                      width:12,
                      height:12,
                      background:'var(--border)',
                      borderRadius:'50%',
                      marginBottom:4
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24, textAlign:'center'}}>
            <div>
              <div style={{fontSize:36, fontWeight:700, marginBottom:4}}>12</div>
              <div style={{fontSize:14, color:'var(--text)'}}>Excellents jours</div>
            </div>
            <div>
              <div style={{fontSize:36, fontWeight:700, marginBottom:4}}>14</div>
              <div style={{fontSize:14, color:'var(--text)'}}>Jours corrects</div>
            </div>
            <div>
              <div style={{fontSize:36, fontWeight:700, marginBottom:4}}>2</div>
              <div style={{fontSize:14, color:'var(--text)'}}>Jours difficiles</div>
            </div>
          </div>
        </div>

        {/* Facteurs d'influence */}
        <div className="card" style={{padding:'32px'}}>
          <h2 style={{fontSize:20, margin:'0 0 8px', fontWeight:600}}>Facteurs d'influence</h2>
          <div style={{fontSize:14, color:'var(--muted)', marginBottom:32}}>Ce qui impacte ton humeur</div>
          
          <div style={{display:'flex', flexDirection:'column', gap:20}}>
            {[
              {label: 'Organisation/clarté', value: 85},
              {label: 'Charge/rythme', value: 75},
              {label: 'Relations/ambiance', value: 70},
              {label: 'Reconnaissance', value: 55},
              {label: 'Equilibre pro/perso', value: 35}
            ].map((factor, i) => (
              <div key={i}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                  <span style={{fontSize:14}}>{factor.label}</span>
                  <span style={{fontSize:14, fontWeight:600}}>{factor.value}%</span>
                </div>
                <div style={{
                  width:'100%',
                  height:12,
                  background:'var(--border)',
                  borderRadius:20,
                  overflow:'hidden'
                }}>
                  <div style={{
                    width: factor.value + '%',
                    height:'100%',
                    background:'var(--text)',
                    borderRadius:20,
                    transition:'width .5s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
