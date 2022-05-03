# Sonarqube

> Analisa as linhas, analiza bugs de segurança, normais. O quanto de cobertura seu código tem em relação aos testes. E baseado em uma série de parâmetros e se resume a **Testes de Qualidade**.

Referência: [Sonarqube](https://www.sonarqube.org/).

Podemos utiliar o Sonarqube com o docker:
```bash
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
```

PS: O login inicial do local sonarqube é `admin admin` e logo após ele pede para alterar a senha.
PASS teste: **bruno**.

---

## Rules

> Na página `Rules` podemos ver uma série regras para validação separadas por linguagem. Essas regras irão determinar o quão bom o seu código está. Elas podem identificar bugs, problemas ou qualidade de código.

## Quality Profiles

> Podemos ter perfis de qualidade por linguagem. Por padrão, na instalação do Sonarqube pro Docker temos um perfil `Sonar-way` criado. Há a possibilidade de ter mais de um perfil, que pode ser selecionado como padrão.

PS:
* Um perfil pode ser criado a partir do zero ou copiado de um já existente.
* Podemos editar um perfil ativando ou desativando regras
* Podemos escolher o projeto que um determinado perfil está associado

## Quality Gates

> É o que vai definir se o projeto passa ou não no nível de qualidade. É uma série de configurações e propriedades como:
1. Coverage (Acima de uma porcentagem)
2. Duplicated Lines (Abaixo de uma porcentagem)
3. Maintainability [...]

E várias outras propriedades que ao não serem atendidas, o projeto não passa nos testes de qualidade.