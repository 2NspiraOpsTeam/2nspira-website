// Public releases verified in @2Nspira Studio, 2026-11-12.
// Private uploads are intentionally excluded until reviewed and publicly released.
// Add new published videos here; do not list unfinished productions.
export const youtubeChannel = "https://www.youtube.com/@2Nspira";

export const videos = [
  {
    id: "dSAB-uzO0ec",
    title: "Cocoa Lounge | 2 Hours of Soft Piano & Quiet Rain",
    duration: "2:00:01",
    category: "ambience",
    description: "A continuous synthesized piano arrangement with quiet licensed rain and a continuously animated illustrated lounge.",
  },
  {
    id: "c59t7nfZZ04",
    title: "First Light Atelier | 2 Hours of Instrumental Music for Reading & Writing",
    duration: "2:00:01",
    category: "ambience",
    description: "A new continuous two-hour synthesized instrumental arrangement with subtle animated steam and sunlit dust over illustrated atelier artwork.",
  },
  {
    id: "AHUpWYbHboo",
    title: "Blue Observatory | 2 Hours of Instrumental Music | 2Nspira",
    duration: "2:00:01",
    category: "ambience",
    description: "Original instrumental music in a blue observatory, with subtle camera drift over AI-created artwork.",
  },
  {
    id: "4ONBwCEgZWI",
    title: "Rainlight Library — A Gentle Storm Arrives and Recedes | 2 Hours | No Music",
    duration: "2:00:00",
    category: "ambience",
    description: "A two-hour constructed rainstorm with softened distant thunder, animated glass runoff and a continuously visible illustrated library. Repeated field-recording sources; no music.",
  },
  {
    id: "8zSUAoCZ7vQ",
    title: "Gentle Window Rain | 8 Hours of Sheltered Rain | No Music or Thunder",
    duration: "8:00:00",
    category: "ambience",
    description: "Eight hours of sheltered rain with continuously simulated window runoff over a still nighttime studio illustration. Repeated field-recording sources; no music or thunder.",
  },
  {
    id: "Vu65dvQ_Omo",
    title: "Rain on an Attic Window | 3 Hours of Sheltered Rain | No Music or Thunder",
    duration: "3:00:01",
    category: "ambience",
    description: "Three hours of sheltered rain and window ambience with continuously simulated runoff over a still attic reading-room illustration. No music or thunder.",
  },
  {
    id: "QgKIubT_s5k",
    title: "Japanese Garden Rain | 3 Hours for Reading & Relaxing | No Music",
    duration: "3:00:01",
    category: "ambience",
    description: "Light rain on leaves and wet stones in a Japanese-inspired moss courtyard. A three-hour visible scene, without thunder or music.",
  },
  {
    id: "1yl3voNgdSw",
    title: "Cocoa Lounge | 2 Hours of Cozy Window Rain | No Music, No Thunder",
    duration: "2:00:01",
    category: "ambience",
    description: "Two hours of sheltered rain and window ambience with continuously simulated runoff over a still Cocoa Lounge illustration. No music or thunder.",
  },
  {
    id: "hWk6mH_t0Cs",
    title: "Why AI Adoption Is Failing: The Trust Deficit Leaders Are Missing",
    duration: "4:15",
    category: "leadership",
    description: "A perspective on trust, leadership, and the human side of adopting AI.",
  },
] as const;

// Channel order: newest first. Keep the featured release and collection in sync.
export const featuredVideo = videos[0];
export const latestVideos = videos.filter(video => video.category === "ambience").slice(1, 2);
export const quietClassics = videos.filter(video => video.category === "ambience").slice(2);
