import { SiTelegram } from 'react-icons/si';
import ContactLink from '../components/contactForm/ContactLink';
import ContactForm from '../components/contactForm/ContactForm';
import AvailabilityStatus from '../components/availabilityStatus/AvailabilityStatus';
import { Translations } from '../interfaces';
import classes from './Contact.module.css';
import contactLinkClasses from '../components/contactForm/ContactLink.module.css';
import { FiMail, FiDownload } from 'react-icons/fi';

interface Props {
	translations: Translations;
	language: string;
}

export const Contact = ({ translations, language }: Props) => {
	return (
		<section className={classes.hero}>
			<div className={classes.profile}>
				<h1>{translations[language].chat} 💬</h1>
			</div>
			<p className={classes.subtitle}>{translations[language].chat_info}</p>
			<AvailabilityStatus translations={translations} language={language} />
			<div className={classes.msg_links_list}>
				<ContactForm translations={translations} language={language} />
				<div className={classes.links_list}>
					<ContactLink
						name='@danyakhmyr'
						icon={
							<SiTelegram
								className={classes.link_icon}
								style={{ color: '#24A1DE' }}
							/>
						}
						link='https://t.me/danyakhmyr'
					/>

					<ContactLink
						name='danahmaruk91@gmail.com'
						icon={<FiMail className={classes.link_icon} />}
						link='mailto:danahmaruk91@gmail.com'
					/>

					<a
						href='/Danya_Hmaruk_Frontend_Developer.pdf'
						download
						className={contactLinkClasses.contact_link}
					>
						<FiDownload className={classes.link_icon} />
						<h1>{translations[language].download_cv}</h1>
					</a>
				</div>
			</div>
		</section>
	);
};
