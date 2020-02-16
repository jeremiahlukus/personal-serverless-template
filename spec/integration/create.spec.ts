import axios from 'axios';
import StatusCode from 'status-code-enum';

describe('create', () => {
  const auth = { username: 'test', password: 'test' };
  const baseURL = process.env.API_URL as string;
  const requestData = {
    username: 'Jermiah',
    email: 'jermiah@jermeiah.com',
    unit: {
      href: 'https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios',
    },
  };
  const httpClient = axios.create({ baseURL, auth, validateStatus: () => true });

  test('returns 201 when correct params are given', async () => {
    const response = await httpClient.post(`/personal-serverless-template`, requestData);
    expect(response.status).toBe(201);
  });

  test('returns validation errors when incorrect params are given', async () => {
    const invalidRequestData = requestData;
    invalidRequestData.email = 'invaild';
    const response = await httpClient.post(`/personal-serverless-template`, invalidRequestData);
    expect(response.status).toBe(StatusCode.ClientErrorUnprocessableEntity);
    expect(response.data).toStrictEqual([
      {
        code: 'string.email',
        message: 'email must be a valid email',
        properties: [{ property: 'email' }],
      },
    ]);
  });
});
