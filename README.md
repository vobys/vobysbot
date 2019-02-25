## Vobys Discord Bot

Este é o **Bot** do **Vobys** no **Discord** utilizado para automatizar algumas tarefas de infraestrutura.

Até o momento temos os seguintes comandos implementados.

### Command List

Use `!vobys help <command name>` for details.
​
#### Miscelaneous

| Command        | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `!vobys auth`  | Tells you your permission level for the current message location. |
| `!vobys ping`  | It like... Pings. Then Pongs. And it's not Ping Pong.             |
| `!vobys stats` | Gives some useful bot statistics.                                 |
​
#### System

| Command          | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `!vobys help`    | Displays all the available commands for your permission level.            |
| `!vobys reload`  | Reloads a command that"s been modified.                                   |
| `!vobys restart` | Shuts down the bot. If running under PM2, bot will restart automatically. |

### Configurações

Algumas configurações podem ser realizadas através de um arquivo externo nomeado `config.json`. A seguir, um exemplo
deste arquivo:

```json
{
    "owner": "1234567890",
    "token": "XYZ",
    "prefix": "!vobys "
}
```

    owner   :: Código ID do usuário dono do Bot (nível máximo de permissão)
    token   :: O token de autenticação do Bot
    prefix  :: O prefixo o qual os comandos direcionados ao Bot devem possuir na mensagem
