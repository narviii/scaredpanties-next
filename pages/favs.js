import React from 'react';
import { CssBaseline, Typography } from '@material-ui/core';
import { Hero } from '../src/hero'
import { Footer } from '../src/footer'
const contentful = require('contentful')
import { PostGrid } from '../src/postgrid'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Grid from '@material-ui/core/Grid';
import { Nav } from '../src/nav'
import firebase from '../src/firebase'
import Dialog from '@material-ui/core/Dialog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext, DbContext, UserDocContext } from '../src/context'
import { originList } from '../src/constants'
import Favorite from '@material-ui/icons/Favorite';





const uiConfig = {
    signInFlow: 'popup',
    credentialHelper: 'none',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
};


//UA-39274880-3 prod
//UA-39274880-4 dev

function initializeReactGAmain() {
    ReactGA.initialize('UA-39274880-3');

}

initializeReactGAmain()


const client = contentful.createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})

const useStyles = makeStyles(theme => ({
    searchBar: {
        margin: theme.spacing(2),
        width: '40em',
        [theme.breakpoints.down('sm')]: {
            width: "20em"
        },
    },
    addressBar: {
        width: 200,
    },
}))






function Search(props) {
    const router = useRouter();
    const classes = useStyles();
    const [open, setOpen] = useState(false)

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
        setOpen(true)
    }

    const [user, initialising, error] = useAuthState(firebase.auth());
    const db = firebase.firestore();


    const [userDoc, loading, errorDoc] = useDocument(
        user ? db.collection('users').doc(user.uid) : null)
    let displayLink
    if (user) {
        if (user.uid == props.currentFav) {
            displayLink = (
                <div>
                    <Container maxWidth='md' style={{ display: "flex", margin: '30px auto 10px auto' }}>
                        <Favorite style={{ margin: "auto", fontSize: 30, color: "red" }} />
                        <TextField style={{ margin: '0 10px 0 10px' }} fullWidth size='small' variant='outlined' value={'https://catalog.scaredpanties.com/favs?myfavs=' + user.uid} />
                    </Container>
                    <Container style={{ marginBottom: '30px' }}>
                        <Typography gutterBottom variant="body2" align="center">Grab this adress and send to anybody to share your list of favorite brands</Typography>
                    </Container>

                </div>

            )
        } else {
            displayLink = (
                <div style={{ margin: '40px' }}></div>
            )
        }
    } else {
        displayLink = (
            <div style={{ margin: '40px' }}></div>
        )
    }

    ReactGA.pageview('catalog/favs');

    return (
        <React.Fragment>
            <CssBaseline />
            <UserDocContext.Provider value={userDoc}>
                <DbContext.Provider value={db}>
                    <UserContext.Provider value={user}>

                        <Nav loginDialogOpen={loginDialogOpen} firebase={firebase} />
                        <Dialog open={open} onClose={loginDialogClose} aria-labelledby="loginDialog">
                            <StyledFirebaseAuth classes={{ 'mdl-card': { backgroundColor: 'red' } }} uiConfig={{ ...uiConfig, callbacks: { signInSuccessWithAuthResult: loginDialogClose } }} firebaseAuth={firebase.auth()} />
                        </Dialog>
                        

                        {displayLink}

                        <PostGrid loginDialogOpen={loginDialogOpen} entries={props.entries} />
                        <Footer entries={props.stats} originList={originList} />
                    </UserContext.Provider>
                </DbContext.Provider>
            </UserDocContext.Provider>

        </React.Fragment>

    )
}

Search.getInitialProps = async (context) => {
    const db = firebase.firestore();
    const userDocRef = db.collection("users").doc(context.query.myfavs)

    const docData = await userDocRef.get()
    let entries
    if (docData.exists) {
        entries = await client.getEntries({
            include: 1,
            order: 'fields.title',
            'sys.id[in]': docData.data().favs.toString(),
            'content_type': 'post',
            limit: 12,
            skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
        })
    } else {
        entries = await client.getEntries({
            include: 1,
            order: 'fields.title',
            'sys.id[in]': '',
            'content_type': 'post',
            limit: 12,
            skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
        })
    }
    const stats = await client.getEntries({ limit: 1 })

    return { entries: entries, stats: stats, currentFav: context.query.myfavs }
}

export default Search