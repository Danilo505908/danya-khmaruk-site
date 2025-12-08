import { Translations } from '../interfaces';
import classes from './Projects.module.css';

import goitMarkup from '../assets/goit-markup-hw-06.png';
import starTeam from '../assets/star-team.png';
import artistshubScreenshot from '../assets/artistshub-screenshot.png';
import simplyChocolate from '../assets/simply-chocolate.jpeg';
import { CiDesktop, CiMobile1 } from 'react-icons/ci';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectModalProps {
	isOpen: boolean;
	view: boolean;
	mobile?: string;
	desktop?: string;
	setPicture: (name: string) => void;
	onClose: () => void;
}

export const ProjectModal = ({
	isOpen,
	view,
	mobile,
	desktop,
	setPicture,
	onClose,
}: ProjectModalProps) => {
	return (
		<div
			className={`${classes.modal_overlay} ${isOpen ? '' : classes.is_hidden}`}
		>
			<div className={classes.modal}>
				<button className={classes.modal_close} onClick={onClose}>
					×
				</button>
				<div className={classes.view}>
					{desktop && (
						<CiDesktop
							onClick={() => setPicture('desktop')}
							className={view ? classes.icon : classes.icon_active}
						/>
					)}
					{mobile && (
						<CiMobile1
							onClick={() => setPicture('mobile')}
							className={view ? classes.icon_active : classes.icon}
						/>
					)}
				</div>
				<div className={classes.modal_img_container}>
					<img src={view ? mobile : desktop} alt='' />
				</div>
			</div>
		</div>
	);
};

interface ProjectItemProps {
	project: {
		name: string;
		href?: string;
		tools: string[];
		description: string;
	};
	mobile?: string;
	desktop?: string;
}

export const ProjectItem = ({ project, mobile, desktop }: ProjectItemProps) => {
	const [view, setView] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	function modalOpen() {
		setIsModalOpen(true);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function modalCLose() {
		setIsModalOpen(false);
		document.body.classList.toggle('is-scroll-disabled');
	}

	function setPicture(name: string) {
		if (name === 'desktop' && view != false) {
			setView(false);
		}

		if (name === 'mobile' && view != true) {
			setView(true);
		}
	}

	return (
		<>
			<div className={classes.portfolio}>
				<div className={classes.href}>
					<h1>{project.name}</h1>
					<a
						href={project.href}
						target='_blank'
						rel='noreferrer'
						className={classes.href_a}
					>
						{project.href ? (
							<FiExternalLink className={classes.href_icon} />
						) : (
							<FiExternalLink className={classes.href_icon_nolink} />
						)}
					</a>
				</div>
				<div className={classes.img_container} onClick={modalOpen}>
					<img src={view ? mobile : desktop} alt='' />
				</div>
				<div className={classes.info}>
					<div className={classes.view}>
						{desktop && (
							<CiDesktop
								onClick={() => setPicture('desktop')}
								className={view ? classes.icon : classes.icon_active}
							/>
						)}
						{mobile && (
							<CiMobile1
								onClick={() => setPicture('mobile')}
								className={view ? classes.icon_active : classes.icon}
							/>
						)}
					</div>
				</div>
				<div className={classes.tools}>
					{project.tools.map(tool => (
						<div key={tool} className={classes.tool}>
							{tool}
						</div>
					))}
				</div>
				<p className={classes.description}>{project.description}</p>
			</div>
			{isModalOpen && (
				<ProjectModal
					isOpen={isModalOpen}
					view={view}
					mobile={mobile}
					desktop={desktop}
					setPicture={setPicture}
					onClose={modalCLose}
				/>
			)}
		</>
	);
};

interface Props {
	translations: Translations;
	language: string;
}

export const Projects = ({ translations, language }: Props) => {
	return (
		<section className={classes.hero}>
			<div className={classes.profile}>
				<h1>{translations[language].portfolio.title} 💻</h1>
			</div>
			<p className={classes.subtitle}>
				{translations[language].portfolio.subtitle}
			</p>
			<div className={classes.portfolio_list}>
				<ProjectItem
					project={translations[language].portfolio.projects['goit-markup']}
					desktop={goitMarkup}
				/>
				<ProjectItem
					project={translations[language].portfolio.projects['star-team']}
					desktop={starTeam}
				/>
				<ProjectItem
					project={translations[language].portfolio.projects['simply-chocolate']}
					desktop={simplyChocolate}
				/>
				<ProjectItem
					project={translations[language].portfolio.projects['sunny-penguins']}
					desktop={artistshubScreenshot}
				/>
			</div>
		</section>
	);
};
