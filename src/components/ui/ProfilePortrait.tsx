interface ProfilePortraitProps { photoUrl?: string }

export function ProfilePortrait({ photoUrl }: ProfilePortraitProps) {
  return <figure className="portrait">
    {photoUrl
      ? <img src={photoUrl} alt="Sparsh Sunil Naik" width="150" height="185" />
      : <div className="portrait-fallback" aria-label="Sparsh Sunil Naik initials"><b>SSN</b><span>IDENTITY<br/>CONFIRMED</span></div>}
  </figure>
}
