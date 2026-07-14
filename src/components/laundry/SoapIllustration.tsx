export function SoapIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Leafy backdrop */}
      <path d="M20 108c-14-30 4-62 34-58 18 2 20 26 6 34-16 9-30 10-40 24z" fill="#DCEFE0" />

      {/* Detergent bottle */}
      <rect x="30" y="46" width="30" height="52" rx="6" fill="#8FB7E8" />
      <rect x="38" y="34" width="14" height="14" rx="3" fill="#5B93DD" />
      <rect x="36" y="30" width="18" height="6" rx="2" fill="#3E6FBE" />
      <rect x="34" y="70" width="22" height="16" rx="2" fill="#5B93DD" opacity="0.6" />

      {/* Soap bar */}
      <rect x="64" y="86" width="34" height="16" rx="8" fill="#F4EFE1" stroke="#E3DBC6" strokeWidth="1" />

      {/* Soft-dispenser bottle */}
      <rect x="104" y="52" width="24" height="46" rx="6" fill="#8FCB9B" />
      <rect x="110" y="42" width="12" height="12" rx="3" fill="#5FA870" />
      <circle cx="116" cy="40" r="4" fill="#4A9159" />

      {/* Sparkles */}
      <path d="M96 34l1.5 4L101 40l-3.5 2-1.5 4-1.5-4L91 40l3.5-2z" fill="#BFE0C8" />
      <path d="M62 40l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#BFD7EE" />
    </svg>
  );
}
