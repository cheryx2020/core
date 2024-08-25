import React from 'react';
import styles from './Input.module.scss';

const Input = ({ id, type, value, onChange, required }) => {
    return (
        <div key={id} className={styles.inputContainer}>
            <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={styles.textarea}
                />
            ) : (
                <input
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
