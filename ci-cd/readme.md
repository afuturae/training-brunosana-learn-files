# CI - CD

> Processo de integrar modificações contínua e automatizada. Com mais agilidade e segurança no processo de desenvolvimento de software.

1. Testes
2. Linter
3. Qualidade de código
4. Código de segurança
5. Artefatos prontos para deploy
6. Identificação da versão a ser gerada
7. Geração de Tags e Releases

**PS: CI/CD possibilita o `statusCheck`, garantindo que um PR não será feito o merge sem ter feito o processo de code review ou execução da pipeline**

## Ferramentas de CI/CD Conhecidas

* Jenkins
* Github Actions
* Circle CI
* AWS Code Build
* Azure DvOps
* Google Cloud Build
* GitLab Pipelines CI


---

## Github Actions

> Trabalha com Workflows:

1. Workflow
  * Conjuntos de processos definidos
  * Possibilita mais de um workflow por repositório
  * Definidos por um arquivo `.yml`
  * Possui um ou mais jobs
  * Trabalha baseado em eventos ou por agendamento

No workflow você tem um evento, e baseado nesse evento, você pode realizar filtros, escolher o ambiente a ser rodado na aplicação. E a partir daí, quais ações serão executadas.

Ex.
```yml
# evento
on: push

branches:
  - master
runs-on: ubuntu
steps:
  - uses: action/run-composer # Action do github, feito por algum desenvolvedor.
  - run: npm run prod
```

Em `steps`, ou executamos uma action, ou um comando no ambiente.

Steps: Ação que vai ser executada em um dos steps. Pode ser criada ou utilizada uma action já existente no Github Marketplace.

**PS: O Github possui algumas regras. Repositórios públicos o uso do Github Actions é grátis. Repos privados é pago ao ultrapassar os 2 mil minutos por mês.**


## Caso prático com GO

Você tem a seguinte estrutura de arquivos:

```go
// math.go
package main

import "fmt"

func main() {
	fmt.Println(Soma(10, 10));
}

func Soma(a int, b int) int {
	return a + b;
}

// math_test.go
package main
import "testing"

func TestSoma(t *testing.T) {

	total := Soma(15, 15)
	
	if total != 30 {
		t.Errorf("Resultado inválido: Resultado: %d. Esperado: %d", total, 30)
	}

}
```

Queremos subir essa aplicação mas com CI CD. Para isso vamos inicializar um repositório git com `git init`. Vamos comitar e subir esse exemplo.

Após isso, podemoscriar uma pasta `.github/workflows` na raiz do projeto e nela vamos criar um arquivo `ci.yml`:
```yml
name: ci-test-workflow
on: [push]
jobs:
  check-application:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # Pega os dados que vão subir e baixam os arquivos no ubuntu
      - uses: actions/setup-go@v2 # Prepara o ambiente para o GO
        with:
          go-version: 1.15 # Parâmetro para a action setup-go@v2, informando a versão do GO
      - run: go test
      - run: go run math.go
```

1. Definimos o nome da action como `ci-test-workflow`
2. Ela irá acontecer ao realizarmos um `push`
3. Temos apenas um job chamado `check-application`
4. Esse job irá ser executado na última versão do ambiente `ubuntu`
5. Há algus comentários sobre os steps a serem executados.

Ao executarmos o push, podemos ver que no Github o commit ficará com uma bolinha amarela na esquerda. Isso significa que a action está sendo executada. Quando tudo estiver finalizado, podemos ver um check verde, informando que a action foi executada com sucesso.

Porém, não é assim que se trabalha em um workflow correto, pois normalmente utilizamos branches e pull requests.

## Github Actions com Pull Request

Antes de começarmos. Criamos uma branch `develop`, subimos e setamos como default no Github (No repositório -> Settings -> Branches).

Agora, podemos configurar uma Protection Rule (No mesmo painel onde definimos a branch como default). Nomearemos como `develop` e vamos marcar a opção `Require status checks to pass before merging`. Ao marcar, precisamos marcar também a subopção que aparece (`Require branches to be up to date before merging`) e selecionar o job `check-application`, que foi nomeado no momento da criação do arquivo `ci.yml`.

Por questões de workflow, marcamos também a opção `Require a pull request before merging` (Junto com a subopção `Dismiss stale pull request approvals when new commits are pushed`) e `Include administrators`.

