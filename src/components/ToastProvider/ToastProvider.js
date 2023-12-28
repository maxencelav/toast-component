import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, variant) => {
    setToasts([
      ...toasts,
      {
        // generating a random id to make sure React doesn't complain about duplicate keys
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
  }

  const dismissToast = (id) => {
    // remove the toast with the given id from the list of toasts
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  const dismissAllToasts = () => {
    setToasts([]);
  }

  return (
    <ToastContext.Provider value={{toasts, addToast, dismissToast, dismissAllToasts}}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
