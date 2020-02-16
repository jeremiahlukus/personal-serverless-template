import { ValidationError } from '../utils/formatValidationErrors';

export interface UpdateRequest {
  id: string;
  username: string;
  email: string;
  createdOn: Date;
  updatedOn: Date;
  unit: {
    href: string;
  };
}

export interface UpdateResponse {
  validationErrors?: ValidationError[];
}
