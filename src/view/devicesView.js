import { Button, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TextField, Typography, TableCell, TableRow, withStyles } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox'
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp'
import ViewListSharpIcon from '@material-ui/icons/ViewListSharp'

import { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const DevicesView = ({ addDevice, getDeviceList, deleteDevice, status }) => {
  const match = useRouteMatch();

  return <Switch>
    <Route path={`${match.path}/add`}>
      <AddDeviceView addDevice={addDevice} status={status} />
    </Route>
    <Route path={`${match.path}/list`}>
      <ListDevicesView getDeviceList={getDeviceList} deleteDevice={deleteDevice} />
    </Route>
    <Route path={`${match.path}`}>
    <Grid container style={{ "marginTop": 50, "alignContent": "center" }} justify="center">
        <DevicesSelectionPaper linkPath={`${match.url}/list`} text="LIST" Icon={ViewListSharpIcon} iconColor="#92B9BD" />
        <DevicesSelectionPaper linkPath={`${match.url}/add`} text="ADD" Icon={AddBoxIcon} iconColor="#A8D4AD" />
      </Grid>
    </Route>
  </Switch>
}

function DevicesSelectionPaper({ linkPath, text, Icon, iconColor }) {
  return <Grid item>
    <Grid container justify="center">
      <Paper style={{ "height": 500, "width": 500, "margin": 50 }}>
        <Grid container justify="center">
          <Grid item xs={12} style={{ textAlign: "center", paddingTop: "25%" }}>
            <Typography style={{ fontWeight: "bold", fontSize: 50 }}>
              {text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Link to={`${linkPath}`}>
                <IconButton >
                  <Icon style={{ "height": 200, "width": 200, color: iconColor }} />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function ListDevicesView({ getDeviceList, deleteDevice }) {
  const [deviceList, setDeviceList] = useState(null);

  useEffect(() => {
    getDeviceList().then(list => {
      setDeviceList(list.results);
    })
  }, []);

  console.log('list: ', deviceList)

  return <Grid container style={{ "height": "calc(100vh - 65px)", "alignContent": "center" }}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Paper style={{ "height": 500, "width": 500, overflow: "auto" }}>
          <TableContainer>
            <Table style={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(deviceList && deviceList.map(device => {
                  return <StyledTableRow key={device.deviceId}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Typography style={{ fontWeight: "bold" }}>
                        {device.deviceId}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton onClick={() => {
                        deleteDevice(device.deviceId).then(() => {
                          getDeviceList().then(list => {
                            console.log('retrive list, ', list)
                            setDeviceList(list.results);
                          })
                        })
                      }} >
                        <HighlightOffSharpIcon style={{ width: 30, height: 30 }} color="secondary" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                })) || <Typography>Loading...</Typography>}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
}

function AddDeviceView({ addDevice, status }) {
  const [deviceName, setDeviceName] = useState("device_name");
  const [deviceToken, setDeviceToken] = useState(null);

  return <Grid container style={{ "height": "calc(100vh - 65px)", "alignContent": "center" }}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Paper style={{ "height": 600, "width": 500 }}>
          <Grid container style={{ "padding": "40px" }}>
            <Grid item xs={12}>
              <Grid container justify="center" style={{ "padding": "40px" }}>
                <form>
                  <TextField id="outlined-basic" label="Device name" onChange={(e) => setDeviceName(e.target.value)} variant="outlined" />
                </form>
              </Grid>
            </Grid>
            <hr style={{ width: 400 }} />
            <Grid item xs={12}>
              <Grid container justify="center" style={{ "padding": "40px" }}>
                <Typography>Token has to be between 8 and 36 characters.</Typography>
                <form>
                  <TextField id="outlined-basic" label="Token" onChange={(e) => setDeviceToken(e.target.value)} variant="outlined" />
                </form>
              </Grid>
            </Grid>
            <hr style={{ width: 400 }} />
            <Grid item xs={12}>
              <Grid container justify="center">
                <Button variant="contained" color="primary" disableElevation style={{ "padding": "40px", "fontWeight": "bold" }}
                  disabled={(status.status === 'loading')}
                  onClick={() => addDevice(deviceName, deviceToken)}>
                  Add device
            </Button>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography color={status.color} style={{ fontWeight: "bold" }}>
                    {status.message}
                  </Typography>
                  {
                    (status.parameters && <Typography>
                      Your device token is: {status.parameters[0]}
                    </Typography>)
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
}

export { DevicesView };