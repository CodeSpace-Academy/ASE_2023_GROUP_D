import React, { useState } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css'


const UpdateDescription = ({ initialDescription, onSave }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(description);
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
      />
      <button className={styles.instructionsButton} onClick={handleSave}>Save Description</button>
    </div>
  );
};

export default UpdateDescription;

