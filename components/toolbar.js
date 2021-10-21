import { useRouter } from "next/router"
import styles from '../styles/Toolbar.module.css'


export const Toolbar = () => {
    const route = useRouter()

    return (
        <div className={styles.main}>
            <div onClick={() => route.push('/')}>
                Home
            </div>
            <div onClick={() => route.push('/feed/1')}>
                FEED
            </div>
            <div onClick={() => route.push('/eom')}>
                EOM
            </div>
            <div onClick={() => route.push('/')}>
                Home
            </div>
        </div>
    )

}