import React from 'react';
import { useState } from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("notice");
  const [toasts, setToasts] = useState([]);


  return (
    <form className={styles.wrapper}
      onSubmit={(event) => {
        event.preventDefault();

        setToasts([
          ...toasts,
          {
            // generating a random id to make sure React doesn't complain about duplicate keys
            id: crypto.randomUUID(),
            message,
            variant,
          },
        ]);

        setMessage('');
        setVariant('notice');
      }}
    >
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={(id) => {
        // remove the toast with the given id from the list of toasts
        setToasts(toasts.filter((toast) => toast.id !== id));
      }
      } />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    type="radio"
                    name="variant"
                    id={id}
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
