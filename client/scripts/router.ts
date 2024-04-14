/*
 * File: router.ts
 * Author: Takirul Takirul
 * Date: April 13, 2024
 * Description: This file contains the Router class which is responsible for managing the routing table.
 * It provides methods to add, remove, find routes and also to replace the entire routing table.
 */

"use strict";

namespace core {

    /**
     * The Router class is responsible for managing the routing table.
     * It provides methods to add, remove, find routes and also to replace the entire routing table.
     */
    export class Router {

        // The currently active link.
        private _activeLink:string;

        // The routing table containing all the routes.
        private _routingTable:string[];

        // The data associated with the link.
        private _linkData:string;

        /**
         * The constructor initializes the active link, routing table and link data.
         */
        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        // Getter and setter for the link data.
        public get LinkData():string{
            return this._linkData;
        }

        public set LinkData(link:string){
            this._linkData = link;
        }

        // Getter and setter for the active link.
        public get ActiveLink():string{
            return this._activeLink;
        }

        public set ActiveLink(link:string){
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param route
         * @return {void}
         */
        public Add(route:string){
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one.
         * @param routingTable
         * @return {void}
         */
        public AddTable(routingTable:string[]){
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the Routing table
         * or -1 if the route does not exist.
         * @param route
         * @returns {*}
         */
        public Find(route:string):number{
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it succeeds
         * (delete a route). False if it failed.
         * @param route
         * @returns {boolean}
         */
        public Remove(route:string):boolean{
            if(this.Find(route) > -1){
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            else{
                return false;
            }
        }

        /**
         * This method returns the routing table contents in a comma delimited separated string.
         * @returns {string}
         */
        public toString():string{
            return this._routingTable.toString();
        }
    }

}

// Instantiate a new router.
let router: core.Router = new core.Router();

// Add default routes to the routing table.
router.AddTable([
    "/",
    "/home",
    "/portfolio",
    "/services",
    "/team",
    "/blog",
    "/login",
    "/register",
    "/contact-list",
    "/edit",
    "/community-posts",
    "/edit-post"
]);

let route:string = location.pathname;

// Set the active link based on the current route.
router.ActiveLink = (router.Find(route) > -1)
                    ? ( (route) === "/") ? "home" : route.substring(1)
                    : ("404");
