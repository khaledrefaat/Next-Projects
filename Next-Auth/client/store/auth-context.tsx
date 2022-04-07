import { createContext, useEffect, useState } from 'react';

interface Auth {
  userId: string;
  token: string;
  email: string;
  expirationDate: string | Date;
}

interface AuthContextInterface {
  auth: Auth | null | undefined;
  login: (data: Auth) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  auth: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null | undefined>(null);

  function login(data: Auth) {
    console.log(data);
    const tokenExpirationDate =
      data.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setAuth({ ...data, expirationDate: tokenExpirationDate });
    localStorage.setItem(
      'userData',
      JSON.stringify({ ...data, expirationDate: tokenExpirationDate })
    );
  }

  function logout() {
    setAuth(undefined);
    localStorage.removeItem('userData');
  }

  useEffect(() => {
    const storedData: Auth = JSON.parse(
      localStorage.getItem('userData') as string
    );
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      login(storedData);
    } else {
      logout();
    }
  }, []);

  const context = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