Criamos a mesma regra para a branch master.

Agora podemos criar uma branch `feature/ci` e podemos alterar o arquivo `ci.yml`:
```yml
name: ci-test-workflow
on:
  pull_request:
    branches:
      - develop
jobs:
  check-application:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 # Pega os dados que vão subir e baixam os arquivos no ubuntu
      - uses: actions/setup-go@v2 # Prepara o ambiente para o GO
        with:
          go-version: 1.15 # Parâmetro para a action setup-go@v2, informando a versão do GO
      - run: go test
      - run: go run math.go
```

Mudamos a sintaxe da descrição dos eventos para poder atribuir ao invés de push, ao `pull_request` e, agora, apenas à branch `develop`.

Podemos subir a alteração e realizar um Pull Request. Vamos poder perceber que até o workflow aprovar, não será possível realizar o merge.

## Matrix Strategy

> Quando há a necessidade de testar em outros ambientes ou versões de ambientes/linguagens, temos um processo no github actions que facilita essa criação chamada de Matrix Strategy.

Nesse exemplo, trabalhando com a linguagem GO, podemos querer testar em diversas versões dela. No aqruivo `ci.yml`:
```yml
name: ci-test-workflow
on:
  pull_request:
    branches:
      - develop
jobs:
  check-application:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go: ['1.14', '1.15']
    steps:
      - uses: actions/checkout@v2 # Pega os dados que vão subir e baixam os arquivos no ubuntu
      - uses: actions/setup-go@v2 # Prepara o ambiente para o GO
        with:
          go-version: ${{ matrix.go }} # Parâmetro para a action setup-go@v2, informando a versão do GO
      - run: go test
      - run: go run math.go
```

1. Criamos uma `key` chamada `go` com duas versões. E na variável `go-version` atribuímos a variável que criamos anteriormente.
2. A action será executada duas vezes, como dois jobs.

**OBS: O próprio github reconhece cada versão do GO como jobs diferentes, isso significa que se um Pull Request estiver travando por conta da alteração do job (algo comum de acontecer), podemos ir nas Protection Rules da Branch develop e, além de adicionar os dois jobs novos (com o prefixo das versões do go: 1.14 e 1.15), remover o anterior sem as versões.**

## CI com Docker

Antes de mais nada, vamos criar uma nova branch `feature/ci-docker` e criar um `DockerFile` do projeto:
```Dockerfile
FROM golang:latest

WORKDIR /bin/go

COPY . /bin/go

COPY . .

RUN go env GOOS=linux && \
    go env CGO_ENABLED=0 && \
    go env -w GO111MODULE=off && \
    go build -o math

CMD [ "./math" ]
```

Temos uma imagem que irá ser montada e realizar o build da nossa imagem. Para esse job,vamos utilizar uma action chamada [Build and push docker images](https://github.com/marketplace/actions/build-and-push-docker-images).

A própria documentação sugere o passo a passo. Em `steps`, inserimos:
```yml
- name: Set up QEMU # Setup para o docker funcionar em várias arquiteturas
  uses: docker/setup-qemu-action@v1
- name: Set up Docker Buildx # Setup para o docker realizar o Build
  uses: docker/setup-buildx-action@v1
- name: Build and push # Realiza o Build da Aplicação
  uses: docker/build-push-action@v2
  with:
    push: false # Realiza o push no DockerHub
    tags: brunosana/app:latest # Nome e tag da imagem no DockerHub. Na máquina temporária, vamos ter uma imagem com esse nome
```

Dessa forma. O arquivo de integração contínua irá buildar o projeto no docker.

### Realizando o Push na Docker Hub

Para realizar o push, precisamos inserir o step:
```yml
- name: Login to DockerHub # Faz o login no DockerHub
  uses: docker/login-action@v1 
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

E além disso, a propriedade `push` da action `docker/build-push-action@v2` precisa ser `true`.

Esses **secrets** são variáveis que são configuráveis no github.

No repositório da aplicação, vá em `settings -> secrets -> actions`, clicamos em `new repository secret`, definimos o nome e o valor dele.

Para a variável `DOCKERHUB_TOKEN`, vamos ao [Docker Hub](https://hub.docker.com/), na parte do perfil, em `Account Settings -> security` e criamos um novo access token.