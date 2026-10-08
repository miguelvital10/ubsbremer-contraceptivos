import { useState } from 'react';
import { useHashRoute } from './hooks/useHashRoute.js';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { ShareDialog } from './components/ShareDialog.jsx';
import { Home } from './pages/Home.jsx';
import { Metodo } from './pages/Metodo.jsx';
import { Interesse } from './pages/Interesse.jsx';
import { METODOS } from './data/metodos.js';

export default function App() {
  const route = useHashRoute();
  const [shareOpen, setShareOpen] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';

  const metodoAtual = route.page === 'metodo' ? METODOS.find((m) => m.id === route.id) : null;
  const shareUrl = baseUrl + (metodoAtual ? `#/metodo/${metodoAtual.id}` : '');
  const shareTitle = metodoAtual ? `${metodoAtual.nome} · UBS Bremer` : 'Métodos contraceptivos do SUS · UBS Bremer';
  const shareText = metodoAtual
    ? `Veja as informações sobre ${metodoAtual.nome} no SUS (UBS Bremer):`
    : 'Conheça os métodos contraceptivos disponíveis pelo SUS na UBS Bremer:';

  return (
    <div style={{ minHeight: '100vh', fontSize: 16, lineHeight: 1.6, color: 'var(--color-text)', overflowX: 'hidden' }}>
      <Header onShare={() => setShareOpen(true)} />
      {route.page === 'home' && <Home />}
      {route.page === 'metodo' && <Metodo id={route.id} onShare={() => setShareOpen(true)} />}
      {route.page === 'interesse' && <Interesse metodoId={route.id} />}
      <Footer />
      {shareOpen && (
        <ShareDialog
          title={shareTitle}
          text={shareText}
          url={shareUrl}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}
