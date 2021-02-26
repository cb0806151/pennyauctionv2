import React, { useContext } from 'react';
import { CoreState } from '../Util/CoreState';
import Exports from '../Util/Exports';
import Navbar from '../Components/Navbar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';



export default function Stage() {
    const state = useContext(CoreState.State)

    const renderPage = (pageName, Pages) => {
        const Page = Pages[pageName];
        return <Page/>;
    }

    return (
        <Box>
            <Navbar />
            <Container style={{height: 'calc(95vh - 64px)', marginTop: '20px'}}>
                {renderPage(state.page, Exports)}
            </Container>
        </Box>
    )
}