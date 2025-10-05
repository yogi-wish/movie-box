
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { API_BASE } from '../../lib/api';

export default function EditMovie() {
  const r = useRouter();
  const { id } = r.query;
  const [movie, setMovie] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/movies/${id}`).then(res => res.json()).then(setMovie);
  }, [id]);

  useEffect(() => { if (movie) { setTitle(movie.title); setYear(movie.publishingYear); } }, [movie]);

  async function submit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('title', title);
      form.append('publishingYear', String(year));
      if (file) form.append('poster', file);

      const res = await fetch(`${API_BASE}/movies/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      });
      if (!res.ok) {
        setMessage('Error updating');
        return;
      }
      setMessage('Updated.');
    } catch (err) {
      setMessage('Error');
    }
  }

  if (!movie) return <div>Loading...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto card">
        <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Publishing Year</label>
            <input className="input" value={year} onChange={e => setYear(e.target.value)} type="number" />
          </div>
          <div>
            {movie.posterPath && <img src={`${API_BASE}${movie.posterPath}`} className="poster" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Replace Poster</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
          {message && <div className="text-green-600">{message}</div>}
        </form>
      </div>
    </main>
  );
}
