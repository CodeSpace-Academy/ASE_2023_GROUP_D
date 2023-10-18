
import React, { useState } from 'react';
import styles from './instructions.module.css';
import { runInstructions } from '@/lib/db';

function RecipeInstructions({ instructions }) {
    // You can use the 'instructions' data in your component

    //     const instructions = props.instructions;
    const [isEditing, setIsEditing] = useState(new Array(instructions.length).fill(false));
    const [editedInstructions, setEditedInstructions] = useState([...instructions]);

    function handleEdit(index) {
        const newEditingState = isEditing.map((_, i) => i === index);
        setIsEditing(newEditingState);
    }

    function handleSave(index) {
        const newInstructions = [...editedInstructions];
        const newEditingState = isEditing.map((_, i) => i === index);

        // Save the edited instruction to the newInstructions array
        newInstructions[index] = editedInstructions[index];

        setIsEditing(newEditingState);
        setEditedInstructions(newInstructions);
    }

    function handleRemove(index) {
        const newInstructions = [...editedInstructions];
        newInstructions.splice(index, 1);
        setIsEditing(isEditing.slice(0, index).concat(isEditing.slice(index + 1)));
        setEditedInstructions(newInstructions);
    }

    function handleAdd() {
        const newInstructions = [...editedInstructions];
        newInstructions.push('');
        setIsEditing([...isEditing, true]);
        setEditedInstructions(newInstructions);
    }

    return (
        <div>
            <h1>Instructions</h1>

            <ol className={styles.orderedList}>
                {editedInstructions.map((step, index) => (
                    <div className={styles.container3} key={index}>
                        <li>
                            {isEditing[index] ? (
                                <div>
                                    <input
                                        type="text"
                                        className={styles.container5}
                                        value={editedInstructions[index]}
                                        onChange={(e) => {
                                            const newInstructions = [...editedInstructions];
                                            newInstructions[index] = e.target.value;
                                            setEditedInstructions(newInstructions);
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
                <div className={styles.container4}>
                    <button onClick={handleAdd}>Add Step</button>
                </div>
            </ol>

        </div>
    );
}

export async function getServerSideProps() {
    const instructions = await runInstructions();

    return {
        props: {
            instructions,
        },
    };
}

export default RecipeInstructions;


// function RecipeInstructions(props) {
//     const instructions = props.instructions;
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
//         <ol className={styles.orderedList}>
//             {editedInstructions.map((step, index) => (
//                 <div className={styles.container3} key={index}>
//                     <li>
//                         {isEditing[index] ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     className={styles.container5}
//                                     value={editedInstructions[index]}
//                                     onChange={(e) => {
//                                         const newInstructions = [...editedInstructions];
//                                         newInstructions[index] = e.target.value;
//                                         setEditedInstructions(newInstructions);
//                                     }}
//                                 />
//                                 <button onClick={() => handleSave(index)}>Save</button>
//                             </div>
//                         ) : (
//                             <div>
//                                 {step}
//                                 <button onClick={() => handleEdit(index)}>Edit</button>
//                                 <button onClick={() => handleRemove(index)}>Remove</button>
//                             </div>
//                         )}
//                     </li>
//                 </div>
//             ))}
//             <div className={styles.container4}>
//                 <button onClick={handleAdd}>Add Step</button>
//             </div>
//         </ol>
//     );
// }

// export default RecipeInstructions;





