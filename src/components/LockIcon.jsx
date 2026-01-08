export default function LockIcon({ size = 24, color = '#757575' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M21.36 13.382V18.591C21.36 20.462 20.007 22 18.343 22H4.377C2.714 22 1.36 20.462 1.36 18.591V13.382C1.36 11.51 2.714 9.973 4.377 9.973H18.343C20.007 9.973 21.36 11.51 21.36 13.382Z" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeMiterlimit="10"
      />
      <path 
        d="M17.084 7.181V9.973H5.59V7.181C5.59 3.782 8.174 1 11.342 1C12.921 1 14.358 1.698 15.392 2.821C16.436 3.934 17.084 5.481 17.084 7.181Z" 
        stroke={color} 
        strokeWidth="1.8" 
        strokeMiterlimit="10"
      />
    </svg>
  )
}
