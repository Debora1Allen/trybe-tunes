import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';

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
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites"> Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>

      <div data-testid="header-user-name">
        { user?.name }
      </div>
    </header>
  );
}
export default Header;
