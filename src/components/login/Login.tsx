import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import logo from '../../assets/logo.svg';
import styles from './Login.module.css';

function Login() {
  const [name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleEnterClick = async () => {
    if (name.length >= 3) {
      setLoading(true);
      try {
        await createUser({ name });
        navigate('/search');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={ styles.container }>
      <img src={ logo } className={ styles.logo } alt="Logo" />
      <form className={ styles.form }>
        <label className={ styles.label }>
          <input
            type="text"
            value={ name }
            onChange={ handleNameChange }
            data-testid="login-name-input"
            placeholder="Qual é o seu nome?"
            className={ styles.input }
          />
        </label>
        <button
          type="button"
          onClick={ handleEnterClick }
          disabled={ name.length < 3 }
          data-testid="login-submit-button"
          className={ styles.button }
        >
          Entrar
        </button>
      </form>
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingDots}></div>
          <div className={styles.loadingDots}></div>
          <div className={styles.loadingDots}></div>
          <div className={styles.loadingText}>Carregando</div>
        </div>
      )}
    </div>
  );
}

export default Login;
