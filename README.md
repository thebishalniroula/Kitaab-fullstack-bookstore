# Project: full stack single seller ecoomerce
This is a full stack single seller ecommerce website that is being built using express js as backend, nextjs as frontend and mongoDB as database.

## End-point: user register
### Method: POST
>```
>localhost:5000/api/auth/user/register
>```
### Body (**raw**)

```json
{
 "name":"Bishal Niroula",
 "email":"bishal@bishal.com",
 "password":"bishal12345"   
}
```

### Response: 200
```json
{
    "status": "success",
    "message": "User regestered."
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: user login
### Method: POST
>```
>localhost:5000/api/auth/user/login
>```
### Body (**raw**)

```json
{
 "name":"Bishal Niroula",
 "email":"bishal@bishal.com",
 "password":"bishal12345"   
}
```

### Response: 200
```json
{
    "status": "success",
    "message": "You have been logged in as Bishal Niroula"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: user logout
### Method: POST
>```
>localhost:5000/api/auth/admin/logout
>```
### Response: 200
```json
{
    "status": "success",
    "message": "You have been logged out"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: admin login
### Method: POST
>```
>localhost:5000/api/auth/admin/login
>```
### Body (**raw**)

```json
{

    "email": "niroulabishal199@gmail.com",
    "password":"niroulabishal199"

}


```

### Response: 200
```json
{
    "status": "success",
    "message": "Please verify your otp to login"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: verify-otp
### Method: POST
>```
>localhost:5000/api/auth/admin/login/verify-otp
>```
### Body (**raw**)

```json
{
    "email": "niroulabishal199@gmail.com",
    "password":"niroulabishal199",
    "otp":"220"
}
```

### Response: 200
```json
{
    "status": "success",
    "message": "You have been logged in as admin."
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: resend-otp
### Method: POST
>```
>localhost:5000/api/auth/admin/login/resend-otp
>```
### Body (**raw**)

```json
{
    "email" : "niroulabishal199@gmail.com",
    "password":"niroulabishal199"
}

```

### Response: 200
```json
{
    "status": "success",
    "message": "OTP resent successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: admin logout
### Method: POST
>```
>localhost:5000/api/auth/admin/logout
>```
### Response: 200
```json
{
    "status": "success",
    "message": "You have been logged out"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add book
### Method: POST
>```
>localhost:5000/api/books/admin/add
>```
### Body (**raw**)

```json
{
    "title":"Title of the book 5", 
    "price":"201",
    "category":"EDUCATIONAL",
    "description" :"This is the description of the book.",
    "stock":"5"
}
```

### Response: 200
```json
{
    "title": "Title of the book 5",
    "price": 201,
    "category": "EDUCATIONAL",
    "description": "This is the description of the book.",
    "image": "/images/books/default.png",
    "stock": 5,
    "_id": "62c72de0d675b843c2dd50af",
    "reviews": [],
    "__v": 0
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update book
### Method: PATCH
>```
>localhost:5000/api/books/admin/update/:id
>```
### Body (**raw**)

```json
{
    "price": "250"
}
```

### Response: 200
```json
{
    "_id": "62c6d3fd1fa4dd39f0c58a69",
    "title": "Title of the book 2",
    "price": 250,
    "category": "EDUCATIONAL",
    "description": "This is the description of the book.",
    "image": "/images/books/default.png",
    "stock": 5,
    "reviews": [
        {
            "userId": "62c48d92e348918233fb65a2",
            "review": "Very nice book",
            "_id": "62c6da7344883da20c123f5c"
        }
    ],
    "__v": 0
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: books
### Method: GET
>```
>localhost:5000/api/books/
>```
### Response: 200
```json
[
    {
        "_id": "62c6d3701fa4dd39f0c58a66",
        "title": "Title of the book",
        "price": 200,
        "category": "COMICS",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c6d3fd1fa4dd39f0c58a69",
        "title": "Title of the book 2",
        "price": 250,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c6ea460fa77a6bb553d770",
        "title": "Title of the book 3",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c6ea9e0fa77a6bb553d774",
        "title": "Title of the book 4",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c6eabd0fa77a6bb553d77b",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c72dc5d675b843c2dd50ab",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    },
    {
        "_id": "62c72de0d675b843c2dd50af",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: book by id
### Method: GET
>```
>localhost:5000/api/books/:id
>```
### Response: 200
```json
{
    "_id": "62c6d3701fa4dd39f0c58a66",
    "title": "Title of the book",
    "price": 200,
    "category": "COMICS",
    "description": "This is the description of the book.",
    "image": "/images/books/default.png",
    "stock": 5,
    "reviews": [],
    "__v": 0
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: books by category
### Method: GET
>```
>localhost:5000/api/books/category/:category
>```
### Response: 200
```json
[
    {
        "_id": "62c6d3fd1fa4dd39f0c58a69",
        "title": "Title of the book 2",
        "price": 250,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5,
        "reviews": [
            {
                "userId": "62c48d92e348918233fb65a2",
                "review": "Very nice book",
                "_id": "62c6da7344883da20c123f5c"
            }
        ],
        "__v": 0
    },
    {
        "_id": "62c6ea460fa77a6bb553d770",
        "title": "Title of the book 3",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "reviews": [
            {
                "userId": "62c48d92e348918233fb65a2",
                "review": "Very nice book",
                "_id": "62c6da7344883da20c123f5c"
            }
        ],
        "stock": 5,
        "__v": 0
    },
    {
        "_id": "62c6ea9e0fa77a6bb553d774",
        "title": "Title of the book 4",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "reviews": [
            {
                "userId": "62c48d92e348918233fb65a2",
                "review": "Very nice book",
                "_id": "62c6ea9e0fa77a6bb553d775"
            }
        ],
        "stock": 5,
        "__v": 0
    },
    {
        "_id": "62c6eabd0fa77a6bb553d77b",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "reviews": [
            {
                "userId": "62c48d92e348918233fb65a2",
                "review": "Very nice book",
                "_id": "62c6eabd0fa77a6bb553d77c"
            }
        ],
        "stock": 5,
        "__v": 0
    },
    {
        "_id": "62c72dc5d675b843c2dd50ab",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "reviews": [
            {
                "userId": "62c48d92e348918233fb65a2",
                "review": "Very nice book",
                "_id": "62c72dc5d675b843c2dd50ac"
            }
        ],
        "stock": 5,
        "__v": 0
    },
    {
        "_id": "62c72de0d675b843c2dd50af",
        "title": "Title of the book 5",
        "price": 201,
        "category": "EDUCATIONAL",
        "description": "This is the description of the book.",
        "image": "/images/books/default.png",
        "stock": 5,
        "reviews": [],
        "__v": 0
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: add to cart
### Method: POST
>```
>localhost:5000/api/cart/add/:id
>```
### Response: 200
```json
{
    "status": "success",
    "message": "Item added to cart successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: remove from cart
### Method: DELETE
>```
>localhost:5000/api/cart/remove/:id
>```
### Response: 200
```json
{
    "status": "success",
    "message": "Item removed from cart successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
