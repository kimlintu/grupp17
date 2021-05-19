import { createElement, useState } from "react";
import { AccountView } from "../view/accountView";
import {apiGetRequest} from '../api/serverApi';


function Account(){
    const [name, getName] = useState('');

    return createElement(AccountView, {
        getLogin: async () => {
            window.location = window.location.href+"/login";
        },
        getSignUp: async () => {
            window.location = window.location.href+"/sign_up";
        },
        getName: async () => {
            try{
                const resp = await apiGetRequest({resource: 'api/user'});
                const data = await resp.json();
                getName(data.name);
            }catch(error){
                console.log(error);
            }
        },
        name,
        getLogout: async () => {
            window.location = window.location.href+"/logout";
        },
        getDetails: async () => {
            window.location = window.location.href+"/change_details";
        }
        });
};

export { Account };