const path = require("path");
const glob = require("glob");

import combineParsed from "../../app/middlewares/general/combineParsed";
import sendPayload from "../../app/middlewares/general/sendPayload";

function packageMiddle(middle) {
    return async function (req, res, next) {
        try {
            let fn = await middle(req, res);
            if (fn instanceof Error)
                throw fn;

            if (next) next();
        } catch (err) {
            return res.send({message: err.message});
        }
    };
}

/**
 * @class HTTPRouteLoaderOptions
 * @type {Object}
 * @property {String} [dir='src/HTTPRoutes"] The routeObject directory
 * @property {boolean} [verbose=true] Verbose output messages
 * @property {boolean} [strict=false] Strict checks on plugin validity, stop loading if invalid
 */

/**
 * @class HTTPRouteLoader
 * @type {Object}
 * @property {RestifyServer} server restify server reference
 * @property {HTTPRouteLoaderOptions} opts loader properties
 * @property {Array.HTTPRouteObject} loadedRoutes routes loaded
 * @classdesc HTTPRouteLoader for setting up the HTTP routes for
 *  multiple HTTPRouteObject
 */
export default class RouteLoader {
    /**
     * Create a new HTTPRouteLoader
     * @param {RestifyServer} server restify server reference
     * @param {HTTPRouteLoaderOptions} opts loader properties
     */
    constructor(server, opts) {
        this.server = server;
        this.opts = {
            dir: opts.dir
                ? opts.dir
                : path.join(__dirname, "../../routes/HTTPRoutes"),
            verbose: opts.verbose ? opts.verbose : true,
            strict: opts.strict ? opts.strict : false
        };

        if (opts.binds) this.binds = opts.binds;
        this.loadedRoutes = [];
    }

    /**
     * Load a single HTTPRouteObject
     * @param {HTTPRouteObject} routeObject  A HTTPRouteObject to load
     * @return {(null | HTTPRouteObject)} Returns null on error, HTTPRouteObject on success
     */
    loadObject(routeObject) {
        //check if route is already taken
        let exist = this.loadedRoutes.find(function (r) {
            return r.path === routeObject.path && r.method === routeObject.method;
        });
        if (exist) {
            if (this.opts.verbose)
                throw new Error(`HTTPRouteLoader Error: Route already taken`);
            return;
        }

        if (routeObject.handler) {
            //check if arr of middleware
            if (Array.isArray(routeObject.handler)) {
                //add parser
                routeObject.handler.unshift(combineParsed);

                //add payload sender
                routeObject.handler.push(sendPayload);

                for (let i = 0; i < routeObject.handler.length; i++) {
                    routeObject.handler[i] = packageMiddle(
                        routeObject.handler[i].bind(this)
                    );
                }
            } else {
                routeObject.handler = [
                    packageMiddle(combineParsed.bind(this)),
                    packageMiddle(routeObject.handler.bind(this)),
                    packageMiddle(sendPayload.bind(this))
                ];
            }
            //http method
            if (routeObject.method === "GET")
                this.server.get(routeObject.path, routeObject.handler);
            else if (routeObject.method === "HEAD")
                this.server.head(routeObject.path, routeObject.handler);
            else if (routeObject.method === "POST")
                this.server.post(routeObject.path, routeObject.handler);
            else if (routeObject.method === "PUT")
                this.server.put(routeObject.path, routeObject.handler);
            else if (routeObject.method === "DELETE")
                this.server.delete(routeObject.path, routeObject.handler);
            else {
                throw new Error(
                    `HTTPRouteLoader Error: Route method ${routeObject.method} is invalid`
                );
                return;
            }

            //add to loaded Routes
            this.loadedRoutes.push(routeObject);

            //verbose
            if (this.opts.verbose) {
                console.log(
                    `Success: Added new HTTP route ${routeObject.method} ${routeObject.path}`
                );
            }
        } else {
            //verbose
            if (this.opts.verbose) {
                throw `Error: No Handler found for ${routeObject.method} ${routeObject.path}`;
            }
        }

        return routeObject;
    }

    /**
     * Load a list of HTTPRouteObjects
     * @param  {Array.HTTPRouteObject} routeObjects An array of HTTPRouteObjects
     */
    loadObjects(routeObjects) {
        if (!this.opts.dir && plugins.length > 0) {
            //load all routes
            routeObjects.forEach(function (route, i) {
                //strict check
                if (!loadObject(route) && this.opts.strict) return;
            });
            return;
        }
    }

    /**
     * Load HTTPRouteObject modules from a directory
     * @param {String} [dir=this.opts.dir] A string path to route module directory
     */
    loadDir(dir) {
        //check if dir exists
        if (!dir && !this.opts.dir) {
            throw new Error(`HTTPRouteLoader Error: No directory specified`);
            return;
        }

        //load objects
        glob.sync(dir ? dir + "/**/*.js" : this.opts.dir + "/**/*.js").forEach(
            function (file) {
                let routeObject = require(file).default;
                //strict check
                if (!this.loadObject(routeObject) && this.opts.strict) return;
            }.bind(this)
        );
    }
}
