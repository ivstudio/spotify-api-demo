import React, { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = JSX.IntrinsicElements['button'];
interface Props extends ButtonProps {
	children: ReactNode | ReactNode[];
}

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
	<button ref={ref} {...props} className={styles.button}>
		{props.children}
	</button>
));

export default Button;
