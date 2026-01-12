# 🚀 @herval/create-react-app

CLI para criar aplicações React baseadas no template Herval de forma rápida e interativa.

## 📋 Índice

- [Sobre](#sobre)
- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Exemplos](#exemplos)
- [Requisitos](#requisitos)
- [Desenvolvimento](#desenvolvimento)
- [Publicação](#publicação)

## 📖 Sobre

Este CLI automatiza a criação de projetos React seguindo os padrões e boas práticas do template Herval. Ele:

- 📦 Baixa o template do repositório GitHub
- ⚙️ Configura o projeto com suas informações
- 🔧 Instala todas as dependências automaticamente
- 🚀 Opção de iniciar o servidor de desenvolvimento imediatamente

## 📥 Instalação

### Instalação Global

```bash
npm install -g @herval/create-react-app
```

### Uso Direto (npx)

```bash
npx @herval/create-react-app meu-projeto
```

## 🎯 Uso

### Modo Interativo

Execute o comando sem argumentos para modo interativo completo:

```bash
create-react-app
```

O CLI irá perguntar:
- 📝 Nome do projeto (kebab-case)
- 📌 Título do projeto
- 📝 Descrição do projeto
- 🚀 Se deseja iniciar o servidor de desenvolvimento

### Modo com Argumentos

Passe o nome do projeto como argumento:

```bash
create-react-app meu-novo-projeto
```

O CLI ainda perguntará título e descrição, mas pulará a pergunta do nome.

## ✨ Funcionalidades

- ✅ **Validação automática**: Garante que o nome do projeto esteja em kebab-case
- ✅ **Verificação de diretório**: Impede sobrescrever projetos existentes
- ✅ **Download inteligente**: Usa degit e fallback para git clone
- ✅ **Configuração automática**: Substitui placeholders nos arquivos do template
- ✅ **Instalação de dependências**: Executa `pnpm install` automaticamente
- ✅ **Experiência visual**: Spinners, cores e emojis para feedback claro
- ✅ **Início rápido**: Opção de iniciar o dev server imediatamente

## 📚 Exemplos

### Exemplo 1: Criação Completa

```bash
$ create-react-app

🚀 Bem-vindo ao CLI de criação de aplicações React Herval!

📝 Digite o nome do projeto (kebab-case): meu-projeto-incrivel
📌 Digite o título do projeto: Meu Projeto Incrível
📝 Digite a descrição do projeto: Uma aplicação React moderna

📦 Baixando template... ✅
⚙️ Configurando projeto... ✅
📦 Instalando dependências... ✅

✨ Projeto criado com sucesso!

Para começar a desenvolver:
  cd meu-projeto-incrivel
  pnpm run dev
```

### Exemplo 2: Com Nome via Argumento

```bash
create-react-app sistema-vendas
```

### Exemplo 3: Usando npx

```bash
npx @herval/create-react-app dashboard-analytics
```

## 🔧 Requisitos

- **Node.js**: >= 18.x
- **pnpm**: >= 8.x (instalado globalmente)
- **Git**: Necessário para fallback de download

### Verificar Requisitos

```bash
node --version
pnpm --version
git --version
```

## 🛠️ Desenvolvimento

### Setup

```bash
# Clone o repositório
git clone <repo-url>
cd create-react-app

# Instale as dependências
pnpm install

# Build
pnpm run build

# Modo watch para desenvolvimento
pnpm run dev
```

### Estrutura do Projeto

```
create-react-app/
├── src/
│   ├── index.ts      # Ponto de entrada do CLI
│   └── utils.ts      # Funções auxiliares
├── dist/             # Código compilado
├── package.json
├── tsconfig.json
└── README.md
```

### Tecnologias Utilizadas

- **TypeScript**: Tipagem estática
- **Commander**: Parsing de argumentos CLI
- **Inquirer**: Prompts interativos
- **Chalk**: Colorização de output
- **Ora**: Spinners de loading
- **Degit**: Download de templates do GitHub

## 📦 Publicação

### Preparar Publicação

```bash
# Incrementar versão
npm version patch   # 1.0.1 → 1.0.2
npm version minor   # 1.0.1 → 1.1.0
npm version major   # 1.0.1 → 2.0.0

# Build
pnpm run build
```

### Publicar no Azure Artifacts

```bash
npm publish
```

> **Nota**: O pacote está configurado para publicar no feed Azure DevOps do Herval.

### Versionamento

Seguimos o [Semantic Versioning](https://semver.org/):

- **MAJOR**: Mudanças incompatíveis com versões anteriores
- **MINOR**: Novas funcionalidades (compatível)
- **PATCH**: Correções de bugs

## ❓ Troubleshooting

### Erro: Diretório já existe

```
❌ Diretório "meu-projeto" já existe!
```

**Solução**: Escolha outro nome ou remova o diretório existente.

### Erro: Nome não está em kebab-case

```
❌ Nome do projeto deve estar em kebab-case (ex: meu-projeto-react)
```

**Solução**: Use apenas letras minúsculas, números e hífens. Exemplos:
- ✅ `meu-projeto`
- ✅ `sistema-vendas-2024`
- ❌ `meuProjeto`
- ❌ `Meu_Projeto`

### Erro: Não foi possível baixar o template

```
❌ Não foi possível baixar o template.
```

**Solução**: Verifique se:
- O repositório existe e está acessível
- Você tem permissão de acesso
- Sua conexão com internet está funcionando
- Git está instalado (para fallback)

### Erro: 403 Forbidden ao publicar

```
npm error 403 The feed 'herval-npm' already contains file 'create-react-app-1.0.0.tgz'
```

**Solução**: Incremente a versão no `package.json` antes de publicar novamente.

## 📄 Licença

© 2026 Herval. Todos os direitos reservados.

---

**Desenvolvido pela Equipe de Satélites - Herval**
