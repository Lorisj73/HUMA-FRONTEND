export default function MetricCard({label, value, unit, delta}){
  const trendColor = delta > 0 ? '#16a34a' : delta < 0 ? '#dc2626' : '#6b7280'
  const trendSign = delta > 0 ? '+' : ''
  return (
    <div className="card">
      <div className="metric">
        <div className="label">{label}</div>
        <div className="value">{value}{unit}</div>
        <div style={{color: trendColor, fontSize:12}}>{trendSign}{delta}</div>
      </div>
    </div>
  )}
