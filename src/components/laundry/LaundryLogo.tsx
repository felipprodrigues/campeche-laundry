export function LaundryLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        d="M256,40 C220,100 160,160 160,260 C160,340 210,380 256,380 C302,380 352,340 352,260 C352,160 292,100 256,40 Z"
        fill="none"
        strokeWidth="24"
      />
      <path d="M256,150 C235,190 215,220 215,270 C215,310 235,330 256,330 C277,330 297,310 297,270 C297,220 277,190 256,150 Z" />
      <path
        d="M220,360 C170,360 80,320 80,210 C80,140 120,110 120,110 C120,110 100,160 130,230 C155,290 200,315 230,325"
        fill="none"
        strokeWidth="20"
      />
      <path
        d="M165,285 C140,285 110,260 110,210 C110,180 130,160 130,160 C130,160 120,180 135,220 C145,250 160,260 175,265"
        fill="none"
        strokeWidth="14"
      />
      <path
        d="M292,360 C342,360 432,320 432,210 C432,140 392,110 392,110 C392,110 412,160 382,230 C357,290 312,315 282,325"
        fill="none"
        strokeWidth="20"
      />
      <path
        d="M347,285 C372,285 402,260 402,210 C402,180 382,160 382,160 C382,160 392,180 377,220 C367,250 352,260 337,265"
        fill="none"
        strokeWidth="14"
      />
      <path d="M256,360 L256,470" strokeWidth="28" strokeLinecap="round" />
    </svg>
  );
}
