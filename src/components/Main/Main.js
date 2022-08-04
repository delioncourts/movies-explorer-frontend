import React from 'react';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from "../Portfolio/Portfolio";

/*<AboutProject/>
<Techs/>
<AboutMe/>
<Portfolio/> */
import './Main.css';

const Main = () => {
    return (
        <main className='main'>
            <Promo/>
        </main>
    );
};
export default Main;