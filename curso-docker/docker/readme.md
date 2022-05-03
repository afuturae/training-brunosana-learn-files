# Docker

## Namespaces

> Conjunto de processos isolados fazendo referência a um mesmo Namespace

A partir daí, houve progresso no desenvolvimento de containers

1. Processo Pai 1
  * Processo Filho 1
  * Processo Filho 2
  * Processo filho n
2. Processo Pai 1
  * Processo Filho 1
  * Processo Filho 2
  * Processo filho n


**PS: Ao matarmos o processo principal, o container é destruído.**

> Quando falamos de containers, falamos de processos. Um processo com subprocessos rodando emulando um sistema operacional

## Cgroups

> Cgroups controlam os recursos computacionais do container

Containers isolam processos. Às vezes, essa namespace de processos pode afetar a máquina em geral. Ou seja, Cgroups isolam os recursos computacionais de namespaces.

Ex. Processo X utiliza
1. 500mb de memória
2. 512 de cpu_shares

Isso possibilita que esses processos não interfiram nos outros processos

## File System

### OFS - Overlay File System

Quando trabalhamos com virtualizações, temos cópias exatas de um S.O. inteiro.

> OFS são responsaveis por trabalhar com layers de forma individual. Onde as diferenças entre imagens não são feitas com cópias completas.

Ex. Um container não sobe um S.O. inteiro, as libs do S.O. atual é sempre aproveitado. Contém apenas as partes necessárias para serem executadas.

### Imagens

> São criadas a partir de camadas, com pedaços de imagens existentes e serão baixadas apenas as partes necessárias. Imagens são conjuntos de dependências encadeadas.

Ex. Se uma imagem utiliza o Ubuntu, ele irá instalar apenas as partes do Ubuntu que não tem instalado na máquina atual. As bibliotecas que o S.O. tiver ele não faz o donwload novamente.

Todas as camadas formam uma imagem, contendo um nome e uma versão.

---

## DockerFile

> O DockerFile é um arquivo declarativo que informa a construção de uma imagem personalizada

1. FROM: ImageName
2. RUN: commands...

Ao rodar o DockerFile, ele irá baixar a imagem e todas as dependências. Irá rodar todas as instruções do arquivo dockerfile.

**PS: AS IMAGENS TEM ESTADO IMUTÁVEL**

Em conjunto com a imagem, é criada uma camada de `Read/Write`. Embora as imagens não são alteradas, o container sim pode ser modificado.



---

1. A partir do Dockerfile, é criada a imagem
2. A imagem contém uma camada de Read/Write

Ou seja, há duas formas de criar imagens:

1. Criar um DockerFile
2. Alterar um Container existente e fazer o `commit` da alteração.


> As imagens ficam armazenadas em um Image Registry. Todas vez que for necessário gerar um Dockerfile ou um novo container, esse registro é acessado e utilizado.

Uma imagem commitada pode ser feita o `push`, colocando a imagem na parte de `Image Registry`.