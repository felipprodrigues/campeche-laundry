# Horários da Lavanderia

Página estática (React + TypeScript + Vite) mostrando os horários da lavanderia do condomínio, com indicador de aberto/fechado ao vivo (horário de São Paulo).

## Rodar localmente

```bash
npm install
npm run dev
```

## Atualizar horários, máquinas ou limite de uso

Edite `src/schedule.ts` — nenhum outro arquivo precisa mudar:

- `scheduleRules`: lista ordenada de regras de horário com data de início/fim. Para anunciar uma mudança futura, adicione uma nova entrada com `validFrom`.
- `machines`: quantidade de máquinas de lavar e secadoras.
- `weeklyLimitPerUnit`: limite de usos por semana por unidade.

## Deploy no Vercel (grátis)

1. Suba este projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), clique em "New Project" e importe o repositório.
3. O Vercel detecta automaticamente o framework Vite — não é preciso configurar nada, apenas confirmar o deploy.
4. Compartilhe o link gerado (ex.: `https://seu-projeto.vercel.app`) no grupo do WhatsApp do condomínio.

Qualquer alteração enviada para a branch principal do GitHub gera um novo deploy automaticamente.

## Autor

Feito por [Felipe Rodrigues](https://github.com/felipprodrigues).
