import styles from '@/components/Loading/loading-state.module.css';

function LoadingState() {
    return (
        <div className={styles.layout}>
            <ul className={styles.ul}>
                <li style={{ background: '#D73222', boxShadow: '0 0 50px #D73222', animationDelay: '0.3s' }} className={styles.li}></li>
                <li style={{ background: '#B0A8B9', boxShadow: '0 0 50px #B0A8B9', animationDelay: '0.4s' }} className={styles.li}></li>
                <li style={{ background: '#D73222', boxShadow: '0 0 50px #D73222', animationDelay: '0.6s' }} className={styles.li}></li>
                <li style={{ background: '#B0A8B9', boxShadow: '0 0 50px #B0A8B9', animationDelay: '0.8s' }} className={styles.li}></li>
                <li style={{ background: '#D73222', boxShadow: '0 0 50px #D73222', animationDelay: '1s' }} className={styles.li}></li>
                <li style={{ background: '#B0A8B9', boxShadow: '0 0 50px #B0A8B9', animationDelay: '1.2s' }} className={styles.li}></li>
                <li style={{ background: '#D73222', boxShadow: '0 0 50px #D73222', animationDelay: '1.4s' }} className={styles.li}></li>
            </ul>
        </div>
    )
}

export default LoadingState;