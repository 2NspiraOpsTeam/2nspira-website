"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoPlayer({ id, title, duration }: { id: string; title: string; duration: string }) {
  const [loaded, setLoaded] = useState(false);
  return <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
    {loaded ? <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
      title={title}
      className="absolute inset-0 h-full w-full border-0"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    /> : <button type="button" onClick={() => setLoaded(true)}
      aria-label={`Load video: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer text-white focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white">
      <Image src={`/images/videos/${id}.jpg`} alt="" width={640} height={360}
        className="h-full w-full object-cover" />
      <span className="absolute inset-0 bg-black/15" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/75 ring-1 ring-white/60 transition-[background-color,transform,box-shadow] duration-300 ease-gentle group-hover:bg-black/90 group-focus-visible:bg-black/90 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 group-hover:shadow-[0_0_0_8px_rgb(255_255_255_/_12%)] motion-reduce:transition-none"><Play size={26} fill="currentColor" aria-hidden="true" /></span>
      </span>
      <span className="absolute bottom-3 right-3 rounded bg-black/85 px-2 py-1 text-xs font-semibold">{duration}</span>
    </button>}
  </div>;
}
