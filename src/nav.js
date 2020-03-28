import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from "react";
import { UserContext, DbContext, UserDocContext } from '../src/context'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Subscribe } from '../src/subscribe'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}));

function LoginControl(props) {
    const classes = useStyles()
    if (props.user) {
        return <Button size="large" color="inherit" onClick={props.logout}>Log out</Button>
    } else {
        return <Button size="large" onClick={props.loginDialogOpen} color="inherit">Login/Sign up</Button>
    }

}


export function Nav(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const firebase = props.firebase;
    const user = useContext(UserContext);
    const classes = useStyles();



    const [open, setOpen] = useState(false)

    const logout = () => {
        firebase.auth().signOut();
    };

    return (
        <div>
            <AppBar color="inherit" position="static">
                <Toolbar>
                    <div className={classes.sectionDesktop}>

                        <Button size="large" color="inherit" href="/" > HOME </Button>
                        <Button size="large" color="inherit" href="/search" > SEARCH </Button>
                        <Subscribe butToggle='true' />
                        <Button size="large" href="https://blog.scaredpanties.com" >  BLOG </Button>
                        <Button href="https://www.buymeacoffee.com/scaredpanties" startIcon={<LocalCafeIcon />}>
                            Buy me a Coffee
                         </Button>

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <Link variant="body2" align="right" underline='none' color="textPrimary" href="/" >
                                <MenuItem style={{ justifyContent: 'center' }}>

                                    HOME
                                    </MenuItem>
                            </Link>
                            <Link underline='none' color="textPrimary" href="/search" >
                                <MenuItem style={{ justifyContent: 'center' }} >
                                    SEARCH
                                </MenuItem>
                            </Link>
                            <Link underline='none' color="textPrimary" href="https://blog.scaredpanties.com" >
                                <MenuItem style={{ justifyContent: 'center' }}>
                                    BLOG
                                </MenuItem  >
                            </Link>

                            <MenuItem style={{ justifyContent: 'center' }} onClick={handleClose}>
                                <Subscribe />
                            </MenuItem>


                            <Link underline='none' color='textPrimary' href="https://www.buymeacoffee.com/scaredpanties">
                                <MenuItem>
                                <LocalCafeIcon style={{marginRight:'5px'}} />
                                BUY ME A COFFEE
                                </MenuItem>
                            </Link>

                        </Menu>
                    </div>
                    <div className={classes.grow} />

                    {user ? <Button size="large" color="inherit" href={'/favs?myfavs=' + user.uid} > MY FAVORITES </Button> : null}

                    <LoginControl user={user} loginDialogOpen={props.loginDialogOpen} logout={logout} />

                </Toolbar>

            </AppBar>
        </div >
    )
}