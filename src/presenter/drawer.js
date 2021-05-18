import { createElement, useState } from "react";
import { PermanentDrawerLeft } from "../view/drawerView";
import { apiGetRequest } from '../api/serverApi';


function Drawer(props) {
    return createElement(PermanentDrawerLeft, {
        props
    });
};

export { Drawer };