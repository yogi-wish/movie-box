
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_BASE } from '../../lib/api';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 6;
  const router = useRouter();

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  async function fetchPage(p = 1) {
    try {
      const res = await fetch(`${API_BASE}/movies?page=${p}&limit=${limit}`);
      const json = await res.json();
      setMovies(json.items);
      setTotal(json.total);
    } catch (err) {
      console.error(err);
      if (err.status === 401) router.push('/login');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m9-9H3" />
              </svg>
            </div>
            <Link href="/movies"><div className="font-bold text-white text-lg">MovieBox</div></Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/movies/new">
              <div className="btn btn-ghost">Add Movie</div>
            </Link>
            <button onClick={logout} className="btn btn-primary">Logout</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map(m => (
            <div key={m.id} className="card">
              {m.posterPath ? <img src={`${API_BASE}${m.posterPath}`} className="poster" /> : <div className="poster bg-gray-100" />}
              <h3 className="text-xl font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{m.publishingYear}</p>
              <div className="flex gap-2">
                <a href={`/movies/${m.id}`} className="btn btn-primary">Edit</a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="btn">Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} className="btn">Next</button>
        </div>
      </main>
    </div>
  );
}
