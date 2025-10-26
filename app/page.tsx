import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Image 
            src="/logo.png" 
            alt="Logo" 
            width={250} 
            height={250}
            className="object-contain mb-5"
          />
      <h1>Projet Comptastar</h1>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/contacts">
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            Aller à la page Contacts
          </button>
        </Link>
      </nav>
    </main>
  );
}