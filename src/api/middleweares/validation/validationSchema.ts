import { Joi } from "express-validation";

export const validationSchema = {
  config: {
    context: true,
    statusCode: 422,
    keyByField: true,
  },
  signUpUserSchema: {
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    }),
  },
  signInUserSchema: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    }),
  },
  createBlogSchema: {
    headers: Joi.object()
        .keys({
          authorization: Joi.string()
              .required(),
        })
        .options({ allowUnknown: true }),
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  updateBlogSchema: {
    headers: Joi.object()
        .keys({
          authorization: Joi.string()
              .required(),
        })
        .options({ allowUnknown: true }),
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  deleteBlogSchema: {
    headers: Joi.object()
        .keys({
          authorization: Joi.string()
              .required(),
        })
        .options({ allowUnknown: true }),
    body: Joi.object({
      blogId: Joi.number().required(),
    }),
  },
};
