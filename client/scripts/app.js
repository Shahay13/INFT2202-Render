"use strict";
(function () {
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and lastname.");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number.");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address.");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeClass("class").hide();
            }
        });
    }
    function DisplayHomePage() {
        console.log("Home Page");
    }
    function DisplayTeamPage() {
        console.log("Team Page");
    }
    function DisplayBlogPage() {
        console.log("Blog Page");
    }
    function DisplayContactListPage() {
        console.log("Contact-List Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Confirm contact Delete?")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayPortfolioPage() {
        console.log("Portfolio Page");
    }
    function DisplayServicesPage() {
        console.log("Services Page");
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "/home";
        });
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
    }
    function DisplayCommunityPostsPage() {
        console.log("Community Posts Page");
        $("a.delete").on("click", function (event) {
            if (!confirm("Confirm post Delete?")) {
                event.preventDefault();
                location.href = "/community-posts";
            }
        });
    }
    function DisplayEditPostPage() {
        console.log("Edit Post Page");
    }
    function Display404Page() {
        console.log("404 Page");
    }
    function Start() {
        console.log("App Started!");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
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
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map