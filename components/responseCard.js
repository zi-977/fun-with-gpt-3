import styles from "./responseCard.module.css"

export default function ResponseCard({ index, prompt, response }) {
  return (
    <li key={index} className={styles.container}>
      <h5 className={styles.title}>Prompt:</h5>
      <p className={styles.content}>{prompt}</p>
      <h5 className={styles.title}>Response:</h5>
      <p className={styles.content}>{response}</p>
    </li>
  )
}