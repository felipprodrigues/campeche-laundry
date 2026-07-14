export function LaundryIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Plant */}
      <path d="M42 108c0-14 8-24 8-24s8 10 8 24" fill="#5EA8D9" opacity="0.9" />
      <path d="M50 100c0-11-10-18-10-18s-2 13 10 18" fill="#7BC0E8" opacity="0.9" />
      <path d="M50 100c0-11 10-18 10-18s2 13-10 18" fill="#4A93C7" opacity="0.9" />
      <path d="M38 108h24l-3 16H41z" fill="#BFD7EE" />
      <path d="M38 108h24l-1 5H39z" fill="#9CBEE0" />

      {/* Towel stack */}
      <rect x="66" y="96" width="34" height="10" rx="3" fill="#2E5FA3" />
      <rect x="66" y="83" width="34" height="10" rx="3" fill="#4E86D6" />
      <rect x="66" y="70" width="34" height="10" rx="3" fill="#8FB8EC" />

      {/* Basket */}
      <path d="M164 90h38l-5 34a4 4 0 0 1-4 3h-20a4 4 0 0 1-4-3z" fill="#2F6BD8" />
      <path d="M167 96h32M165 105h36M164.5 114h37" stroke="#1E4FAF" strokeWidth="1.5" opacity="0.6" />
      <rect x="170" y="78" width="7" height="16" rx="3" fill="#F4F8FE" />
      <rect x="180" y="74" width="8" height="20" rx="3" fill="#BFD7EE" />
      <rect x="190" y="80" width="7" height="14" rx="3" fill="#7BAEE8" />

      {/* Washing machine */}
      <rect x="96" y="34" width="70" height="82" rx="10" fill="#FFFFFF" stroke="#D7E4F5" strokeWidth="1.5" />
      <rect x="96" y="34" width="70" height="14" rx="7" fill="#EEF4FC" />
      <circle cx="151" cy="41" r="2.4" fill="#BFD7EE" />
      <circle cx="143" cy="41" r="2.4" fill="#BFD7EE" />
      <circle cx="135" cy="41" r="2.4" fill="#BFD7EE" />

      <circle cx="131" cy="82" r="28" fill="#EAF2FC" stroke="#D7E4F5" strokeWidth="2" />
      <circle cx="131" cy="82" r="22" fill="#5B93DD" />
      <path
        d="M131 60a22 22 0 0 1 22 22 22 22 0 0 1-9 17.7 16 16 0 0 0 3-9.7 16 16 0 0 0-16-16 15.9 15.9 0 0 0-9.3 3 22 22 0 0 1 9.3-17z"
        fill="#2E5FA3"
      />
      <circle cx="131" cy="82" r="22" fill="none" stroke="#1E4FAF" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
