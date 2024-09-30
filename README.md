# API de Memes (Los Simpson)
Esta colección contiene las peticiones necesarias para el funcionamiento del crud creado desde nuestro backend

[Abrir en postman](https://documenter.getpostman.com/view/38671791/2sAXqzXdyq)

## End-point: Obtener memes

Este endpoint recupera una lista de memes en formato JSON con la siguiente estructura:

``` json
{
    "ok": true,
    "status": 200,
    "body": [
        {
            "meme_id": 1,
            "name": "Funny Meme",
            "urlImage": "Enlace"
        },
        {
            "meme_id": 2,
            "name": "Funny Meme",
            "urlImage": "Enlace"
        },
        {
            "meme_id": 3,
            "name": "Funny Meme",
            "urlImage": "Enlace"
        },
        {
            "meme_id": 4,
            "name": "Funny Meme",
            "urlImage": "Enlace"
        }
    ]
}

 ```
### Method: GET
>```
>http://localhost:3001/api/v1/memes
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Obtener meme

Este endpoint recupera un solo meme a traves de su id.

#### Respuesta

- Status: 200
    
- Content-Type: application/json
    

``` json
{
  "ok": true,
  "status": 0,
  "body": {
    "meme_id": 0,
    "name": "",
    "urlImage": ""
  }
}

 ```
### Method: GET
>```
>http://localhost:3001/api/v1/memes/2
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Crear meme

Este endpoint se encargarencargaráde crear un nuevo meme.

#### Cuerpo de peticiopetición

- `name` (string): El nombre del meme.
    
- `urlImage` (string): La url de la imagen.
    

``` json
{
	"name": "Nombre del meme",
	"urlImage": "Enlace de la imagen"
}
 ```

#### Respuesta

Tras una creaciocreación exitosa, la respuesta tendrá un código de estado de 201 y un cuerpo JSON con la siguiente estructura:

``` json
{
    "ok": true,
    "status": 201,
    "message": "Meme Created",
    "body": {
        "meme_id": 5,
        "name": "Nombre del meme",
        "urlImage": "Enlace de la imagen"
    }
}

 ```
### Method: POST
>```
>http://localhost:3001/api/v1/memes
>```
### Body (**raw**)

```json
{
	"name": "Nombre del meme",
	"urlImage": "Enlace de la imagen"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Actualizar meme

Este endpoint se usa para actualizar un meme por medio de su ID.

#### Cuerpo de peticiopetición

ambos son opcionales.

- `name` (string): El nombre del meme.
    
- `urlImage` (string): La url de la imagen.
    

``` json
{
	"name": "Nombre del meme",
	"urlImage": "Enlace de la imagen"
}
 ```

#### Respuesta

Tras una actualización exitosa, la respuesta tendrá un código de estado de 200 y un cuerpo JSON con la siguiente estructura:

``` json
{
    "ok": true,
    "status": 0,
    "message": "",
    "meme": {
        "meme_id": 0,
        "name": "",
        "urlImage": ""
    }
}

 ```
### Method: PUT
>```
>http://localhost:3001/api/v1/memes/5
>```
### Body (**raw**)

```json
{
	"name": "Suma Mita",
	"urlImage": "Enlace"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Eliminar meme

Este endpoint es utilizado para eliminar un meme espcifico a traves de su ID.

#### Petición

- Method: DELETE
    
- URL: `http://localhost:3001/api/v1/memes/4`
    

#### Respuesta

``` json
{
    "ok": true,
    "status": 200,
    "message": "Meme deleted successfully",
    "deletedMeme": {
        "meme_id": 4,
        "name": "Suma Mita",
        "urlImage": "Enlace"
    }
}

 ```
### Method: DELETE
>```
>http://localhost:3001/api/v1/memes/4
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
