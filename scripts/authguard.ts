/*
 * File: authguard.ts
 * Author: Takirul
 * Date: March 28, 2024
 * Description: This file handles route protection by checking if the user is authenticated.
 * If the active link corresponds to a protected route, it redirects to the login page
 * if the user is not authenticated.
 */

"use strict";

(function () {

    // List of protected routes.
    let protected_routes = ["contact-list"];

    // Check if the active link is in the list of protected routes.
    if (protected_routes.indexOf(router.ActiveLink) > -1) {

        // If not authenticated, redirect to the login page.
        if (!sessionStorage.getItem("user")){
            location.href = "/login";
        }
    }

})();
