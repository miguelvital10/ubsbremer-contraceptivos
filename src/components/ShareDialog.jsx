import { useEffect, useState } from 'react';
import { CloseIcon, WhatsAppIcon } from './Icon.jsx';

export function ShareDialog({ title, text, url, onClose }) {
  const [copied, setCopied] = useState(false);
  const waHref = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  const canNative = typeof navigator !== 'undefined' && !!navigator.share;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, () => fallback());
    } else {
      fallback();
    }
    function fallback() {
      const t = document.createElement('textarea');
      t.value = url; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
      t.remove();
    }
  };

  const nativeShare = () => {
    navigator.share({ title, text, url }).catch(() => {});
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Compartilhar" style={{ gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="dialog-title" style={{ flex: 1, fontSize: 24 }}>Compartilhar</div>
          <button className="btn btn-secondary btn-icon" aria-label="Fechar" onClick={onClose} style={{ width: 44, height: 44 }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ fontSize: 14 }}>
          <div style={{ fontWeight: 700 }}>{title}</div>
          <div style={{ color: 'var(--color-neutral-700)', wordBreak: 'break-all' }}>{url}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener" style={{ minHeight: 50, fontSize: 16, gap: 10 }}>
            <WhatsAppIcon /> Enviar pelo WhatsApp
          </a>
          <button className="btn btn-secondary" onClick={copy} style={{ minHeight: 50, fontSize: 16 }}>
            {copied ? 'Link copiado!' : 'Copiar link'}
          </button>
          {canNative && (
            <button className="btn btn-ghost" onClick={nativeShare} style={{ minHeight: 44, fontSize: 15, alignSelf: 'center' }}>
              Mais opções
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
