import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProjectsPage from './pages/ProjectsPage';
import LoadingSpinner from './components/LoadingSpinner';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const MigrationPage = lazy(() => import('./pages/MigrationPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const GitHubCallBack = lazy(() => import('./components/GitHubCallBack'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const AddMigrationsPage = lazy(() => import('./pages/AddMigrationsPage'));
const UpdateMigrationsPage = lazy(() => import('./pages/UpdateMigrationsPage'));

import logo from './assets/logo.webp';


const App: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HelmetProvider>
					<Router>
						<NavBar logo={logo} />
						<Suspense fallback={<LoadingSpinner />}>
							<Routes>
								<Route path="/" element={<MainPage />} />
								<Route path="/projects" element={<ProjectsPage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route
									path="/updateMigrations"
									element={<UpdateMigrationsPage />}
								/>
								<Route path="/addMigrations" element={<AddMigrationsPage />} />
								<Route path="/githubauthorized" element={<GitHubCallBack />} />
								<Route path="/migration" element={<MigrationPage />} />
								<Route path="/signup" element={<SignUpPage />} />
								<Route path="/faq" element={<FAQPage />} />
							</Routes>
						</Suspense>
					</Router>
				</HelmetProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
