import Link from "next/link";

import styles from "./menu.module.css";

export default function Menu({ options }) {
  return (
    <div className={styles.menu}>
      {options.map((o) => (
        <div key={o.id}>
          {o.href && (
            <Link className={styles.menuItem} href={o.href}>
              {o.label}
            </Link>
          )}
          {o.onClick && (
            <button className={styles.menuItem} onClick={o.onClick}>
              {o.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
