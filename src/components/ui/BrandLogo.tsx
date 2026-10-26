export function BrandLogo({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 128 64" role="img" aria-label="SSN monogram">
    <title>SSN — Sparsh Sunil Naik</title>
    <path className="brand-logo__frame" d="M5 20V7h13M110 7h13v13M123 48v9h-13M18 57H5v-9" />
    <path className="brand-logo__letters" d="M14 18h27v12H17v16h27M49 18h26v12H52v16h27M85 46V18l27 28V18" />
    <path className="brand-logo__thread" d="M8 53C31 44 44 58 64 51s34-13 56-3" />
    <circle className="brand-logo__node" cx="8" cy="53" r="3" /><circle className="brand-logo__node" cx="64" cy="51" r="3" /><circle className="brand-logo__node" cx="120" cy="48" r="3" />
  </svg>
}
