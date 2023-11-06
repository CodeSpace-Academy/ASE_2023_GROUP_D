import styles from './Notification.module.css';

const ErrorNotification = ({ message, onClose }) => {
    return (
        <div className={styles.errorNotification}>
            <p>{message}</p>
            <button
                style={{
                    backgroundColor: 'grey',
                    border: '1px solid white',
                    borderRadius: '20px',
                    color: 'white',
                    cursor: 'pointer',
                }}
                onClick={onClose}>Close</button>
        </div>
    );
};

export default ErrorNotification;
