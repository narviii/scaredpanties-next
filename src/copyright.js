import React from 'react'
import {Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';


export function Copyright() {
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
