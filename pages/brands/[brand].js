import React from 'react'
import { client } from '../../src/contentful'
import ReactGA from '../../src/reactga'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Footer } from '../../src/footer';
import { originList, tagList, sizeList } from '../../src/constants'



function Brand(props) {
    console.log(props)
    return (
        <React.Fragment>
        <CssBaseline/>
        <h1>{props.params.brand}</h1>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {



    return { props: { params:context.params } }
}

export default Brand