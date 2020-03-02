import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { Subscribe } from '../src/subscribe'
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube'
import TwitterIcon from '@material-ui/icons/Twitter';





export function SocialLinks(props) {
    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Grid container justify="space-between" alignItems="center" spacing={2}>
                <Grid item>
                    <Button size="large" variant="outlined" color="inherit" href="https://blog.scaredpanties.com" > SCAREDPANTIES BLOG </Button>
                    <Subscribe />
                </Grid>
                <Grid item>
                    {props.search?<Button size="large" variant="outlined" color="inherit" href="/search" > SEARCH CATALOG </Button>:<Button size="large" variant="outlined" color="inherit" href="/" > BACK TO CATALOG </Button>}
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
