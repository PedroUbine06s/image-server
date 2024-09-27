# Image and Video Server API

Esta é uma API RESTful para gerenciar o upload, download e manipulação de imagens e vídeos. A API foi construída utilizando Express, PostgreSQL e Multer para armazenamento em disco.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Multer(middleware para upload de arquivos)

## Endpoints

### 1. Upload de Mídia

- **URL:** `/media`
- **Método:** `POST`
- **Descrição:** Faz o upload de uma imagem ou vídeo.
- **Headers:**
    - `Content-Type: multipart/form-data`
- **Body:**
    - `media`: Arquivo de imagem ou vídeo.
- **Resposta de Sucesso:**
    - **Código:** 201 CREATED
    - **Conteúdo:** `{ "id": "12345", "filename": "exemplo.jpg", "url": "/media/12345" }`

### 2. Listar Mídias

- **URL:** `/media`
- **Método:** `GET`
- **Descrição:** Lista todos os arquivos de mídia.
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Conteúdo:** `[{ "id": "12345", "filename": "exemplo.jpg", "url": "/media/12345" }, ...]`

### 3. Obter Mídia Específica

- **URL:** `/media/:id`
- **Método:** `GET`
- **Descrição:** Obtém uma mídia específica pelo ID.
- **Parâmetros de URL:**
    - `id`: ID da mídia
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Conteúdo:** Arquivo de mídia

### 4. Atualizar Mídia

- **URL:** `/media/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza uma mídia específica pelo ID.
- **Headers:**
    - `Content-Type: multipart/form-data`
- **Parâmetros de URL:**
    - `id`: ID da mídia
- **Body:**
    - `media`: Novo arquivo de mídia
- **Resposta de Sucesso:**
    - **Código:** 200 OK
    - **Conteúdo:** `{ "id": "12345", "filename": "atualizado.jpg", "url": "/media/12345" }`

### 5. Deletar Mídia

- **URL:** `/media/:id`
- **Método:** `DELETE`
- **Descrição:** Deleta uma mídia específica pelo ID.
- **Parâmetros de URL:**
    - `id`: ID da mídia
- **Resposta de Sucesso:**
    - **Código:** 204 NO CONTENT
