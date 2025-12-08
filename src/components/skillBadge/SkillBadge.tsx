import { IconType } from 'react-icons';
import { Tooltip } from 'react-tooltip';
import { ReactElement } from 'react';

import classes from './SkillBadge.module.css';

interface SkillBadgeProps {
	name: string;
	icon: IconType | (() => ReactElement);
}

export const SkillBadge = ({ name, icon }: SkillBadgeProps) => {
	const renderIcon = () => {
		if (typeof icon === 'function' && icon.prototype === undefined) {
			// It's a React component
			const IconComponent = icon as (props?: { className?: string }) => ReactElement;
			return <IconComponent className={classes.tech_icon} />;
		}
		// It's an IconType from react-icons
		const IconTypeComponent = icon as IconType;
		return IconTypeComponent({ className: classes.tech_icon });
	};

	return (
		<>
			<span
				className={classes.tech_icon_wrapper}
				data-tooltip-id={name}
				data-tooltip-content={name}
			>
				{renderIcon()}
			</span>
			<Tooltip className={classes.tippy} id={name} />
		</>
	);
};
