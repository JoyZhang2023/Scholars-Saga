import React from 'react';
import Link from 'next/link';
import ProfileCard from '../../components/ProfileCard';
import '../../styles/global.css';

export default function Home() {
  return (
    <main className="home-page">

      <div className="layout">
        <ProfileCard />
        <div className="content">

          <div className="banner-row">
            <div className="banner">
              <img 
                src="/autumn banner.jpg" 
                alt="Autumn Banner" 
                className="banner-image" 
              />
              <div className="banner-text">
                Scholar's Saga
              </div>
            </div>
            <div className="links-container">
              <div className="links-row">
                <Link href="/profile" className="link">Profile</Link>
                <Link href="/home" className="link">Home</Link>
                <Link href="/about" className="link">About</Link>
                <Link href="/bulletins" className="link">Bulletins</Link>
                <Link href="/resources" className="link">Resources</Link>
                <Link href="/tasks" className="link">Tasks</Link>
                <Link href="/updates" className="link">Updates</Link>
              </div>
            </div>
          </div>

          <div className="placeholder-container">
            <div className="placeholder-column">Latest Articles</div>
            <div className="placeholder-column">Saga's News</div>
            <div className="placeholder-column">Important Tasks</div>
          </div>
        </div>

      </div>
      
    </main>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f7cf6d60c88759ba6a4a177f6ecbfdab89e8f56e
