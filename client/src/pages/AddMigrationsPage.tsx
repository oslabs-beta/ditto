import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/AddUpdateMigrations.css';
import CodeEditor from '../components/CodeEditor';

interface FormData {
	version: string;
	description: string;
	script: string;
}

const AddMigrationsPage: React.FC = () => {
	const [version, setVersion] = useState('');
	const [description, setDescription] = useState('');
	const dbId = useSelector((state: any) => state.dbId);
	const script = useSelector((state: any) => state.script);
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
				}), 
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			navigate('/migration');
		} catch (error) {
			console.error('Error posting new migration version', error);
		}
	};

	return (
		<div className="addUpdateMigrationsPage">
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
					<label>
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
