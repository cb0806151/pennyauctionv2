import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';

export default function Test() {
    const dispatch = useContext(CoreState.Dispatch)

    return (
        <div>
            <h1>Test page</h1>
            <button onClick={() => dispatch({var: 'page', type: 'set', value: 'Home'})}>Go to App?</button>
        </div>
    )
}