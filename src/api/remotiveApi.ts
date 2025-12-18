import axios from 'axios';

export const remotiveApi = axios.create({
  baseURL: 'https://remotive.com/api',
  
  timeout: 10000,
});
