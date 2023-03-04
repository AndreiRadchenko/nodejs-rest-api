# GoIT Node.js Course Homework

# REST API

The REST API to the example app is described below. Base url: `https://rendercontacts.onrender.com`

## Authorization routes

### Register: `POST /api/auth/register`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json

    Body:
    {
    "name": "Andrii",
    "email": "andrii@mail.com",
    "password": "123qweASD"
    }

Response

    Status: 201 Created

    {
    "message": "new user created",
    "user": {
        "email": "andrii@mail.com",
        "subscription": "starter"
        }
    }

</details>

### Login: `POST /api/auth/login`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json

    Body:
    {
    "email": "andrii@mail.com",
    "password": "123qweASD"
    }

Response

    Status: 200 Ok

    {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU",
    "user": {
        "email": "andrii@mail.com",
        "subscription": "starter"
        }
    }

</details>

### Current: `GET /api/auth/current`

<details><summary>Request details</summary></br>

You can use this route in your app to regain user connection in a case of the web page was closed,
and valid token was saved in local Storage.

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "name": "Andrii",
    "email": "andrii@mail.com",
    "subscription": "starter"
    }

</details>

### Update subscription: `PATCH /api/auth`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

    Body:
    {
    "subscription": "pro"
    }

Response

    Status: 200 Ok

    {
    "message": "Subscription set to 'pro'",
    "user": {
        "name": "Andrii",
        "email": "andrii@mail.com",
        "subscription": "pro"
        }
    }

</details>

## Contacts collection routes

### Add contact to user collection: `POST /api/contacts`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

    Body:
    {
    "name": "Dima",
    "email": "dima@mail.com",
    "phone": "+380671234567"
    }

Response

    Status: 201 Created

    {
    "message": "new contact added",
    "newContact": {
        "name": "Dima",
        "email": "dima@mail.com",
        "phone": "+380671234567",
        "favorite": false,
        "owner": "6402f61296dea959047b4037",
        "_id": "64031305e56210df7284fe18",
        "createdAt": "2023-03-04T09:44:37.108Z",
        "updatedAt": "2023-03-04T09:44:37.108Z"
        }
    }

</details>

### Get all user contacts: `GET /api/contacts`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "message": "Contacts list array in json format",
    "contacts": [
        {
            "_id": "64031305e56210df7284fe18",
            "name": "Dima",
            "email": "dima@mail.com",
            "phone": "+380671234567",
            "favorite": false,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        },
        {
            "_id": "64031513e56210df7284fe1b",
            "name": "Misha",
            "email": "misha@mail.com",
            "phone": "+380671234567",
            "favorite": false,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        },
    }

</details>

### Get contact by id: `GET /api/contacts/:id`

<details><summary>Request details</summary>

```
    https://rendercontacts.onrender.com/api/contacts/64031305e56210df7284fe18
```

    Headers: Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "message": "Contact with Id: 64031305e56210df7284fe18",
    "contact": {
        "_id": "64031305e56210df7284fe18",
        "name": "Dima",
        "email": "dima@mail.com",
        "phone": "+380671234567",
        "favorite": false,
        "owner": "6402f61296dea959047b4037",
        "createdAt": "2023-03-04T09:44:37.108Z",
        "updatedAt": "2023-03-04T09:44:37.108Z"
        }
    }

</details>

### Delete contact: `DELETE /api/contacts/:id`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "message": "contact deleted",
    "result": {
        "_id": "64031305e56210df7284fe18",
        "name": "Dima",
        "email": "dima@mail.com",
        "phone": "+380671234567",
        "favorite": false,
        "owner": "6402f61296dea959047b4037",
        "createdAt": "2023-03-04T09:44:37.108Z",
        "updatedAt": "2023-03-04T09:44:37.108Z"
        }
    }

</details>

### Update contact's data: `PUT /api/contacts/:id`

<details><summary>Request details</summary>

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

    Body:
    {
    "name": "Anatolii2",
    "email": "anatolii2@mail.com",
    "phone": "0673329751"
    }

Response

    Status: 200 Ok

    {
    "message": "contact with new fields",
    "result": {
        "_id": "6401cc29ca13c7e6fdaf4ece",
        "name": "Anatolii2",
        "email": "anatolii2@mail.com",
        "phone": "0673329751",
        "favorite": false,
        "owner": "6401a402df529b42f7f9223b",
        "createdAt": "2023-03-03T10:30:01.809Z",
        "updatedAt": "2023-03-04T12:52:23.629Z"
        }
    }

</details>

### Update contact's favorite flag: `PATCH /api/contacts/:id/favorite`

<details><summary>Request details</summary>

```
    https://rendercontacts.onrender.com/api/contacts/64031513e56210df7284fe1b/favorite
```

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

    Body:
    {
    "favorite": "true"
    }

Response

    Status: 200 Ok

    {
    "message": "contact with new fields",
    "result": {
        "_id": "64031513e56210df7284fe1b",
        "name": "Misha",
        "email": "misha@mail.com",
        "phone": "+380671234567",
        "favorite": true,
        "owner": "6402f61296dea959047b4037",
        "createdAt": "2023-03-04T09:53:23.430Z",
        "updatedAt": "2023-03-04T13:21:49.759Z"
        }
    }

</details>

### Filter contacts by the 'favorite' flag: `GET /api/contacts?favorite=true`

<details><summary>Request details</summary>

```
https://rendercontacts.onrender.com/api/contacts?favorite=true
```

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "message": "Contacts list array in json format",
    "contacts": [
        {
            "_id": "64031513e56210df7284fe1b",
            "name": "Misha",
            "email": "misha@mail.com",
            "phone": "+380671234567",
            "favorite": true,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        },
        {
            "_id": "6403152be56210df7284fe1e",
            "name": "Vika",
            "email": "vika@mail.com",
            "phone": "+380671234567",
            "favorite": true,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        },
        {
            "_id": "64034ac4ed91c30518073bec",
            "name": "Dima",
            "email": "dima@mail.com",
            "phone": "+380671234567",
            "favorite": true,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        }
    ]
    }

</details>

### Pagination and filtering: `GET /api/contacts?page=1&limit=2&favorite=false`

<details><summary>Request details</summary>

```
https://rendercontacts.onrender.com/api/contacts?page=1&limit=2&favorite=false
```

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "message": "Contacts list array in json format",
    "contacts": [
        {
            "_id": "6403153be56210df7284fe21",
            "name": "Ira",
            "email": "ira@mail.com",
            "phone": "+380671234567",
            "favorite": false,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        },
        {
            "_id": "64034af2ed91c30518073bef",
            "name": "Katya",
            "email": "katya@mail.com",
            "phone": "+380671234567",
            "favorite": false,
            "owner": {
                "_id": "6402f61296dea959047b4037",
                "name": "Andrii",
                "email": "andrii@mail.com"
            }
        }
    ]
    }

</details>

# Unique fields in MongoDB collection, and handling conflicts error

1. In Compass in collection tab navigate to Index -> create new index -> choose field that should
   bee unique -> check Create unique index

2. In mongoose schema add prop `unique: true` to the field definition and add error handler to the
   schema: `contactSchema.post('save', handleSchemaError);`

```cli
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaError);

```

3. Create helper `handleSchemaError` which will be called while saving model with our schema. This
   helper callback is responsible for correct status code sending to frontend. (409 - conflict)

```cli
const isConflict = ({ name, code }) => {
  return name === 'MongoServerError' && code === 11000;
};

const handleSchemaError = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
};

module.exports = handleSchemaError;

```
