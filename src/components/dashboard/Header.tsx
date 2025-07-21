'use client';

import { useAuth } from '@/context/AuthContext';
import { BiLogOut, BiUser } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

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
          <Link href="/dashboard">
            <h1>Spotify Clone</h1>
          </Link>
        </div>

        <div className="header__user">
          <div className="header__user-info">
            <div className="header__avatar">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName || ''} width={20} height={20}/>
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