/*
 * File: router.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This file contains the Router class within the 'core' namespace.
 * The Router class is responsible for managing the navigation and routing logic of the application.
 */

"use strict";

namespace core {

    /**
     * The Router class handles the application's internal routing mechanism.
     * It maintains a routing table for navigation links and provides functionality
     * to add, remove, find, and navigate routes.
     */
    export class Router {

        // Stores the current active link.
        private _activeLink:string;

        // An array that holds all the routes.
        private _routingTable:string[];

        // Data associated with the current link.
        private _linkData:string;

        /**
         * The constructor initializes the Router with default values.
         */
        constructor() {

            // Initialize with no active link.
            this._activeLink = "";

            // Start with an empty routing table.
            this._routingTable = [];

            // No link data initially.
            this._linkData = "";
        }

        // Public properties (getters and setters).

        /**
         * Gets the data associated with the current link.
         * @returns {string} The current link data.
         */
        public get LinkData():string {
            return this._linkData;
        }

        /**
         * Sets the data for the current link.
         * @param {string} link - The new link data to set.
         */
        public set LinkData(link:string) {

            // Update the link data.
            this._linkData = link;
        }

        /**
         * Gets the current active link.
         * @returns {string} The active link.
         */
        public get ActiveLink():string {
            return this._activeLink;
        }

        /**
         * Sets the current active link.
         * @param {string} link - The new active link to set.
         */
        public set ActiveLink(link:string) {

            // Update the active link.
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param route
         * @return {void}
         */
        public Add(route:string) {
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one.
         * @param routingTable
         * @return {void}
         */
        public AddTable(routingTable:string[]) {
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the Routing table
         * or -1 if the route does not exist.
         * @param route
         * @returns {*}
         */
        public Find(route:string):number {
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it succeeds
         * (delete a route). False if it failed.
         * @param route
         * @returns {boolean}
         */
        public Remove(route:string):boolean {
            if (this.Find(route) > -1) {
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            else {
                return false;
            }
        }

        /**
         * This method returns the routing table contents in a comma delimited separated string.
         * @returns {string}
         */
        public toString():string {
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
    "/contact",
    "/login",
    "/statistics",
    "/event-planning",
    "/register",
    "/contact-list",
    "/edit"
]);

let route:string = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
    ? ( (route) === "/") ? "home" : route.substring(1)
    : ("404");
