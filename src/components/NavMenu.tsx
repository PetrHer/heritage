import Link from "next/link"
import styles from '../styles/NavMenu.module.css'

const NavMenu = () => {
  return (
    <header className={styles.navigation}>
        <Link className={styles.linkItem} href={'/'}>HOME</Link>
        <Link className={styles.linkItem} href={'/records'}>RECORDS</Link>
    </header>
  )
}

export default NavMenu