/*
 * File: app.ts
 * Author: Takirul Takirul
 * Date: April 13, 2024
 * Description: This file contains the logic for routing and form validation in a web application.
 */

"use strict";

// IIFE - Immediately Invoked Functional Expression.
(function()
{
    /**
     * Function that calls the ValidateField function for each form element.
     * This function is used for form validation on the contact and edit pages.
     */
    function ContactFormValidation()
    {
        // Full Name Validation.
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter a valid first and lastname.");

        // Contact Number Validation.
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter a valid contact number.");

        // Email Address Validation.
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid email address.");
    }

    /**
     * This function validates input for contact and edit pages.
     * @param {string} input_field_id
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string)
    {
        let messageArea = $("#messageArea").hide();

        // When the user leaves the full name text box.
        $(input_field_id).on("blur", function ()
        {
            // Get the value of the current element as a string and store it in inputFieldText.
            let inputFieldText = $(this).val() as string;

            // Validation failed.
            if (!regular_expression.test(inputFieldText))
            {
                // Highlight and display error message.
                $(this).trigger("focus").trigger("select");

                // Daisy chain method calls to addClass, change text and show the element.
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }

            // Validation passed.
            else
            {
                // Remove the class named "class" from messageArea and then hide it
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * This function is responsible for handling the logic when the user is on the home page.
     * It currently logs a message to the console.
     */
    function DisplayHomePage()
    {
        // Log a message to the console.
        console.log("Home Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the team page.
     * It currently logs a message to the console.
     */
    function DisplayTeamPage()
    {
        // Log a message to the console.
        console.log("Team Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the blog page.
     * It currently logs a message to the console.
     */
    function DisplayBlogPage()
    {
        // Log a message to the console.
        console.log("Blog Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the contact list page.
     * It currently logs a message to the console and sets up a click event handler.
     */
    function DisplayContactListPage()
    {
        // Log a message to the console.
        console.log("Contact-List Page");

        // Set up a click event handler for delete buttons.
        // When a delete button is clicked, it will confirm with the user before proceeding with the deletion.
        $("a.delete").on("click", function(event)
        {
            // If the user cancels the deletion, it will prevent the default action and redirect the user back to the contact list page.
            if(!confirm("Confirm contact Delete?"))
            {
                // Prevent the default action of the event.
                event.preventDefault();

                // Redirect to the contact list page.
                location.href="/contact-list";
            }
        })
    }

    /**
     * This function is responsible for handling the logic when the user is on the portfolio page.
     * It currently logs a message to the console.
     */
    function DisplayPortfolioPage()
    {
        // Log a message to the console.
        console.log("Portfolio Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the services page.
     * It currently logs a message to the console.
     */
    function DisplayServicesPage()
    {
        // Log a message to the console.
        console.log("Services Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the edit page.
     * It currently logs a message to the console and calls the ContactFormValidation function.
     */
    function DisplayEditPage()
    {
        // Log a message to the console.
        console.log("Edit Page");

        // Call the ContactFormValidation function to validate the form on the edit page.
        ContactFormValidation();
    }

    /**
     * This function is responsible for handling the logic when the user is on the login page.
     * It currently logs a message to the console and sets up a click event handler for the cancel button.
     */
    function DisplayLoginPage()
    {
        // Log a message to the console.
        console.log("Login Page");

        // Set up a click event handler for the cancel button.
        $("#cancelButton").on("click", function()
        {
            // Clear the login form.
            document.forms[0].reset();

            // Return to the home page.
            location.href = "/home";
        });

    }

    /**
     * This function is responsible for handling the logic when the user is on the register page.
     * It currently logs a message to the console.
     */
    function DisplayRegisterPage()
    {
        // Log a message to the console.
        console.log("Register Page");
    }

    /**
     * This function is responsible for handling the logic when the user is on the community posts page.
     * It currently logs a message to the console and sets up a click event handler for post deletion.
     */
    function DisplayCommunityPostsPage()
    {
        // Log a message to the console.
        console.log("Community Posts Page");

        // Set up a click event handler for delete buttons.
        $("a.delete").on("click", function(event)
        {
            // If the user cancels the deletion, it will prevent the default action and redirect the user back to the community posts page.
            if(!confirm("Confirm post Delete?"))
            {
                // Prevent the default action of the event.
                event.preventDefault();

                // Redirect to the community posts page.
                location.href="/community-posts";
            }
        })
    }

    /**
     * This function is responsible for handling the logic when the user is on the edit post page.
     * It currently logs a message to the console.
     */
    function DisplayEditPostPage()
    {
        // Log a message to the console.
        console.log("Edit Post Page");
    }

    /**
     * This function is responsible for handling the logic when the user encounters a 404 error.
     * It currently logs a message to the console.
     */
    function Display404Page()
    {
        // Log a message to the console.
        console.log("404 Page");
    }

    /**
     * This function is the entry point of the application.
     * It routes the user to the appropriate page based on the id of the body element.
     */
    function Start()
    {
        // Log a message to the console indicating that the application has started.
        console.log("App Started!");

        // Get the "id" attribute of the first "body" element and store it in the variable "page_id"
        let page_id = $("body")[0].getAttribute("id");

        // Switch statement to handle different page ids.
        switch(page_id)
        {
            case "home":
                DisplayHomePage();
                break;
            case "team":
                DisplayTeamPage();
                break;
            case "blog":
                DisplayBlogPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "portfolio":
                DisplayPortfolioPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "edit":
            case "add":
                DisplayEditPage();
                break;
            case "community-posts":
                DisplayCommunityPostsPage();
                break;
            case "edit-post":
            case "add-post":
                DisplayEditPostPage();
                break;
            case "404":
                Display404Page();
                break;
        }

    }

    // Add an event listener to the window object that calls the Start function when the page loads.
    window.addEventListener("load", Start);

})();
