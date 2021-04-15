import { Link, useRouteMatch } from 'react-router-dom';
import { useState} from 'react';

const RegisterView = () => {
    const match = useRouteMatch(); {/* match contains info about current <Route>,
  i.e. "/login". It can be used to perform relative routing (see below). */}

    const [username, setUserName] = useState('');

    return <div style={{
        backgroundColor: 'lightblue',
    }}>
        <div>
            <h1>Watch Your Steps!</h1>
        </div>
        <h2>@/Register</h2>
        <div style= {{
            textDecorationColor:"blue"
        }}>
            Enter new username:<br></br>
            <input onChange={(e) => {setUserName(e.target.value)}}></input><br></br>
            Enter new password:<br></br>
            <input></input>
        </div>

        <button onClick={()=>alert(username + " is Invalid username")}>Register</button>
        <Link to="/login">
      <button>
        Back
      </button>
    </Link>
    </div>

};

export { RegisterView };