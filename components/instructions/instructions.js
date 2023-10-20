
// import React, { useState } from 'react';
// import styles from './instructions.module.css';


// function RecipeInstructions(props) {
//   // Assuming that props.instructions is an array of instruction strings
//   const instructions = props.instructions;

//   return (
//     <div>
//       <h2>Instructions</h2>
//     <div >

//       <ol >
//         {instructions.map((instruction, index) => (
//           <div className={styles.container3}>
//           <li key={index}>{instruction}</li>
//           </div>
//         ))}
//       </ol>
//     </div>
//     </div>
//   );
// };

// export default RecipeInstructions;


// import React, { useState } from 'react';
// import styles from './instructions.module.css';

// function RecipeInstructions(props) {
//   const [editingIndex, setEditingIndex] = useState(-1);
//   const [newInstruction, setNewInstruction] = useState('');
//   const instructions = props.instructions;

//   const handleRemoveClick = (index) => {
//     const updatedInstructions = [...instructions];
//     updatedInstructions.splice(index, 1);
//     saveInstructions(updatedInstructions); // Save the updated instructions to MongoDB
//   };

//   const saveInstructions = async (updatedInstructions) => {
//     try {
//       const response = await fetch(`/api/instructions/${props.recipeId}/update`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ instructions: updatedInstructions }),
//       });

//       if (response.status === 200) {
//         props.onInstructionsChange(updatedInstructions);
//         setEditingIndex(-1);
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   const handleEditClick = (index) => {
//     setEditingIndex(index);
//     setNewInstruction(instructions[index]);
//   };

//   async function  handleSaveClick (index) {
//     const updatedInstructions = [...instructions];
//     updatedInstructions[index] = newInstruction;

//     try {
//       const response = await fetch('/api/instructions/route', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ instructions: updatedInstructions }),
//       });

//       if (response.status === 200) {
//         props.onInstructionsChange(updatedInstructions);
//         setEditingIndex(-1);
//       } else {
//         // Handle error
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };



//   const handleAddClick = async () => {
//     if (newInstruction) {
//       try {
//         const response = await fetch('/api/instructions/route', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ instruction: newInstruction }),
//         });

//         if (response.status === 201) { // Assuming 201 indicates success (Created)
//           const data = await response.json();
//           props.onInstructionsChange([...instructions, data]); // Pass the updated instructions to the parent component
//           setNewInstruction('');
//         } else {
//           // Handle error
//         }
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     }
//   };

//   const handleInputChange = (event) => {
//     setNewInstruction(event.target.value);
//   };

//   const handleBlur = () => {
//     setEditingIndex(-1);
//   };

//   return (
//     <div>
//       <h2>Instructions</h2>
//       <div>
//         <ol>
//           {instructions.map((instruction, index) => (
//             <div key={index} className={styles.container3}>
//               {editingIndex === index ? (
//                 <div>
//                   <input
//                     type="text"
//                     value={newInstruction}
//                     onChange={handleInputChange}
//                     onBlur={handleBlur}
//                   />
//                   <button onClick={() => handleSaveClick(index)}>Save</button>
//                 </div>
//               ) : (
//                 <li>{instruction}</li>
//               )}
//               <button onClick={() => handleEditClick(index)}>Edit</button>
//               <button onClick={() => handleRemoveClick(index)}>Remove</button>
//             </div>
//           ))}
//         </ol>
//         <div>
//           <input
//             type="text"
//             value={newInstruction}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleAddClick}>Add</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecipeInstructions;

import React, { useState, useEffect } from 'react';
import styles from './instructions.module.css';
import { useRef } from 'react';


function RecipeInstructions(props) {
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newInstruction, setNewInstruction] = useState('');
  const instructions = props.instructions;

  const instructionRef = useRef();
  
  

  useEffect(() => {
    setNewInstruction('');
  }, [instructions]); // Reset newInstruction when instructions change

  const handleActionClick = (index, action) => {

    const enteredInstruction = instructionRef.current.value;

    if (action === 'edit') {
      setEditingIndex(index);
      setNewInstruction(enteredInstruction[index]);
    } else if (action === 'save') {
      if (enteredInstruction) {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = enteredInstruction;
        saveInstructions(updatedInstructions);
      }
      setEditingIndex(-1);
    } else if (action === 'remove') {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      saveInstructions(updatedInstructions);
    }
  };

  const saveInstructions = async (updatedInstructions) => {
    try {
      const response = await fetch('/api/instructions/route/id/route', {
        method: 'PUT',
        
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions: updatedInstructions }),
      });

      if (response.status === 200) {
        props.onInstructionsChange(updatedInstructions);
      } else {
        throw new Error('Instructions not updated');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleInputChange = (event) => {
    setNewInstruction(event.target.value);
  };

  const handleBlur = () => {
    setEditingIndex(-1);
  };

  return (
    <div>
      <h2>Instructions</h2>
      <div>
        <ol>
          {instructions.map((instruction, index) => (
            <div key={index} className={styles.container3}>
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    className={styles.container6}
                    value={newInstruction}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    ref={instructionRef}
                  />
                  <button onClick={() => handleActionClick(index, 'save')}>Save</button>
                </div>
              ) : (
                <div>
                  <li>{instruction}</li>
                  <button onClick={() => handleActionClick(index, 'edit')}>Edit</button>
                  <button onClick={() => handleActionClick(index, 'remove')}>Remove</button>
                </div>
              )}
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeInstructions;





