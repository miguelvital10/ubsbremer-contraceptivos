export function Footer() {
  return (
    <footer style={{ background: 'var(--color-neutral-200)', marginTop: 8 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '36px 20px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 24, fontSize: 14, color: 'var(--color-neutral-800)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--color-text)' }}>UBS Bremer</div>
          <div>Material educativo do Outubro Rosa sobre os métodos contraceptivos disponíveis pelo SUS. Não substitui a consulta com profissional de saúde.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>Fontes</div>
          <div>Conteúdo: Matriz técnica fornecida pela docente (4ª fase de Medicina, IESC). Imagens ilustrativas geradas por inteligência artificial (Google Gemini).</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>Navegação</div>
          <a href="#/">Todos os métodos</a>
          <a href="#/interesse">Tenho interesse</a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--color-divider)', padding: '20px', textAlign: 'center', fontSize: 13, color: 'var(--color-neutral-800)', lineHeight: 1.6 }}>
        <div>Realizado por Maria Luiza Nascimento Westphal, Maria Eduarda Niehues, Giovana Batista Urdapilleta Rodrigues e Isabella Dumke Bohm</div>
        <div>Orientada por Dra. Mariane Maisa Lembeck</div>
      </div>
    </footer>
  );
}
