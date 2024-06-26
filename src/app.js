//dependancies
import http from 'http'
import dotenv from 'dotenv'
import handler from './handler/reqResHandler.js';
import { dirname } from 'path';
dotenv.config();


/** 
 * app object for this serever to handling and module scaffolding
 * @typedef {Object} app
 * 
*/
const app = {}


app.createServer = ()=>{
    const server = http.createServer(app.reqResHandler)
    server.listen(process.env.PORT,()=>console.log(`listening to http://localhost:${process.env.PORT}`))

}



/**
 * @param {http.IncomingMessage} request -> from client
 * @param {http.ServerResponse<http.IncomingMessage>} res -> from server
 * @returns void
 */
app.reqResHandler = handler.reqResHandler


app.createServer()









