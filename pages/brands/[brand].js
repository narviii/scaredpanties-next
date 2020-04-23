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
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios'
import useSWR from 'swr'
import fetch from 'unfetch'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';


const fetcher = url => fetch(url).then(r => r.json())


const useStyles = makeStyles((theme) => ({
    cardMedia: {

       paddingTop:'75%'


    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding:'10px',
        backgroundColor: theme.palette.background.paper,
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
    if (data) console.log(data)
    //    <img src={data.thumbnail_url} alt={data.title} />

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
        <div>
            <Typography variant='subtitle2'>Spotted on Instagram</Typography>
            <Box className={classes.root}>

                <Grid container spacing={0} alignItems="stretch">
                    {props.instalinks.map(link => (<GrdTile link={link} />))}
                </Grid>

            </Box>
        </div>
    )
}


function Brand(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container style={{ margin: '30px auto' }} maxWidth='md'>
                <Paper style={{ padding: '20px' }}>
                    <Box style={{ display: 'flex' }}>
                        <Avatar style={{ width: '50px', height: '50px' }} alt={props.entrie.fields.title} src={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' + '&fm=jpg' : 'https://via.placeholder.com/150'} />
                        <Box style={{ margin: '0px 20px 0px 20px' }}>
                            <Typography variant='h6'>
                                {props.entrie.fields.title}
                            </Typography>
                            <Typography variant='subtitle2'>{props.entrie.fields.origin}</Typography>
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
                    <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                            {props.entrie.fields.desc}
                        </Typography>

                    </Box>
                    <Divider style={{ margin: '10px' }} variant="middle" />

                    <IgGallery instalinks={props.entrie.fields.instalinks} />
                </Paper>
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


    // let links = await axios.all(entrie.fields.instalinks.map(link=>axios.get(`https://api.instagram.com/oembed?url=`+ link)))

    //entrie.links=links.map(links=>links.data)

    return { props: { entrie: entrie } }
}

export default Brand