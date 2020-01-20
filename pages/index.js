const contentful = require('contentful')
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube'
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Pagination from "material-ui-flat-pagination";
import { useState } from 'react';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { flexbox } from '@material-ui/system';
import Favorite from '@material-ui/icons/Favorite';
import ReactGA from 'react-ga';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const originList = [
    "All",
    "France",
    "USA",
    "UK",
    "Australia",
    "Japan",
    "Latvia",
    "Spain",
    "Germany",
    "Thailand",
    "Ukraine",
    "Poland",
    "Russia",
    "New Zealand",
    "Canada",
    "Italy",
    "Switzerland",
    "Belgium",
    "Portugal",
    "Bulgaria",
    "Turkey",
    "Belarus",
    "Denmark",
    "Hungary",
    "Austria",
    "Estonia",
    "Norway",
    "Israel",
    "Netherlands",
    "Romania",
    "Mexico",
    "Slovenia",
    "China",
    "Sweden",
    "Colombia",
    "Chile"
]

const tagList = [
    "All",
    "Swimwear",
    "Lingerie",
    "Clothes",
    "Lounge",
    "Corsets",
    "Accessories",
    "Hosiery",
    "BDSM",
    "Men",
    "Shapewear",
    "Dress Up",
    "Sport"
]

const sizeList = [
    "All",
    "Tailored",
    "Small cup",
    "Large cup"
]

const client = contentful.createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})

//UA-39274880-3 prod
//UA-39274880-4 dev

function initializeReactGAmain() {
    ReactGA.initialize('UA-39274880-4');
    
}

initializeReactGAmain()

