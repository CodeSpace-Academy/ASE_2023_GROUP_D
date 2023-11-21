import styles from "@/components/sorting/searchBar.module.css"
function FilterBySteps({ setNumSteps, numSteps }) {


    function handleSteps(event) {
        setNumSteps(event.target.value)
    }

    return (
        <div className={styles.tagsDiv}>
            <label htmlFor="numSteps"><h5 style={{ color: 'white' }}>FilterByStep : </h5></label>
            <input type="number" id="numSteps" value={numSteps} onChange={handleSteps} className={styles.filters} ></input>
        </div>
    )
}

export default FilterBySteps;