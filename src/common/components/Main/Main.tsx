import styles from './Main.module.scss'

interface MainProps {
  children: React.ReactNode
}

export default function Main({ children }: Readonly<MainProps>) {
  return (
    <main className={styles.root}>
      <div className={styles.innerContainer}>{children}</div>
    </main>
  )
}
