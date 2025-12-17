import { useState } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import classes from './ContactForm.module.css';
import { Translations } from '../../interfaces';

interface Props {
	translations: Translations;
	language: string;
}

const ContactForm = ({ translations, language }: Props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [errMsg, setErrMsg] = useState<string>('');

	const emailRegex = new RegExp(
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (name.trim() == '' || email.trim() == '' || message.trim() == '') {
			e.preventDefault();
			setErrMsg(translations[language].contact_me.error);
			return;
		}
		if (!emailRegex.test(email)) {
			e.preventDefault();
			setErrMsg(translations[language].contact_me.error_email);
			return;
		}
		// Якщо валідація пройшла, форма відправиться стандартним HTML способом
		setErrMsg('');
	};

	return (
		<div className={classes.message_wrapper}>
			<motion.form
				key={'contactForm'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.25, ease: 'easeOut' }}
				className="inputCom"
				action="https://formspree.io/f/xldlqwyl"
				method="POST"
				onSubmit={handleSubmit}
			>
				<h1 className={classes.message_label}>
					{translations[language].contact_me.name || 'NAME'}
				</h1>
				<input
					placeholder={translations[language].contact_me.name_placeholder || 'Your name'}
					type='text'
					name="name"
					value={name}
					onChange={e => setName(e.target.value)}
					className={classes.message_input}
					required
				/>

				<h1 className={classes.message_label}>
					{translations[language].contact_me.email}
				</h1>
				<input
					placeholder='example@gmail.com'
					type='email'
					name="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					className={classes.message_input}
					required
				/>

				<h1 className={classes.message_label}>
					{translations[language].contact_me.message}
				</h1>
				<textarea
					placeholder={translations[language].contact_me.message_placehorder}
					name="message"
					value={message}
					onChange={e => setMessage(e.target.value)}
					className={classes.message_textarea}
					required
				/>

				<div className={classes.message_btn_wrapper}>
					<p className={classes.message_text}>{errMsg}</p>

					<button type="submit" className={classes.message_btn}>
						<span className='mt-[2px]'>
							{translations[language].contact_me.send}
						</span>
						<RiSendPlane2Fill className={classes.message_btn_icon_send} />
					</button>
				</div>
			</motion.form>
		</div>
	);
};

export default ContactForm;
