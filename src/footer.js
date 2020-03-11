import React from 'react'
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import { Copyright } from '../src/copyright'
import { makeStyles } from '@material-ui/core/styles';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube'
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';


const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(4),
    },

}))


export function Footer(props) {
    const classes = useStyles();
    const fav = <Favorite style={{ color: "red" }} />

    return (
        <div>

            <Container maxWidth="sm" style={{ textAlign: "center" }}>
                <div>
                    <IconButton aria-label="Mail to scaredpanties" href="mailto:scaredpanties@gmail.com">
                        <MailIcon />
                    </IconButton>
                    <IconButton aria-label="Instagramm" href="https://www.instagram.com/scaredpanties/">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton aria-label="Youtube" href="https://www.youtube.com/channel/UCge0-VKn4mfJfGt1ZCMbcpQ?view_as=subscriber">
                        <YouTubeIcon />
                    </IconButton>
                    <IconButton aria-label="Twitter" href="https://twitter.com/scaredpanties">
                        <TwitterIcon />
                    </IconButton>
                </div>

                <Typography variant="subtitle2" color="textSecondary">
                    Currently i have {props.entries.total} lingerie brands in my catalog from {props.originList.length} countries. Come back soon, i will add more!</Typography>
            </Container>

            <footer className={classes.footer} >
                <Container maxWidth="sm">
                    <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
                        Lingerie reviews, advice, and tips with a touch of luxury. Feel free to reach out to me via e-mail scaredpanties@gmail.com.
                </Typography>
                    <Copyright />
                </Container>
            </footer>

        </div>
    )
}