import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import React from 'react'
import ReactGA from '../src/reactga'
import Grid from '@material-ui/core/Grid'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';





export function Stockists(props) {
    const stockists = props.stockists.items.map(item => (
        <Grid item key={item.fields.name} item xs={6} sm={6} md={4} lg={3}>
            <Link align="center" target="_blank"
                onClick={() => {
                    ReactGA.event({
                        category: 'user',
                        action: 'outbound:stockist',
                        label: item.fields.name
                    })
                }}
                key={item.fields.name} color="textPrimary" href={item.fields.link}>{item.fields.name}</Link>
        </Grid>
    ))
    return (
        <div style={{ margin: '30px 0px 30px 0px' }}>

            <Box style={{}}>
                <Box style={{display:"flex",justifyContent:"center"}}>
                    <ShoppingCartIcon style={{marginRight:'5px'}}/>
                    <Typography align="center" variant="h5" color="textSecondary">Buy it from these stockists</Typography>
                </Box>

                <Grid container alignItems="stretch" spacing={1} style={{ padding: '15px' }}>
                    {stockists}
                </Grid>
            </Box>
            <Divider style={{ margin: '10px' }} variant="middle" />

        </div>
    )
}
