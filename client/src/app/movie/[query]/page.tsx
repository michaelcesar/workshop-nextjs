import axios from 'axios';
import styles from '../page.module.css';
import Image from 'next/image';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '56999b8ce4dbcc234799d6ab607bafd6';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string; 
}

const Result = async ({ params }: { params: { query: string } }) => {
  let movies: Movie[] = [];
  let error: string | null = null;

  try {
    if (!params.query) throw new Error('Query parameter is missing');

    const response = await axios.get(`${API_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: params.query,
      },
    });

    movies = response.data.results;

    if (!movies.length) throw new Error('No movies found');
  } catch (err: any) {
    error = err.message || 'Error fetching movies';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <h1 className={styles.h1}>Movies:</h1>
            <ul className={styles.movieList}>
              {movies.map((movie) => (
                <li key={movie.id} className={styles.movieItem}>
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={50}
                      height={100}
                      className={styles.movieImage}
                    />
                  )}
                  <h2 className={styles.movieTitle}>{movie.title}</h2>
                  Lançamento:<br></br>
                  {movie.release_date && (
                    <p className={styles.movieYear}>
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Result;
