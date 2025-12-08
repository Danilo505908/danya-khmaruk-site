import classes from './Footer.module.css';

const date = new Date();

const Footer = () => {
	return (
		<div className={classes.footer}>
			<div className={classes.content}>
				<div className={classes.text}>
					<h1>Danya Khmaruk</h1>
					<h2>Frontend Developer • {date.getFullYear()}</h2>
				</div>
				<div className={classes.links}>
					<a
						href='https://github.com/Danilo505908'
						target='_blank'
						rel='noreferrer'
						className={classes.link}
						aria-label='GitHub'
					>
						GitHub
					</a>
					<span className={classes.separator}>•</span>
					<a
						href='https://linkedin.com/in/danyakhmaruk'
						target='_blank'
						rel='noreferrer'
						className={classes.link}
						aria-label='LinkedIn'
					>
						LinkedIn
					</a>
					<span className={classes.separator}>•</span>
					<a
						href='mailto:danahmaruk91@gmail.com'
						className={classes.link}
						aria-label='Email'
					>
						Email
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
