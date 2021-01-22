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
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Hero } from '../src/hero'
import { Footer } from '../src/footer';
import { PostGrid } from '../src/postgrid'
import ReactGA from '../src/reactga'
import { originList, tagList, sizeList } from '../src/constants'
import { Nav } from '../src/nav'
import { FirebaseContext, UserContext, DbContext, UserDocContext, LoginDialogContext } from '../src/context'
import { client } from '../src/contentful'
import { useContext } from "react";
import Head from 'next/head'
import { HeadContent } from '../src/headcontent'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { SvgIcon, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';




const url = "https://scaredpanties.us20.list-manage.com/subscribe/post?u=65173dffd9ab714c0d2d985ab&amp;id=ed2dc9ceb2";




originList.sort()
tagList.sort()
tagList.unshift("All")






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
            value={router.query.order}
            onChange={handleChange}
            size="large" exclusive
            aria-label="ordering">
            <ToggleButton aria-label="updated" value="lastUpdated">
                Updated
            </ToggleButton>
            <ToggleButton aria-label="created" value="lastCreated">
                Created
            </ToggleButton>

            <ToggleButton aria-label="alphabet" value="alphabet">
                Alphabet
            </ToggleButton>
        </ToggleButtonGroup>
    )
}



function MainPage(props) {
    ReactGA.pageview('/catalog');

    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    return (

        <React.Fragment>
            <Head>
                <HeadContent
                    description="A list and catalog of lingerie brands assembled and lovely currated by scaredpanties."
                    title="Lingerie brands catalog."
                    image="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"
                    url="https://catalog.scaredpanties.com"

                />
            </Head>
            <CssBaseline />
            <Nav />
            <Hero text="Handpicked lingerie database: Brands from all around the world. Like brands to save for yourself or to share your favourites with friends." />
            <Container disableGutters="true" maxWidth='false'>

                <Box p={3} flexWrap="wrap" display="flex" alignItems="center" bgcolor="info.main">
                    <Box flexGrow={0.5} />
                    <SvgIcon style={{marginRight:"5px"}} fontSize="large">
                        <path d="M19.83,7.5l-2.27-2.27c0.07-0.42,0.18-0.81,0.32-1.15C17.96,3.9,18,3.71,18,3.5C18,2.67,17.33,2,16.5,2 c-1.64,0-3.09,0.79-4,2l-5,0C4.46,4,2,6.46,2,9.5S4.5,21,4.5,21l5.5,0v-2h2v2l5.5,0l1.68-5.59L22,14.47V7.5H19.83z M13,9H8V7h5V9z M16,11c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C17,10.55,16.55,11,16,11z" />
                    </SvgIcon>
                    <Typography  >
                        New! Lingerie discounts live tracker. I scan quite a few lingerie websites for price changes(and discounts) so that you don't have to.
                       </Typography>
                    <Box flexGrow={0.5} />
                    <Button style={{ marginTop: "5px" }} href="/pricetrack" variant="contained" color="secondary">
                        Show me
                       </Button>
                    <Box flexGrow={0.5} />

                </Box>

            </Container>
            <Container maxWidth='lg' style={{ margin: '30px auto 30px ' }} >
                <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                    <SelectOrigin />
                    <SelectTags />
                    <SelectSize />
                    <OrderSelector />
                </Box>
            </Container>
            <PostGrid entries={props.entries} />
            <Footer entries={props.stats} originList={originList} />
        </React.Fragment>

    );

}



MainPage.getInitialProps = async (context) => {
    const order = {
        "lastUpdated": "-sys.updatedAt",
        "lastCreated": "-sys.createdAt",
        "alphabet": "fields.title"
    }
    let entries = await client.getEntries({
        include: 1,
        order: order[context.query.order],
        'fields.tags[all]': (context.query.tags == 'All' || context.query.tags === '') ? undefined : context.query.tags,
        'fields.origin': (context.query.origin === 'All' || context.query.origin === '') ? undefined : context.query.origin,
        'fields.sizes': (context.query.sizes != 'All') ? context.query.sizes : undefined,
        'content_type': 'post',
        limit: 12,
        skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
    })



    entries.items = await Promise.all(entries.items.map(async (entry) => {
        entry.stockists = await client.getEntries({
            links_to_entry: entry.sys.id,
            include: 0
        })
        return entry
    }))


    const stats = await client.getEntries({
        limit: 1
    })

    return { entries: entries, stats: stats }
}


export default MainPage;
