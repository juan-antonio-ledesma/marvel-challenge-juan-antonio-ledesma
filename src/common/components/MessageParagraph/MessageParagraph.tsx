import styles from './MessageParagraph.module.scss'

interface MessageParagraphnProps {
  message: string
}

export default function MessageParagraph({
  message,
}: Readonly<MessageParagraphnProps>) {
  return <p className={styles.root}>{message}</p>
}
