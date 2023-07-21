export const getLocalStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      const value = localStorage.getItem(key);
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};

export const setLocalStorage = (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeLocalStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(key);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const clearLocalStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
