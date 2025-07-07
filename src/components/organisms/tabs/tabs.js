import styles from "./tabs.module.css";

export default function Tabs({ useTabs }) {
  const { tabs, activeIndex } = useTabs();

  return (
    <div className={styles.tabs}>
      <div>
        <div className={styles.tab}>
          {tabs.map((t, i) => (
            <button
              key={i}
              className={
                styles.tabButton +
                (i === activeIndex ? ` ${styles.active}` : "")
              }
              onClick={() => t.onClick(i)}
              data-section={t.dataSection}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {tabs.map((t, i) => {
          const Component = t.component;
          return i === activeIndex && <Component key={i} />;
        })}
      </div>
    </div>
  );
}
