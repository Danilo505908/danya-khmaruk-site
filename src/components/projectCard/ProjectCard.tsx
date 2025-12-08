import { motion } from 'framer-motion';
import { AiOutlineStar } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';
import classes from './ProjectCard.module.css';

const Languages: Record<string, string> = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	HTML: '#d25735',
	CSS: '#563d7c',
	SCSS: '#cf649a',
	Python: '#3776ab',
	'C++': '#00599c',
	Java: '#ed8b00',
	'C#': '#239120',
	PHP: '#777bb4',
	Ruby: '#cc342d',
	Go: '#00add8',
	Rust: '#000000',
	Swift: '#fa7343',
	Kotlin: '#0095d5',
	Default: '#586e75',
};

interface ProjectCardProps {
	name: string;
	description: string;
	stars: number;
	forks: number;
	language: string | null;
	full_name?: string;
	html_url?: string;
}

const ProjectCard = ({ name, description, stars, forks, language, full_name, html_url }: ProjectCardProps) => {
	const repoUrl = html_url || (full_name ? `https://github.com/${full_name}` : `https://github.com/Danilo505908/${name}`);
	
	return (
		<a
			href={repoUrl}
			rel='noreferrer'
			target='_blank'
		>
			<div className={classes.project}>
				<h1>{name}</h1>
				<p>{description}</p>
				<div className={classes.language_data}>
					{language && (
						<div className={classes.language}>
							<motion.div
								className={classes.language_color}
								style={{
									background: Languages[language] || Languages.Default,
									border: `solid 3px ${Languages[language] || Languages.Default}`,
								}}
							/>
							{language}
						</div>
					)}

					<div className={classes.stats}>
						<AiOutlineStar className='mr-1 w-4 h-4' /> {stars}
					</div>
					<div className={classes.stats}>
						<BiGitRepoForked className='mr-1 w-4 h-4' /> {forks}
					</div>
				</div>
			</div>
		</a>
	);
};

export default ProjectCard;
