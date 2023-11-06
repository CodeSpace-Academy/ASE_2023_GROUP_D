import React, { useState, useRef } from 'react';
import styles from './instructions.module.css';
import SuccessNotification from '@/components/Errors/SuccessNotification';
import ErrorNotification from '@/components/Errors/ErrorNotification';

function RecipeInstructions({ instructions, onSave }) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const instructionRefs = useRef([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  async function saveInstructions() {
    try {

      // Check if any instruction is empty
      if (instructionRefs.current.some((ref) => ref.value.trim() === '')) {
        setEmptyInstructionsError(true);
        return; // Do not proceed if any instruction is empty
      }
      const enteredInstructions = instructionRefs.current.map((ref) => ref.value);

      // Simulate a success response
      setShowSuccessNotification(true);

      // Simulate closing the success notification after a few seconds (you can adjust the duration)
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating instructions:", error);
      setShowErrorNotification(true);
    }
  }

  const handleEditInstructions = () => {
    setIsEditingInstructions(true);
  };

  const handleSave = () => {
    // Call the saveInstructions function to update the instructions.
    saveInstructions();
    setIsEditingInstructions(false);
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

  return (
    <div>
      {isEditingInstructions ? (
        <div>
          <ol>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>
                <input
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className={styles.insContainer}
                  ref={(ref) => (instructionRefs.current[index] = ref)}
                />
              </li>
            ))}
          </ol>
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
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

      {showSuccessNotification && (
        <SuccessNotification
          message="Instructions updated successfully."
          onClose={() => setShowSuccessNotification(false)}
        />
      )}
      {showErrorNotification && (
        <ErrorNotification
          message="Failed to update instructions. Please try again later."
          onClose={() => setShowErrorNotification(false)}
        />
      )}
    </div>
  );
}

export default RecipeInstructions;
