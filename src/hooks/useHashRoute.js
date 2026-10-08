import { useEffect, useState } from 'react';

function parse(hash) {
  const [page, id] = (hash || '').replace(/^#\/?/, '').split('/');
  if (page === 'metodo' && id) return { page: 'metodo', id };
  if (page === 'interesse') return { page: 'interesse', id: id || '' };
  if (page === 'equipe') return { page: 'equipe' };
  return { page: 'home' };
}

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return parse(hash);
}
