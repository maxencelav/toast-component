import React from 'react';
import { ToastContext } from '../ToastProvider';

import Toast from '../Toast';
import useEscapeKey from '../../hooks/useEscapeKey';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, dismissAllToasts } = React.useContext(ToastContext);

  useEscapeKey(dismissAllToasts);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            id={toast.id}
            variant={toast.variant}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
