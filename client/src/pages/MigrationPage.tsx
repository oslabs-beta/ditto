import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';
import '/client/src/styles/MigrationPage.css';

const MigrationPage: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const currentProject = useSelector((state: any) => state.currentProject);

	useEffect(() => {
		const loadDatabases = async () => {
			const token = sessionStorage.getItem('token');
			try {
				if (currentProject) {
					const response = await fetch(
						`/db/connectionStrings/${currentProject}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
						}
					);

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();
				}
			} catch (error) {
				console.error(`Error fetching databases:`, error);
			} finally {
				setLoading(false);
			}
		};

		loadDatabases();
	}, [currentProject]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="migrationPage">
			<Helmet>
				<title>Migrations - Ditto</title>
				<meta
					name="description"
					content="Manage and track your database migration scripts using Ditto."
				/>
			</Helmet>
			<div className="migrationPage">
				<SidePanel />
				<MigrationScripts />
			</div>
		</div>
	);
};

export default MigrationPage;
