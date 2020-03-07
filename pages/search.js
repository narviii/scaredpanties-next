import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Hero } from '../src/hero'
import { Footer } from '../src/footer'
const contentful = require('contentful')
import { PostGrid } from '../src/postgrid'
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Grid from '@material-ui/core/Grid';
import {originList} from '../src/constants'




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
        <Container maxWidth='lg' style={{marginBottom:'20px'}} >

            <Grid container justify="center" alignItems="center" spacing={2}>

                <Grid item>
                    <TextField onKeyDown={enterPress} value={input} onChange={(e) => setInput(e.target.value)} className={classes.searchBar} id="brand-search" label="Search for a brand" variant="outlined" />
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
    return { entries: entries, stats: stats }
}

export default Search