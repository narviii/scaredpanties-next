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
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';

const discount = {
    small: 0.05,
    medium: 0.15,
    large: 0.3
}


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

function SelectDiscount(props) {
    const router = useRouter();
    const handleChange = (event, priceChange) => {

        router.push({
            pathname: router.pathname,
            query: {

                ...router.query, priceChange: priceChange,


            },
        })


    }

    return (
        <ToggleButtonGroup style={{ margin: "5px" }}
            value={router.query.priceChange}
            onChange={handleChange}
            size="large" exclusive
            aria-label="ordering">
            <ToggleButton aria-label=" min 5% " value="small">
                min 5%
            </ToggleButton>
            <ToggleButton aria-label=" min 10% " value="medium">
                min 10%
            </ToggleButton>
            <ToggleButton aria-label=" min 30% " value="large">
                min 30%
            </ToggleButton>
        </ToggleButtonGroup>
    )
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
    const { priceUp, priceDown } = state;

    return (
        <FormControl component="fieldset" >
            <FormHelperText>Select filter</FormHelperText>
            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={priceUp} color="primary" onChange={handleChange} name="priceUp" />}
                    label="Price increased"
                />
                <FormControlLabel
                    control={<Checkbox checked={priceDown} color="primary" onChange={handleChange} name="priceDown" />}
                    label="Price decreased"
                />

            </FormGroup>

        </FormControl>
    )
}

function BrandListSelect(props) {
    const router = useRouter();
    const handleReset = (event) => {
        router.push({
            pathname: router.pathname,
            query: {}
        })
    }
    const handleClick = (brand) => {


        router.push({
            pathname: router.pathname,
            query: {
                ...router.query, brand: brand,limit:20
            },
        })

    };
    //console.log(props.brandListArray)
    return (
        <Container maxWidth='xl' style={{ margin: '30px auto 30px ' }} >
            <Typography align="center" gutterBottom >These brands had updates in last 7 days:</Typography>
            <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                {props.brandListArray.map((elem) => {
                    return (
                        <div key={elem._id} style={{ margin: "10px" }}>
                            <Badge badgeContent={elem.count} color="primary">
                                <Chip color ={(elem._id==router.query.brand)?"primary":"default"} clickable label={elem._id} key={elem._id} onClick={() => handleClick(elem._id)} />
                            </Badge>

                        </div>

                    )

                })}
                <Container style={{ margin: '5px auto', display: "flex" }} maxWidth='xl'>
                    <Button style={{ margin: "auto" }}
                        size="small"
                        onClick={handleReset}
                        variant="contained"
                        color="primary">
                        Reset filter
                                </Button>
                </Container>
            </Box>
        </Container>
    )
}

function PriceTrack(props) {
    let limit
    const handleClick = () => {
        //console.log(router.query.limit)
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

        //console.log(limit)
    }
    ReactGA.pageview('/pricetrack');

    const classes = useStyles();
    const router = useRouter();



    return (
        <React.Fragment>
            <Head>
                <HeadContent
                    description="An automatic tracker for discounts in selected lingerie stores."
                    title="Lingerie price tracker by Scaredpanties."
                    image="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"
                    url="https://catalog.scaredpanties.com"

                />
            </Head>

            <Nav />
            <Hero text="Lingerie discounts live tracker. I scan quite a few lingerie websites for price changes so that you don't have to." />
            <Container maxWidth='lg' style={{ margin: '30px auto 30px ' }} >
                <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                    <SelectEvent />
                    <SelectDiscount />
                </Box>
            </Container>
            <BrandListSelect brandListArray={props.brandListArray} />

            <Container style={{ margin: '30px auto' }} maxWidth='xl'>
                <Grid container spacing={4} alignItems="stretch">
                    {props.history.map(entry => (
                        <Grid item key={entry._id} xs={12} sm={6} md={4} lg={3}>

                            <Card>
                                <Link
                                    target="_blank"
                                    underline='none'
                                    color="textPrimary"
                                    href={entry.productLink}>
                                    <CardMedia className={classes.cardMedia} image={getSmallLink(entry.image)} />
                                </Link>

                                <CardContent >
                                    <Typography variant="caption">
                                        <Link
                                            target="_blank"
                                            underline='none'
                                            color="textPrimary"
                                            href={entry.shopLink}
                                        >
                                            {entry.shopTitle}
                                        </Link>

                                    </Typography>
                                    <Typography gutterBottom>
                                        <Link
                                            target="_blank"
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
                                            <Typography variant="body2">
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
    const eventList = []

    const priceUp = context.query.priceUp ? JSON.parse(context.query.priceUp) : true
    const priceDown = context.query.priceDown ? JSON.parse(context.query.priceDown) : true

    if (priceUp == true) {
        eventList.push('Price increased')
    }

    if (priceDown == true) {
        eventList.push('Price decreased')
    }

    const discountFloat = context.query.priceChange ? discount[context.query.priceChange] : 0.05
    //console.log(discountFloat)

    const brandFilter = context.query.brand

    const { db } = await connectToDatabase();
    if (context.query.limit) {
        limit = parseInt(context.query.limit)
    } else {
        limit = 20
    }

    let brandListAgg =
        [
            {
                '$sort': {
                    '_id': -1
                }
            }, {
                '$match': {
                    '$expr': {
                        '$gt': [
                            '$updatedAt', {
                                '$subtract': [
                                    '$$NOW', 604800000

                                ]
                            }
                        ]
                    }
                }
            }, {
                '$group': {
                    '_id': '$shopTitle',
                    'count': {
                        '$sum': 1
                    }
                }
            }
        ]

    let agg = [
        {
            '$match': {
                'event': {
                    '$in': eventList
                }


            },

        },
        {
            '$match': {
                '$expr': {
                    '$gt': [
                        '$updatedAt', {
                            '$subtract': [
                                '$$NOW', 604800000

                            ]
                        }
                    ]
                }
            }
        },
        {
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
                        }, discountFloat
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

    let aggBrand = [
        {
            '$match': {
                'event': {
                    '$in': eventList
                },
                'shopTitle': brandFilter

            }
        },
        {
            '$match': {
                '$expr': {
                    '$gt': [
                        '$updatedAt', {
                            '$subtract': [
                                '$$NOW', 604800000

                            ]
                        }
                    ]
                }
            }
        },
        {
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
                        }, discountFloat
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
    let aggFin
    //console.log(brandFilter)
    if (brandFilter) {
        aggFin = aggBrand
    } else aggFin = agg

    const brandListArray = await db
        .collection("history")
        .aggregate(brandListAgg)
        .toArray();

    const history = await db
        .collection("history")
        .aggregate(aggFin)
        .toArray();


    //console.log(brandListArray)
    return { props: { stats: stats, brandListArray: JSON.parse(JSON.stringify(brandListArray)), history: JSON.parse(JSON.stringify(history)) } }
}

export default PriceTrack;
