// DTOs matching the .NET API
export interface PersonDto {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  ssn: string; // Masked
  createdAt: string;
  updatedAt: string;
  addresses: AddressDto[];
  creditCards: CreditCardDto[];
}

export interface CreatePersonDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  ssn: string;
  addresses: CreateAddressDto[];
  creditCards: CreateCreditCardDto[];
}

export interface UpdatePersonDto {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface AddressDto {
  id: string;
  personId: string;
  addressType: string;
  streetAddress: string; // Masked
  city: string; // Masked
  state: string; // Masked
  zipCode: string; // Masked
  country: string; // Masked
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressDto {
  addressType: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface UpdateAddressDto {
  addressType: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

export interface UnmaskedAddressDto {
  id: string;
  personId: string;
  addressType: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreditCardDto {
  id: string;
  personId: string;
  cardType: string;
  lastFourDigits: string; // Masked
  expirationMonth: number;
  expirationYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCreditCardDto {
  cardType: string;
  cardNumber: string; // Full number for creation
  expirationMonth: number;
  expirationYear: number;
  isActive: boolean;
}

export interface UpdateCreditCardDto {
  cardType: string;
  cardNumber: string; // Full number for update
  expirationMonth: number;
  expirationYear: number;
  isActive: boolean;
}

export interface HealthDto {
  status: string;
  timestamp: string;
  database: string;
  statistics: HealthStatisticsDto;
  error?: string;
}

export interface HealthStatisticsDto {
  persons: number;
  addresses: number;
  creditCards: number;
}
