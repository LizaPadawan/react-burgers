import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import  appHeaderStyles  from './app-header.module.css';

function AppHeader() {
    return (
        <header>
        <nav className={appHeaderStyles.nav}>

            <nav  className={appHeaderStyles.internal_nav}>
                <section className={appHeaderStyles.nav_link} style={{width: '178px'}}>
                    <BurgerIcon type="primary" />
                    <text className="text text_type_main-default">
                    Конструктор
                    </text>
                </section>  

                <section className={appHeaderStyles.nav_link} style={{width: '197px'}}>
                    <ListIcon type="secondary" />
                    <text className="text text_type_main-default  text_color_inactive" type="secondary">
                    Лента заказов
                    </text>       
                </section> 
            </nav>
            

        <section  className={appHeaderStyles.logo}>
            <Logo/>
        </section>

        <section className={appHeaderStyles.nav_link} style={{width: '207px'}}>
            <ProfileIcon type="secondary" />
            <text className="text text_type_main-default text_color_inactive">
            Личный кабинет
            </text>       
        </section> 
        

        </nav>
        </header>
        
    );
}

export default AppHeader;