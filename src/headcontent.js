import React from 'react'

export function HeadContent(props) {
    return (
        <div>
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:image" content={props.image} />
            <meta property="og:url" content={props.url} />


            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="description"
                content={props.description}
            />

        </div>
    )
}