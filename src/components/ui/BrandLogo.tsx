export function BrandLogo({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 128 64" role="img" aria-label="Watchful eyes investigation emblem">
    <title>Watchful eyes — SparshSunilNaik</title>
    <path className="brand-logo__frame" d="M5 20V7h13M110 7h13v13M123 45v12h-13M18 57H5V45" />
    <path className="brand-logo__brow" d="M12 20 51 14M77 14l39 6" />
    <path className="brand-logo__eye" d="M10 31Q27 18 55 27 35 47 10 31ZM118 31Q101 18 73 27q20 20 45 4Z" />
    <ellipse className="brand-logo__iris" cx="38" cy="30" rx="7" ry="9"/><ellipse className="brand-logo__iris" cx="90" cy="30" rx="7" ry="9"/>
    <circle className="brand-logo__pupil" cx="40" cy="30" r="3"/><circle className="brand-logo__pupil" cx="88" cy="30" r="3"/>
    <path className="brand-logo__thread" d="M8 52C31 45 45 58 64 51s34-12 56-3" />
    <circle className="brand-logo__node" cx="8" cy="52" r="3" /><circle className="brand-logo__node" cx="64" cy="51" r="3" /><circle className="brand-logo__node" cx="120" cy="48" r="3" />
  </svg>
}
