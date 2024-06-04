import * as React from 'react';
import Community from '../components/Community';
import '../styles/MainPage.css';
import LandingPageBtns from '../components/LandingPageBtns';
import Intro from '../components/Intro';

const MainPage: React.FC = () => {
	return (
	<div className="content-container">
		<div className="landing">
			<h1 id='title'>D.I.T.T.O.</h1>
			<h1 id='slogan'>Streamlining schema migration since 2024 </h1>
		</div>
		
		<div>
			<Intro />
			<LandingPageBtns />
			<Community />
			</div>
	</div>
	);
};

export default MainPage;
