export const audioArchiveTrack = {
  title: 'Investigation Theme',
  artist: 'CASE 000',
  status: 'Demo Soundtrack',
  source: `${import.meta.env.BASE_URL}audio/case-000-demo.mp3`,
  duration: 48,
} as const

export const AUDIO_PREFERENCE_KEY = 'case-000:audio-preferences'
export const DEFAULT_AUDIO_VOLUME = .28
