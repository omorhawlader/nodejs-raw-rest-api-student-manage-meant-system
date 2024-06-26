import fs from 'fs/promises'
import { baseFolderPath } from '../../../baseFonderPath.js'


/**
     * requestProperty from reqResHandler
     * @param {{parseURL: url.UrlWithParsedQuery & url.UrlWithStringQuery & url.Url,pathName: string | undefined,modifyPathName: string,method: string | undefined,quaryObj: ParsedUrlQuery & string,headerObj: http.IncomingHttpHeaders,origialData:string}} requestProperty;
     * @param {(statusCode:number,playload:Object)=> void} cb
     */

export const studenstRouteHandler = async (requestProperty,cb)=>{
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
    const id = requestProperty.quaryObj?.id

    if(id){

        if(requestProperty.method === 'get'){
            let studentByID = null;
            studentObj.students.forEach(student=>{
                if(student.id == requestProperty.quaryObj?.id){
                    studentByID = student;
                    
                }
            })
           if(studentByID){
            cb(200,studentByID)
           }else{
            cb(400,{
                message:"Student Not Found"
            })
           }
            // cb(200,data)
        } else if(requestProperty.method === 'delete'){
            let ifExist = false
            studentObj.students.forEach(s=>{
                if(s.id === id){
                    ifExist = true
                }
            })
            if(ifExist){
                const filtredStudents = studentObj.students.filter(student=>student.id !== id);
                studentObj.students = filtredStudents
                try {
                    await fs.writeFile(`${baseFolderPath+dbPath}`,JSON.stringify(studentObj))
                    cb(200,{
                        message:"successfully deleted!"
                    })
                } catch (error) {
                    console.log(error,'error from deleted the student')
                    cb(500,{
                        message:"internal server error"
                    })
                }
            }else{
                cb(400,{
                    message: "student not exist!"
                })
            }
           
        }else if(requestProperty.method === 'put'){
            const putData = JSON.parse(requestProperty.origialData)
            studentObj.students.forEach(async(s,i)=>{
                if(s.id === id){
                    if(putData){
                        const news = {...s,...putData}
                        studentObj.students[i] = news
                        try {
                            await fs.writeFile(`${baseFolderPath+dbPath}`,JSON.stringify(studentObj))
                            cb(200,{
                                message: "updated done!"
                            })
                        } catch (error) {
                            cb(500,{
                                message: "Internal Server Error"
                            })
                        }

                       
                    }else{
                        cb(400,{
                            message: "provied valid updated sata"
                        })
                    }
                }
            })
        }else{
            cb(500,{
                message: "Internal Server Error"
            })
        }
    }else{
        cb(400,{
            message: "student id needed"
        })
    }
    
    } catch (error) {
        console.log("file read error",error)
        cb(500,{
            message: "Internal Server Error"
        })
    }

    
    
}