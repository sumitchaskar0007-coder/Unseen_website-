const unsplash = (photoId: string, width = 1600) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`

/**
 * Curated, real editorial photography used instead of generated artwork.
 * Keeping the URLs here makes image choices consistent and easy to update.
 */
export const onlineImages = {
  agencyTeam: unsplash('photo-1521737711867-e3b97375f902'),
  collaboration: unsplash('photo-1522071820081-009f0129c71c'),
  creativeOffice: unsplash('photo-1497366754035-f200968a6e72'),
  filmSet: unsplash('photo-1485846234645-a62644f84728'),
  cameraOperator: unsplash('photo-1492691527719-9d1e07e534b4'),
  podcastStudio: unsplash('photo-1590602847861-f357a9332bbc'),
  developerWorkspace: unsplash('photo-1498050108023-c5249f4df085'),
  codeScreen: unsplash('photo-1555066931-4365d14bab8c'),
  webDevelopment: unsplash('photo-1461749280684-dccba630e2f6'),
  analytics: unsplash('photo-1460925895917-afdab827c52f'),
  analyticsDashboard: unsplash('photo-1551288049-bebda4e38f71'),
  businessPlanning: unsplash('photo-1454165804606-c3d57bc86b40'),
  serverRoom: unsplash('photo-1558494949-ef010cbdcc31'),
  hospitality: unsplash('photo-1414235077428-338989a2e8c0'),
  socialMedia: unsplash('photo-1611162617474-5b21e879e113'),
} as const
