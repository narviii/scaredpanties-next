import React from 'react';
import { CssBaseline } from '@material-ui/core';
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
import Grid from '@material-ui/core/Grid';
import { originList } from '../src/constants'
import { Nav } from '../src/nav'
import firebase from '../src/firebase'
import Dialog from '@material-ui/core/Dialog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext,UserContext, DbContext, UserDocContext,LoginDialogContext } from '../src/context'
import ReactGA from '../src/reactga'




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



    }
}))


function SearchBar(props) {
    const classes = useStyles()
    const [input, setInput] = useState('')
    const router = useRouter();

    const enterPress = (e) => {
        if (e.keyCode == 13) {
            handleSearch()
        }
    }

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {

                ...router.query,
                search: input,
                offset: null


            },
        })

    }
    return (
        <Container maxWidth='lg' style={{padding:'15px  15px '}} >

            <Grid container justify="center" alignItems="center" spacing={2}>

                <Grid item>
                    <TextField onKeyDown={enterPress}  value={input} onChange={(e) => setInput(e.target.value)} className={classes.searchBar} id="brand-search" label="Search for a brand" variant="outlined" />
                </Grid>
                <Grid item>
                    <Button onClick={handleSearch} fullWidth size="large" variant="outlined" color="inherit"> SEARCH</Button>
                </Grid>
            </Grid>
        </Container>
    )
}



function Search(props) {



    ReactGA.pageview('catalog/search');

    return (
        <React.Fragment>
            <CssBaseline />

                        <Nav/>
                        <Hero />
                        <SearchBar />
                        <PostGrid entries={props.entries} />
                        <Footer entries={props.stats} originList={originList} />

        </React.Fragment>

    )
}

Search.getInitialProps = async (context) => {
    const entries = await client.getEntries({
        include: 1,
        order: 'fields.title',
        'fields.title[match]': context.query.search,
        'content_type': 'post',
        limit: 12,
        skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
    })

    const stats = await client.getEntries({
        limit: 1
    })

    entries.items = await Promise.all(entries.items.map(async (entry) => {
        entry.stockists = await client.getEntries({
            links_to_entry: entry.sys.id,
            include: 0
        })
        return entry
    }))


    return { entries: entries, stats: stats }
}

export default Search