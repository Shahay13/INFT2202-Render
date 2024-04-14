/*
 * File: router.ts
 * Author: Takirul Takirul
 * Date: April 13, 2024
 * Description: This file contains the Router class which is responsible for managing the routing table.
 * It provides methods to add, remove, find routes and also to replace the entire routing table.
 */

"use strict";

/**
 * The 'core' namespace encapsulates all the core functionalities of the application.
 * This includes classes and interfaces that are fundamental to the application's operation.
 */
namespace core
{
    /**
     * The Router class is responsible for managing the routing table.
     * It provides methods to add, remove, find routes and also to replace the entire routing table.
     */
    export class Router
    {
        /**
         * The currently active link.
         */
        private _activeLink:string;

        /**
         * The routing table containing all the routes.
         */
        private _routingTable:string[];

        /**
         * The data associated with the link.
         */
        private _linkData:string;

        /**
         * The constructor initializes the active link, routing table and link data.
         */
        constructor()
        {
            // Initialize the active link to an empty string.
            this._activeLink = "";

            // Initialize the routing table to an empty array.
            this._routingTable = [];

            // Initialize the link data to an empty string.
            this._linkData = "";
        }

        // Getter and setter for the link data.

        /**
         * This method returns the value of the private variable _linkData.
         */
        public get LinkData():string
        {
            // Return the current value of _linkData.
            return this._linkData;
        }

        /**
         * This function sets the value of the private variable _linkData.
         * It takes a string as an argument and assigns it to _linkData.
         */
        public set LinkData(link:string)
        {
            // Assign the input link to the private variable _linkData.
            this._linkData = link;
        }

        // Getter and setter for the active link.

        /**
         * This method returns the value of the private variable _activeLink.
         */
        public get ActiveLink():string
        {
            // Return the current value of _activeLink.
            return this._activeLink;
        }

        /**
         * This method sets the value of the private variable _activeLink.
         */
        public set ActiveLink(link:string)
        {
            // Set the current value of _activeLink to the provided link.
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table.
         * @param route
         * @return {void}
         */
        public Add(route:string)
        {
            // Add the provided route to the routing table.
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one.
         * @param routingTable
         * @return {void}
         */
        public AddTable(routingTable:string[])
        {
            // Replace the current routing table with the provided one.
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the Routing table
         * or -1 if the route does not exist.
         * @param route
         * @returns {*}
         */
        public Find(route:string):number
        {
            // Find the index of the provided route in the routing table.
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it succeeds
         * (delete a route). False if it failed.
         * @param route
         * @returns {boolean}
         */
        public Remove(route:string):boolean
        {
            // Check if the route exists in the routing table.
            if(this.Find(route) > -1)
            {
                // If the route exists, remove it from the routing table.
                this._routingTable.splice(this.Find(route), 1);

                // Return true indicating the route was successfully removed.
                return true;
            }

            // If the route does not exist in the routing table, the following code will execute.
            else
            {
                // If the route does not exist in the routing table, return false.
                return false;
            }
        }

        /**
         * This method returns the routing table contents in a comma delimited separated string.
         * @returns {string}
         */
        public toString():string
        {
            // Convert the routing table array to a string and return it.
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

// Store the current URL path in the variable "route".
let route:string = location.pathname;

// Set the active link based on the current route.
router.ActiveLink = (router.Find(route) > -1)
                    ? ( (route) === "/") ? "home" : route.substring(1)
                    : ("404");
