import Image from "next/image";
import styles from "./homepage.module.css";

const milestones = [
  { year: "2019", title: "Founded as EKM IT Solutions", text: "Our story began in 2019 as EKM IT Solutions.", image: "strategy", alt: "People gathered for a strategy discussion" },
  { year: "2022", title: "Helping local communities reinvent themselves", text: "We helped local community organizations reinvent themselves after COVID—finding new ways to work and move forward.", image: "systems-team", alt: "Colleagues bringing their hands together" },
  { year: "2025", title: "EKM IT Solutions becomes 2Nspira", text: "EKM IT Solutions reinvented itself as 2Nspira, beginning a new chapter in our story.", image: "ai-collaboration", alt: "Colleagues sharing ideas around laptops" },
  { year: "2026", title: "More competitive than ever", text: "A new name. The same drive to move forward. More competitive than ever.", image: "leadership", alt: "People meeting around a shared table" },
];

export default function ImpactTimeline() {
  return <div className={styles.timeline}>
    {milestones.map(item => <article key={item.year} data-year={item.year} id={`milestone-${item.year}`} className={styles.timelinePanel} aria-labelledby={`milestone-heading-${item.year}`}>
      <div className={styles.timelinePhoto}><Image src={`/images/homepage/${item.image}.jpg`} alt={item.alt} fill unoptimized sizes="(max-width: 600px) 100vw, 40vw" /></div>
      <div className={styles.timelineCopy}><h3 id={`milestone-heading-${item.year}`}>{item.year} – {item.title}</h3><p>{item.text}</p></div>
    </article>)}
    <fieldset className={styles.timelineNav}>
      <legend className="sr-only">Explore our milestones</legend>
      {milestones.map((item, index) => <div key={item.year} className={styles.timelineChoice}>
        <input className="sr-only" type="radio" name="impact-milestone" id={`year-${item.year}`} value={item.year} defaultChecked={index === 0} aria-controls={`milestone-${item.year}`} />
        <label htmlFor={`year-${item.year}`}><strong>{item.year}</strong><span>{item.title}</span></label>
      </div>)}
    </fieldset>
  </div>;
}
