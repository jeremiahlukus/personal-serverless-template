function envVar(name: string): string {
  if (!process.env[name]) {
    throw new Error(`${name} is not configured`);
  }

  return process.env[name] as string;
}

export function tableName(): string {
  return envVar('TABLE_NAME');
}

export function basicAuthUsername(): string {
  return envVar('BASIC_AUTH_USERNAME');
}

export function basicAuthPassword(): string {
  return envVar('BASIC_AUTH_PASSWORD');
}
