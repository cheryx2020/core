import React from 'react';
import styles from './Input.module.scss';

const Input = ({ id, type, value, onChange, required, ...rest }) => {
    return (
        <div key={id} className={styles.inputContainer}>
            <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
            {type === 'textarea' ? (
                <textarea
                    {...rest}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={styles.textarea}
                />
            ) : (
                <input
                    {...rest}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={styles.input}
                />
            )}
        </div>
    );
};

export default Input;
