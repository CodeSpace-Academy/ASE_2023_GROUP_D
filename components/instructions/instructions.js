
// import React, { useState } from 'react';
// import styles from './instructions.module.css';
// import { runInstructions } from '@/lib/db';

// function RecipeInstructions({ instructions }) {
//     // You can use the 'instructions' data in your component

//     //     const instructions = props.instructions;
//     const [isEditing, setIsEditing] = useState(new Array(instructions.length).fill(false));
//     const [editedInstructions, setEditedInstructions] = useState([...instructions]);

//     function handleEdit(index) {
//         const newEditingState = isEditing.map((_, i) => i === index);
//         setIsEditing(newEditingState);
//     }

//     function handleSave(index) {
//         const newInstructions = [...editedInstructions];
//         const newEditingState = isEditing.map((_, i) => i === index);

//         // Save the edited instruction to the newInstructions array
//         newInstructions[index] = editedInstructions[index];

//         setIsEditing(newEditingState);
//         setEditedInstructions(newInstructions);
//     }

//     function handleRemove(index) {
//         const newInstructions = [...editedInstructions];
//         newInstructions.splice(index, 1);
//         setIsEditing(isEditing.slice(0, index).concat(isEditing.slice(index + 1)));
//         setEditedInstructions(newInstructions);
//     }

//     function handleAdd() {
//         const newInstructions = [...editedInstructions];
//         newInstructions.push('');
//         setIsEditing([...isEditing, true]);
//         setEditedInstructions(newInstructions);
//     }

//     return (
//         <div>
//             <h1>Instructions</h1>

//             <ol className={styles.orderedList}>
//                 {editedInstructions.map((step, index) => (
//                     <div className={styles.container3} key={index}>
//                         <li>
//                             {isEditing[index] ? (
//                                 <div>
//                                     <input
//                                         type="text"
//                                         className={styles.container5}
//                                         value={editedInstructions[index]}
//                                         onChange={(e) => {
//                                             const newInstructions = [...editedInstructions];
//                                             newInstructions[index] = e.target.value;
//                                             setEditedInstructions(newInstructions);
//                                         }}
//                                     />
//                                     <button onClick={() => handleSave(index)}>Save</button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {step}
//                                     <button onClick={() => handleEdit(index)}>Edit</button>
//                                     <button onClick={() => handleRemove(index)}>Remove</button>
//                                 </div>
//                             )}
//                         </li>
//                     </div>
//                 ))}
//                 <div className={styles.container4}>
//                     <button onClick={handleAdd}>Add Step</button>
//                 </div>
//             </ol>

//         </div>
//     );
// }

// export default RecipeInstructions;

import { useState, useEffect } from 'react';
import styles from './instructions.module.css'

function RecipeInstructions({ instructions }) {
  const [isInstructions, setIsInstructions] = useState([]);
  const [editedInstructions, setEditedInstructions] = useState([]);
  const [isEditing, setIsEditing] = useState([]);

  useEffect(() => {
    // Fetch instructions from your API route (e.g., '/api/handler') when the component mounts
    fetch('/api/route', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((instruction) => {
        setIsInstructions(instruction);
        setEditedInstructions([...instructions]);
        setIsEditing(new Array(instructions.length).fill(false));
      })
      .catch((error) => console.error('Error fetching instructions:', error));
  }, []);

  const handleEdit = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = true;
    setIsEditing(newIsEditing);
  };

  const handleSave = (index) => {
    // Example: Send a PUT request to update the instruction at 'index'.
    fetch('/api/route', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedInstructions: editedInstructions }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to edit instructions');
        }
      })
      .then(() => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = false;
        setIsEditing(newIsEditing);
  
        const newInstructions = [...instructions];
        newInstructions[index] = editedInstructions[index];
  
        setIsInstructions(newInstructions);
      })
      .catch((error) => console.error('Error editing instructions:', error));
  };

  const handleRemove = (index) => {
    // Example: Send a DELETE request to remove the instruction at 'index'.
    fetch('/api/route', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ instructionIndex: index }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to remove instruction');
        }
      })
      .then(() => {
        // Update instructions and editedInstructions after successful removal
        const newInstructions = [...instructions];
      const newEditedInstructions = [...editedInstructions];

      // Remove the instruction at the specified index
      newInstructions.splice(index, 1);
      newEditedInstructions.splice(index, 1);

      setIsInstructions(newInstructions);
      setEditedInstructions(newEditedInstructions);
      })
      .catch((error) => console.error('Error removing instruction:', error));
  };

  const handleAdd = (newInstructionText) => {
    // Example: Send a POST request to add a new instruction.
    fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newInstruction: newInstructionText }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to add instruction');
        }
      })
      .then((data) => {
        // Update instructions and editedInstructions after successful addition
        const newInstructions = [...instructions, data.newInstruction];
    const newEditedInstructions = [...editedInstructions, data.newInstruction];

    setIsInstructions(newInstructions);
    setEditedInstructions(newEditedInstructions);
      })
      .catch((error) => console.error('Error adding instruction:', error));
  };

  return (
    <div>
      <h1>Instructions</h1>
      <ol>
        {instructions.map((step, index) => (
          <div key={index}>
            <li>
              {isEditing[index] ? (
                <div>
                  <input
                    type="text"
                    value={editedInstructions[index]}
                    onChange={(e) => {
                      const newEditedInstructions = [...editedInstructions];
                      newEditedInstructions[index] = e.target.value;
                      setEditedInstructions(newEditedInstructions);
                    }}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                </div>
              ) : (
                <div>
                  {step}
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleRemove(index)}>Remove</button>
                </div>
              )}
            </li>
          </div>
        ))}
        <div>
          <button onClick={handleAdd}>Add Step</button>
        </div>
      </ol>
    </div>
  );
}

export default RecipeInstructions;
