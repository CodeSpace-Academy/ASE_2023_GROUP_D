import styles from "./searchBar.module.css"

function FilterBySteps({ setNumSteps, numSteps }) {


    function handleSteps(event) {
        setNumSteps(event.target.value)
    }

    return (
        <div className={styles.steps}>
            <label htmlFor="numSteps">
                <h5 style={{ color: 'white' }}>Filter By Steps: </h5>
            </label>
                <input className={styles.fill} type="number" id="numSteps" value={numSteps} onChange={handleSteps}></input>
        </div>
    )
}

export default FilterBySteps;