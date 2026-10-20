import type { ReactNode } from "react";
import CatalogEffects from "@/components/catalog/CatalogEffects";
import styles from "./ServiceEffects.module.css";

/** Scoped service-card polish; all links and copy remain server-rendered. */
export default function ServiceEffects({ children }: { children: ReactNode }) {
  return <div className={styles.scope}><CatalogEffects>{children}</CatalogEffects></div>;
}
