import React from 'react';

function StepcounterView({uploadData, submitLocally, tokenStatus, connect, disconnect, connectionStatus, status}) {

    const [formValue_id, setFormValue_id] = React.useState("");
    const [formValue_token, setFormValue_token ] = React.useState("");
    const [formValue_steps, setFormValue_steps] = React.useState("");
   // const [con_stat, setConnectionStatus ] = React.useState(connectionStatus());
    
    return <div className="View">
        <header className="View-header">
            <p>
               Connect your device
            </p>
            
            Enter device-id
            <input value={formValue_id} onChange={(e) => setFormValue_id(e.target.value)}></input>
            Enter token
            <input value={formValue_token} onChange={(e) => setFormValue_token(e.target.value)}></input>
            <br/>

            {connectionStatus ? "Enter steps" : ""}
            {connectionStatus ? (<input value={formValue_steps} onChange={(e) => setFormValue_steps(e.target.value)}></input>) : ""}
            <p>
                Status: {status.message}
            </p>
            <button id="sub-local" onClick={() => submitLocally(formValue_id, formValue_token)}>Set Local state</button>
            <br/>
            <button id="con-stat" onClick={connectionStatus ? () => disconnect() : () => connect() } >{connectionStatus ? "Disconnect" : "Connect"}</button>
            <br/>
            <button onClick={() => uploadData(formValue_steps) } disabled={connectionStatus === false}>Upload data</button>
        </header>
    </div>
}

export { StepcounterView };