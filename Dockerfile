FROM nginx:alpine

# Copia o projeto (página inicial + pastas dos exercícios) para o Nginx
COPY index.html /usr/share/nginx/html/
COPY exercicio1/ /usr/share/nginx/html/exercicio1/
COPY exercicio2/ /usr/share/nginx/html/exercicio2/
COPY exercicio3/ /usr/share/nginx/html/exercicio3/
COPY exercicio4/ /usr/share/nginx/html/exercicio4/

EXPOSE 80
