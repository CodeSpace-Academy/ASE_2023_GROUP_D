// import React, { useState } from 'react';
// import styles from '@/stylespages/RecipeDetails.module.css'


// const UpdateDescription = ({ description, recipeId }) => {
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [editedDescription, setEditedDescription] = useState(description);

//   const handleEditDescription = () => {
//     setIsEditingDescription(true);
//   };

//   const handleSave = () => {
//     setIsEditingDescription(false);

//     // Save the instructions using an API request here
//     saveDescription(editedDescription);

//   };

//   const handleDescriptionChange = () => {
//     const updatedDescription = editedDescription;
//     //updatedDescription = newValue;
//     setEditedDescription(updatedDescription);
//   };

//   const handleCancel = () => {
//     setEditedDescription(description);
//     setIsEditingDescription(false);
//   };

//   const saveDescription = async (updatedDescription) => {
//     try {
//       const requestBody = JSON.stringify({
//         recipeId: recipeId, // Include the recipeId in the request body
//         description: updatedDescription,
//       });
//       const response = await fetch('/api/updateDescription/updateDescription', {
//         method: 'POST',
//         body: requestBody,
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });
//       console.log(recipeId)
//       if (response.ok) {
//         console.log('Description saved successfully.');
//       } else {
//         console.error('Failed to save description.');
//       }
//     } catch (error) {
//       console.error('An error occurred while saving description:', error);
//     }
//   };

//   return (
//     <div>
//       {isEditingDescription ? (
//         <div>

//           <textarea
//             type='text'
//             value={description}
//             onChange={(e) => handleDescriptionChange(e.target.value)}
//             className={styles.insContainer}
//           />

//           <div>
//             <button onClick={handleSave}>Save</button>
//             <button onClick={handleCancel}>Cancel</button>
//           </div>
//         </div>

//       ) : (

//         <div>
//           <p>{editedDescription}</p>
//           <button
//             style={{
//               background: 'red',
//               borderRadius: '20px',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s',
//             }}
//             onMouseEnter={(e) => (e.target.style.background = '#972f2f')}
//             onMouseLeave={(e) => (e.target.style.background = 'red')}
//             onClick={handleEditDescription}
//           >
//             Edit Description
//           </button>
//         </div>
//       )}

//     </div>

//   );
// };

// export default UpdateDescription;

import React, { useState } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css'

const UpdateDescription = ({ description, recipeId }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSave = () => {
    setIsEditingDescription(false);

    // Save the instructions using an API request here
    saveDescription(editedDescription);
  };

  const handleDescriptionChange = (e) => {
    // Use the value from the event to update the editedDescription
    setEditedDescription(e.target.value);
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  const saveDescription = async (updatedDescription) => {
    try {
      const requestBody = JSON.stringify({
        recipeId: recipeId,
        description: updatedDescription,
      });
      const response = await fetch('/api/updateDescription/updateDescription', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(recipeId);
      if (response.ok) {
        console.log('Description saved successfully.');
      } else {
        console.error('Failed to save description.');
      }
    } catch (error) {
      console.error('An error occurred while saving description:', error);
    }
  };

  return (
    <div>
      {isEditingDescription ? (
        <div>
          <textarea
            value={editedDescription} // Use editedDescription, not description
            onChange={handleDescriptionChange} // Pass the event to handleDescriptionChange
            className={styles.insContainer}
          />

          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>{editedDescription}</p>
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
            onClick={handleEditDescription}
          >
            Edit Description
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateDescription;
