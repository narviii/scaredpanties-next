import * as admin from 'firebase-admin';

let serviceAccount = require('./apploan-535837fc3b12.json');

!admin.apps.length?admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://apploan-b02b0.firebaseio.com"'
}):null;




export default async function viewcount(req, res) {
    const db = admin.firestore();
    const increment = admin.firestore.FieldValue.increment(1);
    db.collection('brand_views').doc(req.query.brandname).update({views:increment})
        .catch((err)=>{
            
            console.log(err.code)
            if (err.code==5) db.collection('brand_views').doc(req.query.brandname).set({views:1})
        })

  

    res.end()

}

