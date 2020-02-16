import Joi from '@hapi/joi';

export const UpdateRequestSchema = Joi.object({
  updatedOn: Joi.string().isoDate(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
});
