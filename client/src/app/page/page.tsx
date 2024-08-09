'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleClick = () => {
    if (input) {
      router.push(`/movie/${encodeURIComponent(input)}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Image
          src="/book.png"
          alt="logo book"
          className={styles.vercelLogo}
          width={100}
          height={100}
          priority
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Digite o nome de um livro"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>Buscar</button>
      </div>
    </div>
  );
}