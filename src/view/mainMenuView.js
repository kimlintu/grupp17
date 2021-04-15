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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import SyncIcon from '@material-ui/icons/Sync';
import EqualizerIcon from '@material-ui/icons/Equalizer';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
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
    padding: theme.spacing(3),
  },
}));

function PermanentDrawerLeft() {
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
        <Divider />
        <List>
          {['Add steps', 'Add friend', 'Sync stepcounter'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{((index === 1) || index === 0) ? <AddIcon /> : <SyncIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Show stats', 'Logout'].map((text, index) => (
            <Link to="/login">
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <EqualizerIcon /> : <ExitToAppIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        KIMPOSSIBLE
        KIMPOSSIBLE
        KIMPOSSIBLE
        </Typography>
        <Typography paragraph>
          KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE KIMPOSSIBLE
        </Typography>
      </main>
    </div>
  );
}

const MainMenuView = () => {
  return PermanentDrawerLeft()
 
 
 
 
 
 
  // return <div>
    //{/* A <Link> can be used to change the URL path. */}
    /*<h2>@/</h2>
    <Link to="/login">
      Click here to login
    </Link>
  </div>*/
};

export { MainMenuView };
export { PermanentDrawerLeft };