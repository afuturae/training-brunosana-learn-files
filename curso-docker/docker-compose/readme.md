# Docker Compose

> Arquivo declarativo que permite a criação de múltiplas imagens.

Ex:
```yml
version: '3'

services:
  laravel:
    image: brunosana/laravel:prod
    container_name: laravel
    networks:
      - laranet
  
  nginx:
    image: brunosana/nginx-laravel:prod
    container_name: nginx
    networks:
      - laranet
    ports:
      - "8080:80"

networks:
  laranet:
    driver: bridge
```

Definimos duas imagens:
1. Laravel que criamos
2. Nginx para intermediar o laravel que criamos também

**OBS: Para as imagens, definimos as propriedades `image - container_name - network`. E depois da definição dos `services` declaramos a propriedade `networks`.**

Ao executar `docker-compose up` ele irá subir dois containers.

---

## Build

> Às vezes temos a necessidade de subir imagens que não estão finalizadas, estão em desenvolvimento. Portanto, a propriedade `build` serve para informarmos qual arquivo declarativo irá servir como base de construção da imagem, e quando temos uma propriedade **build**, a propriedade `image` serve para definirmos o nome da imagem criada.

Ex:
```yml
version: '3'

services:
  laravel:
    build:
      context: ./laravel # Qual a pasta que o Dockerfile está
      dockerfile: Dockerfile.prod
    image: brunosana/laravel:prod
    container_name: laravel
    networks:
      - laranet
  
  nginx:
    build:
      context: ./nginx
      dockerfile: Dockerfile.prod
    image: brunosana/nginx-laravel:prod
    container_name: nginx
    networks:
      - laranet
    ports:
      - "8080:80"

networks:
  laranet:
    driver: bridge
```
OBS
1. Em Build a propriedade `context` significa qual o caminho que a pasta do arquivo está baseado onde o arquivo `docker-compose.yml` está.
2. Em Build a propriedade `dockerfile` significa o nome do arquivo que está declarando a construção da imagem
3. A propriedade `image` irá nomear a imagem com esse nome