const useStyles = makeStyles(theme => ({
    heroContent: {
        backgroundImage: "url(" + "https://blog.scaredpanties.com/content/images/size/w2000/2019/06/B0010006_extended2.jpg" + ")",
        width: '100%',
        height: ' 100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: theme.spacing(10, 0, 10),
    },
    cardMedia: {

        paddingTop: '75%', // 16:9


    },
    footer: {

        padding: theme.spacing(6),
    },
    pagination: {
        marginLeft:"-50px",
        marginRight:"-50px",
        paddingTop: '3em',
        paddingBottom: '3em',
        textAlign: 'center'
    },
    pageLabel: {
        paddingLeft: '1em',
        paddingRight: '1em'


    },
    pageRootStandard: {
        margin: "0.25em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
    },
    pageRootCurrent: {
        margin: "0.25em",
        backgroundColor: '#393942',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://blog.scaredpanties.com/">
                scaredpanties
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function SocialLinks() {
    return (
        <Container maxWidth="md">
            <Grid container justify="space-between" alignItems="center" spacing={2}>
                <Grid item>
                    <Button variant="outlined" color="primary" href="https://blog.scaredpanties.com" > BLOG </Button>
                </Grid>
                <Grid item>
                    <IconButton color="primary" aria-label="Mail to scaredpanties" href="mailto:scaredpanties@gmail.com">
                        <MailIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Instagramm" href="https://www.instagram.com/scaredpanties/">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Youtube" href="https://www.youtube.com/channel/UCge0-VKn4mfJfGt1ZCMbcpQ?view_as=subscriber">
                        <YouTubeIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Twitter" href="https://twitter.com/scaredpanties">
                        <TwitterIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    )
}

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
                    subheader={<Typography variant="subtitle2" color="textSecondary">{props.entrie.fields.origin}</Typography>}

                    action={props.entrie.fields.fav === true ? <Favorite style={{ color: "red", margin: "auto" }} /> : null}
                />

                <CardMedia
                    
                    image={props.entrie.fields.thumbnail?props.entrie.fields.thumbnail.fields.file.url:'https://via.placeholder.com/150'}
                    className={classes.cardMedia}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                        {props.entrie.fields.desc}
                    </Typography>

                    <Box display="flex" flexWrap="wrap" justifyContent="space-around" style={{ marginTop: "5px" }}>
                        {props.entrie.fields.tags.map(tag => (
                            <Typography key={tag} color="textSecondary" style={{ margin: "3px" }} variant="subtitle2">{tag}</Typography>
                        ))}
                    </Box>

                </CardContent>

            </Card>
        </Grid>
    )
}


function PostGrid(props) {
    const classes = useStyles();
    const router = useRouter();
    const theme = useTheme();
    let currentTags = router.query.tags ? router.query.tags.split(',') : []
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    console.log(matches)
    const handlePageClick = (offset) => {
        router.push({
            pathname: '/',
            query: {
                sizes: router.query.sizes,
                origin: router.query.origin,
                tags: router.query.tags,
                offset: offset,

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
                innerButtonCount={matches?-1:1}
                outerButtonCount={matches?-1:1}
                className={classes.pagination}
                currentPageColor='secondary'
                classes={{
                    rootEnd: classes.rootCurrent,
                    rootCurrent: classes.pageRootCurrent,
                    rootEllipsis: classes.pageRootStandard,
                    rootStandard: classes.pageRootStandard,
                    label: classes.pageLabel, // class name, e.g. `classes-nesting-label-x`
                }}

            />
        </Container>
    )
}

function SelectOrigin(props) {
    const classes = useStyles();
    const router = useRouter();
    const handleChange = (event) => {
        router.push({
            pathname: '/',
            query: {
                tags: router.query.tags,
                sizes: router.query.sizes,
                origin: event.target.value,
            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="origin-select">Country of origin</InputLabel>
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
        router.push({
            pathname: '/',
            query: {
                origin: router.query.origin,
                sizes: router.query.sizes,
                tags: event.target.value,
            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="tag-select">Brand tags</InputLabel>
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
        router.push({
            pathname: '/',
            query: {
                origin: router.query.origin,
                tags: router.query.tags,
                sizes: event.target.value,
            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="size-select">Sizes available</InputLabel>
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

function MainPage(props) {
    const classes = useStyles();
    const router = useRouter();
    
    
    ReactGA.pageview(router.asPath);
    const handleClick1 = (event) => {
        let currentTags = router.query.tags.split(',')
        currentTags.push('Clothes')
        router.push({
            pathname: '/',
            query: { tags: currentTags.toString() },
        })
    }

    return (

        <React.Fragment>
            <CssBaseline />
            <div className={classes.heroContent}>
                <Container maxWidth="xl" >
                    <Typography variant="h1" align="center"> scaredpanties</Typography>
                    <Container maxWidth="xs">
                    <Typography variant="h6" align="center" color="textSecondary" className={classes.heroTypography} paragraph>
                        a handpicked and lovely curated lingerie brands catalog
                    </Typography>
                    </Container>
                </Container>
            </div>
            <SocialLinks />
            <Container maxWidth='lg' style={{ marginTop: "10px", marginBottom: "20px" }} >
                <Box justifyContent="center" display="flex" flexWrap="wrap">
                    <SelectOrigin />
                    <SelectTags />
                    <SelectSize />
                </Box>

            </Container>
            <PostGrid entries={props.entries} />
            <Container maxWidth="md" style={{ textAlign: "center" }}>
                <Typography variant="subtitle2" color="textSecondary">Currently i have {props.entries.total} lingerie brands in my catalog from {originList.length} countries. Come back soon, i will add more!</Typography>
            </Container>

            <footer className={classes.footer} >
                <Container maxWidth="sm">
                    <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
                        Lingerie reviews, advice, and tips with a touch of luxury. Feel free to reach out to me via e-mail scaredpanties@gmail.com.
                </Typography>
                    <Copyright />
                </Container>
            </footer>

        </React.Fragment>

    );

}

MainPage.getInitialProps = async (context) => {
    const entries = await client.getEntries({
        include:1,
        'fields.tags[all]': (context.query.tags == 'All' || context.query.tags === '') ? undefined : context.query.tags,
        'fields.origin': (context.query.origin === 'All' || context.query.origin === '') ? undefined : context.query.origin,
        'fields.sizes': (context.query.sizes != 'All') ? context.query.sizes : undefined,
        'content_type': 'post',
        limit: 12,
        skip: parseInt(context.query.offset) ? parseInt(context.query.offset) : 0
    })
    //console.log(entries.items)
    
    return { entries: entries }
}


export default MainPage;