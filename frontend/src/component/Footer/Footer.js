import React from "react";

import storeIcon from "../../assets/images/playStore.png";
import './Footer.css';

const Footer = (props) => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="center-wrapper">
                    <div className="top-footer-main">
                        <div className="lft-top-footer">
                            <ul>
                                <li>
                                    <a href="#" target="_blank">Testimonial</a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">Discussion Form</a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">FAQs</a>
                                </li>
                            </ul>
                        </div>
                        <div className="right-top-footer">
                            <ul>
                                <li>
                                    <a href="#" target="_blank">Download Mobile App</a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <span className="play-store">
                                            <img src={storeIcon} alt="Play Store" />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>COPYRIGHT &copy; 2022.ALL RIGHTS RESERVED</p>
            </div>
        </div>
    );
}

export default Footer;