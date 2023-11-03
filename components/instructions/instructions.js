
import React, { useState, useRef } from 'react';
import styles from './instructions.module.css';

function RecipeInstructions({ instructions, onSave }) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const instructionRefs = useRef([]);

  async function saveInstructions() {
    //event.preventDefault();

    const enteredInstruction = instructionRefs.current.value;

    fetch('/api/updateInstructions', {
      method: 'POST',
      body: JSON.stringify({ instructions: enteredInstruction }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => console.log(data));

  }

  const handleEditInstructions = () => {

    setIsEditingInstructions(true);
  };

  const handleSave = () => {
    //onSave(editedInstructions);
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

  function handlerTrigger() {
    handleSave();
    saveInstructions();
  }

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
                  //onSave={'tshepo'}
                  className={styles.insContainer}
                  ref={instructionRefs}

                />
              </li>
            ))}
          </ol>
          <div>
            <button onClick={handlerTrigger}>Save</button>
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
          <button style={{
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
            onClick={handleEditInstructions}>Edit Instructions</button>
        </div>
      )}
    </div>
  );
}

export default RecipeInstructions;

