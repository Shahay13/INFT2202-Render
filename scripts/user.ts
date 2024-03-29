/*
 * File: user.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This file defines the 'User' class within the 'core' namespace.
 * The 'User' class is a fundamental part of the application's user management system,
 * handling user information and providing serialization for storage purposes.
 */

"use strict";

namespace core {

    /**
     * Class 'User' represents an individual user of the application.
     * It encapsulates user-related properties such as display name, email address,
     * username, and password, and provides methods for serialization and deserialization
     * to support data persistence.
     */
    export class User {

        // Stores the user's display name.
        private _displayName:string;

        // Stores the user's email address.
        private _emailAddress:string;

        // Stores the user's chosen username.
        private _username:string;

        // Stores the user's password.
        private _password:string;

        /**
         * Constructs a new 'User' instance with optional parameters for each property.
         * @param displayName - The display name of the user.
         * @param emailAddress - The email address of the user.
         * @param username - The username chosen by the user.
         * @param password - The password set by the user.
         */
        constructor(displayName:string = "", emailAddress:string = "", username:string = "", password:string = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        // Getter and setter for the user's display name.
        public get displayName():string {
            return this._displayName;
        }

        public set displayName(value:string) {
            this._displayName = value;
        }

        // Getter and setter for the user's email address.
        public get emailAddress():string {
            return this._emailAddress;
        }

        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        // Getter and setter for the user's username.
        public get username():string {
            return this._username;
        }

        public set username(value:string) {
            this._username = value;
        }

        // Getter and setter for the user's password.
        public get password():string {
            return this._password;
        }

        public set password(value:string) {
            this._password = value;
        }

        /**
         * Generates a string representation of the user's essential information.
         * This method overrides the default toString method and is useful for debugging.
         * @returns A string containing the display name, email address, and username.
         */
        public toString():string {
            return `DisplayName: ${this._displayName}\n 
            EmailAddress: ${this._emailAddress}\n Username: ${this._username}\n`;
        }

        /**
         * Serializes the user's information for storage, typically in localStorage.
         * This method converts the user's properties into a comma-separated string.
         * @returns {null|string} - A serialized string of the user's information or null if any property is empty.
         */
        public serialize():string|null {
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("One or more properties of the User are empty or invalid.");
            return null;
        }

        /**
         * Deserializes a string to populate the user's properties.
         * This method is typically used when reading user data from localStorage.
         * @param data - A comma-separated string containing the user's information.
         */
        public deserialize(data:string) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }

        /**
         * Converts the user's essential information into a JSON object.
         * This method is useful for sending user data over a network or storing it in a database.
         * @returns A JSON object containing the display name, email address, and username.
         */
        public toJSON() : {DisplayName:string; EmailAddress:string; Username:string} {
            return {
                DisplayName : this._displayName,
                EmailAddress : this._emailAddress,
                Username : this._username
            }
        }

        /**
         * Populates the user's properties from a JSON object.
         * This method is typically used when receiving user data from a network or database.
         * @param data - A JSON object containing the user's information.
         */
        public fromJSON(data:User){
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }
    }
}
