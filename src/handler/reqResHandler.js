import http from 'http';
import { StringDecoder } from 'string_decoder';
import url from 'url'

import {notFoundRouteHandler} from './routeHandler/notFound.js'
import routes from '../route.js';


/**
 * Request handler scaffolding
 * @type {{reqResHandler:(req:http.IncomingMessage,res:http.ServerResponse<http.IncomingMessage>)=> void}}
 */

const handler = {};

handler.reqResHandler = (req,res)=>{
    //request handling
    //get the url and pare it and modify it
    const parseURL = url.parse(req.url,true);
    const pathName = parseURL.pathname;
    const modifyPathName = pathName.replace(/^\/|\/$/g, '');
    const method = req.method.toLocaleLowerCase();
    const quaryObj = parseURL.query;
    const headerObj = req.headers;
    let origialData = ''
    /** @typedef {{parseURL: url.UrlWithParsedQuery & url.UrlWithStringQuery & url.Url,pathName: string | undefined,modifyPathName: string,method: string | undefined,quaryObj: ParsedUrlQuery & string,headerObj: http.IncomingHttpHeaders,origialData:string}} requestPropertyType */
    /**
     * requestProperty from reqResHandler
     * @type {requestPropertyType}
     */
    const requestProperty = {
        parseURL,pathName,modifyPathName,method,quaryObj,headerObj,origialData
    }
    const decoder =  new StringDecoder('utf-8');

 

     /**
         * @type {(requestProperty:requestPropertyType,(statusCode:number,playload:{})=> void)}
    */
    const currentRoute = routes[modifyPathName]? routes[modifyPathName] : notFoundRouteHandler;

    req.on('data',(chunk)=>{
        requestProperty.origialData+= decoder.write(chunk);
    });
    
    req.on('end',()=>{
        requestProperty.origialData+= decoder.end()
        // console.log("fsdfs",requestProperty.origialData)
       
        currentRoute(requestProperty,(statusCode,playload)=>{
           
            res.writeHead(statusCode);
            res.end(JSON.stringify(playload))
        })
    })
}


export default handler
