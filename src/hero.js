import React, { Children } from 'react';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import {SocialLinks} from '../src/sociallinks'
import {makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


const useStyles=makeStyles(theme=>({
    heroContent: {
        backgroundImage: "url(" + "https://blog.scaredpanties.com/content/images/size/w2000/2019/06/B0010006_extended2.jpg" + ")",
        width: '100%',
        height: ' 100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: theme.spacing(0.5, 0, 0.5),
        
    },

}))

export function Hero(props) {
    const classes = useStyles();
    return (
        <div>
            {props.children}
            <div className={classes.heroContent}>
                <Container maxWidth="xl" >
                    <Link color="textPrimary" underline='none' href="/">
                        <Typography variant="h1" align="center"> scaredpanties</Typography>
                    </Link>
                    <Container maxWidth="sm">
                        <Typography variant="h6" align="center" color="textSecondary" className={classes.heroTypography} paragraph>
                       {props.text}
                </Typography>
                    </Container>
                </Container>
            </div>
        </div>
    )

}