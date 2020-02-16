export class DuplicateSlsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateSlsError';
  }
}

export class NoSlsObjectFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoSlsFoundError';
  }
}

export class DynamoDBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DynamoDBError';
  }
}
