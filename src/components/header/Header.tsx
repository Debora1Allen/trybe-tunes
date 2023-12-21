import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import styles from './Header.module.css';

function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const response = await getUser();
      setUser(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <header className={styles.header} data-testid="header-component">
    <NavLink to="/search" className={styles.link} data-testid="link-to-search">
      <span className={styles.linkIcon}>🔍</span> Search
    </NavLink>
    <NavLink to="/favorites" className={styles.link} data-testid="link-to-favorites">
      <span className={styles.linkIcon}>⭐</span> Favorites
    </NavLink>
    <NavLink to="/profile" className={styles.link} data-testid="link-to-profile">
      <span className={styles.linkIcon}>👤</span> Profile
    </NavLink>

    <div className={styles.userSection} data-testid="header-user-name">
      <img
        src={user?.avatarUrl || 'default-avatar.jpg'} // Replace 'default-avatar.jpg' with the default avatar image
        alt="User Avatar"
        className={styles.userAvatar}
      />
      {user?.name}
    </div>
  </header>
  );
}
export default Header;
