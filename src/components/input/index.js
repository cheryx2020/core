import React from 'react';
import styles from './Input.module.scss';

const Input = ({ id, type, value, onChange, required, ...rest }) => {
    return (
        <div key={id} style={rest.style ?? {}} className={styles.inputContainer}>
            { id ? <label htmlFor={id}>{id.charAt(0)?.toUpperCase() + id.slice(1)}</label> : null }
            {type === 'textarea' ? (
                <textarea
                    {...rest}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`${rest.className} ${styles.textarea}`}
                />
            ) : (
                <input
                    {...rest}
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`${rest.className} ${styles.input}`}
                />
            )}
        </div>
    );
};

export default Input;
