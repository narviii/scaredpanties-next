import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from "react";
import { UserContext, DbContext, UserDocContext, LoginDialogContext, FirebaseContext } from '../src/context'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Subscribe } from '../src/subscribe'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import ReactGA from '../src/reactga'
import Badge from '@material-ui/core/Badge';





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

    const firebase = useContext(FirebaseContext);

    const uiConfig = {
        signInFlow: 'popup',
        credentialHelper: 'none',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]

    };


    const db = firebase.firestore();
    const [user, initialising, error] = useAuthState(firebase.auth());

    const test = useContext(LoginDialogContext);
    const open = test.loginDialogOpen
    const setOpen = test.setLoginDialogOpen


    const loginDialogClose = (authResult, redirectUrl) => {
        if (authResult.user) {
            const userRef = db.collection('users').doc(authResult.user.uid)
            userRef.get().then((doc) => {
                if (doc.exists) {
                    //console.log('yes')
                } else {
                    userRef.set({ favs: [] })
                    //console.log('no')
                }
            })
        }
        setOpen(false)
    }

    const loginDialogOpen = () => {
        ReactGA.event({ category: 'user', action: 'auth', label: 'loginDialog' })
        setOpen(true)
    }

    const logout = () => {
        firebase.auth().signOut();
    };


    const classes = useStyles()
    const loginButton = user ? <Button size="large" color="inherit" onClick={logout}>Log out</Button> : <Button size="large" onClick={loginDialogOpen} color="inherit">Login/Sign up</Button>


    return (
        <div>
            {loginButton}
            <Dialog open={open} onClose={loginDialogClose} aria-labelledby="loginDialog">
                <StyledFirebaseAuth uiConfig={{ ...uiConfig, callbacks: { signInSuccessWithAuthResult: loginDialogClose } }} firebaseAuth={firebase.auth()} />
            </Dialog>
        </div>
    )


}


export function Nav(props) {

    const firebase = useContext(FirebaseContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, initialising, error] = useAuthState(firebase.auth());



    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useStyles();



    const [open, setOpen] = useState(false)


    return (
        <div>
            <AppBar color="inherit" position="static">
                <Toolbar>
                    <div className={classes.sectionDesktop}>

                        <Button size="large" color="inherit" href="/" > HOME </Button>
                        <Button size="large" color="inherit" href="/search" > SEARCH </Button>
                        <Button size="large" color="inherit" href="/stockists" > STOCKISTS </Button>
                        
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
                            <Link underline='none' color="textPrimary" href="/stockists" >
                                <MenuItem style={{ justifyContent: 'center' }} >
                                    STOCKISTS
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
                                    <LocalCafeIcon style={{ marginRight: '5px' }} />
                                BUY ME A COFFEE
                                </MenuItem>
                            </Link>

                        </Menu>
                    </div>
                    <div className={classes.grow} />

                    {user ? <Button size="large" color="inherit" href={'/favs?myfavs=' + user.uid} > MY FAVORITES </Button> : null}

                    <LoginControl />

                </Toolbar>

            </AppBar>
        </div >
    )
}