const log = require('./logger')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api/apiRouter');
app.set('view engine', 'ejs');
app.set('views', 'client');
//Configure body parser
const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlEncodedParser);

const hostname = process.env.HOSTNAME;
// const hostname = '127.0.0.1';
// const port = 5000;
const port = process.env.PORT || 5000;

//Configure cors
app.use(cors());


//Configure apiRouter
app.use('/api', apiRouter)

//Get
/*app.get('/page',(req,res) => {
	res.sendFile('../05_Axios_lib/index.html',{root: __dirname})
});*/
app.use((req,res) => {
	res.status(404).sendFile('./client/404.html',{root: __dirname})
})

app.listen(port, () => {
	log(`Express Server is started at http://${hostname}:${port}`);
});



// {
// 	"first_name": "kingchi",
//   "last_name": "big guys",
//   "email": "kinchi@gmail.com",
//   "gender": "male",
//   "ip_address": "132.45.654.2"
// }