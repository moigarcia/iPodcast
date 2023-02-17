import React, { MouseEventHandler } from 'react';
import './Button.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    action: MouseEventHandler;
    disabled?: boolean;
    text: string;
    className?: string;
    styles?: any;
}

const Button = ({ action, disabled, text, className, type, name, styles }: IProps) => (
    <button
        type={type}
        disabled={disabled}
        onClick={action}
        className={`Button ${className}`}
        name={name}
        style={styles}
        data-testid="button"
    >
        <span>{text}</span>
    </button>
);

export default Button;
