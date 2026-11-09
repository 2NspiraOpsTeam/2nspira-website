import type { ReactNode } from "react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import styles from "./ServiceEffects.module.css";
import editorialStyles from "./EditorialPages.module.css";

/** Scoped service-card polish; all links and copy remain server-rendered. */
export default function ServiceEffects({ children, editorial = false }: { children: ReactNode; editorial?: boolean }) {
  return <div className={`${styles.scope} ${editorial ? editorialStyles.editorial : ""}`}><CatalogEffects headings>{children}</CatalogEffects></div>;
}
