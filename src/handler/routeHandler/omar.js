
/**
     * requestProperty from reqResHandler
     * @param {{parseURL: url.UrlWithParsedQuery & url.UrlWithStringQuery & url.Url,pathName: string | undefined,modifyPathName: string,method: string | undefined,quaryObj: ParsedUrlQuery & string,headerObj: http.IncomingHttpHeaders}} requestProperty;
     * @param {(statusCode:number,playload:Object)=> void} cb
     */

export const omarRouteHandler = (requestProperty,cb)=>{
    cb(200,{
        name:"Omar",
        body: "info something"
    })
}