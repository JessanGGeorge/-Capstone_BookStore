import { Link } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import { writers, getBook } from '../data/books.js';

export default function Writers() {
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">My Writers</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {writers.map((w) => (
          <Card key={w.name} id={encodeURIComponent(w.name)} className="scroll-mt-20 target:border-brand">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-2 font-bold">
                {w.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <p className="font-medium">{w.name}</p>
            </div>
            <p className="line-clamp-4 text-xs text-muted">{w.bio}</p>
            <ul className="mt-3 space-y-1 text-xs">
              {w.books.map((id) => (
                <li key={id}><Link className="text-blue-400 hover:underline" to={`/book/${id}`}>{getBook(id).title}</Link></li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
