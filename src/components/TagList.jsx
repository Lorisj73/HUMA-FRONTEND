export function Chip({children}){ return <span className="chip">{children}</span> }

export default function TagList({items, compact=false}){
  return (
    <div className="chips">
      {items.map((it,idx)=> (
        <Chip key={idx}>{it.label}{it.count!=null?` (${it.count})`:''}</Chip>
      ))}
    </div>
  )
}
