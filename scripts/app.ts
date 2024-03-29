/*
 * File: app.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This file contains the main logic for a single-page application (SPA) that dynamically
 * loads content based on user interaction. It utilizes jQuery for DOM manipulation and event handling.
 */

"use strict";

// IIFE - Immediately Invoked Functional Expression.

(function(){

    /**
     * Attaches event handlers to anchor tags with class "link" for enhanced user interaction.
     * This function is responsible for binding click, mouseover, and mouseout events to anchor tags
     * that have a class of "link" and a data attribute that matches the specified 'link' parameter.
     * It applies CSS changes to provide visual feedback to the user and handles the activation of
     * the link upon click events.
     * @param link - The identifier used to select specific anchor tags and associate them with their
     * corresponding actions.
     */
    function AddLinkEvents(link: string): void {

        // Selects anchor tags with class 'link' and a data attribute equal to the 'link' parameter.
        let linkQuery = $(`a.link[data=${link}]`);

        // Clears any existing event handlers from the selected elements to prevent event handler duplication.
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        // Sets CSS properties to visually distinguish links as interactive elements.
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        // Binds a click event to each selected link, triggering the LoadLink function with the 'link' parameter.
        linkQuery.on("click", function() {
            LoadLink(`${link}`);
        });

        // Binds a mouseover event to change the cursor to a pointer and bold the link text, indicating interactivity.
        linkQuery.on("mouseover", function() {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });

        // Binds a mouseout event to revert the link text weight to normal, removing the bold style.
        linkQuery.on("mouseout", function() {
            $(this).css("font-weight", "normal");
        });
    }

    /**
     * Initializes and manages event listeners for navigation elements.
     * This function first clears any existing event listeners on the navigation links
     * to prevent duplication or conflicts. It then sets up new click and mouseover events
     * to handle navigation and provide visual feedback to the user.
     */
    function AddNavigationEvents(): void {

        // Selects all anchor tags within list items of an unordered list as navigation links.
        let navLinks = $("ul>li>a");

        // Clears the event queue for click and mouseover events to avoid redundant handlers.
        navLinks.off("click");
        navLinks.off("mouseover");

        // Attaches a click event listener to each navigation link to load the corresponding content.
        // The 'data' attribute of the clicked element determines the content to load.
        navLinks.on("click", function() {
            LoadLink($(this).attr("data") as string);
        });

        // Adds a mouseover event listener to change the cursor style,
        // indicating that the navigation links are interactive elements.
        navLinks.on("mouseover", function() {
            $(this).css("cursor", "pointer");
        });
    }

    /**
     * Updates the application's current active link, manages authentication, and updates the browser's history.
     * It also updates the navigation UI to reflect the current active link and loads the corresponding content.
     * @param link - The name of the link to load. Defaults to "home".
     * @param data - Any additional data that needs to be passed to the link. Defaults to an empty string.
     */
    function LoadLink(link: string = "home", data: string = ""): void {

        // Set the active link in the router.
        router.ActiveLink = link;

        // Check if the user is authenticated.
        AuthGuard();

        // Store any additional data for the link.
        router.LinkData = data;

        // Update the browser's URL to reflect the active link.
        // This allows the user to use the browser's back and forward buttons to navigate.
        history.pushState({}, "", router.ActiveLink);

        // Set the document's title to the active link, capitalized.
        document.title = capitalizeFirstCharacter(router.ActiveLink);

        // Remove the "active" class from all links in the navigation.
        $("ul>li>a").each( function() {
            $(this).removeClass("active");
        });

        // Add the "active" class to the current active link.
        $(`li>a:contains(${document.title})`).addClass("active");

        // Load the content for the active link.
        LoadContent();
    }

    /**
     * AuthGuard function checks if the user is authenticated before allowing access to certain protected routes.
     * If the active link corresponds to a protected route, it verifies whether the user is logged in.
     * If not authenticated, it redirects to the login page and displays an error message.
     */
    function AuthGuard(): void {

        // List of protected routes.
        let protected_routes:string[] = ["contact-list", "statistics", "event-planning"];

        // Check if the current active link is a protected route.
        if (protected_routes.indexOf(router.ActiveLink) > -1) {

            // Check if user is logged in (using sessionStorage).
            if (!sessionStorage.getItem("user")) {

                // Change active link to the login page.
                router.ActiveLink = "login";

                // Show an error message.
                alert("User is not authenticated. Sign in to access this page.");
            }
        }
    }

    /**
     * CheckLogin function
     * This function checks if a user is logged in and updates the navigation bar accordingly.
     * It also binds the logout event to the logout link.
     */
    function CheckLogin() {

        // Check if the user is logged in.
        if (sessionStorage.getItem("user")) {

            // Change the login nav element to logout.
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                        <i class="fas fa-undo"></i> Logout</a>`);

            // Check if the Statistics link already exists to prevent duplication.
            if ($("ul.navbar-nav li a[data='statistics']").length === 0) {

                // Add the Statistics link to the navbar for authenticated users.
                let statisticsNavItem = `<li class="nav-item"><a class="nav-link" data="statistics">
                                        <i class="fa-solid fa-chart-line"></i> Statistics</a></li>`;

                // Append the Statistics link to the navbar.
                $("ul.navbar-nav").append(statisticsNavItem);
            }

            // Check if the Event Planning link already exists to prevent duplication.
            if($("ul.navbar-nav li a[data='event-planning']").length === 0) {

                // Add the Event Planning link to the navbar for authenticated users.
                let eventPlanningNavItem = `<li class="nav-item"><a class="nav-link" data="event-planning">
                                        <i class="fa-solid fa-calendar-plus"></i> Event Planning</a></li>`;

                // Append the Event Planning link to the navbar.
                $("ul.navbar-nav").append(eventPlanningNavItem);
            }

            // Rebind the navigation events to include the new link.
            AddNavigationEvents();
        }

        // Bind the logout event after changing the login/logout link.
        $(document).on("click", "#logout", function() {

            // Perform logout.
            sessionStorage.clear();

            // Swap out the logout link for login.
            $("#login").html(`<a class="nav-link" data="login">
                                        <i class="fas fa-sign-in-alt"></i> Login</a>`);

            // Remove the Statistics link if it exists.
            $("li a[data='statistics']").parent().remove();

            // Remove the Event Planning link if it exists.
            $("li a[data='event-planning']").parent().remove();

            // Redirect back to home page with a default 'home' link.
            LoadLink("home");

            // Rebind the navigation events to reflect the changes.
            AddNavigationEvents();
        });
    }

    /**
     * Function that calls the ValidateField function for each form element.
     * It validates the full name, contact number, and email address fields.
     */
    function ContactFormValidation() {

        // Full Name Validation.
        // The regex pattern checks for a valid first and last name.
        // It allows for an optional prefix (up to 4 characters),
        // followed by a first name and potentially multiple last names.
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and lastname.");

        // Contact Number Validation.
        // The regex pattern checks for a valid contact number.
        // It allows for an optional international code, followed by a 3 digit area code and a 7 digit number.
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid contact number.");

        // Email Address Validation.
        // The regex pattern checks for a valid email address.
        // It allows for alphanumeric characters, periods, underscores,
        // and hyphens in the username and domain name, followed by a 2 to 10 character top-level domain.
        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address.");
    }

    /**
     * This function validates input for contact and edit pages.
     * @param {string} input_field_id - The ID of the input field to validate.
     * @param {RegExp} regular_expression - The regular expression to use for validation.
     * @param {string} error_message - The error message to display if validation fails.
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string) {

        // Hide the message area initially.
        let messageArea = $("#messageArea").hide();

        // Attach an event handler to the blur event of the input field.
        // This event is triggered when the user leaves the input field.
        $(input_field_id).on("blur", function () {

            // Get the text entered by the user in the input field.
            let inputFieldText = $(this).val() as string;

            // Check if the input text matches the regular expression.
            // If it doesn't, validation has failed.
            if (!regular_expression.test(inputFieldText)){

                // If validation fails, highlight the input field and display the error message.
                $(this).trigger("focus").trigger("select");

                // Add the 'alert' and 'alert-danger' classes to the message area,
                // set its text to the error message, and make it visible.
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }

            // If the input text matches the regular expression, validation has passed.
            else {

                // If validation passes, remove the 'class' from the message area and hide it.
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * Add a contact to localStorage.
     * @param {string} fullName - The full name of the contact.
     * @param {string} contactNumber - The contact's phone number.
     * @param {string} emailAddress - The contact's email address.
     */
    function AddContact(fullName:string, contactNumber:string, emailAddress:string) {

        // Create a new Contact object.
        let contact = new core.Contact(fullName, contactNumber, emailAddress);

        // Serialize the contact data.
        if (contact.serialize()) {

            // Generate a unique key based on the first letter of the full name and the current timestamp.
            let key = contact.fullName.substring(0,1) + Date.now();

            // Store the serialized contact data in localStorage.
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    /**
     * Display the home page.
     * This function runs when the user is on that page.
     */
    function DisplayHome() {

        // Log a message indicating that the user is on the home page.
        console.log("Home");
    }

    /**
     * Display the portfolio page.
     * This function runs when the user is on that page.
     */
    function DisplayPortfolio(){

        // Log a message indicating that the user is on the portfolio page.
        console.log("Portfolio");
    }

    /**
     * DisplayContact function initializes the contact form and handles related actions.
     */
    function DisplayContact() {

        // Log a message to indicate that the contact form is being displayed.
        console.log("Contact Us");

        // Remove any existing click event handlers for the contact-list link.
        $("a[data='contact-list']").off("click");

        // Add a new click event handler for the contact-list link.
        $("a[data='contact-list']").on("click", function () {

            // Load the contact list when the link is clicked.
            LoadLink("contact-list");
        });

        // Validate the contact form
        ContactFormValidation();

        // Get references to the send button and subscribe checkbox.
        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as
            HTMLInputElement;

        // Add a click event listener to the send button.
        sendButton.addEventListener("click", function() {

            // Check if the subscribe checkbox is checked.
            if (subscribeCheckbox.checked) {

                // Gather form data.
                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let emailAddress:string = document.forms[0].emailAddress.value;

                // Call the AddContact function with the collected data.
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    /**
     * DisplayContactList
     * This function is responsible for displaying the contact list on the web page.
     * It retrieves contact information from the local storage and populates the contact list table.
     * It also handles the event listeners for the "Add", "Edit", and "Delete" buttons.
     */
    function DisplayContactList() {
        console.log("Contact List");

        // Check if there are contacts in local storage.
        if (localStorage.length > 0) {

            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";
            let index = 1;
            let keys = Object.keys(localStorage);

            // Iterate through each contact and populate the data.
            for (const key of keys) {

                let contact = new core.Contact();
                let contactData = localStorage.getItem(key) as string;

                contact.deserialize(contactData);

                // Create a row for each contact.
                data += `<tr>
                        <th scope="row" class="text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm"></i> Edit
                            </button>
                        </td>
                        <td class="text-center"> 
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash-alt fa-sm"></i> Delete
                            </button>
                        </td>
                        </tr>`;
                index++;
            }

            // Populate the contact list table.
            contactList.innerHTML = data;
        }

        // Set up event handlers for buttons.
        $("#addButton").on("click", () => {
            LoadLink("edit", "add");
        });

        $("button.edit").on("click", function() {
            LoadLink("edit", $(this).val() as string);
        });

        $("button.delete").on("click", function() {
            if (confirm("Delete contact, are you sure?")) {
                localStorage.removeItem($(this).val() as string);
            }

            // Refresh the page after deleting.
            LoadLink("contact-list");
        });
    }

    /**
     * DisplayTeam function logs a message indicating the team.
     * This function is responsible for displaying team-related information.
     */
    function DisplayTeam(){
        console.log("Team");
    }

    /**
     * DisplayBlog function logs a message indicating the blog section.
     * This function also sets up event listeners for specific links.
     */
    function DisplayBlog() {
        console.log("Blog");

        // Remove existing click event handlers for the "statistics" link.
        $("a[data='statistics']").off("click");

        // Add a new click event handler for the "statistics" link.
        $("a[data='statistics']").on("click", function () {
            LoadLink("statistics");
        });

        // Remove existing click event handlers for the "event-planning" link.
        $("a[data='event-planning']").off("click");

        // Add a new click event handler for the "event-planning" link.
        $("a[data='event-planning']").on("click", function () {
            LoadLink("event-planning");
        });
    }

    /**
     * DisplayServices function logs a message indicating the services section.
     * This function is responsible for displaying information related to services.
     */
    function DisplayServices() {
        console.log("Services");
    }

    /**
     * DisplayEdit function handles the display and editing of contact information.
     * It dynamically adjusts the UI based on whether the user is adding a new contact or editing an existing one.
     */
    function DisplayEdit() {
        console.log("Edit");

        // Validate the contact form.
        ContactFormValidation();

        // Get the current page (add or edit).
        let page = router.LinkData;

        switch (page) {

            // Add a new user.
            case "add":
            {
                // Refactor the edit page to an add page.
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fa fa-plus fa-sm"></i> Add`);
                $("#editButton").on("click", (event)=> {

                    // Prevent form submission.
                    event.preventDefault();

                    // Read form field values.
                    let fullName:string = document.forms[0].fullName.value;
                    let contactNumber:string = document.forms[0].contactNumber.value;
                    let emailAddress:string = document.forms[0].emailAddress.value;

                    // Add the new contact.
                    AddContact(fullName, contactNumber, emailAddress);
                    LoadLink("contact-list");
                });

                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                });
            }

                break;

            // Edit operation.
            default:
            {
                // Get the contact info from local storage.
                let contact = new core.Contact();

                // Get the key for the contact.
                contact.deserialize(localStorage.getItem(page) as string);

                // Display the contact information in the form fields.
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event)=> {

                    // Prevent form submission.
                    event.preventDefault();

                    // Read and store values in the form fields.
                    contact.fullName = $("#fullName").val() as string;
                    contact.contactNumber = $("#contactNumber").val() as string;
                    contact.emailAddress = $("#emailAddress").val() as string;

                    // Serialize the edited contact to update the existing key.
                    localStorage.setItem(page, contact.serialize() as string);
                    LoadLink("contact-list");
                });

                $("#cancelButton").on("click", ()=> {
                    LoadLink("contact-list");
                });
            }
                break;
        }
    }

    /**
     * DisplayLogin function handles the login process and user authentication.
     * It validates user credentials, sets up event listeners, and manages form interactions.
     */
    function DisplayLogin() {
        console.log("Login");
        AddLinkEvents("register");

        let messageArea = $("#messageArea");

        // Event handler for the login button.
        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            // Read the users.json file.
            $.get("./data/users.json", function(data) {

                // Loop through the users.json file.
                for (const user of data.users) {

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;

                    // Check if the username and password match.
                    if (username === user.Username && password === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if (success) {

                    // Add user to session storage.
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                    // Redirect user to secure area of the site (contact-list).
                    LoadLink("contact-list");
                } else {

                    // Invalid credentials.
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }
            });
        });

        // Event handler for the clear button (reset form).
        $("#clearButton").on("click", function () {
            document.forms[0].reset();
            messageArea.removeAttr("class").hide();
            $("#username").trigger("focus").trigger("select");
        });
    }

    /**
     * DisplayStatistics function logs a message indicating the statistics section.
     * This function is responsible for displaying statistical information.
     */
    function DisplayStatistics() {
        console.log("Statistics");
    }

    /**
     * DisplayEventPlanning
     * This function manages event data, allowing users to add, edit, remove, and view events.
     */
    function DisplayEventPlanning() {
        console.log("Event Planning");

        // Define the structure of an event object.
        interface IEvent {
            id: string;
            title: string;
            date: string;
            description: string;
        }

        // Initialize an empty array to store events
        let events: IEvent[] = [];

        try {
            // Attempt to read existing event data from local storage.
            events = JSON.parse(localStorage.getItem('events') || '[]');
        } catch (error) {
            console.error("Error reading from local storage", error);
        }

        /**
         * Adds a new event to the list.
         * @param title - The title of the event.
         * @param date - The date of the event.
         * @param description - A description of the event.
         */
        function addEvent(title: string, date: string, description: string): void {
            const newEvent: IEvent = {
                id: `event-${Date.now()}`,
                title,
                date,
                description
            };
            events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));
            updateEventList();
        }

        /**
         * Removes an event from the list.
         * @param eventId - The ID of the event to remove.
         */
        function removeEvent(eventId: string): void {
            events = events.filter(event => event.id !== eventId);
            localStorage.setItem('events', JSON.stringify(events));
            updateEventList();
        }

        /**
         * Clears all events from the list.
         */
        function removeAllEvent(): void {
            events = [];
            localStorage.setItem('events', JSON.stringify(events));
            updateEventList();
        }

        /**
         * Updates the event list in the UI.
         */
        function updateEventList(): void {

            try {

                const eventListElement = document.getElementById('eventList');

                if (eventListElement) {

                    // Clear the current list.
                    eventListElement.innerHTML = '';

                    // Add each event as a list item.
                    events.forEach(event => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `
                        <h3>${event.title}</h3>
                        <p>Date: ${event.date}</p>
                        <p>${event.description}</p>
                        <button class="btn btn-primary edit-btn" data-event-id="${event.id}">
                            <i class="fas fa-edit fa-sm"></i> Edit
                        </button>
                        <button class="btn btn-danger remove-btn" data-event-id="${event.id}">
                            <i class="fas fa-trash-alt fa-sm"></i> Remove
                        </button>
                    `;
                        eventListElement.appendChild(listItem);
                    });
                }
            } catch (error) {
                console.error("Error updating the event list", error);
            }
        }

        // Event delegation for edit button.
        document.getElementById('eventList')?.addEventListener('click', function(event) {
            const target = event.target as HTMLElement;
            if (target.classList.contains('edit-btn')) {
                const eventId = target.getAttribute('data-event-id');
                if (eventId) {

                    // Retrieve the event details based on eventId.
                    const eventToEdit = events.find(event => event.id === eventId);
                    if (eventToEdit) {

                        // Populate form fields with existing data.
                        const titleInput = document.getElementById('eventTitle') as HTMLInputElement;
                        const dateInput = document.getElementById('eventDate') as HTMLInputElement;
                        const descriptionInput = document.getElementById('eventDescription') as HTMLTextAreaElement;
                        titleInput.value = eventToEdit.title;
                        dateInput.value = eventToEdit.date;
                        descriptionInput.value = eventToEdit.description;
                    }
                }
            }
        });

        // Event delegation for remove button.
        document.getElementById('eventList')?.addEventListener('click', function(event) {
            const target = event.target as HTMLElement;
            if (target.classList.contains('remove-btn')) {
                const eventId = target.getAttribute('data-event-id');
                if (eventId && confirm("Remove event details, are you sure?")) {
                    removeEvent(eventId);
                }
            }
        });

        document.getElementById('removeAllButton')?.addEventListener('click', function() {
            // Check if there are any events to remove.
            if (events.length === 0) {
                alert("There are no event details to remove.");
            } else {
                // Ask for confirmation before removing all events.
                if (confirm("Remove all event details, are you sure?")) {
                    removeAllEvent();
                }
            }
        });

        // Function to handle the form submission for new events.
        function handleEventFormSubmit(event: Event): void {
            event.preventDefault();
            const titleInput = document.getElementById('eventTitle') as HTMLInputElement;
            const dateInput = document.getElementById('eventDate') as HTMLInputElement;
            const descriptionInput = document.getElementById('eventDescription') as
                HTMLTextAreaElement;

            if (titleInput && dateInput && descriptionInput) {
                addEvent(titleInput.value, dateInput.value, descriptionInput.value);
                titleInput.value = '';
                dateInput.value = '';
                descriptionInput.value = '';
            }
        }

        // Add event listener for the event form submission.
        document.getElementById('eventForm')?.addEventListener('submit', handleEventFormSubmit);

        // Initial call to populate the event list.
        updateEventList();
    }

    /**
     * DisplayRegister function displays the registration page.
     * It logs "Register" to the console and adds link events for login.
     */
    function DisplayRegister() {

        // Log a message indicating registration.
        console.log("Register");

        // Add link events for login.
        AddLinkEvents("login");
    }

    /**
     * Display404 function displays a "404 Not Found" page.
     * It logs "404" to the console.
     */
    function Display404(){

        // Log a message indicating a 404 error.
        console.log("404");
    }

    /**
     * ActiveLinkCallback function returns the appropriate callback function based on the active link.
     * @returns {Function} The callback function corresponding to the active link.
     */
    function ActiveLinkCallback():Function {
        switch (router.ActiveLink) {
            case "home": return DisplayHome;
            case "portfolio": return DisplayPortfolio;
            case "services": return DisplayServices;
            case "team": return DisplayTeam;
            case "blog": return DisplayBlog;
            case "contact": return DisplayContact;
            case "login": return DisplayLogin;
            case "statistics": return DisplayStatistics;
            case "event-planning": return DisplayEventPlanning;
            case "register": return DisplayRegister;
            case "contact-list": return DisplayContactList;
            case "edit": return DisplayEdit;
            case "404": return Display404;
            default:
                console.log("ERROR: callback function does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    /**
     * capitalizeFirstCharacter function capitalizes the first character of a given string.
     * @param {string} str - The input string.
     * @returns {string} The input string with the first character capitalized.
     */
    function capitalizeFirstCharacter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * LoadHeader function fetches and displays the header content.
     * It sets the document title based on the active link and adds navigation events.
     */
    function LoadHeader() {

        $.get("./views/components/header.html", function(html_data) {

            // Display the header content.
            $("header").html(html_data);

            // Set the document title.
            document.title = capitalizeFirstCharacter(router.ActiveLink);

            // Highlight the active link.
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");

            // Add navigation event listeners.
            AddNavigationEvents();

            // Check login status.
            CheckLogin();
        });
    }

    /**
     * LoadContent function fetches and displays the content for the active link.
     * It loads the HTML data for the specified page_name, sets the document title,
     * checks login status, and invokes the appropriate callback function.
     */
    function LoadContent() {

        // Get the active link.
        let page_name = router.ActiveLink;

        // Get the callback function based on the active link.
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page_name}.html`, function(html_data) {

            // Display the content in the main section.
            $("main").html(html_data);

            // Check login status.
            CheckLogin();

            // Invoke the appropriate callback function.
            callback();
        });
    }

    /**
     * LoadFooter function fetches and displays the footer content.
     * It loads the HTML data for the footer component and injects it into the footer section.
     */
    function LoadFooter() {
        $.get("./views/components/footer.html", function(html_data) {
            $("footer").html(html_data);
        });
    }

    /**
     * Start function initializes the application.
     * It logs "App Started!" to the console, loads the header, sets the active link to "home",
     * and loads the footer.
     */
    function Start() {

        // Log a message indicating the app has started.
        console.log("App Started!");

        // Load the header content.
        LoadHeader();

        // Set the active link to "home".
        LoadLink("home");

        // Load the footer content.
        LoadFooter();
    }

    // Event listener to invoke Start function when the window loads.
    window.addEventListener("load", Start);

})();
