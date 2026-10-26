interface ProfilePortraitProps { photoUrl?: string }

const defaultPhotoUrl = `${import.meta.env.BASE_URL}profile/sparsh-naik.webp`

export function ProfilePortrait({ photoUrl = defaultPhotoUrl }: ProfilePortraitProps) {
  return <figure className="portrait">
    {photoUrl
      ? <img src={photoUrl} alt="Portrait of Sparsh Sunil Naik" width="600" height="750" loading="eager" decoding="async" fetchPriority="high" draggable="false" />
      : <div className="portrait-fallback" aria-label="Sparsh Sunil Naik initials"><b>SSN</b><span>IDENTITY<br/>CONFIRMED</span></div>}
  </figure>
}
