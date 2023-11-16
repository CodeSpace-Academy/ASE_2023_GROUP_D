function FilterBySteps({ setNumSteps, numSteps }) {


    function handleSteps(event) {
        setNumSteps(event.target.value)
    }

    return (
        <div style={{ display: 'flex' }}>
            <label htmlFor="numSteps"><h5 style={{ color: 'white' }}>FilterByStep : </h5></label>
            <input type="number" id="numSteps" value={numSteps} onChange={handleSteps}></input>
        </div>
    )
}

export default FilterBySteps;