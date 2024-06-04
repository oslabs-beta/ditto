import * as React from 'react';
import '/client/src/styles/Documentation.css';

const Documentation: React.FC = () => {
	return (
		<div>
			<div className="docTxt">
				<div className="text-container">
					<p className="scrolling-text">
						<strong>DITTO</strong>
					</p>
					<p>
						A consistent database schema application made easy for collaboration
						with your team, with Intuitive UI for accurate tracking and version
						control.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Documentation;
