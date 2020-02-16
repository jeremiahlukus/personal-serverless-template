import { ValidationError } from '../utils/formatValidationErrors';

export interface CreateRequest {
  id: string;
  username: string;
  email: string;
  createdOn: Date;
  updatedOn: Date;
  unit: {
    href: string;
  };
}

export interface CreateResponse {
  validationErrors?: ValidationError[];
}
