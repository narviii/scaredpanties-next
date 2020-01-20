const contentful = require('contentful')

const client = contentful.createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})

const getContent = async () => {
    const entries = await client.getEntries({
        
        
        'content_type': 'post'

    })
    //console.log(await entries)

     return console.log(entries.items[0].fields.thumbnail.fields.file.url)
}
const getContentType = async () => {
    const entries = await client.getContentType('post')
    //console.log(await entries)
     return console.log(entries)
}

getContent()