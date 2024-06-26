
// module scaffolding 

/**
 * environment for staging and production mode
 * @typedef {Object} environment
 */
const environment = {};

environment.staging = {
    port: 8000,
    envName: 'staging'
}

environment.poroduction = {
    port: 8000,
    envName: 'poroduction'
}


/**
 * checking which environment was passed 
 * 
 */
const currentEnvironment = typeof process.env.NODE_ENV
 === 'string' ? process.env.ENV : 'staging';


/**
 * exported environment
 * @type {{port:number,envName:string}} exportedenvironment
 */
const exportedenvironment = typeof environment[currentEnvironment] === 'object'? environment[currentEnvironment] : environment.staging

module.exports = exportedenvironment;