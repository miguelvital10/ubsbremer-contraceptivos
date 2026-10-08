import { useState } from 'react';
import { METODOS } from '../data/metodos.js';
import { ArrowDown, ArrowRight, ClockIcon } from '../components/Icon.jsx';

const FILTROS = [
  ['todos', 'Todos'],
  ['sem-hormonio', 'Sem hormônio'],
  ['hormonal', 'Com hormônio'],
  ['longa', 'Longa duração'],
  ['ist', 'Protegem contra IST'],
  ['definitivo', 'Definitivos'],
  ['emergencia', 'Emergência'],
];

export function Home() {
  const [filtro, setFiltro] = useState('todos');
  const cards = METODOS.filter((x) => filtro === 'todos' || x.grupos.includes(filtro));

  const scrollToMetodos = () => {
    const el = document.getElementById('metodos');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <main>
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 20px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 40, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
          <div className="rise rise-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="tag" style={{ background: 'oklch(0.9 0.045 8)', color: 'oklch(0.38 0.1 8)', fontSize: 13, padding: '5px 14px' }}>Outubro Rosa</span>
            <span className="tag tag-accent-2" style={{ fontSize: 13, padding: '5px 14px' }}>Gratuito pelo SUS</span>
          </div>
          <h1 className="rise rise-2" style={{ fontSize: 'clamp(38px, 6.4vw, 66px)', lineHeight: 1.02, margin: 0, textWrap: 'balance' }}>Conheça os métodos contraceptivos do SUS</h1>
          <p className="rise rise-3" style={{ fontSize: 18, margin: 0, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>Escolha um método para ver como ele funciona, como usar e onde conseguir na UBS Bremer. A escolha é sua, feita com informação e junto com a equipe de saúde.</p>
          <div className="rise rise-4" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 4 }}>
            <button className="btn btn-primary" onClick={scrollToMetodos} style={{ minHeight: 52, padding: '0 26px', fontSize: 17 }}>
              Ver os métodos
              <ArrowDown />
            </button>
          </div>
        </div>
        <div className="rise rise-3" style={{ position: 'relative', padding: 18 }}>
          <div className="float-a" style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'oklch(0.86 0.06 8)', top: -6, right: '8%' }} />
          <div className="float-b" style={{ position: 'absolute', width: 70, height: 70, borderRadius: '50%', background: 'var(--color-accent-2-300)', bottom: 4, left: '2%' }} />
          <div style={{ position: 'relative', margin: -14, borderRadius: '34% 42% 38% 44% / 38% 36% 44% 40%', overflow: 'hidden', aspectRatio: '6 / 5', boxShadow: 'var(--shadow-md)' }}>
            <img className="washed" src="/assets/ubs-banner.png" alt="Pessoas sendo atendidas na recepção de uma Unidade Básica de Saúde" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% 35%' }} />
          </div>
        </div>
      </section>

      <section id="metodos" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px 48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'clamp(30px, 4.4vw, 44px)', margin: 0 }}>Escolha um método</h2>
          <p style={{ margin: 0, color: 'var(--color-neutral-800)', maxWidth: 620 }}>Toque em um cartão para ver as informações. Use os filtros para encontrar opções com as características que você procura.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26 }}>
          {FILTROS.map(([k, label]) => {
            const active = filtro === k;
            return (
              <button
                key={k}
                onClick={() => setFiltro(k)}
                style={{
                  minHeight: 42, padding: '0 18px', borderRadius: 999,
                  border: active ? '1.5px solid var(--color-accent)' : '1.5px solid var(--color-divider)',
                  background: active ? 'var(--color-accent)' : 'transparent',
                  color: active ? 'var(--color-bg)' : 'var(--color-text)',
                  font: 'inherit', fontSize: 15, fontWeight: active ? 600 : 400,
                  cursor: 'pointer', transition: 'all .2s',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
          {cards.map((c) => (
            <a
              key={c.id}
              className="card-link"
              href={`#/metodo/${c.id}`}
              style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'var(--color-text)', background: 'var(--color-surface)', borderRadius: 32, overflow: 'hidden' }}
            >
              <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', margin: '10px 10px 0', borderRadius: 24 }}>
                <img className="washed" src={c.img} alt={c.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 18px 18px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 21, lineHeight: 1.15 }}>{c.nome}</div>
                    <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', marginTop: 2 }}>{c.sub}</div>
                  </div>
                  <img
                    src={c.ist ? '/assets/icons/protege-ist.svg' : '/assets/icons/nao-protege-ist.svg'}
                    alt={c.ist ? 'Protege contra IST' : 'Não protege contra IST'}
                    title={c.ist ? 'Protege contra IST' : 'Não protege contra IST'}
                    style={{ width: 36, height: 36, flex: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
                  <span className="tag tag-neutral" style={{ fontSize: 12 }}>{c.hormonio}</span>
                  {c.urgente ? (
                    <span className="tag" style={{ fontSize: 12, background: 'oklch(0.9 0.045 8)', color: 'oklch(0.38 0.1 8)' }}>Quanto antes, melhor</span>
                  ) : (
                    <span className="tag tag-accent" style={{ fontSize: 12 }}>{c.duracaoTag}</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 20px 56px' }}>
        <div style={{ background: 'var(--color-accent-2-100)', borderRadius: 40, padding: 'clamp(24px, 4vw, 44px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-accent-2)', color: 'var(--color-bg)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-heading)', fontSize: 20 }}>1</span>
            <h3 style={{ margin: 0, fontSize: 22, color: 'var(--color-accent-2-900)' }}>Não existe um método melhor para todo mundo</h3>
            <p style={{ margin: 0, color: 'var(--color-accent-2-800)' }}>Cada pessoa tem uma história e uma rotina. A escolha é individual e pode mudar ao longo da vida.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <img src="/assets/icons/protege-ist.svg" alt="" style={{ width: 44, height: 44 }} />
            <h3 style={{ margin: 0, fontSize: 22, color: 'var(--color-accent-2-900)' }}>Só a camisinha protege contra IST</h3>
            <p style={{ margin: 0, color: 'var(--color-accent-2-800)' }}>Os preservativos externo e interno reduzem o risco de infecções sexualmente transmissíveis. Os outros métodos não protegem.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <img src="/assets/icons/onde-conseguir.svg" alt="" style={{ width: 44, height: 44 }} />
            <h3 style={{ margin: 0, fontSize: 22, color: 'var(--color-accent-2-900)' }}>A equipe avalia cada caso</h3>
            <p style={{ margin: 0, color: 'var(--color-accent-2-800)' }}>Este site informa, mas não substitui a consulta. Converse com a equipe da UBS Bremer antes de começar.</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px 64px' }}>
        <a className="pde-cta" href="#/metodo/pilula-emergencia">
          <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'oklch(0.97 0.015 8)', display: 'grid', placeItems: 'center', flex: 'none' }}>
            <ClockIcon />
          </span>
          <span style={{ flex: 1, minWidth: 160 }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 20 }}>Teve uma relação sem proteção?</span>
            <span style={{ display: 'block', fontSize: 15 }}>Veja a pílula do dia seguinte. Quanto antes for tomada, melhor.</span>
          </span>
          <span className="pde-arrow"><ArrowRight /></span>
        </a>
      </section>
    </main>
  );
}
