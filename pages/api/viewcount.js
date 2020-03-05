
const firestore = require('@google-cloud/firestore');

const db = new firestore({
    projectId: 'apploan-b02b0',
    keyFilename: './apploan-535837fc3b12.json',
});

export default async function viewcount(req, res) {
    const increment = firestore.FieldValue.increment(1);
    db.collection('brand_views').doc(req.query.brandname).update({views:increment})
        .catch((err)=>{
            console.log(err.code)
            if (err.code==5) db.collection('brand_views').doc(req.query.brandname).set({views:1})
        })

  

    res.end()

}

