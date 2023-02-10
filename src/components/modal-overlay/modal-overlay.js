import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyles from './modal.module.css';

function ModalOverlay() {
    return (
        <header>
            <nav className={appHeaderStyles.navigation_panel}>
                <div className={appHeaderStyles.content}>

                    <nav className={appHeaderStyles.navigation_internal_panel}>

                        <div className={appHeaderStyles.navigation_link_constructor}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default">
                                Конструктор
                            </p>
                        </div>

                        <div className={appHeaderStyles.navigation_link_order}>
                            <ListIcon type="secondary" />
                            <p className="text text_type_main-default  text_color_inactive" type="secondary">
                                Лента заказов
                            </p>
                        </div>
                    </nav>


                    <section className={appHeaderStyles.logo}>
                        <Logo />
                    </section>

                    <section className={appHeaderStyles.navigation_link_profile}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </section>

                </div>
            </nav>
        </header >

    );
}

export default ModalOverlay;