import React from 'react'
import { client } from '../src/contentful'
import ReactGA from '../src/reactga'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Footer } from '../src/footer';
import { originList, tagList, sizeList } from '../src/constants'
import { Hero } from '../src/hero'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'





function StockCard(props) {
    console.log(props.entrie)

    const brands = props.entrie.fields.brands.map(item => (
        <Chip style={{ margin: '10px 20px' }}
            
            label={item.fields.title}/>
        
    ))



    return (
        <Grid item xs={12}>

            <Card style={{height:'100%'}}>
                <CardHeader
                    title={props.entrie.fields.name}
                    subheader={props.entrie.fields.country}
                    action={props.entrie.fields.format}
                />

                <CardContent>
                    <Box style={{ display: 'flex', flexDirection: 'row',flexWrap: 'wrap', margin: '10px auto' }}>
                        {brands}
                    </Box>

                </CardContent>
            </Card>


        </Grid>
    )
}

function Stockists(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Hero search={false} />
            <Container style={{ margin: '30px auto' }} maxWidth='lg'>
                <Grid direction="row" container spacing={4}>
                    {props.entries.items.map(entrie => (
                        <StockCard entrie={entrie} />
                    ))}
                </Grid>
            </Container>

            <Footer entries={props.stats} originList={originList} />

        </React.Fragment>
    )
}



export async function getServerSideProps(context) {
    let entries = await client.getEntries({
        include: 1,
        'content_type': 'stockist',

    })

    const stats = await client.getEntries({
        limit: 1
    })

    


    return { props: { entries: entries, stats: stats } }
}

export default Stockists;