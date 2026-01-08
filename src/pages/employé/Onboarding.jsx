import { useState, useEffect } from 'react'
import logoWelcome from '../../media/logo_welcome.png'

// Background SVG component
function OnboardingBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="1440" height="1024" fill="#EBEEFF"/>
        <g filter="url(#filter0_f)">
          <path d="M246.281 99.2548C303.107 15.6981 409.456 -36.6494 522.969 -35.9939C655.572 -35.2376 776.233 37.7059 819.769 145.413C937.025 153.09 1022.19 228.668 1020.99 308.279C1020.03 372.046 963.79 429.801 890.194 451.733C794.814 480.157 712.367 435.864 704.059 431.238C683.823 446.402 635.831 478.128 563.209 488.615C453.627 504.459 370.097 460.103 351.919 449.944C247.318 498.56 119.216 486.384 40.0189 423.032C-23.8309 371.958 -59.6622 284.607 -15.3217 205.815C28.369 128.183 136.234 83.0829 246.266 99.2548H246.281Z" fill="#085EFD" fillOpacity="0.48"/>
        </g>
        <g filter="url(#filter1_f)">
          <ellipse cx="841.5" cy="1021.5" rx="410.5" ry="396.5" fill="#FFA341"/>
        </g>
        <g filter="url(#filter2_f)">
          <ellipse cx="841" cy="1043" rx="203" ry="205" fill="#FFA441"/>
        </g>
        <g filter="url(#filter3_f)">
          <path d="M67 427.999C67 488.369 115.927 537.309 176.282 537.309C191.448 537.309 205.891 534.219 219.019 528.634C243.093 544.267 271.813 553.347 302.653 553.347C329.632 553.347 354.989 546.398 377.033 534.192C414.137 565.873 462.279 585 514.888 585C565.257 585 611.531 567.467 647.945 538.17C674.063 561.52 708.535 575.715 746.321 575.715C827.882 575.715 894 509.58 894 427.999C894 346.418 827.882 280.283 746.321 280.283C733.288 280.283 720.648 281.972 708.61 285.143C675.3 211.353 601.09 160 514.888 160C442.954 160 379.37 195.761 340.936 250.479C328.697 247.343 315.869 245.675 302.653 245.675C247.313 245.675 198.8 274.911 171.709 318.783C113.475 321.181 67 369.161 67 427.999Z" fill="white" fillOpacity="0.7"/>
        </g>
        <g filter="url(#filter4_f)">
          <path d="M558 803.999C558 864.369 606.927 913.309 667.282 913.309C682.448 913.309 696.891 910.219 710.019 904.634C734.093 920.267 762.813 929.347 793.653 929.347C820.632 929.347 845.989 922.398 868.033 910.192C905.137 941.873 953.279 961 1005.89 961C1056.26 961 1102.53 943.467 1138.94 914.17C1165.06 937.52 1199.53 951.715 1237.32 951.715C1318.88 951.715 1385 885.58 1385 803.999C1385 722.418 1318.88 656.283 1237.32 656.283C1224.29 656.283 1211.65 657.972 1199.61 661.143C1166.3 587.353 1092.09 536 1005.89 536C933.954 536 870.37 571.761 831.936 626.479C819.697 623.343 806.869 621.675 793.653 621.675C738.313 621.675 689.8 650.911 662.709 694.783C604.475 697.181 558 745.161 558 803.999Z" fill="white" fillOpacity="0.7"/>
        </g>
        <defs>
          <filter id="filter0_f" x="-535" y="-536" width="2056" height="1528" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur"/>
          </filter>
          <filter id="filter1_f" x="-269" y="-75" width="2221" height="2193" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="350" result="effect1_foregroundBlur"/>
          </filter>
          <filter id="filter2_f" x="438" y="638" width="806" height="810" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur"/>
          </filter>
          <filter id="filter3_f" x="19" y="112" width="923" height="521" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur"/>
          </filter>
          <filter id="filter4_f" x="510" y="488" width="923" height="521" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur"/>
          </filter>
        </defs>
      </svg>
    </div>
  )
}

