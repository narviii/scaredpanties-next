
const firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');

const serviceAccount = require('./apploan-535837fc3b12.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

const db = admin.firestore();

export default async function viewcount(req, res) {
    const increment = firestore.FieldValue.increment(1);
    db.collection('brand_views').doc(req.query.brandname).update({views:increment})
        .catch((err)=>{
            console.log(err.code)
            if (err.code==5) db.collection('brand_views').doc(req.query.brandname).set({views:1})
        })

  

    res.end()

}

