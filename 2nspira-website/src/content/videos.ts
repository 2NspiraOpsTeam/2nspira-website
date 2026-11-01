// Public uploads verified against @2Nspira and YouTube oEmbed, 2026-11-01.
// Add new published videos here; do not list unfinished productions.
export const youtubeChannel = "https://www.youtube.com/@2Nspira";

export const videos = [
  {
    id: "2yfV_iCFkZM",
    title: "Deep Forest Rain for Sleep | 10 Hours Black Screen | No Thunder or Music",
    duration: "10:00:01",
    category: "ambience",
    description: "Ten hours of deep forest rain and soft foliage texture. No thunder or music; the scene fades to black after one minute.",
  },
  {
    id: "yJ2AwjwXN4E",
    title: "Cabin Roof Rain & Distant Thunder | 8 Hours Black Screen for Sleep",
    duration: "8:00:01",
    category: "ambience",
    description: "Sheltered cabin-roof rain with gentle, distant thunder. Eight hours, with a black screen after the first minute.",
  },
  {
    id: "1Xuqyd3xEC4",
    title: "Rain on a Tent for Sleep | 8 Hours Black Screen | No Thunder or Music",
    duration: "8:00:01",
    category: "ambience",
    description: "Soft rain on canvas, with forest rain beyond. Eight hours without thunder or music; the scene fades to black after one minute.",
  },
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
    id: "jwtZ4auZBUM",
    title: "Midnight Greenhouse Rain | 9 Hours for Sleep | No Thunder, Dark Screen",
    duration: "9:00:01",
    category: "ambience",
    description: "Nine hours of greenhouse rain, with no thunder and a dark screen.",
  },
  {
    id: "uncGuC_lmyo",
    title: "Gentle Window Rain for Sleep | 8 Hours, No Thunder | Dark Screen",
    duration: "8:00:01",
    category: "ambience",
    description: "Eight hours of gentle window rain, with no thunder and a dark screen.",
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
export const latestVideos = videos.slice(1, 5);
export const quietClassics = videos.filter(video => video.category === "ambience").slice(5);
