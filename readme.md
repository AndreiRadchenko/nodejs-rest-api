# GoIT Node.js Course Homework

## Unique fields in MongoDB collection, and handling conflicts error

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
