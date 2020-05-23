import React from 'react'
import { useRouter } from 'next/router';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from "material-ui-flat-pagination";
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
import { UserContext, DbContext, UserDocContext, LoginDialogContext } from '../src/context'
import LaunchIcon from '@material-ui/icons/Launch';
import firebase from 'firebase'
import InstagramIcon from '@material-ui/icons/Instagram';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    cardMedia: {

        maxWidth: '100%',
        height: 'auto'


    },
    pagination: {

        paddingTop: '3em',
        paddingBottom: '3em',
        textAlign: 'center'
    },
    pageLabel: {

        [theme.breakpoints.up('md')]: {
            paddingLeft: '1em',
            paddingRight: '1em'

        },
        paddingLeft: '0.15em',
        paddingRight: '0.15em'


    },
    pageRootStandard: {

        margin: "0.2em",
        padding: "0.6em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    pageRootCurrent: {
        margin: "0.15em",
        padding: "0.6em",
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

    chip: {
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '& > *': {
            margin: "0 10px 0px 10px",
        },
    },




}))


function InstalinkChip(props) {

    if (props.instalinks) {
        return (

            <Chip
                size="small"
                style={{ margin: "5px" }}
                icon={<InstagramIcon />}
                label={props.instalinks.length} />

        )
    } else return null

}

function ReviewChip(props) {
    if (props.reviews) {
        return (

            <Chip
                size="small"
                style={{ margin: "5px" }}
                icon={<RateReviewIcon />}
                label={props.reviews.length} />


        )
    } else return null
}

function StockistsChip(props) {
    if (props.stockists.total > 0) {
        return (

            <Chip
                size="small"
                style={{ margin: "5px" }}
                icon={<ShoppingCartIcon />}
                label={props.stockists.items.length} />


        )
    } else return null
}


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

    const test = useContext(LoginDialogContext);
    const open = test.loginDialogOpen
    const setOpen = test.setLoginDialogOpen

    const loginDialogOpen = () => {
        ReactGA.event({ category: 'user', action: 'auth', label: 'loginDialog' })
        setOpen(true)
    }



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
            <IconButton onClick={loginDialogOpen} >
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
                        <div style={{ display: "inline" }}>
                            <Link
                                underline='none'
                                color="textPrimary"
                                href={'brands/' + props.entrie.fields.slug}

                            >

                                {props.entrie.fields.title}
                            </Link>
                            <Link
                                style={{ marginLeft: "10px" }}
                                underline='none'
                                color="textPrimary"
                                href={'brands/' + props.entrie.fields.slug}
                                target="_blank"
                                href={props.entrie.fields.link} >
                                <LaunchIcon
                                    onClick={() => {
                                        ReactGA.event({
                                            category: 'user',
                                            action: 'outbound',
                                            label: props.entrie.fields.title
                                        })
                                    }}

                                    fontSize="small" />
                            </Link>
                        </div>
                    }
                    subheader={


                        <Chip

                            clickable
                            size="small"
                            component="a"
                            href={'/?origin=' + props.entrie.fields.origin}
                            variant="outlined"
                            label={props.entrie.fields.origin}
                        />



                    }

                    action={favButton}
                />
                <Link
                    color="textPrimary"
                    
                    href={'brands/' + props.entrie.fields.slug}
                    onClick={() => {
                        ReactGA.event({
                            category: 'user',
                            action: 'outbound',
                            label: props.entrie.fields.title
                        })
                    }}

                >
                    <CardMedia
                        
                        title={props.entrie.fields.title + ' lingerie'}
                    >
                        <picture>

                            <source srcSet={props.entrie.fields.thumbnail.fields.file.url + '?w=512' + '&h=330' + '&fit=fill' + '&fm=webp'} />
                            <img  style={{width:'100%'}} src={props.entrie.fields.thumbnail.fields.file.url + '?w=512'+'&fit=fill' + '&h=330' + '&fm=png'} alt={props.entrie.fields.title + ' lingerie'} />
                        </picture>
                    </CardMedia>
                </Link>

                <CardContent>

                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                        {props.entrie.fields.desc}
                    </Typography>



                    <Grid container spacing={1} alignItems="stretch">
                        <Grid item xs={6}>
                            <InstalinkChip style={{ marginLeft: "5px" }} instalinks={props.entrie.fields.instalinks} />
                            <ReviewChip style={{ marginLeft: "5px" }} reviews={props.entrie.fields.reviews} />
                            <StockistsChip style={{ marginLeft: "5px" }} stockists={props.entrie.stockists} />
                        </Grid>




                        <Grid item xs={6}>
                            <Typography align="right" color="textSecondary" variant="caption" display="block" gutterBottom>
                                {'Updated: ' + moment(props.entrie.sys.updatedAt).fromNow()}
                            </Typography>
                            <Typography align="right" color="textSecondary" variant="caption" display="block" gutterBottom>
                                {'Added: ' + moment(props.entrie.sys.createdAt).fromNow()}
                            </Typography>
                        </Grid>
                    </Grid>








                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {props.entrie.fields.sizes ? props.entrie.fields.sizes.map(tag => (
                            <Chip
                                clickable
                                component="a"
                                href={'/?sizes=' + tag}
                                key={tag}
                                label={tag}
                                variant="outlined"
                                style={{ margin: "5px" }} />
                        )) : null}
                    </Box>
                    <Box display="flex" flexWrap="wrap" justifyContent="center">
                        {props.entrie.fields.tags.map(tag => (
                            <Chip
                                clickable
                                component="a"
                                href={'/?tags=' + tag}
                                key={tag}
                                label={tag}
                                variant="outlined"
                                style={{ margin: "5px" }} />
                        ))}
                    </Box>



                </CardContent>





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
            {props.entries.items.length == 0 ? <Typography align="center" color="textSecondary" style={{ margin: "100px" }} variant="h2">such emtpy.... nothing to show!</Typography> : null}
            <Grid container spacing={2} alignItems="stretch">
                {props.entries.items.map(entrie => (
                    <PostCard entrie={entrie} key={entrie.fields.title} />
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
