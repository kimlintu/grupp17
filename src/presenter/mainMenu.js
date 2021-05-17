import { createElement, useState } from 'react';
import { apiGetRequest } from '../api/serverApi';
import { MainMenuView } from '../view/mainMenuView';

function MainMenu() {
    const [userName, setUserName] = useState('');
    return createElement(MainMenuView, {
        getUserName: async () => {
            try {
                const resp = await apiGetRequest({ resource: 'api/user' });
                const data = await resp.json();
                if (data.name === "") {
                    setUserName("anonymous")
                } else {
                    setUserName(data.name);
                }
            } catch (error) {
                console.log(error);
            }
        },
        userName
    })
};

export { MainMenu };