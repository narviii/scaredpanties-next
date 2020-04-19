import React from 'react'
import { client } from '../../src/contentful'
import ReactGA from '../../src/reactga'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Footer } from '../../src/footer';
import { originList, tagList, sizeList } from '../../src/constants'
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'



function Brand(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container style={{ margin: '30px auto' }} maxWidth='md'>
                <Paper style={{ padding: '20px' }}>
                    <Box style={{ display: 'flex' }}>
                        <Avatar style={{ width: '50px', height: '50px' }} alt={props.entrie.fields.title} src={props.entrie.fields.thumbnail ? props.entrie.fields.thumbnail.fields.file.url + '?w=1024' + '&fm=jpg' : 'https://via.placeholder.com/150'} />
                        <Box style={{ margin: '0px 20px 0px 20px' }}>
                            <Typography variant='h6'>
                                {props.entrie.fields.title}
                            </Typography>
                            <Typography variant='subtitle2'>{props.entrie.fields.origin}</Typography>
                        </Box>

                        <Box style={{ margin: '0px 20px' }}>
                            <Box display="flex" flexWrap="wrap" justifyContent="left">
                                {props.entrie.fields.sizes ? props.entrie.fields.sizes.map(tag => (
                                    <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                                )) : null}
                                {props.entrie.fields.tags.map(tag => (
                                    <Chip key={tag} label={tag} style={{ margin: "10px" }} />
                                ))}

                            </Box>

                        </Box>
                    </Box>
                    <Divider style={{ margin: '10px' }} variant="middle" />
                    <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom component="p">
                            {props.entrie.fields.desc}
                        </Typography>

                    </Box>

                </Paper>
            </Container>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    console.log(context.params.brand)
    let entries = await client.getEntries({
        include: 1,
        'fields.slug': context.params.brand,
        'content_type': 'post',
        limit: 1,

    })
    console.log(entries)
    return { props: { entrie: entries.items[0] } }
}

export default Brand