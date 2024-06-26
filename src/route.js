

/**
 * route configaration
 */

import { omarRouteHandler } from "./handler/routeHandler/omar.js";
import { studenstRouteHandler } from "./handler/routeHandler/studentRouteHandler.js";
import { studenstsRouteHandler } from "./handler/routeHandler/students.js";

const routes = {
    "omar": omarRouteHandler,
    "students": studenstsRouteHandler,
    "students/student": studenstRouteHandler
    
}

export default routes