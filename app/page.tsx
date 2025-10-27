'use client';

import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Header logoSrc="/logo.png" logoAlt="Mon Logo" />
      <div style={{ textAlign: 'center', width: "100%" }}>
        <div className='home-nav'>
          <h1>Projet Comptastar</h1>

          <nav style={{ margin: '2rem' }}>
            <Link href="/contacts" className="link-bold-underline">
              Gérez vos contacts
            </Link>
          </nav>
          <nav>
          <Link href="https://www.comptastar.fr/" className="link-bold-underline">
              Demander un devis
            </Link>
          </nav>
        </div>
      </div>

    </main>
  );
}