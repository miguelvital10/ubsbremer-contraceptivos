# UBS Bremer · Métodos contraceptivos do SUS

Site informativo sobre métodos contraceptivos disponíveis pelo SUS, pensado para a UBS Bremer. Baseado em design feito no Claude e portado para React + Vite para publicar na Vercel.

O formulário "Tenho interesse" monta uma mensagem pronta e abre o WhatsApp da unidade (`+55 47 3522-7550`) para que a usuária apenas toque em **enviar**.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Suba o repositório no GitHub/GitLab/Bitbucket.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta automaticamente o Vite — basta clicar em **Deploy**.
   - Build Command: `npm run build`
   - Output Directory: `dist`

Para publicar sem repositório, basta rodar `npx vercel --prod` dentro desta pasta.

## Configuração

O número de WhatsApp fica em [`src/config.js`](src/config.js). Para trocar, edite:

```js
export const WHATSAPP_NUMBER = '554735227550'; // 55 (país) + DDD + número
```
