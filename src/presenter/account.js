import { createElement, useState } from "react";
import { AccountView } from "../view/accountView";
import {apiGetRequest} from '../api/serverApi';


function Account(){
    console.log("Accounts");
    const [name, getName] = useState('');

    return createElement(AccountView, {
        getLogin: async () => {
            window.location = window.location.href+"/login";
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

        }});
};

export { Account };