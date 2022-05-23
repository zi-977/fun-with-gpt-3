import styles from "./responseCard.module.css"

export default function ResponseCard({ prompt, response }) {
  return (
    <li className={styles.container}>
      <h5 className={styles.title}>Prompt:</h5>
      <p className={styles.content}>{prompt}</p>
      <h5 className={styles.title}>Response:</h5>
      <p className={styles.content}>{response}</p>
    </li>
  )
}