# Rabbitmq

> É um Message Broker (Intermediário), responsável por intermediar o publisher e o consumer.

Características:

1. Ele implementa vários protocolos, como o AMQP, MQTT, STOMP e HTTP. O AMPQ é o mais utilizado, baseado em TCP, o que gera ganho de performance nos processos de comunicação.
2. Foi desenvolvido em Erlang
3. Possui um processo de desacoplamento entre serviços, possibilitando a instalação de plugins, extensões etc. Ou seja, quando é feito o uso do RabbitMQ entre os serviços eles serão desacoplados.
4. É rápido e poderoso, as mensagens vão para a memória do sistema.
5. É padrão de mercado, ou seja, é algo utilizado por muitas empresas.


## Como funciona

O RabbitMQ ele abre apenas uma conexão entre o Client e Server, onde nela, são criados channels, que são passados por dentro da conexão e garantindo mais velocidade, eliminando a abertura de novas conexões (Multiplexing Connections). **Cada channel é utilizado por um Thread diferente.**

Quando falamos de messageria temos dois principais conceitos:

1. Publisher <--* Publica a mensagem
2. Consumer <--* Recebe a mensagem

Entre eles dois temos uma fila (Queue). Ou seja, o serviço Consumer não consome o Publisher diretamente, ele observa a fila. O Publisher não publica a mensagem diretamente em uma fila, mas sim em uma Exchange, pois uma mensagem pode ser enviada para várias filas. Assim, a Exchange envia a mensagem para a fila para ela ser consumida.

### Tipos de Exchange

<h3>Direct</h3>

> Quando a exchange recebe a mensagem e envia DIRETAMENTE a uma fila específica

<h3>Fanout</h3>

> Recebe a mensagem ela envia para TODAS as filas relacionadas a Exchange

<h3>Topic</h3>

> É uma Exchange que pode conter algumas regras, e dependendo do tipo da mensagem, ela redireciona para algumas filas

<h3>Header</h3>

> Exchange onde no header da mensagem, informamos para qual fila queremos enviar a mensagem