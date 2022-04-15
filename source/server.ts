import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from "./config/logging";
import config from "./config/config";
import {resolveObjectURL} from "buffer";
import sampleRoutes from './routes/login'
// import extractJWT from './middleware/extractJWT'
const NAMESPACE = 'Server';
const router = express();

router.use((req, res, next) => {
    logging.info(NAMESPACE,`METHOD - [${req.method}]. URL - [${req.url}],IP - [${req.socket.remoteAddress}]]`);
    res.on('finish',()=>{
        logging.info(NAMESPACE,`METHOD - [${req.method}]. URL - [${req.url}],IP - [${req.socket.remoteAddress}]], STATUS - [${res.statusCode}]`);
    })
    next();
})

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json())
 
router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Origin, x-Requested-With, Content-Type,Accept,Authorization');

    if(req.method =='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','GET PATCH DELETE POST PUT');
        return res.status(200).json({})
    }
    next();
})
router.use('/api',)
router.use('/api',sampleRoutes)
router.use((req, res, next) => {
    const error = new Error('not found!!');

    return res.status(404).json({
        message: error.message
    })
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port,()=> logging.info(NAMESPACE,`Server running on ${config.server.hostname}:${config.server.port}`))


