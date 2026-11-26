import styles from "../page.module.css";

export default function KartuSkill({ nama, keterangan }) {
  return (
    <article className={styles.kartu}>
      <h3>{nama}</h3>
      <p>{keterangan}</p>
    </article>
  );
}