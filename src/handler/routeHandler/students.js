import fs from 'fs/promises'
import { baseFolderPath } from '../../../baseFonderPath.js'


/**
     * requestProperty from reqResHandler
     * @param {{parseURL: url.UrlWithParsedQuery & url.UrlWithStringQuery & url.Url,pathName: string | undefined,modifyPathName: string,method: string | undefined,quaryObj: ParsedUrlQuery & string,headerObj: http.IncomingHttpHeaders,origialData:string}} requestProperty;
     * @param {(statusCode:number,playload:Object)=> void} cb
     */

export const studenstsRouteHandler = async (requestProperty,cb)=>{
    const dbPath = '/db/students.json'

    try {
    const filedata = await fs.readFile(`${baseFolderPath+dbPath}`,'utf-8');
    /**
     * @typedef {Object} Student
     * @property {string} id - The unique identifier of the student.
     * @property {string} name - The name of the student.
     * @property {string} password - The password of the student.
     * @property {string} department - The department of the student.
     * @property {string} semister - The semester of the student.
     * @property {string} roll - The roll number of the student.
     */

    /**
     * @typedef {Object} StudentsData
     * @property {Student[]} students - Array of student objects.
     */

    /**
     * @type {StudentsData} studentObj
     */
    let studentObj = JSON.parse(filedata);
    
    
   

    if(requestProperty.method === 'get'){
        cb(200,studentObj)
    }

    else if(requestProperty.method === 'post'){
       
         const data = requestProperty.origialData?requestProperty.origialData:null
            if(data === null){
                cb(401,{
                    message: "provide valid students data"
                })
            }
            if(data){
                studentObj.students.push(JSON.parse(data))
            
                try {
                     await fs.writeFile(`${baseFolderPath+dbPath}`,JSON.stringify(studentObj));
                   
                    cb(201,{
                        message: "student added to the database"
                    })

                } catch (error) {
                    console.log("writing the file error",error)
                    cb(500,{message:"Internal Server Error"})
                }
            }

        
    } else{
        cb(500,{
            message: "Internal Server Error"
        })
    }

    
    } catch (error) {
        console.log("file read error",error)
        cb(500,{
            message: "Internal Server Error"
        })
    }

    
    
}