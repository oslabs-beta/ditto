// popup foir migration, it will include version, description and the script.
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMigrationVersions } from '../store';
import '../styles/AddUpdateMigrations.css';
import CodeEditor from '../components/CodeEditor';

interface FormData {
	version: string;
	description: string;
	// executed_At: string;
	script: string;
}

// interface FormProps {
// 	onSubmit: (data: FormData) => void;
// }

const AddMigrationsPage: React.FC = () => {
	const [version, setVersion] = useState('');
	const [description, setDescription] = useState('');
	// const [script, setScript] = useState('');
	const dbId = useSelector((state: any) => state.dbId);
	const script = useSelector((state: any) => state.script);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`/migrationlog/${dbId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					version,
					script,
					description,
				}), // Will need to include executed_At
			});
			// need to dispatch migration versions so when they go back to migration page and navigate to migration page if succesful
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			// const result = await response.json();
			// dispatch(setMigrationVersions(result));

			navigate('/migration');
		} catch (error) {
			console.error('Error posting new migration version', error);
		}
	};

	return (
		<div className="addUpdateMigrationsPage">
			{/* <h1>ADD MIGRATIONS</h1> */}
			<form onSubmit={handleSubmit}>
				<div className="versionDescription">
					<fieldset className="version">
						<label>
							<input
								type="text"
								value={version}
								onChange={e => setVersion(e.target.value)}
								required
							/>
						</label>
						<legend>Version</legend>
					</fieldset>
					<fieldset className="description">
						<label>
							<input
								type="text"
								value={description}
								onChange={e => setDescription(e.target.value)}
								required
							/>
						</label>
						<legend>Description</legend>
					</fieldset>
				</div>
				<fieldset>
					{/* <CodeEditor initialCode={code} /> */}
					<label>
						{/* <textarea
							className="code-editor"
							value={script}
							onChange={e => setScript(e.target.value)}
							required
						/> */}
						<CodeEditor code={script} inMigration={false} />
					</label>

					<legend>Script</legend>
				</fieldset>
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default AddMigrationsPage;
