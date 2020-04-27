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
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { Stockists } from '../../src/stockists'
import ModalImage from "react-modal-image";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import { Nav } from '../../src/nav'



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

    if (!data) return null
    if (data) return (
        <Grid item xs={6} sm={6} md={4} lg={3} key={data.thumbnail_url}>
            <Card>
                <Link
                    color="textPrimary"
                    target="_blank"
                    href={props.link}

                >
                    <CardMedia image={data.thumbnail_url} className={classes.cardMedia} />
                </Link>
            </Card>

        </Grid>
    )
}

function IgGallery(props) {
    const classes = useStyles();




    return (
        <div style={{ margin: '30px 0 30px 0' }}>
            <Typography color="textSecondary" align="center" variant='h5'>Spotted on Instagram</Typography>
            <Box className={classes.root}>

                <Grid container spacing={0} alignItems="stretch">
                    {props.instalinks.map(link => (<GrdTile key={link} link={link} />))}
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
            <Typography color="textSecondary" align="center" variant='h5'>Brand gallery</Typography>
            <Box className={classes.root}>
                <GridList cellHeight={matches ? 'auto' : 400} cols={matches ? 1 : 2}>
                    {props.pics.map(pic => (
                        <GridListTile key={pic.fields.title} cols={pic.fields.file.details.image.width / pic.fields.file.details.image.height > 1 ? 2 : 1}>
                            <ModalImage className={classes.modal}
                                hideDownload
                                small={pic.fields.file.url + '?w=800'}
                                large={pic.fields.file.url}
                                alt={pic.fields.title}
                            />;

                            <GridListTileBar title={pic.fields.title} />
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
        <div>
            <Typography align="center" variant="h5" color="textSecondary">Reviews about the brand products:</Typography>
            <Box style={{padding:'5px'}}>
                {props.reviews.map(review => <Link style={{ padding: '5px',display:"block" }} color="textPrimary" target="_blank" href={review.url}>
                    {review.title}
                </Link>)}
            </Box>
            <Divider style={{ margin: '10px' }} variant="middle" />

        </div>

    )
}


function Brand(props) {
    const avatarStyleBig = { width: '50px', marginRight: "30px", height: '50px' }
    const avatarStyleSmall = { width: '50px', margin: 'auto', height: '50px' }
    const theme = useTheme();
    const matches = useMediaQuery('(max-width:600px)');
    return (
        <React.Fragment>
            <Nav/>

            <Container style={{ margin: '30px auto' }} maxWidth='md'>

                <Paper style={matches ? { padding: '30px 0px 30px 0px' } : { padding: '30px' }}>
                    <Box style={matches ? { display: "block" } : { display: "flex" }}>
                        <Avatar style={matches ? avatarStyleSmall : avatarStyleBig} alt={props.entrie.fields.title} src={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' + '&fm=jpg' : 'https://via.placeholder.com/150'} />
                        <Box style={{width:"100%"}}>
                            <Typography  align={matches ? "center" : "left"} variant='h4'>
                                {props.entrie.fields.title}
                            </Typography>

                            <Typography align={matches ? "center" : "left"} variant='subtitle2'>{props.entrie.fields.origin}</Typography>
                        </Box>

                        <Box style={{ margin: '0px 20px' }}>
                            <Box display="flex" flexWrap="wrap" justifyContent="left">
                                {props.entrie.fields.sizes ? props.entrie.fields.sizes.map(tag => (
                                    <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                                )) : null}
                                {props.entrie.fields.tags.map(tag => (
                                    <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                                ))}

                            </Box>
                        </Box>
                    </Box>

                    <Divider style={{ margin: '10px' }} variant="middle" />
                    <Box style={{ padding: '10px' }}>
                        <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                            {props.entrie.fields.desc}
                        </Typography>

                    </Box>
                    <Divider style={{ margin: '10px' }} variant="middle" />

                    {props.entrie.fields.reviews?<Reviews reviews={props.entrie.fields.reviews} />:null}

                    {(props.entrie.stockists.items.length > 0) ? <Stockists stockists={props.entrie.stockists} /> : <Divider style={{ margin: '10px' }} variant="middle" />}

                    {props.entrie.fields.gallery?<BrandGallery pics={props.entrie.fields.gallery} />:null}
                    {props.entrie.fields.instalinks?<IgGallery instalinks={props.entrie.fields.instalinks} />:null}

                </Paper>
                <Footer entries={props.stats} originList={originList} />

            </Container>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    //console.log(context.params)
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


    return { props: { entrie: entrie,stats:stats } }
}

export default Brand