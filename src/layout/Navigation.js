import React from 'react';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
    MenuList,
    MenuItem,
    Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import SubjectIcon from '@material-ui/icons/Subject';
import { makeStyles } from '@material-ui/core/styles';
import { Link  } from 'react-router-dom';

const drawerWidth = 300;

const links = [{
    name: 'ByRadius',
    icon: 'AppsIcon',
    path: '/'
  },
  {
    name: 'ByName',
    icon: 'SubjectIcon',
    path: '/byname'
  }];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
      height: theme.appBar.height,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navigation = ({children}) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getIconHandler = icon => {
    switch(icon){
        case 'ByRadius':
          return(<AppsIcon color="primary" />)
        case 'ByName':
          return (<SubjectIcon color="primary" />)
        default: 
          return (<AppsIcon color="primary" />)
    }
}

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>
        {links.map(link => (
          <MenuItem button component={Link} to={link.path} key={link.name}>
            {getIconHandler(link.name)} 
            <Box fontSize={16} ml={1}>{link.name}</Box>{}
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline>
        <AppBar 
          position="fixed" 
          className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Airport Finder
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </CssBaseline>
    </div>
  );
}


export default Navigation;
