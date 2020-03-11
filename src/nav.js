import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from "react";
import {UserContext,DbContext,UserDocContext} from '../src/context'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import { Subscribe } from '../src/subscribe'
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube'
import TwitterIcon from '@material-ui/icons/Twitter';


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },
}));

function LoginControl(props) {
    const classes = useStyles()
    if (props.user) {
        return <Button  size="large" color="inherit" onClick={props.logout}>Log out</Button>
    } else {
        return <Button size="large" onClick={props.loginDialogOpen} color="inherit">Login</Button>
    }

}


export function Nav(props) {
    const firebase = props.firebase;
    const user = useContext(UserContext);
    const classes = useStyles();



    const [open, setOpen] = useState(false)

    const logout = () => {
        firebase.auth().signOut();
    };

    return (
        <div>
            <AppBar color ="inherit" position="static">
                <Toolbar>
                    <Button size="large" color="inherit" href="/" > HOME </Button>
                    <Button size="large" color="inherit" href="/search" > SEARCH </Button>
                    <Subscribe />
                    <Button size="large" href="https://blog.scaredpanties.com" >  BLOG </Button>
                    <div className={classes.grow} />
                    {user?<Button size="large" color="inherit" href={'/favs/'+user.uid} > MY FAVORITES </Button>:null}

                    <LoginControl user={user} loginDialogOpen={props.loginDialogOpen} logout={logout} />

                </Toolbar>

            </AppBar>
        </div>
    )
}