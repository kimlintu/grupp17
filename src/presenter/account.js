import { createElement, useState } from "react";
import { AccountView } from "../view/accountView";


function Account(){
    console.log("Accounts");

    return createElement(AccountView, {
        getLogin: async () => {
            window.location = window.location.href+"/login";
        },
        getLogout: async () => {
            window.location = window.location.href+"/logout";

        }});
};

export { Account };