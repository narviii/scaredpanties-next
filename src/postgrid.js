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
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Typography} from '@material-ui/core';
import * as moment from 'moment';
import Favorite from '@material-ui/icons/Favorite';
import ReactGA from 'react-ga';
import Chip from '@material-ui/core/Chip';


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





}))


function PostCard(props) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>

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
                        <Typography display="inline" style={{ float: "right" }} variant="subtitle2" color="textSecondary">
                            {props.entrie.fields.sizes ? props.entrie.fields.sizes.toString() : ""}
                        </Typography>

                    </Box>
                    }

                    action={props.entrie.fields.fav === true ? <Favorite style={{ color: "red", margin: "auto" }} /> : null}
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
                        image={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' : 'https://via.placeholder.com/150'}
                        className={classes.cardMedia}
                    />
                </Link>

                <CardContent>

                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                        {props.entrie.fields.desc}
                    </Typography>
                    <Typography color="textSecondary" align="right" variant="caption" display="block" gutterBottom>
                        {'Last update: ' + moment(props.entrie.sys.updatedAt).fromNow()}
                     </Typography>


                </CardContent>
                
                    <Box display="flex" flexWrap="wrap" justifyContent="left" style={{ margin: "10px" }}>
                        {props.entrie.fields.tags.map(tag => (
                            <Chip key={tag}  label={tag} style={{ margin: "3px" }}/>
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
    let currentTags = router.query.tags ? router.query.tags.split(',') : []
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="stretch">
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
                innerButtonCount={matches ? 1 : 2}
                outerButtonCount={matches ? 1 : 2}
                className={classes.pagination}
                currentPageColor='secondary'
                classes={{
                    rootEnd: classes.rootCurrent,
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