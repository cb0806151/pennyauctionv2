import React from 'react';

export default function JoinAuction() {

    const side = {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const container = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    }

    return (
      <div style={container}>
          <div style={{...side, flexDirection: 'column'}}>
              <textarea style={{width: '50%', height: '50%'}}></textarea>
              <button>Submit Invite</button>
          </div>
          <hr style={{height: '100%'}}/>
          <div style={side}>
              <button>Submit invite link from clipboard</button>
          </div>
      </div>
    )
}