import { Button } from 'components/button/Button';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { AuthContext } from 'Context/Context';
import React, { useContext } from 'react';

export const AuthNav = () => {
  const { logout, isAuth } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        <>
          <p>"You are welcome!"</p>
          <Button text="Logout" clickHandler={logout} />
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};
