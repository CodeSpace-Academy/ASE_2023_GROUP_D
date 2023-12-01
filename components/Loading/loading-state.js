import styles from '@/components/Loading/loading-state.module.css';

function LoadingState() {
    return (
        <div className={styles.layout}>
            <ul className={styles.ul}>
            <li style={{ background: '#ff0000', boxShadow: '0 0 50px #ff0000', animationDelay: '0.3s' }} className={styles.li}></li>
            <li style={{ background: '#ff9e80', boxShadow: '0 0 50px #ff9e80', animationDelay: '0.4s' }} className={styles.li}></li>
            <li style={{ background: '#800000', boxShadow: '0 0 50px #800000', animationDelay: '0.6s' }} className={styles.li}></li>
            <li style={{ background: '#c71585', boxShadow: '0 0 50px #c71585', animationDelay: '0.8s' }} className={styles.li}></li>
            <li style={{ background: '#ff8c00', boxShadow: '0 0 50px #ff8c00', animationDelay: '1.0s' }} className={styles.li}></li>
            <li style={{ background: '#8b4513', boxShadow: '0 0 50px #8b4513', animationDelay: '1.2s' }} className={styles.li}></li>
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