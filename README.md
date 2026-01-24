# Rotax1 - Plataforma de Entregas Última Milha

<div align="center">

![Rotax1 Logo](doc/logo-Rotax1.png)

**Plataforma moderna de entregas sob demanda especializada em nichos verticais**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-4.25-green.svg)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-purple.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

</div>

---

## Visão Geral

**Rotax1** é uma plataforma de entregas última milha que conecta clientes, entregadores e transportadoras em um ecossistema integrado. O diferencial é a especialização em nichos verticais com requisitos específicos de manuseio e entrega.

### Nicho Inicial: Medicamentos Veterinários

O mercado pet brasileiro representa **R$ 52 bilhões** com crescimento de 14% ao ano. Clínicas veterinárias e pet shops enfrentam desafios únicos:

- Medicamentos que requerem temperatura controlada
- Urgência em entregas de emergência
- Necessidade de rastreamento em tempo real
- Conformidade com regulamentações sanitárias

### Problema Resolvido

1. **Para Clientes**: Dificuldade em obter entregas rápidas e confiáveis para produtos veterinários
2. **Para Entregadores**: Falta de plataformas especializadas com demanda constante
3. **Para Transportadoras**: Ausência de sistema integrado para receber demandas excedentes

---

## Arquitetura

### Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| **Backend** | Node.js + Fastify + TypeScript |
| **Banco de Dados** | PostgreSQL + PostGIS (geolocalização) |
| **ORM** | Prisma |
| **Cache/Real-time** | Redis + Socket.IO |
| **Mobile** | React Native (Expo) |
| **Web (Cliente/Admin)** | Next.js 14 |
| **Pagamentos** | Mercado Pago (Pix) |
| **Mapas** | Google Maps API |
| **Push Notifications** | Firebase Cloud Messaging |

### Estrutura do Monorepo

```
rotax1/
├── apps/
│   ├── api/                 # API REST (Fastify)
│   │   └── src/
│   │       ├── common/      # Config, errors, middlewares
│   │       └── modules/     # Módulos de feature (auth, orders, etc.)
│   ├── mobile/              # App React Native (Cliente + Entregador)
│   ├── web/                 # Portal do Cliente (Next.js)
│   └── admin/               # Painel Administrativo (Next.js)
├── packages/
│   ├── database/            # Prisma schema e migrações
│   ├── shared/              # Tipos e validações compartilhados
│   └── ui/                  # Componentes UI compartilhados
└── infrastructure/
    └── docker/              # Docker Compose para dev local
```

---

## Funcionalidades Principais

### Para Clientes
- Cadastro e autenticação via email/telefone
- Solicitação de entregas com múltiplos endereços
- Cálculo de preço em tempo real baseado em distância
- Pagamento via Pix (integração Mercado Pago)
- Rastreamento em tempo real do entregador
- Histórico de pedidos e avaliações
- Notificações push de status

### Para Entregadores
- Cadastro com validação de documentos (CNH, veículo)
- Visualização de pedidos disponíveis na região
- Aceite/rejeição de corridas
- Navegação integrada (Google Maps)
- Comprovação de entrega com foto
- Dashboard de ganhos
- Toggle online/offline

### Para Administradores
- Gestão de usuários (clientes, entregadores, transportadoras)
- Aprovação de cadastros de entregadores
- Monitoramento de pedidos em tempo real
- Relatórios financeiros e operacionais
- Configuração de taxas e comissões
- Gestão de regiões de atendimento

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js 20+
- pnpm 8+
- Docker (para banco de dados local)

### Setup

```bash
# Clone o repositório
git clone git@github.com:inematds/RotaX1.git
cd RotaX1

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o banco de dados local
cd infrastructure/docker
docker-compose up -d
cd ../..

# Gere o cliente Prisma
pnpm db:generate

# Rode as migrações
pnpm db:migrate

# Popule o banco com dados de teste
pnpm db:seed

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia todos os apps em modo desenvolvimento |
| `pnpm build` | Compila todos os pacotes |
| `pnpm lint` | Executa o linter em todos os pacotes |
| `pnpm test` | Roda os testes |
| `pnpm db:generate` | Gera o cliente Prisma |
| `pnpm db:migrate` | Executa migrações do banco |
| `pnpm db:seed` | Popula o banco com dados de teste |
| `pnpm db:studio` | Abre o Prisma Studio |

---

## Variáveis de Ambiente

```bash
# Database (Supabase ou PostgreSQL local)
DATABASE_URL="postgresql://postgres:password@localhost:5432/rotax1"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="sua-chave-secreta-minimo-32-caracteres"
JWT_REFRESH_SECRET="sua-chave-refresh-minimo-32-caracteres"

# Google Maps
GOOGLE_MAPS_API_KEY="sua-api-key"

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN="seu-token"
MERCADO_PAGO_WEBHOOK_SECRET="seu-secret"

# Firebase
FIREBASE_PROJECT_ID="seu-projeto"
FIREBASE_PRIVATE_KEY="sua-chave"
FIREBASE_CLIENT_EMAIL="seu-email"
```

---

## API Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/register` | Cadastro de novo usuário |
| POST | `/auth/login` | Login (retorna JWT) |
| POST | `/auth/refresh` | Renova access token |
| GET | `/auth/me` | Dados do usuário autenticado |

### Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/clients/profile` | Perfil do cliente |
| PATCH | `/clients/profile` | Atualiza perfil |
| POST | `/clients/profile/photo` | Upload foto de perfil |
| GET | `/clients/addresses` | Lista endereços |
| POST | `/clients/addresses` | Adiciona endereço |
| PATCH | `/clients/addresses/:id` | Atualiza endereço |
| DELETE | `/clients/addresses/:id` | Remove endereço |

### Farmácias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/pharmacies` | Busca farmácias |
| GET | `/pharmacies/:id` | Detalhes da farmácia |
| GET | `/pharmacies/nearby` | Farmácias próximas |

### Pedidos (Cliente)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/orders/calculate-price` | Calcula preço |
| POST | `/orders` | Cria pedido |
| GET | `/orders/:id` | Detalhes do pedido |
| GET | `/orders/:id/track` | Rastrear pedido |
| GET | `/orders/history` | Histórico de pedidos |
| POST | `/orders/:id/cancel` | Cancela pedido |
| POST | `/orders/:id/rate` | Avalia pedido |

### Motoristas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/drivers/profile` | Perfil do motorista |
| PATCH | `/drivers/profile` | Atualiza perfil |
| POST | `/drivers/documents` | Upload documento |
| POST | `/drivers/availability` | Toggle online/offline |
| POST | `/drivers/location` | Atualiza localização |
| GET | `/drivers/orders/available` | Pedidos disponíveis |
| POST | `/drivers/orders/accept` | Aceita pedido |
| GET | `/drivers/orders/current` | Pedido atual |
| POST | `/drivers/orders/:id/pickup` | Confirma coleta |
| POST | `/drivers/orders/:id/deliver` | Confirma entrega |
| GET | `/drivers/earnings` | Ganhos |

### Admin

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/admin/dashboard` | Dashboard KPIs |
| GET | `/admin/users` | Lista usuários |
| PATCH | `/admin/users/:id/status` | Bloqueia/desbloqueia |
| GET | `/admin/drivers/pending` | Motoristas pendentes |
| POST | `/admin/drivers/:id/approve` | Aprova/rejeita motorista |
| GET | `/admin/orders` | Lista pedidos |
| POST | `/admin/orders/:id/cancel` | Cancela pedido |
| POST | `/admin/orders/:id/reassign` | Reatribui motorista |
| GET | `/admin/financial/report` | Relatório financeiro |
| GET | `/admin/financial/payouts` | Lista repasses |
| POST | `/admin/financial/payouts/process` | Processa repasses |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da API |
| GET | `/docs` | Documentação Swagger |

---

## Modelo de Dados

### Entidades Principais

```
User (usuário base)
├── Client (cliente - solicita entregas)
├── Driver (entregador - realiza entregas)
├── Carrier (transportadora - recebe demanda excedente)
└── Admin (administrador)

Order (pedido)
├── pickup_address (endereço de coleta)
├── delivery_address (endereço de entrega)
├── status (PENDING_PAYMENT → DELIVERED)
├── Payment (pagamento via Pix)
└── Rating (avaliação pós-entrega)

Address (endereços salvos do cliente)
```

---

## Modelo de Negócio

### Comissionamento

| Tipo de Entrega | Comissão Plataforma | Ganho Entregador |
|-----------------|---------------------|------------------|
| Standard | 20% | 80% |
| Express | 20% | 80% |

### Precificação Base

- **Tarifa base**: R$ 5,00
- **Por km**: R$ 2,00
- **Multiplicador Express**: 1.5x
- **Taxa mínima**: R$ 8,00

---

## Documentação Técnica

| Documento | Localização |
|-----------|-------------|
| PRD (Requisitos) | `docs/prd.md` |
| Arquitetura | `docs/architecture.md` |
| Coding Standards | `docs/architecture/coding-standards.md` |
| Tech Stack | `docs/architecture/tech-stack.md` |
| Stories (Épicos) | `docs/prd/epic-*.md` |
| Stories (Detalhadas) | `docs/stories/story-*.md` |

---

## Roadmap

### Fase 1: MVP (Backend Completo ✅)
- [x] Infraestrutura base (monorepo, DB, auth)
- [x] API Cliente (perfil, endereços, pedidos, pagamento, tracking)
- [x] API Entregador (cadastro, aceite, coleta, entrega, ganhos)
- [x] API Admin (dashboard, usuários, pedidos, financeiro)
- [ ] Frontend Mobile (React Native)
- [ ] Frontend Web Admin (Next.js)

### Fase 2: Expansão
- [ ] Módulo de transportadoras (Epic 5 - stories prontas)
- [ ] Integração Mercado Pago (Pix real)
- [ ] Push notifications (Firebase)
- [ ] App iOS/Android nas lojas

### Fase 3: Escala
- [ ] Expansão para outros nichos (congelados)
- [ ] API aberta para integrações
- [ ] Programa de fidelidade

---

## Contribuição

Este é um projeto privado. Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## Licença

Projeto privado - Todos os direitos reservados.

---

## Contato

Para mais informações sobre o projeto, entre em contato com a equipe de desenvolvimento.
