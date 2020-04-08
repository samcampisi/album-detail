import axios, { AxiosInstance } from 'axios';

export default class ApiService {
  private static instance: ApiService;
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }

  static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  getClient(): AxiosInstance {
    return this.axios;
  }
}
