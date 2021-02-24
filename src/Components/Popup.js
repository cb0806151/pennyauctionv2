import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {

    return (
        <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={props.open}
                onClose={props.handleClose}
                onExited={props.handleClose}
                message={props.message}
                key={'top' + 'left'}
                action={
                    <React.Fragment>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={props.handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </React.Fragment>
                  }
            />
    )
}