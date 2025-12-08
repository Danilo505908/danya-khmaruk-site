import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Translations } from './interfaces';

import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';

import data from './data/data.json';
import Divider from './ui/Divider/Divider';

function App() {
	const translations: Translations = data.translations;

	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem('danya-khmaruk-portfolio-theme');
		if (savedTheme) {
			return savedTheme === 'dark';
		}

		const systemTheme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		return systemTheme;
	});

	const [language, setLanguage] = useState<string>(() => {
		return localStorage.getItem('danya-khmaruk-portfolio-language') || 'en';
	});

	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		localStorage.setItem('danya-khmaruk-portfolio-theme', isDark ? 'dark' : 'light');
		document.documentElement.setAttribute(
			'data-theme',
			isDark ? 'dark' : 'light'
		);
	}, [isDark]);

	useEffect(() => {
		localStorage.setItem('danya-khmaruk-portfolio-language', language);
	}, [language]);

	const toggleTheme = () => {
		setIsDark(!isDark);
		document.documentElement.setAttribute(
			'data-theme',
			!isDark ? 'dark' : 'light'
		);
	};

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'ua' : 'en');
	};

	return (
		<div className='main-content'>
			{isLoading && <Loader />}
			<BrowserRouter>
				<Header
					toggleTheme={toggleTheme}
					toggleLanguage={toggleLanguage}
					isDark={isDark}
					translations={translations}
					language={language}
				/>

				<Routes>
					<Route
						path='/'
						element={<Home translations={translations} language={language} />}
					></Route>
					<Route
						path='/projects'
						element={
							<Projects translations={translations} language={language} />
						}
					/>
					<Route
						path='/contact'
						element={
							<Contact translations={translations} language={language} />
						}
					/>
					<Route path='/*' element={<NotFound />} />
				</Routes>
				<Divider />
				<Footer />
			</BrowserRouter>
			<Analytics />
			<SpeedInsights />
		</div>
	);
}

export default App;
