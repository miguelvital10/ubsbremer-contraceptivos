import { useState } from 'react';
import { METODOS } from '../data/metodos.js';
import { GLOSSARIO } from '../data/glossario.js';
import { ArrowLeft, CalendarIcon, PlusIcon, MinusIcon, InfoIcon, ShareIcon } from '../components/Icon.jsx';

function fmt(v) { return String(v).replace('.', ','); }

const ACESSO_TAGS = {
  livre: 'Sem receita',
  consulta: 'Com consulta na UBS',
  encaminhamento: 'Com encaminhamento',
};

export function Metodo({ id, onShare }) {
  const idx = METODOS.findIndex((x) => x.id === id);
  if (idx < 0) {
    window.location.hash = '#/';
    return null;
  }
  const m = METODOS[idx];
  const prev = METODOS[(idx - 1 + METODOS.length) % METODOS.length];
  const next = METODOS[(idx + 1) % METODOS.length];

  const [open, setOpen] = useState({ como: true });
  const toggle = (k) => setOpen((s) => ({ ...s, [k]: !s[k] }));

  const secDef = [
    { k: 'como', t: 'Como usar', text: m.como },
    { k: 'vant', t: 'Vantagens', list: m.vantagens },
    { k: 'efe', t: 'Efeitos e limitações', list: m.efeitos },
    { k: 'cuid', t: 'Quando é preciso avaliar', text: m.cuidados, note: 'A avaliação individual é sempre feita por um profissional de saúde da UBS Bremer.' },
    { k: 'fert', t: 'E se eu quiser engravidar depois?', text: m.fertilidade },
  ];
  if (m.obs) secDef.push({ k: 'obs', t: 'Importante saber', text: m.obs });

  const nDots = m.eficacia.hab >= 1 ? Math.round(m.eficacia.hab) : 0;
  const same = m.eficacia.hab === m.eficacia.cor;

  const termos = (m.termos || []).filter((t) => GLOSSARIO[t]);

  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '12px 20px 64px' }}>
      <a href="#/" className="btn btn-ghost" style={{ fontSize: 15, minHeight: 44, padding: '0 10px', marginLeft: -10 }}>
        <ArrowLeft /> Voltar aos métodos
      </a>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 32, alignItems: 'center', padding: '12px 0 32px' }}>
        <div className="rise rise-1" style={{ position: 'relative', padding: 10 }}>
          <div className="float-a" style={{ position: 'absolute', width: 90, height: 90, borderRadius: '50%', background: 'oklch(0.86 0.06 8)', top: -4, left: -4 }} />
          <div style={{ position: 'relative', borderRadius: 40, overflow: 'hidden', aspectRatio: '4 / 3', boxShadow: 'var(--shadow-md)' }}>
            <img className="washed" src={m.img} alt={m.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.pos }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="rise rise-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="tag tag-accent" style={{ fontSize: 13, padding: '5px 14px' }}>{m.hormonio}</span>
            <span className="tag tag-accent-2" style={{ fontSize: 13, padding: '5px 14px' }}>{m.duracaoTag}</span>
          </div>
          <h1 className="rise rise-2" style={{ fontSize: 'clamp(36px, 5.6vw, 58px)', lineHeight: 1.04, margin: 0, textWrap: 'balance' }}>{m.nome}</h1>
          <p className="rise rise-2" style={{ margin: 0, fontSize: 18, color: 'var(--color-neutral-800)' }}>{m.sub}</p>
          <p className="rise rise-3" style={{ margin: 0, fontSize: 18, textWrap: 'pretty' }}>{m.oque}</p>
          <p className="rise rise-3" style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-700)' }}>Nome técnico: {m.tecnicoNome}</p>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16, paddingBottom: 28 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--color-surface)', borderRadius: 32, padding: 20 }}>
          <img src={m.ist ? '/assets/icons/protege-ist.svg' : '/assets/icons/nao-protege-ist.svg'} alt="" style={{ width: 52, height: 52, flex: 'none' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, lineHeight: 1.2, marginBottom: 4 }}>
              {m.ist ? 'Protege contra IST' : 'Não protege contra IST'}
            </div>
            <div style={{ fontSize: 15, color: 'var(--color-neutral-800)' }}>{m.istTxt}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--color-surface)', borderRadius: 32, padding: 20 }}>
          <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--color-accent-2-200)', color: 'var(--color-accent-2-800)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <CalendarIcon />
          </span>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, lineHeight: 1.2, marginBottom: 4 }}>Quanto tempo dura</div>
            <div style={{ fontSize: 15, color: 'var(--color-neutral-800)' }}>{m.duracao}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--color-surface)', borderRadius: 32, padding: 20 }}>
          <img src="/assets/icons/onde-conseguir.svg" alt="" style={{ width: 52, height: 52, flex: 'none' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, lineHeight: 1.2, marginBottom: 4 }}>Onde conseguir</div>
            <div style={{ fontSize: 15, color: 'var(--color-neutral-800)' }}>{m.acesso}</div>
            <span className="tag tag-accent" style={{ marginTop: 8, fontSize: 12 }}>{ACESSO_TAGS[m.acessoTipo]}</span>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-neutral-100)', borderRadius: 40, padding: 'clamp(22px, 4vw, 40px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 32, alignItems: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px, 3.6vw, 34px)' }}>Qual a eficácia?</h2>
          <p style={{ margin: 0, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{m.eficacia.txt}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--color-bg)', borderRadius: 24, padding: '14px 20px', minWidth: 150 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 34, lineHeight: 1, color: 'var(--color-accent-700)' }}>{fmt(m.eficacia.hab)}</div>
              <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 6 }}>
                {same ? 'em cada 100, em um ano' : 'em 100, no uso do dia a dia'}
              </div>
            </div>
            {!same && (
              <div style={{ background: 'var(--color-bg)', borderRadius: 24, padding: '14px 20px', minWidth: 150 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 34, lineHeight: 1, color: 'var(--color-accent-2-700)' }}>{fmt(m.eficacia.cor)}</div>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 6 }}>em 100, no uso correto e sempre</div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4 }}>
            {Array.from({ length: 100 }, (_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ width: '100%', height: 'auto', display: 'block', color: i < nDots ? 'var(--color-accent)' : 'var(--color-neutral-300)' }}
                fill="currentColor"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
              </svg>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-700)' }}>
            {nDots > 0
              ? 'Cada pessoa representa 1 em cada 100. As coloridas mostram quantas engravidam em um ano, no uso do dia a dia.'
              : 'Cada pessoa representa 1 em cada 100. Com este método, menos de 1 em cada 100 engravida em um ano — por isso nenhuma aparece colorida.'}
          </p>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {secDef.map((s, i) => {
          const isOpen = !!open[s.k];
          return (
            <div key={s.k} style={{ background: 'var(--color-surface)', borderRadius: 32, overflow: 'hidden' }}>
              <button
                onClick={() => toggle(s.k)}
                aria-expanded={isOpen}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'transparent', border: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer', minHeight: 64 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 7%, transparent)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--color-bg)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-heading)', fontSize: 15, color: 'var(--color-accent-700)', flex: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontFamily: 'var(--font-heading)', fontSize: 20, lineHeight: 1.2 }}>{s.t}</span>
                {isOpen ? <MinusIcon /> : <PlusIcon />}
              </button>
              {isOpen && (
                <div style={{ padding: '0 22px 22px 72px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {s.text && <p style={{ margin: 0, fontSize: 16, textWrap: 'pretty', maxWidth: 760 }}>{s.text}</p>}
                  {s.list && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 760 }}>
                      {s.list.map((li, idx2) => (
                        <li key={idx2} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--color-bg)', display: 'grid', placeItems: 'center', flex: 'none', marginTop: 2 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)' }} />
                          </span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--color-accent-2-100)', color: 'var(--color-accent-2-900)', borderRadius: 22, padding: '12px 16px', fontSize: 15, maxWidth: 760 }}>
                      <span style={{ flex: 'none', marginTop: 2 }}><InfoIcon /></span>
                      <span>{s.note}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {termos.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 22 }}>Palavras explicadas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 10 }}>
            {termos.map((t) => (
              <div key={t} style={{ border: '1.5px solid var(--color-divider)', borderRadius: 24, padding: '12px 16px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--color-accent-700)' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</div>
                <div style={{ fontSize: 14, color: 'var(--color-neutral-800)' }}>{GLOSSARIO[t]}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ background: 'oklch(0.92 0.035 8)', borderRadius: 44, padding: 'clamp(24px, 4vw, 40px)', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <img src="/assets/icons/tenho-interesse.svg" alt="" style={{ width: 76, height: 76, flex: 'none', background: 'oklch(0.97 0.015 8)', borderRadius: '50%' }} />
        <div style={{ flex: 1, minWidth: 240, color: 'oklch(0.3 0.08 8)' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 'clamp(24px, 3.4vw, 32px)' }}>Quer conversar sobre este método?</h2>
          <p style={{ margin: 0, fontSize: 16 }}>Deixe seu nome e telefone. A equipe da UBS Bremer entra em contato com você.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href={`#/interesse/${m.id}`} style={{ minHeight: 52, padding: '0 24px', fontSize: 16 }}>Tenho interesse neste método</a>
          <a className="btn btn-secondary" href="#/" style={{ minHeight: 52, padding: '0 22px', fontSize: 16, color: 'oklch(0.3 0.08 8)', borderColor: 'oklch(0.7 0.08 8)' }}>Voltar aos métodos</a>
        </div>
      </section>

      <section style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: 24 }}>
        <a href={`#/metodo/${prev.id}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'var(--color-text)', padding: '12px 18px', borderRadius: 24, border: '1.5px solid var(--color-divider)', minWidth: 200, transition: 'background .2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-accent-100)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>← Método anterior</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>{prev.nome}</span>
        </a>
        <button onClick={onShare} className="btn btn-ghost" style={{ minHeight: 44, fontSize: 15 }}>
          <ShareIcon /> Compartilhar este método
        </button>
        <a href={`#/metodo/${next.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textDecoration: 'none', color: 'var(--color-text)', padding: '12px 18px', borderRadius: 24, border: '1.5px solid var(--color-divider)', minWidth: 200, transition: 'background .2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-accent-100)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
          <span style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Próximo método →</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>{next.nome}</span>
        </a>
      </section>
    </main>
  );
}
