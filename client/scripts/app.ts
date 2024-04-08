"use strict";

// IIFE - Immediately Invoked Functional Expression.
(function(){

    function CheckLogin(){
        // Change login nav element to logout.
        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                                            <i class="fas fa-undo"></i> Logout</a>`);
        }

        // When user clicks logout, clear session storage.
        $("#logout").on("click", function(){
            // Perform logout.
            sessionStorage.clear();
            // Swap out the login link for logout.
            $("#login").html(`<a class="nav-link" href="/login">
                                                        <i class="fas fa-sign-in-alt"></i> Login</a>`);
            // Redirect back to home page.
            location.href = "/home";

        });
    }

    /**
     * Function that calls the ValidateField function for each form element.
     */
    function ContactFormValidation(){
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
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){
        let messageArea = $("#messageArea").hide();

        // When the user leaves the full name text box.
        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val() as string;

            // Validation failed.
            if (!regular_expression.test(inputFieldText)){
                // Highlight and display error message.
                $(this).trigger("focus").trigger("select");
                // Daisy chain method calls to addClass, change text and show the element.
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            // Validation passed.
            else{
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * Add a contact to localStorage.
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    // Functions that run when the user is on that page.
    function DisplayHomePage(){
        console.log("Home Page");

        // jQuery code to redirect user when they click the button.
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });

        // jQuery code to write to the main paragraph.
        $("main").append(`<p id="MainParagraph"
                                class="mt-3">This is my first paragraph</p>`);

        // jQuery code to write to the article paragraph.
        $("main").append(`<article>
                                <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`)

    }

    function DisplayAboutPage(){
        console.log("About Us Page");

        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });
    }

    function DisplayContactPage(){
        console.log("Contact Us Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function (){
            location.href = "/contact-list";
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(){
            if(subscribeCheckbox.checked){

                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let emailAddress:string = document.forms[0].emailAddress.value;

                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    function DisplayContactListPage() {
        console.log("Contact-List Page");

        $("a.delete").on("click", function(event){
            if(!confirm("Confirm contact Delete?")){
                event.preventDefault();
                location.href="/contact-list";
            }
        })
    }

    function DisplayProductPage(){
        console.log("Product Page");

        $("#AboutUsBtn").on("click", ()=> {
            location.href = "/about";
        });
    }

    function DisplayServicesPage(){
        console.log("Services Page");

        $("#AboutUsBtn").on("click", ()=> {
            location.href = "/about";
        });
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");
        ContactFormValidation();
    }

    function DisplayLoginPage(){
        console.log("Login Page");

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function () {

            let success = false;
            let newUser = new core.User();

            // Read the users.json file.
            $.get("./data/users.json", function(data){
                // Loop through the users.json file.
                for(const user of data.users){

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;

                    // Check if the username and password.
                    if(username === user.Username && password === user.Password)
                    {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success){
                    // Add user to session storage.
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    // Redirect user to secure area of the site.
                    location.href = "/contact-list";
                }else{
                    // They do not match.
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }
            });
        });

        // Reset form.
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "/home";
        });
    }

    function DisplayRegisterPage(){
        console.log("Register Page");
    }

    function Display404Page(){
        console.log("404 Page");
    }

    function Start()
    {
        console.log("App Started!");

        let page_id = $("body")[0].getAttribute("id");

        CheckLogin();

        switch(page_id){
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "products":
                DisplayProductPage();
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
            case "404":
                Display404Page();
                break;
        }

    }
    window.addEventListener("load", Start);

})();