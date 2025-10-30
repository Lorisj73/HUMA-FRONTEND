export default function WordCloud({ items, minSize=14, maxSize=40 }){
  if (!items || !items.length) return null
  const counts = items.map(i=>i.count)
  const min = Math.min(...counts)
  const max = Math.max(...counts)
  const scale = (c)=>{
    if (max===min) return (minSize+maxSize)/2
    return minSize + (maxSize - minSize) * ((c - min) / (max - min))
  }

  const jitter = (seed)=> (seed % 3 - 1) * 2 // -2,0,2 px small

  return (
    <div className="cloud" role="list">
      {items.map((it,idx)=>{
        const size = scale(it.count)
        const w = it.weight || 400 + Math.round((size-minSize)/(maxSize-minSize)*400)
        const style = { fontSize: size, fontWeight: w, marginTop: jitter(idx) }
        return (
          <span role="listitem" key={it.text+idx} className="cloud-item" style={style} title={`${it.text} ×${it.count}`}>{it.text}</span>
        )
      })}
    </div>
  )
}
