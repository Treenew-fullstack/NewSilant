import React from "react";

import './styles/footer.css'
import Tg from './icon/tg.png';

const Footer = () => {
    return (
        <div className="footer-main-container">
            <div className="footer-num-tg-container">
                <h3 className="footer-num">8 800 700-52-65</h3>
                <img src={Tg} alt="Tg" className="footer-tg-icon" />
            </div>
            <h3 className="text-silant">New Силант</h3>
        </div>
    );
};

export default Footer;