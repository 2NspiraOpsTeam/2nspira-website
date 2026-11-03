"use client";

import { useState } from "react";
import styles from "./homepage.module.css";

const reviews = [
  { name: 'Pat Gunn', quote: "Over my time there they've been responsive, open to negotiation, and good at communication." },
  { name: 'Michael Morris', quote: "I've been living in a Teams Mgt building in Flushing for about 5 years, and I have nothing but positive things to say." },
  { name: 'Asia Lu', quote: 'We just moved to NYC into a new build and the people at Teams Management have been great to work with.' },
  { name: 'Tahnee Baker', quote: 'The apartment was spacious, well-maintained, and filled with natural light, offering a perfect blend of classic charm and modern convenience.' },
  { name: 'Bojan Petkovic', quote: 'They look out for their tenants and have a big heart and understanding of people and housing.' },
  { name: 'Francesca Ling', quote: 'They are very human, very reasonable, quick to address any building issues, and you can always speak to someone who cares about how things are going.' },
  { name: 'Lucas', quote: 'Super great to work with! Very understanding and communicative. Janice, in particular, was wonderful!' },
];

export default function TeamsReviewCarousel() {
  const [index, setIndex] = useState(0);
  function move(delta: number) { setIndex(current => (current + delta + reviews.length) % reviews.length); }
  return <div className={styles.reviewCarousel} role="region" aria-roledescription="carousel" aria-label="Teams Management resident reviews" onKeyDown={event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
  }}>
    <div className={styles.reviewWindow}>
      {reviews.map((_, offset) => { const position = (index + offset) % reviews.length; const review = reviews[position]; return <div key={review.name} role="group" aria-roledescription="slide" aria-label={`${position + 1} of ${reviews.length}`}>
        <figure className={styles.reviewCard}><blockquote>“{review.quote}”</blockquote><figcaption><strong>{review.name}</strong><span>Teams Management resident · Google review excerpt</span></figcaption></figure>
      </div>; })}
    </div>
    <div className={styles.reviewControls}>
      <button type="button" onClick={() => move(-1)} aria-label="Previous review">←</button>
      <span aria-live="polite" aria-atomic="true">{index + 1} / {reviews.length}<span className={styles.reviewSrOnly}> · First visible review by {reviews[index].name}</span></span>
      <button type="button" onClick={() => move(1)} aria-label="Next review">→</button>
    </div>
  </div>;
}
