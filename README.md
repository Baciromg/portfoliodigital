# DevPortfolio

Projeto Final — UC02834 (IEFP, Formação Profissional).
Plataforma de portfólios para programadores.

## Versão escolhida

**VERSÃO A — Next.js (Stack Moderna Fullstack)**
Next.js 16 · TypeScript · Turso (libSQL) · Drizzle ORM · Better Auth · Tailwind CSS · shadcn/ui

## Credenciais do formador

<!-- TODO: preenche depois de criares o registo do formador com o Better Auth -->
- Email: `formador@formador.com`
- Password: `Formador_[definir]` (ex.: `Formador_2026Alcantara`)

> Cria esta conta através da página de registo assim que o Better Auth
> estiver ligado, e atualiza a password acima e no relatório.

## Stack e estrutura

```
devportfolio/
├── app/
│   ├── page.tsx                     # Home pública
│   ├── portfolios/page.tsx          # Lista de portfólios + filtro por tecnologia
│   ├── portfolio/[id]/page.tsx      # Portfólio público de um formando
│   ├── projeto/[id]/page.tsx        # Sandbox / detalhe dinâmico do projeto
│   ├── about_me/page.tsx
│   ├── contactos/page.tsx
│   ├── dashboard/                   # Área protegida (formando + formador)
│   │   ├── layout.tsx               # Guarda de sessão (Better Auth)
│   │   ├── page.tsx                 # Visão geral
│   │   ├── projects/                # CRUD de projetos
│   │   └── profile/                 # Edição de perfil
│   ├── loading.tsx / not-found.tsx / error.tsx
│   └── layout.tsx
├── actions/                         # Server Actions (mutações)
│   ├── projects.ts
│   └── profile.ts
├── db/
│   ├── schema.ts                    # Schema Drizzle (users, technologies, projects, project_technologies)
│   ├── queries.ts                   # Acesso a dados (SELECT/INSERT/UPDATE/DELETE)
│   └── seed.ts                      # Popula a tabela de tecnologias
├── lib/
│   ├── auth.ts                      # Better Auth (a completar)
│   └── session.ts                   # Helper de sessão usado pelas páginas/actions
├── components/
│   ├── ui/                          # Primitivos (Button, Input, Card, ...)
│   ├── ProjectCard.tsx
│   ├── ProjectSandbox.tsx
│   ├── ProjectForm.tsx / ProfileForm.tsx
│   └── navbar.tsx / footer.tsx / theme-toggle.tsx
└── auth-schema.ts                   # Schema do Better Auth (a rever — ver nota abaixo)
```

## O que falta fazer (autenticação — Better Auth)

Este projeto foi deixado propositadamente incompleto na parte de autenticação
para seres tu a implementá-la. Falta:

1. **Páginas `/login` e `/register`** (ainda não existem em `app/`).
2. **Middleware / verificação de sessão** — o `lib/session.ts` já expõe
   `getCurrentSession()`, `getCurrentUserId()` e `requireUserId()` prontos a
   usar; as páginas do dashboard e as Server Actions já as chamam.
3. **Revê `auth-schema.ts`**: neste momento usa `pgTable` (Postgres), mas o
   resto do projeto usa Turso/SQLite (`db/schema.ts` com `sqliteTable`) e a
   tabela `users` (plural) em vez de `user` (singular, como o Better Auth cria
   por omissão). `lib/auth.ts` já tenta mapear `user: schema.users`, mas
   confirma que o adapter do Better Auth aceita bem esta correspondência com
   `sqliteTable`, ou gera um novo `auth-schema.ts` para SQLite.
4. Criar a conta do formador (ver secção "Credenciais do formador").

Tudo o resto (schema comum, CRUD de projetos, área pública, portfólios,
sandbox de projeto, tema claro/escuro, loading/not-found/error) já está
implementado.

## A correr localmente

```bash
npm install
npm run db:push     # aplica o schema à base de dados Turso
npm run db:seed      # popula a tabela de tecnologias
npm run dev
```

Variáveis de ambiente necessárias (`.env`):

```
Turso_URl=
Turso_Token=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
```

## Deploy

<!-- TODO: adiciona aqui o link do deploy (Vercel/Netlify/Render) -->
Link: _por preencher_
