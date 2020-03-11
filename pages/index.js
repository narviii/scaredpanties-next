import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Hero } from '../src/hero'
import { Footer } from '../src/footer';
import { PostGrid } from '../src/postgrid'
import firebase from '../src/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { originList, tagList, sizeList } from '../src/constants'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Dialog from '@material-ui/core/Dialog';
import { Nav } from '../src/nav'
import { useDocument } from 'react-firebase-hooks/firestore';
import { UserContext, DbContext, UserDocContext } from '../src/context'



const contentful = require('contentful')

const url = "https://scaredpanties.us20.list-manage.com/subscribe/post?u=65173dffd9ab714c0d2d985ab&amp;id=ed2dc9ceb2";


const uiConfig = {
    signInFlow: 'popup',
    credentialHelper: 'none',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]

};


originList.sort()
tagList.sort()
tagList.unshift("All")

const client = contentful.createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})

//UA-39274880-3 prod
//UA-39274880-4 dev

function initializeReactGAmain() {
    ReactGA.initialize('UA-39274880-4');

}

initializeReactGAmain()




const useStyles = makeStyles(theme => ({
    cardMedia: {

        paddingTop: '75%', // 16:9


    },
    pagination: {
        marginLeft: "-50px",
        marginRight: "-50px",
        paddingTop: '3em',
        paddingBottom: '3em',
        textAlign: 'center'
    },
    pageLabel: {

        paddingLeft: '0.5em',
        paddingRight: '0.5em'


    },
    pageRootStandard: {
        margin: "0.25em",
        padding: "0.4em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    pageRootCurrent: {
        margin: "0.25em",
        padding: "0.5em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    ms: {



        padding: "10px",

        '& *': {
            fontSize: "1.2em",
        },
    },
    cardAction: {
        marginTop: '0px',
        marginRight: '0px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "20em",

        [theme.breakpoints.down('sm')]: {
            minWidth: "100%"
        },

    },
    firebaseUI: {
        backgroundColor: 'gray'
    }




}))





function SelectOrigin(props) {
    const classes = useStyles();
    const router = useRouter();
    const handleChange = (event) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'origin'
        })
        router.push({
            pathname: '/',
            query: {

                ...router.query,
                origin: event.target.value,
                offset: 0

            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="origin-select">Country</InputLabel>
            <Select

                labelId="origin-select"
                id="origin-select"
                labelWidth={120}
                defaultValue={''}
                value={router.query.origin}
                onChange={handleChange}
            >
                {originList.map((origin) => <MenuItem key={origin} value={origin}>{origin}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

function SelectTags(props) {
    const classes = useStyles();
    const router = useRouter();
    const handleChange = (event) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'tags'
        })
        router.push({
            pathname: '/',
            query: {

                ...router.query,
                tags: event.target.value,
                offset: 0

            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="tag-select">Products</InputLabel>
            <Select

                labelId="tag-select"
                id="tag-select"
                onChange={handleChange}
                labelWidth={80}
                defaultValue={''}
                value={router.query.tags}
            >
                {tagList.map((tag) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

function SelectSize(props) {
    const classes = useStyles();
    const router = useRouter();
    const handleChange = (event) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'size'
        })
        router.push({
            pathname: '/',
            query: {

                ...router.query,
                sizes: event.target.value,
                offset: 0

            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="size-select">Sizes</InputLabel>
            <Select
                onChange={handleChange}
                labelId="size-select"
                id="size-select"
                labelWidth={120}
                defaultValue={''}
                value={router.query.sizes}
            >
                {sizeList.map((size) => <MenuItem key={size} value={size}>{size}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

function OrderSelector(props) {
    const router = useRouter();
    const handleChange = (event, order) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'order'
        })
        router.push({
            pathname: '/',
            query: {

                ...router.query, order: order,


            },
        })


    }

    return (
        <ToggleButtonGroup style={{ margin: "auto" }}
            value={(!router.query.order) ? "newest" : router.query.order}
            onChange={handleChange}
            size="large" exclusive
            aria-label="ordering">
            <ToggleButton aria-label="newest" value="newest">
                Newest
            </ToggleButton>
            <ToggleButton aria-label="alphabet" value="alphabet">
                Alphabet
            </ToggleButton>
        </ToggleButtonGroup>
    )
}



function MainPage(props) {
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






    ReactGA.pageview('/catalog');



    return (

        <React.Fragment>
            <CssBaseline />
            <style jsx global>{`
            `}</style>
            <UserDocContext.Provider value={userDoc}>
                <DbContext.Provider value={db}>
                    <UserContext.Provider value={user}>
                        <Nav loginDialogOpen={loginDialogOpen} firebase={firebase} />
                        <Dialog open={open} onClose={loginDialogClose} aria-labelledby="loginDialog">
                            <StyledFirebaseAuth classes={{ 'mdl-card': { backgroundColor: 'red' } }} uiConfig={{ ...uiConfig, callbacks: { signInSuccessWithAuthResult: loginDialogClose } }} firebaseAuth={firebase.auth()} />
                        </Dialog>
                        <Hero search={true} />
                        <Container maxWidth='lg' style={{ marginTop: "10px", marginBottom: "20px" }} >
                            <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                                <SelectOrigin />
                                <SelectTags />
                                <SelectSize />
                                <OrderSelector />
                            </Box>
                        </Container>
                        <PostGrid loginDialogOpen={loginDialogOpen} entries={props.entries} />
                        <Footer entries={props.stats} originList={originList} />
                    </UserContext.Provider>
                </DbContext.Provider>
            </UserDocContext.Provider>
        </React.Fragment>

    );

}

MainPage.getInitialProps = async (context) => {
    const entries = await client.getEntries({
        include: 1,
        order: (context.query.order == 'alphabet' ? 'fields.title' : '-sys.updatedAt'),
        'fields.tags[all]': (context.query.tags == 'All' || context.query.tags === '') ? undefined : context.query.tags,
        'fields.origin': (context.query.origin === 'All' || context.query.origin === '') ? undefined : context.query.origin,
        'fields.sizes': (context.query.sizes != 'All') ? context.query.sizes : undefined,
        'content_type': 'post',
        limit: 12,
        skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
    })

    const stats = await client.getEntries({
        limit: 1
    })

    return { entries: entries, stats: stats }
}


export default MainPage;
