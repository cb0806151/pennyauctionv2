import { useContext } from 'react';
import GlobalContext from '../Util/GlobalContext';

function Test() {
    const context = useContext(GlobalContext);


    return (
        <div>
            <h1>Test page</h1>
            <button onClick={() => context.setCurrentPage('App')}>Go to App?</button>
        </div>
    )
}

export default Test;