# Project Management

### Descrição

Esta é uma aplicação de gerenciamento de projetos e tarefas, desenvolvida para facilitar a organização do trabalho individual. Com ela, você pode:

- Criar projetos;
- Criar tarefas para projetos;
- Definir prazos e status;
- Visualizar relatórios

### Decisões Técnicas

- O gerenciamento de serviços (API, Web, Nginx, Postgres, Redis) foi realizado utilizando Docker Compose para containerização, melhorando o desenvolvimento e a escalabilidade.
- Agrupamento de aplicações API (Laravel/PHP-FPM) e Web (Vite/React) sob serviços separados para facilitar a organização e implantações independentes.
- O Nginx foi implementado como um proxy reverso, permitindo acesso externo centralizado que direciona eficientemente as solicitações para os serviços apropriados.
- Ambiente de teste isolado com .env.testing para prevenir influências no banco de dados de desenvolvimento.
- O frontend utiliza a biblioteca de UI Ant Design, que oferece uma ampla gama de componentes compatíveis com as necessidades da aplicação.

### Tecnologias Utilizadas

- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org//) (para desenvolvimento local do frontend)
- [PHP 8.x](https://www.php.net/) (para desenvolvimento local da API)
- [PostgreSQL](https://www.postgresql.org/) (banco de dados)
- [Redis](https://redis.io/) (cache/queue)
- [Nginx](https://nginx.org/) (proxy reverso)

### Dependencias

- [Docker](https://www.docker.com/) — Containerização dos serviços.
- [Docker Compose](https://docs.docker.com/compose/) — Orquestração dos containers.
- [Git](https://git-scm.com/) — Controle de versão e clonagem do repositório.

### Instalação

1. Baixe ou clone o repositório:

   ```sh
     # Clonando repositório
     git clone https://github.com/sfotaviano/project-management.git
     cd project-management

     # Baixando repositório
     https://github.com/sfotaviano/project-management/archive/refs/heads/main.zip
   ```

2. Copie os arquivos de exemplo de ambiente:

   ```sh
     # Linux/macOS
     cp api/.env.example api/.env

     # Windows (cmd)
     copy api\.env.example api\.env

     # Windows (PowerShell)
     Copy-Item api\.env.example api\.env
   ```

3. Instale as dependências do backend (apenas na primeira vez):

   ```sh
     # Suba o serviço workspace da API em segundo plano
     docker compose up workspace -d

     # Instale as dependências PHP dentro do container da API
     docker compose exec workspace composer install
   ```

4. Suba todos os containers:

   ```sh
     docker compose up -d
   ```

5. Acesse a aplicação em [http://localhost](http://localhost).

### Executando testes

Para rodar os testes do backend (Laravel), utilize o comando abaixo:

```sh
  docker compose exec workspace php artisan test
```

> **Dica:**  
> Certifique-se de ter instalado as dependencias do backend e de que o serviço `workspace` está em execução antes de rodar os testes.

---
