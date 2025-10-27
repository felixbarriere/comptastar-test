'use client';

import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  href?: string;
}

export default function Header({
  logoSrc = '/logo.png',
  logoAlt = 'Logo',
  href = '/'
}: HeaderProps) {
  return (
    <header style={{ display: 'flex', alignItems: 'center' }}>
      <Link href={href}>
        <Image src={logoSrc} alt={logoAlt} width={250} height={250} />
      </Link>
    </header>
  );
}
