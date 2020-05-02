import { streamToPromise, SitemapStream } from 'sitemap'
import {createClient} from 'contentful'

const client = createClient({
    space: 'y1tpc6gwyz3g',
    accessToken: 'cQFcNJC5X35eWPkZ1ybown-nRQG4QOmxkwMZKootKeE'
})
export default async function sitemap(req,res) {
    let i=0

    const entries = await client.getEntries({
        limit:500,
        include:0
    })
    
    const pages = ~~(entries.total/12)

    const smStream = new SitemapStream({ hostname: 'https://catalog.scaredpanties.com' });
    smStream.write({ url: ``, changefreq: 'weekly',priority: 0.9, })
    smStream.write({ url: `/search`, changefreq: 'weekly',priority: 0.3})
    smStream.write({ url: `/stockists`, changefreq: 'weekly',priority: 0.5})
    entries.items.forEach(item=>item.fields.slug?smStream.write({url:"brands/"+item.fields.slug,changefreq: 'weekly',priority: 0.9,lastmod:item.sys.updatedAt}):null)
    for(i=0;i<=pages;i++){
        smStream.write({ url: `?sizes=&origin=&tags=&offset=${i*12}`, changefreq: 'weekly'})
    }

    smStream.end()

    const sitemap = await streamToPromise(smStream)
                          .then(sm => sm.toString())

    res.setHeader("Content-Type", "text/xml")
    res.write(sitemap)
    res.end()
  }