import { useState } from "react";
import { useRouter } from "next/router";

function SortByOrder() {
    const { query, pathname, push } = useRouter();
    const backUpValue = query.sort
    const [orderValue, setOrderValue] = useState(backUpValue);
 

    function handleSortByOrder(event) {
        const value = event.target.value
        // const orderValue2 = value.slice(value.indexOf('=') + 1, value.length)
        // const order = value.slice(0, value.indexOf('='))
        setOrderValue(value)
        const currentQuery = { ...query };
        currentQuery.sort = value
        push({ pathname, query: currentQuery });
    }

    return (
        <div style={{ display: 'flex' }}>
            <label id="sortSection"><p style={{ paddingRight: '10px' }}><b>SortBy</b></p></label>
            <select placeholder={'Choose Sort'} value={orderValue} onChange={handleSortByOrder}>
                <option value={'undefined'}>Default</option>
                <option value={'prep_1'}>Preptime: Ascending</option>
                <option value={'prep_-1'}>Preptime: Descending</option>
                <option value={'cook_1'}>Cooktime: Ascending</option>
                <option value={'cook_-1'}>Cooktime: Descending</option>
                <option value={'instructions_1'}>Steps: Ascending</option>
                <option value={'instructions_-1'}>Steps: Descending</option>
                <option value={'published_1'}>Date: Ascending</option>
                <option value={'published_-1'}>Date: Descending</option>
            </select>
        </div>
    )
}

export default SortByOrder;