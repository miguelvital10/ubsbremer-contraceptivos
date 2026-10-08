import { BrandIcon, ShareIcon } from './Icon.jsx';

export function Header({ onShare }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
      <nav style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', flexWrap: 'wrap' }}>
        <a href="#/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--color-text)', marginRight: 'auto' }}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'oklch(0.9 0.045 8)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <BrandIcon />
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', lineHeight: 1.1 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-accent-700)' }}>UBS Bremer · Sistema Básico de Saúde</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 19 }}>Escolha com cuidado</span>
          </span>
        </a>
        <button className="btn btn-secondary" aria-label="Compartilhar" onClick={onShare} style={{ minHeight: 44, padding: '0 16px', fontSize: 15, gap: 8 }}>
          <ShareIcon />
          <span>Compartilhar</span>
        </button>
        <a className="btn btn-primary" href="#/interesse" style={{ minHeight: 44, padding: '0 18px', fontSize: 15 }}>Tenho interesse</a>
      </nav>
    </header>
  );
}
