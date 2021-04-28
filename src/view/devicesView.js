import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { useState } from 'react';

const DevicesView = ({ addDevice }) => {
  const [deviceName, setDeviceName] = useState("device_name");

  return <Grid container style={{ "height": "calc(100vh - 65px)", "alignContent": "center" }}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Paper style={{ "height": 500, "width": 500 }}>
          <Grid container style={{ "padding": "40px" }}>
            <Grid item xs={12}>
              <Grid container justify="center" style={{ "padding": "40px" }}>
                <form>
                  <TextField id="outlined-basic" label="Device name" onChange={(e) => setDeviceName(e.target.value)} variant="outlined" />
                </form>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Button variant="contained" color="primary" disableElevation style={{ "padding": "40px", "fontWeight": "bold" }}
                        onClick={() => addDevice(deviceName)}>
                  Add device
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
}

export { DevicesView };