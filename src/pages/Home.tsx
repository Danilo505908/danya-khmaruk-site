import { useEffect, useState } from 'react';
import { FiFigma } from 'react-icons/fi';
import { VscVscode } from 'react-icons/vsc';
import {
	SiCss3,
	SiGit,
	SiHtml5,
	SiJavascript,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiNpm,
	SiReact,
	SiSass,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from 'react-icons/si';

import { SkillBadge } from '../components/skillBadge/SkillBadge';
import ProjectCard from '../components/projectCard/ProjectCard';
import { Translations } from '../interfaces';
import { CursorIcon } from '../ui/CursorIcon';

import img from '../assets/me.jpeg';
import classes from './Home.module.css';

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

async function getStaticProps() {
	const headers: HeadersInit = {};
	if (githubToken) {
		headers.Authorization = `token ${githubToken}`;
	}
	
	try {
		const reposResponse = await fetch(
			`https://api.github.com/users/Danilo505908/repos?type=owner&per_page=100`,
			{
				headers,
			}
		);

		if (!reposResponse.ok) {
			throw new Error(`GitHub API error: ${reposResponse.status}`);
		}

		const repos = await reposResponse.json();

		// Fetch star-team repo separately since it belongs to koselevn
		let starTeamRepo = null;
		try {
			const starTeamResponse = await fetch(
				`https://api.github.com/repos/koselevn/star-team`,
				{
					headers,
				}
			);
			if (starTeamResponse.ok) {
				starTeamRepo = await starTeamResponse.json();
			}
		} catch (err) {
			console.warn('Failed to fetch star-team repo:', err);
		}

		const selectedRepoNames = [
			'09-auth',
			'sunny-penguins',
			'goit-markup-hw-06',
			'Green-palette',
			'SIMPLY-CHOCOLATE',
			'03-react-movies',
		];

		let topRepos = repos.filter((repo: { name: string }) =>
			selectedRepoNames.includes(repo.name)
		);

		// Add star-team if successfully fetched
		if (starTeamRepo && !starTeamRepo.message) {
			topRepos.push(starTeamRepo);
		}

		return {
			props: { topRepos },
			revalidate: 3600,
		};
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return {
			props: { topRepos: [] },
			revalidate: 3600,
		};
	}
}

interface Props {
	translations: Translations;
	language: string;
}

export const Home = ({ translations, language }: Props) => {
	const [topRepos, setTopRepos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		getStaticProps()
			.then(data => {
				setTopRepos(data.props.topRepos);
				setIsLoading(false);
			})
			.catch(err => {
				console.error('Error fetching repos:', err);
				setError('Failed to load projects');
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<section className={classes.hero}>
				<div className={classes.profile}>
					<img src={img} alt='avatar' className={classes.profile_image} />
					<h1>{translations[language].profile} 👋</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].profile_info}
				</p>
				<div className={classes.profile}>
					<h1>{translations[language].hobby} 💭</h1>
				</div>
				<p className={classes.subtitle}>{translations[language].hobby_info}</p>
				<div className={classes.profile}>
					<h1>{translations[language].technologies} 💻</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].technologies_info}
				</p>
				<div className={classes.tech_list}>
					<SkillBadge icon={SiHtml5} name='HTML5' />
					<SkillBadge icon={SiCss3} name='CSS3' />
					<SkillBadge icon={SiSass} name='Sass' />
					<SkillBadge icon={SiTailwindcss} name='Tailwind' />
					<SkillBadge icon={SiJavascript} name='JavaScript' />
					<SkillBadge icon={SiTypescript} name='TypeScript' />
					<SkillBadge icon={SiReact} name='React.js' />
					<SkillBadge icon={SiNodedotjs} name='Node.js' />
					<SkillBadge icon={SiNextdotjs} name='Next.js' />
					<SkillBadge icon={VscVscode} name='VSCode' />
					<SkillBadge icon={CursorIcon} name='Cursor' />
					<SkillBadge icon={FiFigma} name='Figma' />
					<SkillBadge icon={SiVercel} name='Vercel' />
					<SkillBadge icon={SiNpm} name='Npm' />
					<SkillBadge icon={SiGit} name='Git' />
					<SkillBadge icon={SiMongodb} name='MongoDB' />
				</div>
				<div className={classes.profile}>
					<h1>{translations[language].projects} 🛠️</h1>
				</div>
				<p className={classes.subtitle}>
					{translations[language].projects_info}
				</p>
				<div className={classes.projects_list}>
					{isLoading ? (
						<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary-text)' }}>
							Loading...
						</div>
					) : error ? (
						<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary-text)' }}>
							{error}
						</div>
					) : topRepos.length !== 0 ? (
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						topRepos.map((repo: Record<string, any>) => {
							return (
								<ProjectCard
									key={repo.id || repo.name}
									name={repo.name}
									description={repo.description || 'No description'}
									stars={repo.stargazers_count || 0}
									forks={repo.forks_count || 0}
									language={repo.language}
									full_name={repo.full_name}
									html_url={repo.html_url}
								/>
							);
						})
					) : (
						<div style={{ textAlign: 'center', padding: '2rem', color: 'var(--secondary-text)' }}>
							No projects found
						</div>
					)}
				</div>
			</section>
		</>
	);
};
