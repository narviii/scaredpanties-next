import React from 'react'
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import {Copyright} from '../src/copyright'
import {makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    footer: {
        padding: theme.spacing(4),
    },

}))


export function Footer(props) {
    const classes=useStyles();
    return (
        <div>
            <Container maxWidth="sm" style={{ textAlign: "center" }}>
                <Favorite style={{ color: "red" }} />
                <Typography variant="subtitle2" color="textSecondary">

                    This sign means the brand is my favorite! Currently i have {props.entries.total} lingerie brands in my catalog from {props.originList.length} countries. Come back soon, i will add more!</Typography>
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