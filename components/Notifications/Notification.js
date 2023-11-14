import React, { useEffect } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Close the notification after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
