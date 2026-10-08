import { useEffect, useState } from 'react';
import { METODOS } from '../data/metodos.js';
import { WHATSAPP_NUMBER } from '../config.js';
import { ArrowLeft, ChevronDown, CheckIcon, WhatsAppIcon } from '../components/Icon.jsx';

const OPCOES = [
  ...METODOS.map((x) => ({ id: x.id, nome: x.nome, ist: x.ist })),
  { id: 'nao-sei', nome: 'Ainda não sei, quero orientação', ist: null },
];

function iconFor(id) {
  if (id === 'nao-sei') return '/assets/icons/tenho-interesse.svg';
  const m = METODOS.find((x) => x.id === id);
  return m && m.ist ? '/assets/icons/protege-ist.svg' : '/assets/icons/nao-protege-ist.svg';
}

function mask(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
  return '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
}

function buildWhatsAppUrl({ nome, tel, metodoNome }) {
  const linhas = [
    'Olá, equipe da UBS Bremer! 👋',
    '',
    'Tenho interesse em conversar sobre métodos contraceptivos.',
    '',
    `*Nome:* ${nome}`,
    `*Telefone/WhatsApp:* ${tel}`,
    `*Método de interesse:* ${metodoNome}`,
    '',
    'Autorizo a equipe a entrar em contato comigo pelo telefone informado.',
  ];
  const text = encodeURIComponent(linhas.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function Interesse({ metodoId }) {
  const fromM = metodoId ? METODOS.find((x) => x.id === metodoId) : null;
  const [form, setForm] = useState({ nome: '', tel: '', metodo: metodoId || '', aut: false });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sentUrl, setSentUrl] = useState('');
  const [ddOpen, setDdOpen] = useState(false);

  useEffect(() => {
    setForm((f) => ({ ...f, metodo: metodoId || f.metodo }));
    setSent(false);
    setErrors({});
  }, [metodoId]);

  const metSel = OPCOES.find((o) => o.id === form.metodo);

  const setF = (patch) => { setForm((f) => ({ ...f, ...patch })); setErrors({}); };

  const submit = (e) => {
    if (e) e.preventDefault();
    const err = {};
    if (form.nome.trim().length < 2) err.nome = 'Escreva seu nome.';
    if (form.tel.replace(/\D/g, '').length < 10) err.tel = 'Informe um telefone com DDD.';
    if (!form.metodo) err.metodo = 'Escolha um método ou "Ainda não sei".';
    if (!form.aut) err.aut = 'Para entrarmos em contato, precisamos da sua autorização.';
    if (Object.keys(err).length) return setErrors(err);

    const metodoNome = (OPCOES.find((o) => o.id === form.metodo) || {}).nome || '—';
    const url = buildWhatsAppUrl({ nome: form.nome.trim(), tel: form.tel, metodoNome });
    setSentUrl(url);
    setSent(true);
    // Abre o WhatsApp (web ou app) em uma nova aba
    window.open(url, '_blank', 'noopener');
  };

  const backHref = fromM ? `#/metodo/${fromM.id}` : '#/';
  const backLabel = fromM ? `Voltar para ${fromM.nome}` : 'Voltar aos métodos';

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px 64px' }}>
      <a href={backHref} className="btn btn-ghost" style={{ fontSize: 15, minHeight: 44, padding: '0 10px', marginLeft: -10 }}>
        <ArrowLeft /> {backLabel}
      </a>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 36, alignItems: 'center', paddingTop: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h1 className="rise rise-1" style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.04, margin: 0 }}>Tenho interesse</h1>
          <p className="rise rise-2" style={{ margin: 0, fontSize: 18, color: 'var(--color-neutral-800)', maxWidth: 460 }}>
            Preencha seus dados e a equipe da UBS Bremer entra em contato para conversar sobre o método. Ao enviar, você será encaminhado(a) para o WhatsApp da unidade.
          </p>
          <img className="rise rise-3" src="/assets/ilustracao-formulario.svg" alt="Mão segurando um celular com um formulário na tela" style={{ width: 'min(100%, 320px)', marginTop: 8 }} />
        </div>

        <div className="rise rise-2" style={{ background: 'var(--color-surface)', borderRadius: 40, padding: 'clamp(22px, 4vw, 36px)', boxShadow: 'var(--shadow-sm)' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <img src="/assets/icons/protege-ist.svg" alt="" style={{ width: 64, height: 64 }} />
              <h2 style={{ margin: 0, fontSize: 28 }}>Mensagem pronta no WhatsApp!</h2>
              <p style={{ margin: 0, fontSize: 16 }}>
                Abrimos o WhatsApp da UBS Bremer com sua mensagem pronta. Se não abriu automaticamente, toque no botão abaixo. Para completar seu interesse, basta <strong>enviar</strong> a mensagem na janela do WhatsApp.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn btn-primary" href={sentUrl} target="_blank" rel="noopener" style={{ minHeight: 48, padding: '0 22px', fontSize: 16, gap: 10 }}>
                  <WhatsAppIcon /> Abrir WhatsApp
                </a>
                <a className="btn btn-secondary" href="#/" style={{ minHeight: 48, padding: '0 22px', fontSize: 16 }}>Voltar aos métodos</a>
                <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ nome: '', tel: '', metodo: form.metodo, aut: false }); }} style={{ minHeight: 48, padding: '0 10px', fontSize: 16 }}>
                  Enviar outro
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="field">
                <label htmlFor="f-nome" style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>Nome</label>
                <input id="f-nome" className="input" value={form.nome} onChange={(e) => setF({ nome: e.target.value })} autoComplete="name" placeholder="Como podemos te chamar?" style={{ minHeight: 50, fontSize: 16, background: 'var(--color-bg)' }} />
                {errors.nome && <div style={{ fontSize: 14, color: 'var(--color-accent-800)', marginTop: 4 }}>{errors.nome}</div>}
              </div>
              <div className="field">
                <label htmlFor="f-tel" style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>Telefone ou WhatsApp</label>
                <input id="f-tel" className="input" type="tel" inputMode="numeric" value={form.tel} onChange={(e) => setF({ tel: mask(e.target.value) })} autoComplete="tel" placeholder="(47) 90000-0000" style={{ minHeight: 50, fontSize: 16, background: 'var(--color-bg)' }} />
                {errors.tel && <div style={{ fontSize: 14, color: 'var(--color-accent-800)', marginTop: 4 }}>{errors.tel}</div>}
              </div>
              <div className="field">
                <label htmlFor="f-met" style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)' }}>Método sobre o qual quer informações</label>
                <div style={{ position: 'relative' }}>
                  <button
                    id="f-met" type="button" onClick={() => setDdOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={ddOpen}
                    style={{ width: '100%', minHeight: 50, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderRadius: 999, border: '1.5px solid var(--color-divider)', background: 'var(--color-bg)', font: 'inherit', fontSize: 16, color: 'var(--color-text)', textAlign: 'left', cursor: 'pointer' }}
                  >
                    {metSel ? (
                      <span style={{ flex: 1 }}>{metSel.nome}</span>
                    ) : (
                      <span style={{ flex: 1, color: 'var(--color-neutral-600)' }}>Selecione um método</span>
                    )}
                    <span style={{ flex: 'none', transform: ddOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s', display: 'grid', placeItems: 'center' }}>
                      <ChevronDown />
                    </span>
                  </button>
                  {ddOpen && (
                    <>
                      <div onClick={() => setDdOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 20 }} />
                      <div role="listbox" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', zIndex: 21, background: 'var(--color-bg)', borderRadius: 26, boxShadow: 'var(--shadow-lg)', padding: 8, maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, animation: 'popIn .25s ease' }}>
                        {OPCOES.map((o) => {
                          const sel = form.metodo === o.id;
                          return (
                            <button
                              key={o.id} type="button" role="option"
                              onClick={() => { setF({ metodo: o.id }); setDdOpen(false); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 46, padding: '0 14px', border: 0, borderRadius: 18, background: sel ? 'var(--color-accent-100)' : 'transparent', font: 'inherit', fontSize: 15, color: 'var(--color-text)', textAlign: 'left', cursor: 'pointer' }}
                              onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = 'var(--color-accent-100)'; }}
                              onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
                            >
                              <img src={iconFor(o.id)} alt="" style={{ width: 26, height: 26, flex: 'none' }} />
                              <span style={{ flex: 1 }}>{o.nome}</span>
                              {sel && <CheckIcon />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
                {errors.metodo && <div style={{ fontSize: 14, color: 'var(--color-accent-800)', marginTop: 4 }}>{errors.metodo}</div>}
              </div>
              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', fontSize: 15, background: 'var(--color-bg)', borderRadius: 22, padding: '14px 16px' }}>
                <input type="checkbox" checked={form.aut} onChange={(e) => setF({ aut: e.target.checked })} style={{ width: 22, height: 22, accentColor: 'var(--color-accent)', flex: 'none', margin: '1px 0 0' }} />
                <span>Autorizo a equipe da UBS Bremer a entrar em contato comigo pelo telefone informado.</span>
              </label>
              {errors.aut && <div style={{ fontSize: 14, color: 'var(--color-accent-800)', marginTop: -10 }}>{errors.aut}</div>}
              <button type="submit" className="btn btn-primary" style={{ minHeight: 54, fontSize: 17, gap: 10 }}>
                <WhatsAppIcon /> Enviar pelo WhatsApp
              </button>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--color-neutral-700)' }}>
                Não pedimos informações de saúde. A avaliação do método é feita depois, na conversa com um profissional. Ao enviar, uma mensagem pronta será aberta no WhatsApp da UBS Bremer; basta tocar em enviar.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
