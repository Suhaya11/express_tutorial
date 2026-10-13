export const addUserSchema = {
  name: {
    isString: {
      errorMessage: "name must be string",
    },
    notEmpty: {
      errorMessage: "name must not be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 20,
      },
      errorMessage: "name must be atlesat 3 to 20 characters",
    },
  },
  displayName: {
    notEmpty: true,
  },
};
export const VerifyIdSchema = {
  id: {
    notEmpty: {
      errorMessage: "Empty id is unacceptable",
    },
    isLength: {
      options: {
        min: 1,
        max: 4,
      },
      errorMessage: "id must be 1 to 4 char length",
    },
  },
};
export const userLogingSchema = {
  username: {
    isString: {
      errorMessage: "username must be valid string",
    },
    isLength: {
      options: {
        max: 32,
        min: 3,
      },
      errorMessage: "the minimum length for username is 3 and maximum is 32",
    },
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "the password must be atlest 6 characters length",
    },
  },
};
export const cartAddingSchema = {
  title: {
    isString: {
      errorMessage: "item title must be string",
    },
  },
};
