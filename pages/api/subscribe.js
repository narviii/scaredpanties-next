import superagent from 'superagent'

let mailchimpInstance = 'us20',
    listUniqueId = 'ed2dc9ceb2',
    mailchimpApiKey = '5ef1b23f9ee156d247f270d3a77c19ca-us20';

export default async function subscribe(req, res) {
    
    try {
        const response = await superagent.post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
            .set('Content-Type', 'application/json;charset=utf-8')
            .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
            .send({
                'email_address': req.query.email,
                'status': 'subscribed',
            })
        
        res.send('Ok')
    } catch (err) {
        res.send('Not ok')
        
    }



}