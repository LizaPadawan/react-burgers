import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import appHeaderStyles from './app-header.module.css';

function AppHeader() {

    return (
        <header>
            <nav className={appHeaderStyles.navigation_panel}>

                <div className={appHeaderStyles.content}>
                    <nav className={appHeaderStyles.navigation_internal_panel}>

                        <NavLink
                            to='/'
                            className={appHeaderStyles.navigation_link_constructor}
                        >
                            {({ isActive }) => (
                                <>
                                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                    <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                                        Конструктор
                                    </p>
                                </>
                            )
                            }
                        </NavLink>

                        <NavLink
                            to='/list'
                            className={appHeaderStyles.navigation_link_order}
                        >
                            {({ isActive }) => (
                                <>
                                    <ListIcon type={isActive ? "primary" : "secondary"} />
                                    <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                                        Лента заказов
                                    </p>
                                </>
                            )
                            }
                        </NavLink>
                    </nav>

                    <section className={appHeaderStyles.logo}>
                        <Logo />
                    </section>

                    <NavLink
                            to='/profile'
                            className={appHeaderStyles.navigation_link_profile}
                        >
                            {({ isActive }) => (
                                <>
                                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                                    <p className={`text text_type_main-default ${isActive ? "" : "text_color_inactive"}`}>
                                        Личный кабинет
                                    </p>
                                </>
                            )
                            }
                        </NavLink>

                </div>
            </nav>
        </header >

    );
}

export default AppHeader;