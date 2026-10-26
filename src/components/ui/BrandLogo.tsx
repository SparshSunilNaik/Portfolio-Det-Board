export function BrandLogo({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 128 64" role="img" aria-label="Angular spider investigation emblem">
    <title>CASE spider — SparshSunilNaik</title>
    <path className="brand-logo__frame" d="M5 20V7h13M110 7h13v13M123 45v12h-13M18 57H5V45" />
    <path className="brand-logo__legs" d="M57 24 43 15 27 18M55 28 39 25 22 30M55 33 39 39 27 49M58 36 47 50 43 59M71 24 85 15 101 18M73 28 89 25 106 30M73 33 89 39 101 49M70 36 81 50 85 59" />
    <path className="brand-logo__abdomen" d="M64 17c-9 0-13 8-11 17 2 8 7 13 11 17 4-4 9-9 11-17 2-9-2-17-11-17Z" />
    <path className="brand-logo__thorax" d="M64 14 72 22 64 29 56 22Z" />
    <path className="brand-logo__spine" d="M64 20v25M59 31h10M57 38h14" />
    <path className="brand-logo__thread" d="M64 51v7M64 58c17-8 36-8 55-2" />
    <circle className="brand-logo__node" cx="119" cy="56" r="3" />
  </svg>
}
