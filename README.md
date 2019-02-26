## Vobys Discord Bot

Este é o **Bot** do **Vobys** no **Discord** utilizado para automatizar algumas tarefas de infraestrutura.

Até o momento temos os seguintes comandos implementados.

### Command List

Use `!vobys help <command name>` for details.

#### Miscelaneous

| Command        | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `!vobys auth`  | Tells you your permission level for the current message location. |
| `!vobys ping`  | It like... Pings. Then Pongs. And it's not Ping Pong.             |
| `!vobys stats` | Gives some useful bot statistics.                                 |

#### System

| Command          | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `!vobys help`    | Displays all the available commands for your permission level.            |
| `!vobys reload`  | Reloads a command that"s been modified.                                   |
| `!vobys restart` | Shuts down the bot. If running under PM2, bot will restart automatically. |

#### Infrastructure

| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `!vobys deploy` | Deploys the latest version in the specified environment. |

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
                "artifact": "app1",
                "group": "org.app"
            },
            {
                "artifact": "app2",
                "group": "org.app"
            }
        ],
        "script": "process.sh"
    }
}
```

    token     :: O token de acesso a API
    url       :: A URL da API
    artifacts :: Identificação (group e artifact) dos implatáveis a serem processados
    script    :: O script a ser chamado com para processar a implantação (deve estar na pasta "scripts")
