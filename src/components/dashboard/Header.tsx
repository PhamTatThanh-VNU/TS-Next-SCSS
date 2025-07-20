'use client';

import { useAuth } from '@/context/AuthContext';
import { BiLogOut, BiUser } from 'react-icons/bi';

export default function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <h1>Spotify Clone</h1>
        </div>

        <div className="header__user">
          <div className="header__user-info">
            <div className="header__avatar">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} />
              ) : (
                <BiUser />
              )}
            </div>
            <span className="header__username">
              {user?.displayName || 'User'}
            </span>
          </div>

          <button 
            className="header__logout"
            onClick={handleSignOut}
            title="Đăng xuất"
          >
            <BiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}