import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    return (
        <header>
            <nav className={appHeaderStyles.navigation_panel}>

            <div className={appHeaderStyles.content}>
                    <nav className={appHeaderStyles.navigation_internal_panel}>


                    <a href="#" className={appHeaderStyles.navigation_link_constructor}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">
                                Конструктор
                            </p>
                        </a>

                        <a href="#" className={appHeaderStyles.navigation_link_order}>
                        
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default  text_color_inactive" type="secondary">
                                Лента заказов
                            </p>
                        
                        </a>
                    </nav>


                    <section className={appHeaderStyles.logo}>
                        <Logo />
                    </section>

                    <a href="#" className={appHeaderStyles.navigation_link_profile}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </a>

                </div>



                {/* <div className={appHeaderStyles.content}>
                    <nav className={appHeaderStyles.navigation_internal_panel}>

                        <a>
                        <div className={appHeaderStyles.navigation_link_constructor}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">
                                Конструктор
                            </p>
                        </div>
                        </a>

                        <a>
                        <div className={appHeaderStyles.navigation_link_order}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default  text_color_inactive" type="secondary">
                                Лента заказов
                            </p>
                        </div>
                        </a>
                    </nav>


                    <section className={appHeaderStyles.logo}>
                        <Logo />
                    </section>

                    <a>
                    <section className={appHeaderStyles.navigation_link_profile}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </section>
                    </a>

                </div> */}
            </nav>
        </header >

    );
}

export default AppHeader;