import React from 'react'
import ReactGA from '../src/reactga'
import { Footer } from '../src/footer';
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
import { Nav } from '../src/nav'
import Head from 'next/head'
import { HeadContent } from '../src/headcontent'
import { originList, tagList, sizeList } from '../src/constants'
import { client } from '../src/contentful'
import { connectToDatabase } from '../src/mongodb'
import { makeStyles } from '@material-ui/core/styles';
const url = require('url');
import LaunchIcon from '@material-ui/icons/Launch';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Divider from '@material-ui/core/Divider';
import * as moment from 'moment';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';




const useStyles = makeStyles(theme => ({
    cardMedia: {

        height: 0,
        paddingTop: '56.25%', // 16:9


    }
}))

const getSmallLink = (link) => {
    if (link) {
        let myLink = link.split('?')[0];
        myLink = myLink.replace('.jpg', '_1024x768.jpg')
        myLink = myLink.replace('.png', '_1024x768.png')
        return myLink
    } else return null



}

function SelectEvent(props) {
    const router = useRouter();
    const classes = useStyles();
    const [state, setState] = React.useState({
        priceUp: true,
        priceDown: true,

    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query, [event.target.name]: event.target.checked
            },
        })
    };
    const { priceUp, priceDown} = state;

    return(
        <FormControl component="fieldset" >
            <FormHelperText>Select filter</FormHelperText>
        <FormGroup row>
          <FormControlLabel 
            control={<Checkbox checked={priceUp} color="primary" onChange={handleChange} name="priceUp" />}
            label="price increased"
          />
          <FormControlLabel
            control={<Checkbox checked={priceDown} color="primary" onChange={handleChange} name="priceDown" />}
            label="Price decreased"
          />
          
        </FormGroup>
        
      </FormControl>
    )
}

function PriceTrack(props) {
    let limit
    const handleClick = () => {
        console.log(router.query.limit)
        if (!router.query.limit) {
            limit = 20
        } else {
            limit = parseInt(router.query.limit)
        }
        limit += 20

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query, limit: limit

            },
        })

        console.log(limit)
    }
    ReactGA.pageview('/pricetrack');

    const classes = useStyles();
    const router = useRouter();



    return (
        <React.Fragment>
            <Head>
                <HeadContent
                    description="Lingerie price tracker"
                    title="Lingerie price tracker"
                    image="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"
                    url="https://catalog.scaredpanties.com"

                />
            </Head>

            <Nav />
            <Hero />
            <Container maxWidth='lg' style={{ margin: '30px auto 30px ' }} >
                <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                    <SelectEvent/>
                </Box>
            </Container>
            <Container style={{ margin: '30px auto' }} maxWidth='xl'>
                <Grid container spacing={4} alignItems="stretch">
                    {props.history.map(entry => (
                        <Grid item key={entry._id} xs={12} sm={6} md={4} lg={3}>

                            <Card>

                                <CardMedia
                                    className={classes.cardMedia}
                                    image={getSmallLink(entry.image)} />
                                <CardContent >
                                    <Typography variant="caption">
                                        <Link
                                            underline='none'
                                            color="textPrimary"
                                            href={entry.shopLink}
                                        >
                                            {entry.shopTitle}
                                        </Link>

                                    </Typography>
                                    <Typography gutterBottom>
                                        <Link
                                            underline='none'
                                            color="textPrimary"
                                            href={entry.productLink}
                                        >
                                            {entry.productTitle}
                                        </Link>

                                    </Typography>
                                    <Divider style={{ margin: "5px" }} />

                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item xs={1}>
                                            {(entry.event == "Price increased") ? <ArrowUpwardIcon style={{ color: "red" }} /> : <ArrowDownwardIcon style={{ color: "green" }} />}

                                        </Grid>
                                        <Grid item container direction="column" spacing={0} xs={6}>
                                            <Grid item>

                                                <Typography variant="body2">
                                                    {entry.event.toLowerCase()}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption">
                                                    {(entry.gain * 100).toFixed(2) + "%"}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption">
                                                    {moment(entry.updatedAt).fromNow()}
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="body">
                                                {"from " + entry.oldPrice + " to " + entry.newPrice}
                                            </Typography>

                                        </Grid>

                                    </Grid>

                                </CardContent>

                            </Card>

                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container style={{ margin: '30px auto', display: "flex" }} maxWidth='xl'>
                <Button style={{ margin: "auto" }}
                    size="large"
                    onClick={handleClick}
                    variant="contained"
                    color="primary">
                    Load more
                 </Button>
            </Container>

            <Footer entries={props.stats} originList={originList} />

        </React.Fragment>
    )
}

export async function getServerSideProps(context) {
    const stats = await client.getEntries({
        limit: 1
    })
    let limit = 20
    const eventList=[]

    const priceUp = context.query.priceUp?JSON.parse(context.query.priceUp):true
    const priceDown = context.query.priceDown?JSON.parse(context.query.priceDown):true
    
    if (priceUp==true){
        eventList.push('Price increased')
    }

    if (priceDown==true){
        eventList.push('Price decreased')
    }



    const { db } = await connectToDatabase();
    if (context.query.limit) {
        limit = parseInt(context.query.limit)
    } else {
        limit = 20
    }

    let agg = [
        {
            '$match': {
                'event': {
                    '$in': eventList
                }
            }
        }, {
            '$addFields': {
                'oldPriceDouble': {
                    '$convert': {
                        'input': '$oldPrice',
                        'to': 'double'
                    }
                },
                'newPriceDouble': {
                    '$convert': {
                        'input': '$newPrice',
                        'to': 'double'
                    }
                }
            }
        }, {
            '$match': {
                '$expr': {
                    '$gt': [
                        '$oldPriceDouble', 0
                    ]
                }
            }
        }, {
            '$addFields': {
                'gain': {
                    '$divide': [
                        {
                            '$subtract': [
                                '$newPriceDouble', '$oldPriceDouble'
                            ]
                        }, '$oldPriceDouble'
                    ]
                }
            }
        }, {
            '$match': {
                '$expr': {
                    '$gt': [
                        {
                            '$abs': '$gain'
                        }, 0.01
                    ]
                }
            }
        }, {
            '$sort': {
                '_id': -1
            }
        }, {
            '$limit': limit
        }
    ]

    //console.log(agg)

    const history = await db
        .collection("history")
        .aggregate(agg)
        .toArray();


    //console.log(history.length)
    return { props: { stats: stats, history: JSON.parse(JSON.stringify(history)) } }
}

export default PriceTrack;
