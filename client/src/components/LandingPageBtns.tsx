import React from "react";
import  '../styles/LandingPageBtns.css';

const LandingPageBtns: React.FC = () => {
    return (
        <div className='container'>
            <a href="signup" target="_blank" rel="noopener noreferrer">
            <button className="LPBtn">
                Get Started
            </button>
            </a>
            <a href="faq" target="_blank" rel="noopener noreferrer">
            <button className="LPBtn">
                Instructions
            </button>
            </a>
        </div>
    );
};

export default LandingPageBtns;
