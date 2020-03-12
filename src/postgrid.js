import React from 'react'
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from "material-ui-flat-pagination";
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import * as moment from 'moment';
import Favorite from '@material-ui/icons/Favorite';
import ReactGA from 'react-ga';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton'
import { useContext } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { UserContext, DbContext, UserDocContext } from '../src/context'
import firebase from 'firebase'

const axios = require('axios');


const useStyles = makeStyles(theme => ({
    cardMedia: {

        paddingTop: '75%', // 16:9


    },
    pagination: {
        
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
        padding: "0.7em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    pageRootCurrent: {
        margin: "0.25em",
        padding: "1em",
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





}))


function PostCard(props) {

    function addFav() {
        db.collection('users').doc(user.uid).update({
            favs: firebase.firestore.FieldValue.arrayUnion(props.entrie.sys.id)
        }).then(function () {
            console.log("Document successfully written!");
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    }
    function remFav() {
        db.collection('users').doc(user.uid).update({
            favs: firebase.firestore.FieldValue.arrayRemove(props.entrie.sys.id)
        }).then(function () {
            console.log("Document successfully written!");
        })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    }


    const user = useContext(UserContext);
    const db = useContext(DbContext);
    const userDoc = useContext(UserDocContext);
    let favButton
    const classes = useStyles();
    if (userDoc) {
        
        if (userDoc.data() && userDoc.data().favs && userDoc.data().favs.includes(props.entrie.sys.id)) {
            favButton = (
                <IconButton onClick={remFav}>
                    <Favorite style={{ margin: "auto", fontSize: 30, color: "red" }} />
                </IconButton>
            )
        } else {
            favButton = (
                <IconButton onClick={addFav}>
                    <FavoriteBorderIcon color='disabled' style={{ margin: "auto", fontSize: 30 }} />
                </IconButton>
            )
        }
    } else {
        favButton = (
            <IconButton onClick={props.loginDialogOpen} >
                <FavoriteBorderIcon color='disabled' style={{ margin: "auto", fontSize: 30 }} />
            </IconButton>
        )

    }




    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>

            <Card >
                <CardHeader
                    classes={{
                        action: classes.cardAction
                    }}
                    title={
                        <Link
                            color="textPrimary"
                            href={props.entrie.fields.link}
                            onClick={() => {
                                axios.get('/api/viewcount', {
                                    params: {
                                        brandname: props.entrie.fields.title
                                    }
                                })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                                ReactGA.event({
                                    category: 'user',
                                    action: 'outbound',
                                    label: props.entrie.fields.title
                                })
                            }}

                        >

                            {props.entrie.fields.title}
                        </Link>
                    }
                    subheader={<Box >
                        <Typography display="inline" variant="subtitle2" color="textSecondary">
                            {props.entrie.fields.origin}
                        </Typography>


                    </Box>
                    }

                    action={favButton}
                />
                <Link
                    color="textPrimary"
                    href={props.entrie.fields.link}
                    onClick={() => {
                        ReactGA.event({
                            category: 'user',
                            action: 'outbound',
                            label: props.entrie.fields.title
                        })
                    }}

                >
                    <CardMedia
                        image={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' +'&fm=webp' : 'https://via.placeholder.com/150'}
                        className={classes.cardMedia}
                    >
                    </CardMedia>
                </Link>

                <CardContent>

                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                        {props.entrie.fields.desc}
                    </Typography>
                    <Typography color="textSecondary" align="right" variant="caption" display="block" gutterBottom>
                        {'Last update: ' + moment(props.entrie.sys.updatedAt).fromNow()}
                    </Typography>


                </CardContent>

                <Box display="flex" flexWrap="wrap" justifyContent="left">


                </Box>
                <Box display="flex" flexWrap="wrap" justifyContent="left">
                    {props.entrie.fields.sizes ? props.entrie.fields.sizes.map(tag => (
                        <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                    )) : null}
                    {props.entrie.fields.tags.map(tag => (
                        <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                    ))}
                </Box>





            </Card>

        </Grid>
    )
}



export function PostGrid(props) {



    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const handlePageClick = (offset) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'pagination'
        })

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query, offset: offset

            },
        })

    }

    return (
        <Container maxWidth="xl">
            {props.entries.items.length==0?<Typography align="center" color="textSecondary" style={{margin:"100px"}} variant="h2">such emtpy.... nothing to show!</Typography>:null}
            <Grid container spacing={4} alignItems="stretch">
                {props.entries.items.map(entrie => (
                    <PostCard loginDialogOpen={props.loginDialogOpen} entrie={entrie} key={entrie.fields.title} />
                ))}
            </Grid>
            <Pagination
                limit={12}
                offset={parseInt(router.query.offset)}
                total={props.entries.total}
                onClick={(e, offset) => handlePageClick(offset)}
                size="large"
                innerButtonCount={matches ? 0 : 2}
                outerButtonCount={matches ? 0 : 2}
                className={classes.pagination}
                currentPageColor='secondary'
                classes={{
                    
                    rootCurrent: classes.pageRootCurrent,
                    rootEllipsis: classes.pageRootStandard,
                    rootStandard: classes.pageRootStandard,
                    rootEnd: classes.pageRootStandard,
                    label: classes.pageLabel,
                }}

            />
        </Container>
    )
}
