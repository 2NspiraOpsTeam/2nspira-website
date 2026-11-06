import Image from "next/image";
import { companyMilestones } from "@/content/company-history";
import styles from "./homepage.module.css";

export default function ImpactTimeline({ idPrefix = "impact" }: { idPrefix?: string }) {
  return <div className={styles.timeline}>
    <fieldset className={styles.timelineNav}>
      <legend className="sr-only">Explore our milestones</legend>
      {companyMilestones.map(item => <div key={item.year} className={styles.timelineChoice}>
        <input className="sr-only" type="radio" name={`${idPrefix}-milestone`} id={`${idPrefix}-year-${item.year}`} value={item.year} defaultChecked={item.year === "2026"} aria-controls={`${idPrefix}-milestone-${item.year}`} />
        <label htmlFor={`${idPrefix}-year-${item.year}`}><strong>{item.year}</strong><span>{item.title}</span></label>
      </div>)}
    </fieldset>
    {companyMilestones.map(item => <article key={item.year} data-year={item.year} id={`${idPrefix}-milestone-${item.year}`} className={styles.timelinePanel} aria-labelledby={`${idPrefix}-heading-${item.year}`}>
      <div className={styles.timelinePhoto}><Image src={`/images/homepage/${item.image}.jpg`} alt={item.alt} fill unoptimized sizes="(max-width: 900px) 100vw, 35vw" /></div>
      <div className={styles.timelineCopy}>
        <h3 id={`${idPrefix}-heading-${item.year}`}>{item.year} – {item.title}</h3>
        <p className={styles.timelineSubtitle}>{item.subtitle}</p>
        {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>)}
  </div>;
}
