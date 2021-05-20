import React from 'react';
import { Button, Grid, Typography, TextField, Paper, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

function StepcounterView({ uploadData, connect, disconnect, connectionStatus, status, clear, dailySteps, getDeviceList, selectedDevice }) {

    const [formValue_id, setFormValue_id] = React.useState("");
    const [formValue_token, setFormValue_token] = React.useState("");
    const [formValue_steps, setFormValue_steps] = React.useState("");
    const [device, setDevice] = React.useState(null);

    React.useEffect(() => {
        getDeviceList().then(list => {
            setDevice(list.results[0].deviceId);
        })
    }, []);

    return <Grid item>
        <Grid container justify="center">
            <Grid container justify="center">
                <Typography style={{ fontWeight: "bold" }}>Enter device information</Typography>
            </Grid>
            <Grid container justify="center">
                <Paper elevation={3} style={{ "height": 300, "width": 300, "margin": 5 }}>
                    <Grid style={{ "margin": 5 }}>
                        <Grid container justify="center">
                            <FormControl variant="outlined" fullWidth="true" >
                                <InputLabel id="device">Select Device</InputLabel>
                                <Select
                                    labelId="deviceList "
                                    autoWidth="false">
                                   <MenuItem value={device}>{device}</MenuItem>
                                
                                </Select>
                                </FormControl>
                                {/*  <form>
                                <TextField id="outlined-basic" disabled={true} label="Device id" onChange={(e) => setFormValue_id(e.target.value)} variant="outlined" defaultValue={device}/>
                            </form> */}
                        </Grid>
                        </Grid>
                        <Grid style={{ "margin": 5 }}>
                            <Grid container justify="center">
                                <form>
                                    <TextField id="outlined-basic" disabled={connectionStatus ? true : false} label="Device token" onChange={(e) => setFormValue_token(e.target.value)} variant="outlined" />
                                </form>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            {connectionStatus ? (<Grid container justify="center">
                                <form>
                                    <TextField id="outlined-basic" label="Enter Steps" onChange={(e) => setFormValue_steps(e.target.value)} variant="outlined" />
                                </form>
                            </Grid>) : ""}
                        </Grid>
                        {
                            /*
        
                                <Grid container justify="center" style={{ "margin": 2 }} >
                                <Grid style={{ "margin": 2 }}>
                                    <Button variant="contained" color="primary" onClick={() => submitLocally(formValue_id, formValue_token)}>Set Local State</Button>
                                </Grid>
                            </Grid>
                            */
                        }
                        <Grid container justify="center" alignItems="flex-end">
                            <Grid style={{ "margin": 2 }}>
                                <Button variant="contained" color="primary" onClick={connectionStatus ? () => disconnect() : () => connect(device, formValue_token)} >
                                    {connectionStatus ? "Disconnect" : "Connect"}
                                </Button>
                            </Grid>
                            <Grid style={{ "margin": 2 }}>
                                <Button variant="contained" color="primary" onClick={() => uploadData(formValue_steps)} disabled={connectionStatus === false}>
                                    Upload data
                            </Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center">
                            <Typography> Status: {status.message}</Typography>
                        </Grid>
                </Paper>
                    <Grid container justify="center">
                        <Button variant="contained" color="secondary" onClick={() => clear()}>CLEAR local storage</Button>
                        <Grid container justify="center">
                            <Typography style={{ fontWeight: "bold" }}> Your uploaded steps today: {dailySteps} </Typography>

                        </Grid>
                    </Grid>
            </Grid>
            </Grid>
        </Grid>
}

export {StepcounterView};