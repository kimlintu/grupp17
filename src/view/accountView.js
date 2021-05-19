import { Link, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import { Button, Grid, Typography, TextField, Paper } from '@material-ui/core';



const AccountView = ({ getLogin, getSignUp, name, getName, getLogout, getDetails }) => {
  getName(); //get logged in users name, if there is any


  console.log(name)
  const bool = true;



  return <Grid item>
    <Grid container justify="center">

      <Paper elevation={3} style={{ "height": 200, "width": 300, "margin": 5 }}>

        <Grid container justify="center">
          <Typography style={{ fontWeight: "bold" }}>Welcome to</Typography>
        </Grid>
        <Grid container justify="center">
          <Typography style={{ fontWeight: "bold" }}>Watch your steps</Typography>
        </Grid>
        <Grid container justify="center">
          {!name && ( <>
            <Grid style={{ "margin": 2 }}>
                <Button variant="contained" color="primary" onClick={() => getLogin()}>
                  Login
                </Button>
            </Grid>
            <Grid style={{ "margin": 2 }}>
                <Button variant="contained" color="primary" onClick={() => getSignUp()}>
                    Sign up
                </Button>
            </Grid>
          </>
          )
          }
          {name && (<>
            <Typography paragraph>
              Logged in as: {name}
            </Typography>
            <Grid container justify="center" alignItems="flex-end">
              <Grid style={{ "margin": 2 }}>
                <Button variant="contained" color="primary" onClick={() => getLogout()}>
                  logout
                </Button>
              </Grid>
              <Grid style={{ "margin": 2 }}>
                <Button variant="contained" color="primary" onClick={() => getDetails()}>
                  Change Details
                </Button>
              </Grid>
            </Grid>
          </>
          )}
        </Grid>

      </Paper>
    </Grid>
  </Grid>

};

export { AccountView };