// Simple dot progress indicator component
function Dots({ step, total }){
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginTop:32}}>
      {Array.from({length: total}).map((_,i)=>{
        const active = i===step
        return <div key={i} style={{width:10,height:10,borderRadius:20, background: active? 'var(--text)': 'var(--border)', transition:'background .3s'}} />
      })}
    </div>
  )
}

export default function OnboardingEmployee({ onDone }) {
  const [step, setStep] = useState(0)
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [motivation, setMotivation] = useState(null)
  const [environnementTravail, setEnvironnementTravail] = useState(null)
  const [energieSources, setEnergieSources] = useState(null)

  useEffect(()=>{
    // Avoid scrolling while onboarding? Could add logic later.
  },[])

  const next = () => {
    if(step < 7) {
      setStep(s => s+1)
    } else {
      localStorage.setItem('huma_prenom', prenom.trim())
      localStorage.setItem('huma_nom', nom.trim())
      localStorage.setItem('huma_onboarding_done','1')
      if(motivation) localStorage.setItem('huma_motivation', motivation)
      if(environnementTravail) localStorage.setItem('huma_environnement_travail', environnementTravail)
      if(energieSources) localStorage.setItem('huma_energie_sources', energieSources)
      onDone?.()
    }
  }



  return (
    <>
      {(step === 0 || step === 3 || step === 4 || step === 5 || step === 6) && <OnboardingBackground />}
      <div style={{maxWidth:960, margin:'0 auto', padding:'80px 24px 120px'}}>
        {step === 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: 16,
            padding: '80px 60px',
            maxWidth: 635,
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <img 
              src={logoWelcome} 
              alt="Logo Huma" 
              style={{width:180, height:180, margin:'0 auto 32px', display:'block'}}
            />
            <h1 style={{fontSize:'clamp(32px,6vw,54px)',lineHeight:1.1,margin:'0 0 16px', color: '#1E1E1E'}}>Bienvenue sur Huma</h1>
            <div style={{fontSize:18, maxWidth:640, margin:'0 auto 48px', lineHeight:1.5, color: '#303030'}}>Ton espace personnel qui prend le pouls de ton bien-être au travail</div>
            <button 
              className="btn primary" 
              onClick={next}
              style={{
                background: '#0748EA',
                color: 'white',
                padding: '14px 32px',
                fontSize: 16,
                fontWeight: 500,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                boxShadow: '0px 4px 8px rgba(7, 72, 234, 0.2)'
              }}
            >
              Commencer
            </button>
          </div>
        )}

      {step === 1 && (
        <>
          {/* Background SSO avec les mêmes filtres que step 0 mais avec des ellipses oranges repositionnées */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden'
          }}>
            <svg width="100%" height="100%" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <rect width="1440" height="1024" fill="#EBEEFF"/>
              <g filter="url(#filter0_f_sso)">
                <ellipse cx="715.5" cy="1023.5" rx="410.5" ry="396.5" fill="#FFA341"/>
              </g>
              <g filter="url(#filter1_f_sso)">
                <ellipse cx="712" cy="1043" rx="203" ry="205" fill="#FFA441"/>
              </g>
              <g filter="url(#filter2_f_sso)">
                <path d="M156.327 205.042C205.081 133.355 296.323 88.4429 393.712 89.0052C507.48 89.6541 611.001 152.236 648.353 244.644C748.953 251.23 822.025 316.073 820.989 384.376C820.166 439.085 771.917 488.636 708.774 507.453C626.942 531.839 556.207 493.838 549.079 489.869C531.717 502.879 490.543 530.098 428.236 539.096C334.219 552.689 262.555 514.634 246.959 505.918C157.216 547.628 47.3104 537.182 -20.6372 482.829C-75.4174 439.009 -106.159 364.067 -68.1169 296.466C-30.6322 229.861 61.9114 191.168 156.313 205.042H156.327Z" fill="#085EFD" fillOpacity="0.4"/>
              </g>
              <g filter="url(#filter3_f_sso)">
                <path d="M1029.21 394.923C1062.79 345.549 1125.63 314.616 1192.71 315.004C1271.07 315.45 1342.36 358.553 1368.09 422.199C1437.38 426.735 1487.71 471.394 1486.99 518.438C1486.43 556.118 1453.19 590.246 1409.71 603.206C1353.34 620.002 1304.63 593.829 1299.72 591.095C1287.76 600.056 1259.4 618.803 1216.49 625C1151.73 634.362 1102.38 608.152 1091.63 602.148C1029.82 630.876 954.128 623.681 907.329 586.246C869.6 556.066 848.427 504.45 874.628 457.891C900.445 412.017 964.184 385.367 1029.2 394.923H1029.21Z" fill="#085EFD" fillOpacity="0.4"/>
              </g>
              <g filter="url(#filter4_f_sso)">
                <path d="M192 438.999C192 499.369 240.927 548.309 301.282 548.309C316.448 548.309 330.891 545.219 344.019 539.634C368.093 555.267 396.813 564.347 427.653 564.347C454.632 564.347 479.989 557.398 502.033 545.192C539.137 576.873 587.279 596 639.888 596C690.257 596 736.531 578.467 772.945 549.17C799.063 572.52 833.535 586.715 871.321 586.715C952.882 586.715 1019 520.58 1019 438.999C1019 357.418 952.882 291.283 871.321 291.283C858.288 291.283 845.648 292.972 833.61 296.143C800.3 222.353 726.09 171 639.888 171C567.954 171 504.37 206.761 465.936 261.479C453.697 258.343 440.869 256.675 427.653 256.675C372.313 256.675 323.8 285.911 296.709 329.783C238.475 332.181 192 380.161 192 438.999Z" fill="white" fillOpacity="0.7"/>
              </g>
              <g filter="url(#filter5_f_sso)">
                <path d="M944 894.999C944 955.369 992.927 1004.31 1053.28 1004.31C1068.45 1004.31 1082.89 1001.22 1096.02 995.634C1120.09 1011.27 1148.81 1020.35 1179.65 1020.35C1206.63 1020.35 1231.99 1013.4 1254.03 1001.19C1291.14 1032.87 1339.28 1052 1391.89 1052C1442.26 1052 1488.53 1034.47 1524.94 1005.17C1551.06 1028.52 1585.53 1042.71 1623.32 1042.71C1704.88 1042.71 1771 976.58 1771 894.999C1771 813.418 1704.88 747.283 1623.32 747.283C1610.29 747.283 1597.65 748.972 1585.61 752.143C1552.3 678.353 1478.09 627 1391.89 627C1319.95 627 1256.37 662.761 1217.94 717.479C1205.7 714.343 1192.87 712.675 1179.65 712.675C1124.31 712.675 1075.8 741.911 1048.71 785.783C990.475 788.181 944 836.161 944 894.999Z" fill="white" fillOpacity="0.7"/>
              </g>
              <defs>
                <filter id="filter0_f_sso" x="-195" y="127" width="1821" height="1793" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter1_f_sso" x="309" y="638" width="806" height="810" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter2_f_sso" x="-485" y="-311" width="1706" height="1253" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter3_f_sso" x="463" y="-85" width="1424" height="1112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter4_f_sso" x="144" y="123" width="923" height="521" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur"/>
                </filter>
                <filter id="filter5_f_sso" x="896" y="579" width="923" height="521" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="24" result="effect1_foregroundBlur"/>
                </filter>
              </defs>
            </svg>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 579,
              width: '100%',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600
              }}>
                Connexion sécurisée via SSO
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 40px',
                color: '#303030'
              }}>
                Ton organisation utilise la connexion unique pour sécuriser les données et assurer ton anonymat avec Huma. Connecte-toi avec ton adresse e-mail professionnelle.
              </p>

              <div style={{textAlign: 'left', marginBottom: 24}}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: '#1E1E1E'
                }}>
                  E-mail
                </label>
                <div style={{position: 'relative'}}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <path d="M2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H12C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V4Z" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 4L8 9L14 4" stroke="#757575" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input 
                    type="email" 
                    placeholder="Entrez ton adresse e-mail professionnelle"
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      fontSize: 14,
                      border: '1px solid #D9D9D9',
                      borderRadius: 8,
                      background: 'white',
                      color: '#1E1E1E',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0748EA'}
                    onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 32
              }}>
                <input 
                  type="checkbox" 
                  id="remember-me"
                  style={{
                    width: 16,
                    height: 16,
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="remember-me" style={{
                  fontSize: 14,
                  color: '#303030',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  Se souvenir de moi
                </label>
              </div>

              <button 
                onClick={next}
                style={{
                  width: '100%',
                  background: '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  boxShadow: '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s',
                  marginBottom: 24
                }}
                onMouseOver={(e) => e.target.style.background = '#0536C7'}
                onMouseOut={(e) => e.target.style.background = '#0748EA'}
              >
                Se connecter
              </button>

              <div style={{
                borderTop: '1px solid #D9D9D9',
                paddingTop: 24,
                fontSize: 14,
                color: '#757575'
              }}>
                <p style={{margin: '0 0 8px'}}>
                  Besoin d'un coup de main pour te connecter ?
                </p>
                <p style={{margin: 0}}>
                  <a href="#" style={{
                    color: '#303030',
                    textDecoration: 'underline',
                    fontSize: 14
                  }}>
                    Demander l'accès
                  </a>
                </p>
              </div>

              <div style={{
                marginTop: 24,
                paddingTop: 24,
                borderTop: '1px solid #D9D9D9'
              }}>
                <a href="#" style={{
                  color: '#303030',
                  textDecoration: 'underline',
                  fontSize: 14
                }}>
                  Continuer sans SSO
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 2: Name Collection */}
      {step === 2 && (
        <>
          <OnboardingBackground />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 579,
              width: '100%'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Quelques informations pour commencer
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 32px',
                color: '#303030',
                textAlign: 'center'
              }}>
                Pour finaliser ton inscription, merci de renseigner ton prénom et ton nom.
              </p>

              <div style={{marginBottom: 20}}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: '#1E1E1E'
                }}>
                  Prénom
                </label>
                <input 
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ton prénom"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 14,
                    border: '1px solid #D9D9D9',
                    borderRadius: 8,
                    background: 'white',
                    color: '#1E1E1E',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0748EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
                />
              </div>

              <div style={{marginBottom: 32}}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  marginBottom: 8,
                  color: '#1E1E1E'
                }}>
                  Nom
                </label>
                <input 
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ton nom"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 14,
                    border: '1px solid #D9D9D9',
                    borderRadius: 8,
                    background: 'white',
                    color: '#1E1E1E',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0748EA'}
                  onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
                />
              </div>

              <div style={{
                background: 'rgba(7, 72, 234, 0.05)',
                borderRadius: 12,
                padding: 16,
                marginBottom: 32,
                display: 'flex',
                gap: 12
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{flexShrink: 0, marginTop: 2}}>
                  <circle cx="10" cy="10" r="9" stroke="#0748EA" strokeWidth="1.5"/>
                  <path d="M10 6V10.5" stroke="#0748EA" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="13.5" r="0.75" fill="#0748EA"/>
                </svg>
                <div>
                  <h3 style={{
                    fontSize: 14,
                    fontWeight: 600,
                    margin: '0 0 8px',
                    color: '#0748EA'
                  }}>
                    Ton anonymat est garanti
                  </h3>
                  <ul style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    margin: 0,
                    paddingLeft: 20,
                    color: '#303030'
                  }}>
                    <li>Tes données ne sont pas visibles par ton entreprise</li>
                    <li>Elles ne sont pas associées à tes réponses</li>
                    <li>Elles servent uniquement à la gestion technique de ton accès</li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={next}
                disabled={!prenom.trim() || !nom.trim()}
                style={{
                  width: '100%',
                  background: (!prenom.trim() || !nom.trim()) ? '#D9D9D9' : '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: (!prenom.trim() || !nom.trim()) ? 'not-allowed' : 'pointer',
                  boxShadow: (!prenom.trim() || !nom.trim()) ? 'none' : '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if(prenom.trim() && nom.trim()) {
                    e.target.style.background = '#0536C7'
                  }
                }}
                onMouseOut={(e) => {
                  if(prenom.trim() && nom.trim()) {
                    e.target.style.background = '#0748EA'
                  }
                }}
              >
                Continuer
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Comment ça marche? */}
      {step === 3 && (
        <>
          <OnboardingBackground />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 800,
              width: '100%'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Comment ça marche ?
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 40px',
                color: '#303030',
                textAlign: 'center'
              }}>
                Huma c'est simple, rapide et 100% anonyme.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                marginBottom: 40
              }}>
                {/* Card 1: 100% anonyme */}
                <div style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(7, 72, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 8px',
                    color: '#1E1E1E'
                  }}>
                    100% anonyme
                  </h3>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    margin: 0,
                    color: '#757575'
                  }}>
                    Tes réponses sont entièrement anonymisées. Ton identité reste confidentielle.
                  </p>
                </div>

                {/* Card 2: 2 clics suffisent */}
                <div style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(7, 72, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 8px',
                    color: '#1E1E1E'
                  }}>
                    2 clics suffisent
                  </h3>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    margin: 0,
                    color: '#757575'
                  }}>
                    En quelques secondes, partage ton ressenti et continue ta journée.
                  </p>
                </div>

                {/* Card 3: Une synthèse rien que pour toi */}
                <div style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(7, 72, 234, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H9H8" stroke="#0748EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 600,
                    margin: '0 0 8px',
                    color: '#1E1E1E'
                  }}>
                    Une synthèse rien que pour toi
                  </h3>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    margin: 0,
                    color: '#757575'
                  }}>
                    Chaque mois, reçois une analyse détaillée de ton bien-être.
                  </p>
                </div>
              </div>

              {/* Progress dots */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 32
              }}>
                <div style={{
                  width: 32,
                  height: 8,
                  borderRadius: 4,
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
              </div>

              <button 
                onClick={next}
                style={{
                  width: '100%',
                  background: '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  boxShadow: '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#0536C7'}
                onMouseOut={(e) => e.target.style.background = '#0748EA'}
              >
                C'est compris
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 4: Questionnaire */}
      {step === 4 && (
        <>
          <OnboardingBackground />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 800,
              width: '100%'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Personnalisons ton expérience
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 32px',
                color: '#303030',
                textAlign: 'center'
              }}>
                Ces quelques réponses nous aideront à te proposer un accompagnement plus juste.
              </p>

              {/* Question unique */}
              <div style={{marginBottom: 40}}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: '#1E1E1E'
                }}>
                  1/3 Qu'est-ce qui te motive le plus ?
                </h3>
                

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16
                }}>
                  <button
                    onClick={() => setMotivation('reconnaissance')}
                    style={{
                      background: motivation === 'reconnaissance' ? '#0748EA' : 'white',
                      color: motivation === 'reconnaissance' ? 'white' : '#1E1E1E',
                      border: motivation === 'reconnaissance' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: motivation === 'reconnaissance' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Reconnaissance
                  </button>
                  <button
                    onClick={() => setMotivation('apprentissage')}
                    style={{
                      background: motivation === 'apprentissage' ? '#0748EA' : 'white',
                      color: motivation === 'apprentissage' ? 'white' : '#1E1E1E',
                      border: motivation === 'apprentissage' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: motivation === 'apprentissage' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Apprentissage
                  </button>
                  <button
                    onClick={() => setMotivation('impact')}
                    style={{
                      background: motivation === 'impact' ? '#0748EA' : 'white',
                      color: motivation === 'impact' ? 'white' : '#1E1E1E',
                      border: motivation === 'impact' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: motivation === 'impact' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Impact
                  </button>
                  <button
                    onClick={() => setMotivation('equilibre')}
                    style={{
                      background: motivation === 'equilibre' ? '#0748EA' : 'white',
                      color: motivation === 'equilibre' ? 'white' : '#1E1E1E',
                      border: motivation === 'equilibre' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: motivation === 'equilibre' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Équilibre
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 32
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 32,
                  height: 8,
                  borderRadius: 4,
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
              </div>

              {/* CTA Button */}
              <button 
                onClick={next}
                disabled={!motivation}
                style={{
                  width: '100%',
                  background: !motivation ? '#D9D9D9' : '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: !motivation ? 'not-allowed' : 'pointer',
                  boxShadow: !motivation ? 'none' : '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if(motivation) {
                    e.target.style.background = '#0536C7'
                  }
                }}
                onMouseOut={(e) => {
                  if(motivation) {
                    e.target.style.background = '#0748EA'
                  }
                }}
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 5: Questionnaire 3/3 - Sources d'énergie */}
      {step === 5 && (
        <>
          <OnboardingBackground />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 800,
              width: '100%'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Personnalisons ton expérience
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 32px',
                color: '#303030',
                textAlign: 'center'
              }}>
                Ces quelques réponses nous aideront à te proposer un accompagnement plus juste.
              </p>

              {/* Question unique */}
              <div style={{marginBottom: 40}}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: '#1E1E1E'
                }}>
                  2/3 Qu'est-ce qui te prend le plus d'énergie habituellement ?
                </h3>
                

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16
                }}>
                  <button
                    onClick={() => setEnergieSources('charge-travail')}
                    style={{
                      background: energieSources === 'charge-travail' ? '#0748EA' : 'white',
                      color: energieSources === 'charge-travail' ? 'white' : '#1E1E1E',
                      border: energieSources === 'charge-travail' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: energieSources === 'charge-travail' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Charge de travail
                  </button>
                  <button
                    onClick={() => setEnergieSources('relations')}
                    style={{
                      background: energieSources === 'relations' ? '#0748EA' : 'white',
                      color: energieSources === 'relations' ? 'white' : '#1E1E1E',
                      border: energieSources === 'relations' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: energieSources === 'relations' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Relations
                  </button>
                  <button
                    onClick={() => setEnergieSources('incertitude')}
                    style={{
                      background: energieSources === 'incertitude' ? '#0748EA' : 'white',
                      color: energieSources === 'incertitude' ? 'white' : '#1E1E1E',
                      border: energieSources === 'incertitude' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: energieSources === 'incertitude' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Incertitude
                  </button>
                  <button
                    onClick={() => setEnergieSources('delais')}
                    style={{
                      background: energieSources === 'delais' ? '#0748EA' : 'white',
                      color: energieSources === 'delais' ? 'white' : '#1E1E1E',
                      border: energieSources === 'delais' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: energieSources === 'delais' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Délais
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 32
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 32,
                  height: 8,
                  borderRadius: 4,
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#D9D9D9'
                }} />
              </div>

              <button
                onClick={next}
                disabled={!energieSources}
                style={{
                  width: '100%',
                  background: !energieSources ? '#D9D9D9' : '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: !energieSources ? 'not-allowed' : 'pointer',
                  boxShadow: !energieSources ? 'none' : '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if(energieSources) {
                    e.target.style.background = '#0536C7'
                  }
                }}
                onMouseOut={(e) => {
                  if(energieSources) {
                    e.target.style.background = '#0748EA'
                  }
                }}
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 6: Environnement de travail */}
      {step === 6 && (
        <>
          <OnboardingBackground />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 200px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              padding: '60px 50px',
              maxWidth: 800,
              width: '100%'
            }}>
              <h1 style={{
                fontSize: 32,
                lineHeight: 1.2,
                margin: '0 0 16px',
                color: '#1E1E1E',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                Personnalisons ton expérience
              </h1>
              
              <p style={{
                fontSize: 16,
                lineHeight: 1.5,
                margin: '0 0 32px',
                color: '#303030',
                textAlign: 'center'
              }}>
                Ces quelques réponses nous aideront à te proposer un accompagnement plus juste.
              </p>

              {/* Question unique */}
              <div style={{marginBottom: 40}}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: '#1E1E1E'
                }}>
                  3/3 Qu'est-ce qui te motive le plus dans ton environnement de travail ?
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16
                }}>
                  <button
                    onClick={() => setEnvironnementTravail('autonomie')}
                    style={{
                      background: environnementTravail === 'autonomie' ? '#0748EA' : 'white',
                      color: environnementTravail === 'autonomie' ? 'white' : '#1E1E1E',
                      border: environnementTravail === 'autonomie' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: environnementTravail === 'autonomie' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Autonomie
                  </button>
                  <button
                    onClick={() => setEnvironnementTravail('collaboration')}
                    style={{
                      background: environnementTravail === 'collaboration' ? '#0748EA' : 'white',
                      color: environnementTravail === 'collaboration' ? 'white' : '#1E1E1E',
                      border: environnementTravail === 'collaboration' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: environnementTravail === 'collaboration' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Collaboration
                  </button>
                  <button
                    onClick={() => setEnvironnementTravail('flexibilite')}
                    style={{
                      background: environnementTravail === 'flexibilite' ? '#0748EA' : 'white',
                      color: environnementTravail === 'flexibilite' ? 'white' : '#1E1E1E',
                      border: environnementTravail === 'flexibilite' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: environnementTravail === 'flexibilite' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Flexibilité
                  </button>
                  <button
                    onClick={() => setEnvironnementTravail('stabilite')}
                    style={{
                      background: environnementTravail === 'stabilite' ? '#0748EA' : 'white',
                      color: environnementTravail === 'stabilite' ? 'white' : '#1E1E1E',
                      border: environnementTravail === 'stabilite' ? '1px solid #0748EA' : '1px solid #D9D9D9',
                      borderRadius: 8,
                      padding: '16px 20px',
                      fontSize: 16,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: environnementTravail === 'stabilite' ? '0px 4px 8px rgba(7, 72, 234, 0.2)' : 'none'
                    }}
                  >
                    Stabilité
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 32
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0748EA'
                }} />
                <div style={{
                  width: 32,
                  height: 8,
                  borderRadius: 4,
                  background: '#0748EA'
                }} />
              </div>

              <button
                onClick={next}
                disabled={!environnementTravail}
                style={{
                  width: '100%',
                  background: !environnementTravail ? '#D9D9D9' : '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: !environnementTravail ? 'not-allowed' : 'pointer',
                  boxShadow: !environnementTravail ? 'none' : '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if(environnementTravail) {
                    e.target.style.background = '#0536C7'
                  }
                }}
                onMouseOut={(e) => {
                  if(environnementTravail) {
                    e.target.style.background = '#0748EA'
                  }
                }}
              >
                Finaliser
              </button>
            </div>
          </div>
        </>      )}

      {/* Step 7: Félicitations */}
      {step === 7 && (
        <>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24
          }}>
            <div style={{
              maxWidth: 560,
              width: '100%',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
              borderRadius: 16,
              padding: '64px 48px',
              boxShadow: '0px 8px 32px rgba(7, 72, 234, 0.12)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: 32,
                fontWeight: 600,
                color: '#1E1E1E',
                marginBottom: 48,
                lineHeight: 1.4
              }}>
                Félicitations, ton compte est activé !
              </div>

              {/* Logo Huma */}
              <div style={{ marginBottom: 48 }}>
                <img 
                  src={logoWelcome} 
                  alt="Huma" 
                  style={{ 
                    width: 120, 
                    height: 120, 
                    margin: '0 auto', 
                    display: 'block' 
                  }} 
                />
              </div>

              <button
                onClick={next}
                style={{
                  width: '100%',
                  background: '#0748EA',
                  color: 'white',
                  padding: '14px 32px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  boxShadow: '0px 4px 8px rgba(7, 72, 234, 0.2)',
                  transition: 'all 0.2s',
                  marginBottom: 32
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#0536C7'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0px 6px 12px rgba(7, 72, 234, 0.3)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#0748EA'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0px 4px 8px rgba(7, 72, 234, 0.2)'
                }}
              >
                Commencer avec Huma
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 14,
                color: '#1E1E1E',
                opacity: 0.7
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="#1E1E1E"/>
                  <path d="M8 4C7.72386 4 7.5 4.22386 7.5 4.5V8.5C7.5 8.77614 7.72386 9 8 9C8.27614 9 8.5 8.77614 8.5 8.5V4.5C8.5 4.22386 8.27614 4 8 4Z" fill="#1E1E1E"/>
                  <path d="M8 11C8.41421 11 8.75 10.6642 8.75 10.25C8.75 9.83579 8.41421 9.5 8 9.5C7.58579 9.5 7.25 9.83579 7.25 10.25C7.25 10.6642 7.58579 11 8 11Z" fill="#1E1E1E"/>
                </svg>
                <span>100% anonyme - aucun manager ne verra ton ressenti individuel</span>
              </div>
            </div>
          </div>
        </>      )}
      </div>
    </>
  )
}
