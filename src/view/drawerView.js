import { Link } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SyncIcon from '@material-ui/icons/Sync';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: 50,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

function PermanentDrawerLeft({ props }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Watch your step
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        {(props.userLoggedIn === true) && (<>
          <Divider />
          <List>
            <Link to="/devices">
              <ListItem button key={"Manage stepcounter"}>
                <ListItemIcon>
                  <SyncIcon />
                </ListItemIcon>
                <ListItemText primary={"Sync stepcounter"} />
              </ListItem>
            </Link>
            <Link to="/stepcounter">
              <ListItem button key={"Stepcounter"}>
                <ListItemIcon>
                  <DevicesOtherIcon />
                </ListItemIcon>
                <ListItemText primary={"Stepcounter"} />
              </ListItem>
            </Link>
            <Link to="/stats/steps">
              <ListItem button key={"Show stats"}>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary={"Show stats"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </>)}
        <List>
          <Link to="/account">
            <ListItem button key={"account"}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"account"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export { PermanentDrawerLeft };
