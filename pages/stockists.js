import React from 'react'
import { client } from '../src/contentful'
import ReactGA from '../src/reactga'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Footer } from '../src/footer';
import { originList, tagList, sizeList } from '../src/constants'
import { Hero } from '../src/hero'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import LaunchIcon from '@material-ui/icons/Launch';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Nav } from '../src/nav'

import Head from 'next/head'
import { HeadContent } from '../src/headcontent'






function StockCard(props) {
    const matches = useMediaQuery('(max-width:600px)');


    const brands = props.entrie.fields.brands.map(value => (

        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography>{value.fields.title}</Typography>
        </Grid>

    ))



    return (
        <Grid item xs={12}>

            <Paper style={{ padding: '30px', height: '100%' }}>

                <Box style={matches ? { display: "block" } : { display: "flex" }}>
                    <Box style={{ width: '100%' }}>
                        <div style={matches ? { display: 'flex', justifyContent: 'center' } : { display: 'flex' }}>
                            <Typography align={matches ? "center" : "left"} variant='h4'>
                                {props.entrie.fields.name}
                            </Typography>
                            <Link
                                onClick={() => {
                                    ReactGA.event({
                                        category: 'user',
                                        action: 'outbound',
                                        label: props.entrie.fields.name
                                    })
                                }}

                                style={{ marginLeft: "10px" }}
                                underline='none'
                                color="textPrimary"

                                target="_blank"
                                href={props.entrie.fields.link} >
                                <LaunchIcon fontSize="small" />
                            </Link>
                        </div>

                        <Typography align={matches ? "center" : "left"} variant='subtitle2'>
                            {props.entrie.fields.country}
                        </Typography>
                    </Box>


                    <Box style={matches ? { justifyContent: 'center', flexDirection: 'row', display: 'flex', marginTop: '20px' } : { display: 'flex', flexDirection: 'row' }}>

                        {props.entrie.fields.format.map(item => <Chip style={{ margin: '0px 10px 0px 10px' }} label={item} />)}
                    </Box>
                </Box>

                <Typography style={{ margin: '30px' }} variant="h5" align="center">Brands</Typography>
                <Grid style={{ marginTop: "30px" }} container spacing={4} alignItems="stretch">
                    {props.entrie.fields.brands.map(brand => (
                        <Grid style={{ display: "flex" }} item xs={12} sm={6} md={4} lg={3}>
                            <Link
                                href={'brands/' + brand.fields.slug}
                                underline='none'
                                color="textPrimary"
                            >
                                <Typography>{brand.fields.title}</Typography>

                            </Link>
                            <Link href={brand.fields.link}
                                color="textPrimary"
                                target="_blank"
                            >
                                <LaunchIcon style={{ marginLeft: "5px" }} fontSize="small" />
                            </Link>
                        </Grid>
                    ))}
                </Grid>

            </Paper>


        </Grid>
    )
}

function Stockists(props) {
    ReactGA.pageview('/stockists');

    return (
        <React.Fragment>
            <Head>
                <HeadContent
                    description="A list of stockists and brands they carry assembled by scaredpantie's"
                    title="List of stockists at scaredpantie's lingerie brand catalog."
                    image="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"
                    url="https://catalog.scaredpanties.com"

                />
            </Head>

            <Nav />
            <Hero />
            <Container style={{ margin: '30px auto' }} maxWidth='lg'>
                <Grid direction="row" container spacing={4}>
                    {props.entries.items.map(entrie => (
                        <StockCard entrie={entrie} />
                    ))}
                </Grid>
            </Container>

            <Footer entries={props.stats} originList={originList} />

        </React.Fragment>
    )
}



export async function getServerSideProps(context) {
    let entries = await client.getEntries({
        include: 1,
        'content_type': 'stockist',

    })

    const stats = await client.getEntries({
        limit: 1
    })




    return { props: { entries: entries, stats: stats } }
}

export default Stockists;