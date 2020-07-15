import React from 'react'
import { client } from '../../src/contentful'
import ReactGA from '../../src/reactga'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Footer } from '../../src/footer';
import { originList, tagList, sizeList } from '../../src/constants'
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import useSWR from 'swr'
import fetch from 'unfetch'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Stockists } from '../../src/stockists'
import ModalImage from "react-modal-image";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Nav } from '../../src/nav'
import LaunchIcon from '@material-ui/icons/Launch';
const url = require('url'); // built-in utility
import Head from 'next/head'
import { HeadContent } from '../../src/headcontent'
import InstagramIcon from '@material-ui/icons/Instagram';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CardHeader from '@material-ui/core/CardHeader';

const axios = require('axios');

const fetcher = url => fetch(url).then(r => r.json())


const useStyles = makeStyles((theme) => ({
    cardMedia: {

        paddingTop: '100%'


    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    modal: {


        width: '100%'
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


function GrdTile(props) {
    const classes = useStyles();
    const { data, error } = useSWR(`https://api.instagram.com/oembed?url=` + props.link, fetcher)
    if (error) return null
    return (
        <Grid item xs={6} sm={6} md={4} lg={3} key={props.link}>
            <Card>
                <Link
                    color="textPrimary"
                    target="_blank"
                    href={props.link}

                >
                    <CardMedia
                        title={data ? data.author_name + ' wearing ' + props.brand : null}
                        image={'https://' + url.parse(props.link).hostname + url.parse(props.link).pathname + 'media'}
                        className={classes.cardMedia} />
                </Link>
            </Card>

        </Grid>
    )
}

function IgGallery(props) {
    const classes = useStyles();




    return (
        <div style={{ margin: '30px 0 30px 0' }}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
                <InstagramIcon style={{ marginRight: '5px' }} />
                <Typography color="textSecondary" align="center" variant='h5'>Spotted on Instagram</Typography>
            </Box>
            <Box className={classes.root}>

                <Grid container spacing={0} alignItems="stretch">
                    {props.instalinks.map(link => (<GrdTile brand={props.brand} key={link} link={link} />))}
                </Grid>

            </Box>
        </div>
    )
}

function BrandGallery(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    return (

        <div style={{ margin: '30px 0 30px 0' }}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
                <PhotoLibraryIcon style={{ marginRight: '5px' }} />
                <Typography color="textSecondary" align="center" variant='h5'>Brand gallery</Typography>
            </Box>
            <Box className={classes.root}>
                <GridList cellHeight={matches ? 'auto' : 400} cols={matches ? 1 : 2}>
                    {props.pics.map(pic => (
                        <GridListTile key={pic.fields.title} cols={matches ? 1 : (pic.fields.file.details.image.width / pic.fields.file.details.image.height > 1 ? 2 : 1)}>
                            <ModalImage className={classes.modal}
                                hideDownload
                                small={(pic.fields.file.details.image.width / pic.fields.file.details.image.height > 1) ? pic.fields.file.url + '?w=800&h=400&fit=fill' : pic.fields.file.url + '?w=400&h=400&fit=fill'}
                                large={pic.fields.file.url}
                                alt={pic.fields.title}
                            />;

                        </GridListTile>
                    ))}
                </GridList>
            </Box>
            <Divider style={{ margin: '10px' }} variant="middle" />

        </div>
    )
}

function Reviews(props) {
    return (
        <div style={{ padding: '10px' }}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
                <RateReviewIcon style={{ marginRight: '5px' }} />
                <Typography align="center" variant="h5" color="textSecondary">Read about it in reviews:</Typography>
            </Box>
            <Grid container alignItems="stretch" spacing={1} style={{ padding: '5px' }}>
                {props.reviews.map(review =>
                    <Grid key={review.link} xs={12} sm={6} md={4} item>
                        <Link
                            onClick={() => {
                                ReactGA.event({
                                    category: 'user',
                                    action: 'outbound:review',
                                    label: review.link
                                })
                            }}

                            align="center"
                            style={{ padding: '5px', display: "block" }}
                            color="textPrimary" target="_blank"
                            href={review.link}>
                            {review.title}
                        </Link>
                    </Grid>
                )
                }
            </Grid>
            <Divider style={{ margin: '10px' }} variant="middle" />

        </div>

    )
}



function Brand(props) {
    const avatarStyleBig = { width: '50px', marginRight: "30px", height: '50px' }
    const avatarStyleSmall = { width: '50px', margin: 'auto', height: '50px' }
    const matches = useMediaQuery('(max-width:850px)');
    ReactGA.pageview('/catalog/brands/' + props.entrie.fields.slug);



    return (
        <React.Fragment>

            <Head>
                <HeadContent
                    description={props.entrie.fields.desc}
                    title={props.entrie.fields.title + ' from ' + props.entrie.fields.origin + " at lingerie brands catalog."}
                    image={'https:' + props.entrie.fields.thumbnail.fields.file.url + '?w=300' + '&fm=png'}


                />
            </Head>

            <Nav />

            <Container style={{ margin: '30px auto' }} maxWidth='md'>

                <Paper style={matches ? { padding: '30px 0px 30px 0px' } : { padding: '30px' }}>
                    <Box style={matches ? { display: "block" } : { display: "flex" }}>
                        <Avatar style={matches ? avatarStyleSmall : avatarStyleBig} alt={props.entrie.fields.title} src={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' + '&fm=jpg' : 'https://via.placeholder.com/150'} />
                        <Box style={{ width: "100%" }}>

                            <Box style={matches ? { display: 'flex', justifyContent: 'center', flexWrap: 'wrap' } : { display: 'flex' }}>
                                <Typography align="left" variant='h4'>
                                    {props.entrie.fields.title}
                                </Typography>
                                {!props.entrie.fields.down ? <Link
                                    onClick={() => {
                                        ReactGA.event({
                                            category: 'user',
                                            action: 'outbound',
                                            label: props.entrie.fields.title
                                        })
                                    }}

                                    style={matches ? { marginLeft: '5px' } : { marginLeft: "10px" }}
                                    underline='none'
                                    color="textPrimary"

                                    target="_blank"
                                    href={props.entrie.fields.link} >
                                    <LaunchIcon fontSize="small" />
                                </Link> : null}

                            </Box>

                            <Link
                                href={'/?origin=' + props.entrie.fields.origin}
                                color="textPrimary"
                                underline='none'
                                variant="subtitle2"
                            >
                                <Typography align={matches ? "center" : "left"} variant='subtitle2'>{props.entrie.fields.origin}</Typography>
                            </Link>
                            {props.entrie.fields.down ? <Typography style={{ margin: "5px" }} align={matches ? "center" : "left"} color="secondary" variant='subtitle2'>WEBSITE IS DOWN</Typography> : null}

                            {props.entrie.fields.instagram ?
                                <React.Fragment>
                                    <Divider style={{ margin: '10px' }} />
                                    <Link style={matches ? { display: "flex", margin: "10px", justifyContent: "center" } : { display: "flex", marginTop: "20px" }}
                                        target="_blank"
                                        underline='none'
                                        color="textPrimary"
                                        href={'https://www.instagram.com/' + props.entrie.fields.instagram}
                                    >
                                        <InstagramIcon style={{ marginRight: "5px" }} fontSize="small" />
                                        <Typography variant="body2">
                                            {props.entrie.fields.instagram}
                                        </Typography>

                                    </Link>
                                </React.Fragment>
                                : null
                            }
                        </Box>
                        <div style={{ flexGrow: 1, width: "10%" }} />
                        <Box style={{ padding: '5px', width: "100%" }}>
                            <Box display="flex" flexWrap="wrap" justifyContent={matches ? "center" : "space-around"}>
                                {props.entrie.fields.sizes ? props.entrie.fields.sizes.map(tag => (
                                    <Chip
                                        clickable
                                        component="a"
                                        href={'/?sizes=' + tag}
                                        key={tag}
                                        label={tag}
                                        variant="outlined"
                                        style={{ margin: "10px" }}
                                    />
                                )) : null}
                                {props.entrie.fields.tags.map(tag => (
                                    <Chip
                                        clickable
                                        component="a"
                                        variant="outlined"
                                        href={'/?tags=' + tag}
                                        key={tag}
                                        label={tag}
                                        style={{ margin: "10px" }} />
                                ))}

                            </Box>
                        </Box>
                    </Box>

                    <Divider style={{ margin: '10px' }} variant="middle" />
                    <Box style={{ padding: '15px' }}>
                        <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                            {props.entrie.fields.desc}
                        </Typography>

                    </Box>
                    <Divider style={{ margin: '10px' }} variant="middle" />

                    {props.entrie.fields.reviews ? <Reviews reviews={props.entrie.fields.reviews} /> : null}

                    {(props.entrie.stockists.items.length > 0) ? <Stockists stockists={props.entrie.stockists} /> : null}

                    {props.entrie.fields.gallery ? <BrandGallery pics={props.entrie.fields.gallery} /> : null}
                    {props.entrie.fields.instalinks ? <IgGallery brand={props.entrie.fields.title} instalinks={props.entrie.fields.instalinks} /> : null}

                </Paper>
                <Container style={{ margin: '30px auto' }} maxWidth='md'>


                    <Grid container spacing={2} alignItems="flex-end" justify="space-around">

                        {props.randEntries.items.map(entrie => (
                            <Grid item xs={12} sm={4} md={4} lg={4}>
                                <Card>
                                    <CardHeader title={
                                        <div style={{ display: "inline" }}>
                                            <Link
                                                
                                                underline='none'
                                                color="textPrimary"
                                                href={entrie.fields.slug}

                                            >

                                                {entrie.fields.title}
                                            </Link>
                                            {!entrie.fields.down ? <Link
                                                style={{ marginLeft: "10px" }}
                                                underline='none'
                                                color="textPrimary"

                                                target="_blank"
                                                href={entrie.fields.link} >
                                                <LaunchIcon
                                                    onClick={() => {
                                                        ReactGA.event({
                                                            category: 'user',
                                                            action: 'outbound',
                                                            label: entrie.fields.title
                                                        })
                                                    }}

                                                    fontSize="small" />
                                            </Link> : null}
                                        </div>
                                    } />
                                    <CardMedia

                                        title={entrie.fields.title + ' lingerie'}
                                    >
                                        <picture>

                                            <source srcSet={entrie.fields.thumbnail.fields.file.url + '?w=512' + '&h=330' + '&fit=fill' + '&fm=webp'} />
                                            <img style={{ width: '100%' }} src={entrie.fields.thumbnail.fields.file.url + '?w=512' + '&fit=fill' + '&h=330' + '&fm=png'} alt={entrie.fields.title + ' lingerie'} />
                                        </picture>
                                    </CardMedia>
                                </Card>
                            </Grid>
                        ))}

                    </Grid >

                </Container>
                <Footer entries={props.stats} originList={originList} />

            </Container>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    let totEntries = await client.getEntries({
        include: 1,

        'content_type': 'post',
        limit: 0,

    })
    const skipRandom = Math.floor(Math.random() * (totEntries.total - 3));
    const randEntries = await client.getEntries({
        include: 1,
        skip: skipRandom,
        'content_type': 'post',
        limit: 3,

    })

    let entries = await client.getEntries({
        include: 1,
        'fields.slug': context.params.brand,
        'content_type': 'post',
        limit: 1,

    })
    const entrie = entries.items[0] ? entries.items[0] : null


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



    axios.get('http://blog.scaredpanties.com:5005', {
        params: {
            brandname: entrie.fields.title
        }
    })
        .catch(function (error) {
            console.log(error);
        })

    return { props: { entrie: entrie, stats: stats, randEntries: randEntries } }
}

export default Brand