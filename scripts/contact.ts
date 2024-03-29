/*
 * File: contact.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This file defines a Contact class with properties for full name, contact number, and email address.
 * The Contact class is part of the 'core' namespace and is designed to manage individual contact information.
 */

"use strict";

namespace core {

    /**
     * The Contact class represents a single contact entity with essential contact details.
     * It provides a structured way to store and manipulate a contact's full name, contact number,
     * and email address. This class includes methods for serialization and deserialization to facilitate
     * storage operations, such as saving to or loading from localStorage.
     */
    export class Contact {

        // The full name of the contact.
        private _fullName:string;

        // The contact's telephone number.
        private _contactNumber:string;

        // The contact's email address.
        private _emailAddress:string;

        /**
         * Constructs a new Contact instance with optional parameters for each contact detail.
         * This constructor allows for creating a Contact object with pre-filled information or an empty one.
         * @param fullName - The full name of the contact.
         * @param contactNumber - The contact number.
         * @param emailAddress - The email address.
         */
        constructor(fullName:string = "", contactNumber:string = "", emailAddress:string = ""){
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        // Getter and setter for the contact's full name.
        public get fullName():string {
            return this._fullName;
        }

        public set fullName(value:string) {
            this._fullName = value;
        }

        // Getter and setter for the contact's telephone number.
        public get contactNumber():string {
            return this._contactNumber;
        }

        public set contactNumber(value:string) {
            this._contactNumber = value;
        }

        // Getter and setter for the contact's email address.
        public get emailAddress():string {
            return this._emailAddress;
        }

        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        /**
         * Provides a string representation of the contact's details.
         * This method formats the contact's full name, contact number, and email address into a readable string.
         * @returns {string} - A formatted string with the contact's details.
         */
        public toString():string {
            return `Full Name: ${this._fullName}\n Contact Number: ${this._contactNumber}\n
            Email Address: ${this._emailAddress}\n`;
        }

        /**
         * Serializes the contact's details for storage.
         * This method converts the contact's details into a comma-separated string suitable for storage operations.
         * @returns {null|string} - A serialized string of the contact's details or null if any detail is missing.
         */
        public serialize():string|null {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== ""){
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
            }
            console.error("One or more properties of the Contact are empty or invalid.");
            return null;
        }

        /**
         * Deserializes stored contact data to populate the contact's details.
         * This method is used to reconstruct a Contact object from a serialized
         * string, typically retrieved from localStorage.
         * @param data - A comma-separated string containing the contact's details.
         */
        public deserialize(data:string):void {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }
    }
}
