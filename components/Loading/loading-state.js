import styles from '@/components/Loading/loading-state.module.css'

function LoadingState() {
    return (
        <div className={styles.layout}>
            <ul className={styles.ul}>
                <li style={{ background: '#ffff00', boxShadow: '0 0 50px #ffff00', animationDelay: '0.3s' }} className={styles.li}></li>
                <li style={{ background: '#76ff03', boxShadow: '0 0 50px #76ff03', animationDelay: '0.4s' }} className={styles.li}></li>
                <li style={{ background: '#f06292', boxShadow: '0 0 50px #f06292', animationDelay: '0.6s' }} className={styles.li}></li>
                <li style={{ background: '#4fc3f7', boxShadow: '0 0 50px #4fc3f7', animationDelay: '0.8s' }} className={styles.li}></li>
                <li style={{ background: '#ba68c8', boxShadow: '0 0 50px #ba68c8', animationDelay: '1s' }} className={styles.li}></li>
                <li style={{ background: '#f57c00', boxShadow: '0 0 50px #f57c00', animationDelay: '1.2s' }} className={styles.li}></li>
                <li style={{ background: '#673ab7', boxShadow: '0 0 50px #673ab7', animationDelay: '1.4s' }} className={styles.li}></li>
            </ul>
        </div>
    )
}

export default LoadingState;