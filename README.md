## Vobys Discord Bot

Este é o **Bot** do **Vobys** no **Discord** utilizado para automatizar algumas tarefas de infraestrutura.

Até o momento temos os seguintes comandos implementados.

### Lista de Comandos

Use `!help <command name>` para mais detalhes.

#### Diverso

| Comando  | Descrição                                            |
| ---------| ---------------------------------------------------- |
| `!auth`  | Informa seu nível de permissão para o local atual.   |
| `!ping`  | Um simples Ping. Então Pong. E isso não é Ping Pong. |
| `!stats` | Dá algumas estatísticas úteise em relação ao Bot.    |

#### Sistema

| Comando    | Descrição                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------ |
| `!help`    | Mostra os comandos disponíveis para o seu nível de permissão.                              |
| `!reload`  | Recarrega um comando específico que tenha sido modificado.                                 |
| `!restart` | Desliga o Bot. Se o Bot estiver executando sobre PM2, ele será reiniciado automaticamente. |

#### Infraestrutura

| Comando   | Descrição                                                                     |
| --------- | ----------------------------------------------------------------------------- |
| `!deploy` | Implanta a última versão dos implantáveis definidos no ambiente especificado. |

### Configurações

Algumas configurações podem ser realizadas através de um arquivo externo nomeado `config.json`. A seguir, um exemplo
deste arquivo:

```json
{
    "owner": "1234567890",
    "admins": [],
    "supports": [],
    "token": "XYZ",
    "prefix": "!",
    "modLogChannel": "logs",
    "devRole": "dev",
    "modRole": "mod",
    "adminRole": "admin",
    "systemNotice": "true",
    "welcomeChannel": "welcome",
    "welcomeMessage": "Hello {{user}}.",
    "welcomeEnabled": "false"
}
```

    owner          :: Código ID do usuário dono do Bot (nível máximo de permissão: 10)
    admins         :: Códigos ID dos usuários administradores do Bot (nível administrador de permissão: 9)
    supports       :: Códigos ID dos usuários apoiadores do Bot (nível apoio de permissão: 8)
    token          :: O token de autenticação do Bot
    prefix         :: O prefixo o qual os comandos direcionados ao Bot devem possuir na mensagem
    modLogChannel  :: Canal de notificação do Bot
    devRole        :: Papel do desenvolvedor (nível desenvolvedor de permissão: 1)
    modRole        :: Papel do moderador (nível moderador de permissão: 2)
    adminRole      :: Pepel do administrador (nível administrador do servidor de permissão: 3)
    systemNotice   :: Flag para habilitar notificação (true ou false)
    welcomeChannel :: Canal para a mensagem de boas-vindas
    welcomeMessage :: Mensagem de boas-vindas (use {{user}} para mencionar o novo usuário)
    welcomeEnabled :: Flag para habilitar a mensagem de boas-vindas (true ou false)

#### Artifactory

O mesmo arquivo de configuração da aplicação, `config.json`, também é usado para configurar a integração com
o **Artifactory**. A seguir um exemplo deste arquivo:

```json
{
    "artifactory": {
        "token": "XYZ",
        "url": "https://artifactory/api",
        "artifacts": [
            {
                "name": "App 01",
                "group": "org.app",
                "id": "app1"
            },
            {
                "name": "App 02",
                "group": "org.app",
                "id": "app2"
            }
        ],
        "script": "process.sh"
    }
}
```

    token     :: O token de acesso a API
    url       :: A URL da API
    artifacts :: Identificação dos implatáveis a serem processados
    script    :: O script a ser chamado para processar a implantação (deve estar na pasta "scripts")
