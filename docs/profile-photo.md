# Profile photograph replacement

The central dossier currently uses the stable SSN initials treatment in `src/components/ui/ProfilePortrait.tsx`. Its frame has a fixed `170 × 205` aspect ratio, so adding a photo does not cause layout shift.

When an approved photograph is available:

1. Optimize it as WebP or AVIF and add it at `public/profile/sparsh-naik.webp`.
2. In `src/components/board/IdentityDossier.tsx`, pass the base-aware URL:

   ```tsx
   <ProfilePortrait photoUrl={`${import.meta.env.BASE_URL}profile/sparsh-naik.webp`} />
   ```

3. Keep the component's existing `alt="Sparsh Sunil Naik"`. Adjust only `object-position` in `src/styles/index.css` if the crop requires it.

Do not replace the fallback until the photograph has been approved for public use.
