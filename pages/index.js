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
import MailchimpSubscribe from "react-mailchimp-subscribe"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const url = "https://scaredpanties.us20.list-manage.com/subscribe/post?u=65173dffd9ab714c0d2d985ab&amp;id=ed2dc9ceb2";


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

originList.sort()
tagList.sort()
tagList.unshift("All")

const client = contentful.createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})

//UA-39274880-3 prod
//UA-39274880-4 dev

function initializeReactGAmain() {
    ReactGA.initialize('UA-39274880-3');

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

        padding: theme.spacing(4),
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
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Grid container justify="space-between" alignItems="center" spacing={2}>
                <Grid item>
                    <Button size="large" variant="outlined" color="inherit" href="https://blog.scaredpanties.com" > BLOG </Button>
                    <Button style={{marginLeft:"30px"}}size="large" variant="outlined" color="primary" href="#subscribe" > SUBSCRIBE </Button>
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

                <CardMedia

                    image={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url : 'https://via.placeholder.com/150'}
                    className={classes.cardMedia}
                />


                <CardContent>

                    <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                        {props.entrie.fields.desc}
                    </Typography>


                </CardContent>
                <CardActionArea>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-around" style={{ marginTop: "5px" }}>
                        {props.entrie.fields.tags.map(tag => (
                            <Typography key={tag} color="textSecondary" style={{ margin: "3px" }} variant="subtitle2">{tag}</Typography>
                        ))}
                    </Box>

                </CardActionArea>



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

    const handlePageClick = (offset) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'pagination'
        })
        router.push({
            pathname: '/',
            query: {
                ...router.query,offset:offset

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
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'origin'
        })
        router.push({
            pathname: '/',
            query: {
                
                ...router.query,
                origin: event.target.value,
                offset:0
                
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
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'tags'
        })
        router.push({
            pathname: '/',
            query: {
                
                ...router.query,
                tags:event.target.value,
                offset:0
                
            },
        })
    }
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="tag-select">Products</InputLabel>
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
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'size'
        })
        router.push({
            pathname: '/',
            query: {
                
                ...router.query,
                sizes:event.target.value,
                offset:0
                
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

function OrderSelector(props) {
    const router = useRouter();
    const handleChange = (event,order) => {
        ReactGA.event({
            category: 'user',
            action: 'navigation',
            label: 'order'
        })
        router.push({
            pathname: '/',
            query: {
                
                ...router.query,order:order,
               
               
            },
        })
        
        
    }

    return (
        <ToggleButtonGroup style={{margin:"auto"}}
            value={(!router.query.order)?"newest":router.query.order} 
            onChange={handleChange}
            size="large" exclusive 
            aria-label="ordering">
            <ToggleButton aria-label="newest" value="newest">
               Newest
            </ToggleButton>
            <ToggleButton aria-label="alphabet" value="alphabet">
                Alphabet
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

function MainPage(props) {
    const classes = useStyles();
    const router = useRouter();

    

    ReactGA.pageview('/catalog');
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
                <Box justifyContent="center" alignContent="center" display="flex" flexWrap="wrap">
                    <SelectOrigin />
                    <SelectTags />
                    <SelectSize />
                    <OrderSelector />
                </Box>

            </Container>
            <PostGrid entries={props.entries} />
            <Container maxWidth="sm" style={{ textAlign: "center" }}>
                <Favorite style={{ color: "red" }} />
                <Typography variant="subtitle2" color="textSecondary">

                    This sign means the brand is my favorite! Currently i have {props.entries.total} lingerie brands in my catalog from {originList.length} countries. Come back soon, i will add more!</Typography>
            </Container>
            <Container id="subscribe" maxWidth="sm" align="center" className={classes.ms} justify="center"  >
                <Typography gutterBottom variant="h6">subscribe to scaredpanties updates:</Typography>
                <MailchimpSubscribe url={url} />
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
        include: 1,
        order: (context.query.order == 'alphabet' ? 'fields.title' : 'sys.updatedAt'),
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