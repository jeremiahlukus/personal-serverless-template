import Joi from 'joi';

export const SomeSchema = Joi.object({
  href: Joi.string()
    .required()
    .uri(),
});

export const CreateRequestSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  unit: SomeSchema.required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});
