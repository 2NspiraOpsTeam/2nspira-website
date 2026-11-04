// Public visibility verified against the complete @2Nspira Studio catalog, 2026-11-02.
// Private uploads are intentionally excluded until reviewed and publicly released.
// Add new published videos here; do not list unfinished productions.
export const youtubeChannel = "https://www.youtube.com/@2Nspira";

export const videos = [
  {
    id: "_3T_1ZhlzQM",
    title: "Rain on an Attic Window | 3 Hours for Reading & Study | No Music",
    duration: "3:00:01",
    category: "ambience",
    description: "A warm attic reading room and muted raindrops on glass. A three-hour visible scene for reading or study, without music.",
  },
  {
    id: "QgKIubT_s5k",
    title: "Japanese Garden Rain | 3 Hours for Reading & Relaxing | No Music",
    duration: "3:00:01",
    category: "ambience",
    description: "Light rain on leaves and wet stones in a Japanese-inspired moss courtyard. A three-hour visible scene, without thunder or music.",
  },

  {
    id: "hWk6mH_t0Cs",
    title: "Why AI Adoption Is Failing: The Trust Deficit Leaders Are Missing",
    duration: "4:15",
    category: "leadership",
    description: "A perspective on trust, leadership, and the human side of adopting AI.",
  },
  {
    id: "fqj8rEfb0-o",
    title: "Cozy Rainy Café Ambience | 2 Hours for Reading | Cocoa Lounge, No Music",
    duration: "2:00:01",
    category: "ambience",
    description: "Settle into a rainy café soundscape for reading or a quiet break. No music.",
  },
] as const;

// Channel order: newest first. Keep the featured release and collection in sync.
export const featuredVideo = videos[0];
export const latestVideos = videos.filter(video => video.category === "ambience").slice(1, 2);
export const quietClassics = videos.filter(video => video.category === "ambience").slice(2);
