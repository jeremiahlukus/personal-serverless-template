export interface ValidationProperty {
  property: string;
}

export interface ValidationError {
  code: string;
  message: string;
  properties: ValidationProperty[];
}

export function formatValidationErrors(errors: any): ValidationError[] {
  const formattedErrors: ValidationError[] = errors.details.map((e: any) => ({
    code: e.type,
    message: e.message.replace(/"/g, ''),
    properties: [{ property: e.path.join('.') }],
  }));
  return formattedErrors;
}
