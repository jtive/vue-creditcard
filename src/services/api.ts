import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type {
  PersonDto,
  CreatePersonDto,
  UpdatePersonDto,
  AddressDto,
  CreateAddressDto,
  UpdateAddressDto,
  UnmaskedAddressDto,
  CreditCardDto,
  CreateCreditCardDto,
  UpdateCreditCardDto,
  HealthDto
} from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    // Use proxy in development, direct URL in production
    const baseURL = import.meta.env.DEV 
      ? '/api' 
      : 'https://7wbr3un5gu.us-east-2.awsapprunner.com/api';
      
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Person operations
  async getPersons(): Promise<PersonDto[]> {
    const response: AxiosResponse<PersonDto[]> = await this.api.get('/person');
    return response.data;
  }

  async getPerson(id: string): Promise<PersonDto> {
    const response: AxiosResponse<PersonDto> = await this.api.get(`/person/${id}`);
    return response.data;
  }

  async createPerson(person: CreatePersonDto): Promise<PersonDto> {
    const response: AxiosResponse<PersonDto> = await this.api.post('/person', person);
    return response.data;
  }

  async updatePerson(id: string, person: UpdatePersonDto): Promise<void> {
    await this.api.put(`/person/${id}`, person);
  }

  async deletePerson(id: string): Promise<void> {
    await this.api.delete(`/person/${id}`);
  }

  // Address operations
  async getAddressesByPerson(personId: string): Promise<AddressDto[]> {
    const response: AxiosResponse<AddressDto[]> = await this.api.get(`/address/person/${personId}`);
    return response.data;
  }

  async getAddress(id: string): Promise<AddressDto> {
    const response: AxiosResponse<AddressDto> = await this.api.get(`/address/${id}`);
    return response.data;
  }

  async getUnmaskedAddress(id: string): Promise<UnmaskedAddressDto> {
    const response: AxiosResponse<UnmaskedAddressDto> = await this.api.get(`/address/${id}/unmasked`);
    return response.data;
  }

  async createAddress(personId: string, address: CreateAddressDto): Promise<AddressDto> {
    const response: AxiosResponse<AddressDto> = await this.api.post(`/address/person/${personId}`, address);
    return response.data;
  }

  async updateAddress(id: string, address: UpdateAddressDto): Promise<void> {
    await this.api.put(`/address/${id}`, address);
  }

  async deleteAddress(id: string): Promise<void> {
    await this.api.delete(`/address/${id}`);
  }

  // Credit Card operations
  async getCreditCardsByPerson(personId: string): Promise<CreditCardDto[]> {
    const response: AxiosResponse<CreditCardDto[]> = await this.api.get(`/creditcard/person/${personId}`);
    return response.data;
  }

  async getCreditCard(id: string): Promise<CreditCardDto> {
    const response: AxiosResponse<CreditCardDto> = await this.api.get(`/creditcard/${id}`);
    return response.data;
  }

  async createCreditCard(personId: string, creditCard: CreateCreditCardDto): Promise<CreditCardDto> {
    const response: AxiosResponse<CreditCardDto> = await this.api.post(`/creditcard/person/${personId}`, creditCard);
    return response.data;
  }

  async updateCreditCard(id: string, creditCard: UpdateCreditCardDto): Promise<void> {
    await this.api.put(`/creditcard/${id}`, creditCard);
  }

  async deleteCreditCard(id: string): Promise<void> {
    await this.api.delete(`/creditcard/${id}`);
  }

  // Health check
  async getHealth(): Promise<HealthDto> {
    const response: AxiosResponse<HealthDto> = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();
