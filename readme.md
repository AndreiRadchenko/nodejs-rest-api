# GoIT Node.js Course Homework

## Unit test for login controller

By using <a href="https://jestjs.io/docs/api#aftereachfn-timeout">Jest</a> library, I created
`controllers/users/login.test.js` module for testing login rout. Run: `npm test`

## Cloudinary

In the branch `cloudinary` saving avatar on the external cloud storage
<a href="https://cloudinary.com/">cloudinary</a> has implemented. See controllers/users/updateAvatar
for detail.

## Jimp library for image transform

Upload image using multipart/form-data request and multer lib, resize image before saving using
<a href="https://www.npmjs.com/package/jimp">Jimp</a> lib (helpers/resizeAndMoveAvatar.js)

# <span style="color: orange">REST API</span>

The REST API to the example app is described below. Base url: `https://rendercontacts.onrender.com`

## <span style="color: green">Authorization routes</span>

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

### Email verification: `GET /api/auth/verify/:verificationToken`

<details><summary>Request details</summary>
This request is sent by following link from the email user received after registration.

    Request only need verificationToken in request string

Response

    Status: 200 Ok

    {
    "message": "Email verification successful"
    }

</details>

### Resend verification email: `POST /api/auth/verify`

<details><summary>Request details</summary>
In response to this request, the user will be sent an email with a verification link.

    Headers:
    Content-type: application-json

    Body:
    {
    "email": "andrii@mail.com"
    }

Response

    Status: 200 Ok

    {
    "message": "Email verification successful"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDdhOGYzZjZmZTAwMDc3NTE0ZjI5MiIsImlhdCI6MTY3ODQ1MjkyMSwiZXhwIjoxNjc4NTM5MzIxfQ.Mcu_xtjfrqo6-IhXRPekd_YWBIzHhst2AbZZq7c7_eg",
    "user": {
        "email": "dima@mail.com",
        "subscription": "pro",
        "avatarURL": "avatars/6407a8f3f6fe00077514f292.jpg"
        }
    }

</details>

### Current: `GET /api/auth/current`

<details><summary>Request details</summary>

You can use this route in your app to regain user connection in a case of the web page was closed,
and valid token was saved in local Storage.

    Headers:
    Content-type: application-json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

Response

    Status: 200 Ok

    {
    "name": "Dima",
    "email": "dima@mail.com",
    "subscription": "pro",
    "avatarURL": "avatars/6407a8f3f6fe00077514f292.jpg"
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

### Update avatar: `PATCH /api/auth/avatars`

<details><summary>Request details</summary>

Update user avatar using multer library

    Headers:
    Content-type: multipart/form-data
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJmNjEyOTZkZWE5NTkwNDdiNDAzNyIsImlhdCI6MTY3NzkxNjk3NCwiZXhwIjoxNjc4MDAzMzc0fQ.seXRPf2_C11GkhcylP63rhgdTWJIozYrE8-K66u-beU

    FormData:
    {
    "avatar": {imageFile}
    }

Response

    Status: 200 Ok

    {
     "avatarURL": "http://res.cloudinary.com/dbm1pjejb/image/upload/v1678445440/rest-api-avatars/bx1yeff5ol1uas5frxyg.jpg"
    }

</details>

## <span style="color: green">Contacts collection routes</span>

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

# <span style="color: orange">Unique fields in MongoDB collection, and handling conflicts error</span>

1. In Compass in collection tab navigate to Index -> create new index -> choose field that should
   bee unique -> check Create unique index

2. In mongoose schema add prop `unique: true` to the field definition and add error handler to the
   schema: `contactSchema.post('save', handleSchemaError);`

<details><summary>contactSchema</summary>

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

</details>

3. Create helper `handleSchemaError` which will be called while saving model with our schema. This
   helper callback is responsible for correct status code sending to frontend. (409 - conflict)

<details><summary>handleSchemaError</summary>

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

</details>
