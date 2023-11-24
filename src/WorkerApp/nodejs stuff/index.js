const admin =  require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./prism-worker-gate-firebase-adminsdk-68hy8-b403f66536.json");
app.use(express.json())
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.post('/send-noti',(req,res)=>{
    console.log('Me Me')
    console.log(req.body)
   const message = {
    notification:req.body.notification,
    token:req.body.token,
   
}

admin.messaging().send(message).then(res=>{
   console.log('send success')
}).catch(err=>{
    console.log(err)
}) 
})

app.listen(3000,()=>{
    console.log('Server is running')
})