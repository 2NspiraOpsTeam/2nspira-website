import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./EditorialHero.module.css";

/** Shared, progressively enhanced image-and-message header for public pages. */
export default function EditorialHero({ children, image, alt, contain = false }: {
  children: ReactNode; image: string; alt: string; contain?: boolean;
}) {
  return <div className={styles.layout} data-editorial-hero>
    <div className={styles.copy}>{children}</div>
    <figure className={`${styles.visual} ${contain ? styles.contain : ""}`}>
      <Image src={image} alt={alt} width={1344} height={1008} sizes="(min-width: 1024px) 520px, calc(100vw - 32px)" priority className={styles.image} />
      <span className={styles.tint} aria-hidden="true" />
    </figure>
  </div>;
}
