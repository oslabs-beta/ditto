import React from "react";
import '../styles/components/LandingPageBtns.css';

const LandingPageBtns: React.FC = () => {
    return(
        <div className="btns">
            <button className="landingPageBtn">
                <a href="signup" target="_blank" className="Font">Get Started</a>
            </button>

            <button className="landingPageBtn">
                <a href="faq" target="_blank" className="Font">Instructions</a>
            </button>
        </div>
    )
}

export default LandingPageBtns;
