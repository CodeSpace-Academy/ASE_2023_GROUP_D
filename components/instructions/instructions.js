
import React, { useState } from 'react';
import styles from './instructions.module.css';

function RecipeInstructions({ instructions, recipeId }) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const [error, setError] = useState(null);

  const handleEditInstructions = () => {
    setIsEditingInstructions(true);
  };

  const handleSave = () => {
    setIsEditingInstructions(false);

    // Save the instructions using an API request here
    saveInstructions(editedInstructions);
    
  };
  
  const handleCancel = () => {
    setEditedInstructions([...instructions]);
    setIsEditingInstructions(false);
  };

  const handleInstructionChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };
  

  const saveInstructions = async (updatedInstructions) => {
    try {
      const requestBody = JSON.stringify({
        recipeId: recipeId, // Include the recipeId in the request body
        instructions: updatedInstructions,
      });
      const response = await fetch('/api/updateInstructions/updateInstructions', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(recipeId)
      if (response.ok) {
        console.log('Instructions saved successfully.');
      } else {
        console.error('Failed to save instructions.');
      }
    } catch (error) {
      console.error('An error occurred while saving instructions:', error);
      setError('Failed to save instructions. Please try again.');
      
    }
  };

  return (
    <div>
      {isEditingInstructions ? (
        <div>
          <ol>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>
                <div className={styles.container1}>
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className={styles.container2}  
                />
                </div>
              </li>

            ))}
          </ol>
          <div className={styles.btn}>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <ol>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button
            style={{
              background: 'red',
              borderRadius: '20px',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#972f2f')}
            onMouseLeave={(e) => (e.target.style.background = 'red')}
            onClick={handleEditInstructions}
          >
            Edit Instructions
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstructions;
