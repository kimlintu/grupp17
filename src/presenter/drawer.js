import { createElement, useState } from "react";
import { PermanentDrawerLeft } from "../view/drawerView";
import {apiGetRequest} from '../api/serverApi';


function Drawer(props){
    const [user, getUser] = useState('');

    return createElement(PermanentDrawerLeft, {
        props,
        getUser: async () => {
            try{
                const resp = await apiGetRequest({resource: 'api/user'});
                const data = await resp.json();
                getUser(data.name);
            }catch(error){
                console.log(error);
            }
        },
        user});
};

export { Drawer };