<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Add New Person</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="firstName" class="form-label">First Name *</label>
                    <input 
                      id="firstName" 
                      v-model="person.firstName" 
                      type="text" 
                      class="form-control" 
                      :class="{ 'is-invalid': getPersonValidationMessage('firstName') }"
                      @input="updateValidationErrors"
                    />
                    <div v-if="getPersonValidationMessage('firstName')" class="invalid-feedback">
                      {{ getPersonValidationMessage('firstName') }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name *</label>
                    <input 
                      id="lastName" 
                      v-model="person.lastName" 
                      type="text" 
                      class="form-control" 
                      :class="{ 'is-invalid': getPersonValidationMessage('lastName') }"
                      @input="updateValidationErrors"
                    />
                    <div v-if="getPersonValidationMessage('lastName')" class="invalid-feedback">
                      {{ getPersonValidationMessage('lastName') }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="birthDate" class="form-label">Birth Date *</label>
                <input 
                  id="birthDate" 
                  v-model="person.birthDate" 
                  type="date" 
                  class="form-control" 
                  :class="{ 'is-invalid': getPersonValidationMessage('birthDate') }"
                  @change="updateValidationErrors"
                />
                <div v-if="getPersonValidationMessage('birthDate')" class="invalid-feedback">
                  {{ getPersonValidationMessage('birthDate') }}
                </div>
              </div>

              <div class="mb-3">
                <label for="ssn" class="form-label">SSN *</label>
                <input 
                  id="ssn" 
                  v-model="ssnValue" 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': getSSNValidationMessage() }"
                  placeholder="123-45-6789"
                  maxlength="11"
                  @input="onSSNChanged"
                />
                <div v-if="getSSNValidationMessage()" class="invalid-feedback">
                  {{ getSSNValidationMessage() }}
                </div>
                <div class="form-text">Enter your Social Security Number</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Address</label>
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-8">
                        <div class="mb-3">
                          <label for="streetAddress" class="form-label">Street Address *</label>
                          <input 
                            id="streetAddress" 
                            v-model="address.streetAddress" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getAddressValidationMessage('streetAddress') }"
                            @input="updateValidationErrors"
                          />
                          <div v-if="getAddressValidationMessage('streetAddress')" class="invalid-feedback">
                            {{ getAddressValidationMessage('streetAddress') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="mb-3">
                          <label for="addressType" class="form-label">Type *</label>
                          <select 
                            id="addressType" 
                            v-model="address.addressType" 
                            class="form-select" 
                            :class="{ 'is-invalid': getAddressValidationMessage('addressType') }"
                            @change="updateValidationErrors"
                          >
                            <option value="">Select type</option>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Mailing">Mailing</option>
                          </select>
                          <div v-if="getAddressValidationMessage('addressType')" class="invalid-feedback">
                            {{ getAddressValidationMessage('addressType') }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="mb-3">
                          <label for="city" class="form-label">City *</label>
                          <input 
                            id="city" 
                            v-model="address.city" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getAddressValidationMessage('city') }"
                            @input="updateValidationErrors"
                          />
                          <div v-if="getAddressValidationMessage('city')" class="invalid-feedback">
                            {{ getAddressValidationMessage('city') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="mb-3">
                          <label for="state" class="form-label">State *</label>
                          <input 
                            id="state" 
                            v-model="address.state" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getAddressValidationMessage('state') }"
                            maxlength="2"
                            @input="updateValidationErrors"
                          />
                          <div v-if="getAddressValidationMessage('state')" class="invalid-feedback">
                            {{ getAddressValidationMessage('state') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mb-3">
                          <label for="zipCode" class="form-label">Zip Code *</label>
                          <input 
                            id="zipCode" 
                            v-model="address.zipCode" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getAddressValidationMessage('zipCode') }"
                            @input="updateValidationErrors"
                          />
                          <div v-if="getAddressValidationMessage('zipCode')" class="invalid-feedback">
                            {{ getAddressValidationMessage('zipCode') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mb-3">
                          <label for="country" class="form-label">Country *</label>
                          <input 
                            id="country" 
                            v-model="address.country" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getAddressValidationMessage('country') }"
                            @input="updateValidationErrors"
                          />
                          <div v-if="getAddressValidationMessage('country')" class="invalid-feedback">
                            {{ getAddressValidationMessage('country') }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-check">
                        <input 
                          id="isPrimary" 
                          v-model="address.isPrimary" 
                          type="checkbox" 
                          class="form-check-input" 
                        />
                        <label class="form-check-label" for="isPrimary">
                          Primary Address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Credit Card</label>
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="cardType" class="form-label">Card Type *</label>
                          <select 
                            id="cardType" 
                            v-model="creditCard.cardType" 
                            class="form-select" 
                            :class="{ 'is-invalid': getCreditCardValidationMessage('cardType') }"
                            @change="updateValidationErrors"
                          >
                            <option value="">Select card type</option>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">MasterCard</option>
                            <option value="American Express">American Express</option>
                            <option value="Discover">Discover</option>
                          </select>
                          <div v-if="getCreditCardValidationMessage('cardType')" class="invalid-feedback">
                            {{ getCreditCardValidationMessage('cardType') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label for="cardNumber" class="form-label">Card Number *</label>
                          <input 
                            id="cardNumber" 
                            v-model="cardNumberValue" 
                            type="text" 
                            class="form-control" 
                            :class="{ 'is-invalid': getCardNumberValidationMessage() }"
                            placeholder="1234 5678 9012 3456"
                            @input="onCardNumberChanged"
                          />
                          <div v-if="getCardNumberValidationMessage()" class="invalid-feedback">
                            {{ getCardNumberValidationMessage() }}
                          </div>
                          <div class="form-text">Enter your credit card number</div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="mb-3">
                          <label for="expirationMonth" class="form-label">Expiration Month *</label>
                          <input 
                            id="expirationMonth" 
                            v-model.number="creditCard.expirationMonth" 
                            type="number" 
                            class="form-control" 
                            :class="{ 'is-invalid': getCreditCardValidationMessage('expirationMonth') }"
                            min="1"
                            max="12"
                            @change="updateValidationErrors"
                          />
                          <div v-if="getCreditCardValidationMessage('expirationMonth')" class="invalid-feedback">
                            {{ getCreditCardValidationMessage('expirationMonth') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="mb-3">
                          <label for="expirationYear" class="form-label">Expiration Year *</label>
                          <input 
                            id="expirationYear" 
                            v-model.number="creditCard.expirationYear" 
                            type="number" 
                            class="form-control" 
                            :class="{ 'is-invalid': getCreditCardValidationMessage('expirationYear') }"
                            min="2024"
                            max="2030"
                            @change="updateValidationErrors"
                          />
                          <div v-if="getCreditCardValidationMessage('expirationYear')" class="invalid-feedback">
                            {{ getCreditCardValidationMessage('expirationYear') }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="mb-3">
                          <div class="form-check mt-4">
                            <input 
                              id="isActive" 
                              v-model="creditCard.isActive" 
                              type="checkbox" 
                              class="form-check-input" 
                            />
                            <label class="form-check-label" for="isActive">
                              Active Card
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>

              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" @click="cancel">
                  <i class="bi bi-x"></i> Cancel
                </button>
                <button type="submit" class="btn btn-primary" :disabled="loading || validationErrors.length > 0">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <i v-else class="bi bi-check"></i>
                  <span>{{ loading ? 'Saving...' : 'Save Person' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/services/api';
import type { CreatePersonDto, CreateAddressDto, CreateCreditCardDto } from '@/types';

const router = useRouter();

const person = reactive<CreatePersonDto>({
  firstName: '',
  lastName: '',
  birthDate: '',
  ssn: '',
  addresses: [],
  creditCards: []
});

const address = reactive<CreateAddressDto>({
  addressType: 'Home',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  isPrimary: false
});

const creditCard = reactive<CreateCreditCardDto>({
  cardType: '',
  cardNumber: '',
  expirationMonth: 0,
  expirationYear: 0,
  isActive: true
});

const ssnValue = ref('');
const cardNumberValue = ref('');
const loading = ref(false);
const errorMessage = ref<string | null>(null);
const validationErrors = ref<string[]>([]);

onMounted(() => {
  updateValidationErrors();
});

async function handleSubmit() {
  updateValidationErrors();
  
  if (validationErrors.value.length > 0) {
    errorMessage.value = `Please fix the following errors: ${validationErrors.value.join(', ')}`;
    return;
  }

  try {
    loading.value = true;
    errorMessage.value = null;

    // Add address if provided
    if (address.streetAddress.trim()) {
      person.addresses.push({ ...address });
    }

    // Add credit card if provided
    if (creditCard.cardNumber.trim()) {
      person.creditCards.push({ ...creditCard });
    }

    await apiService.createPerson(person);
    router.push('/persons');
  } catch (error: any) {
    errorMessage.value = `Failed to create person: ${error.message}`;
  } finally {
    loading.value = false;
  }
}

function onSSNChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, ''); // Remove non-digits
  
  // Format as XXX-XX-XXXX
  if (value.length >= 6) {
    value = value.substring(0, 3) + '-' + value.substring(3, 5) + '-' + value.substring(5, 9);
  } else if (value.length >= 3) {
    value = value.substring(0, 3) + '-' + value.substring(3);
  }
  
  ssnValue.value = value;
  person.ssn = value.replace(/\D/g, ''); // Store digits only
  updateValidationErrors();
}

function onCardNumberChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, ''); // Remove non-digits
  
  // Format as XXXX XXXX XXXX XXXX
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  
  cardNumberValue.value = value;
  creditCard.cardNumber = value.replace(/\D/g, ''); // Store digits only
  updateValidationErrors();
}

function cancel() {
  router.push('/persons');
}

function updateValidationErrors() {
  validationErrors.value = [];
  
  // Required person fields
  if (!person.firstName.trim()) {
    validationErrors.value.push('First Name is required');
  }
  
  if (!person.lastName.trim()) {
    validationErrors.value.push('Last Name is required');
  }
  
  if (!person.birthDate) {
    validationErrors.value.push('Birth Date is required');
  }
  
  if (!ssnValue.value.trim()) {
    validationErrors.value.push('SSN is required');
  }
  
  // Address validation - only validate if any address field is filled
  const hasAddressData = address.streetAddress.trim() || 
                        address.city.trim() || 
                        address.state.trim() || 
                        address.zipCode.trim() ||
                        address.country.trim() ||
                        address.addressType.trim();
  
  if (hasAddressData) {
    if (!address.addressType.trim()) {
      validationErrors.value.push('Address Type is required');
    }
    
    if (!address.streetAddress.trim()) {
      validationErrors.value.push('Street Address is required');
    }
    
    if (!address.city.trim()) {
      validationErrors.value.push('City is required');
    }
    
    if (!address.state.trim()) {
      validationErrors.value.push('State is required');
    } else if (address.state.length !== 2) {
      validationErrors.value.push('State must be exactly 2 characters');
    }
    
    if (!address.zipCode.trim()) {
      validationErrors.value.push('Zip Code is required');
    } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
      validationErrors.value.push('Zip Code must be in format 12345 or 12345-6789');
    }
    
    if (!address.country.trim()) {
      validationErrors.value.push('Country is required');
    } else if (address.country.length !== 2) {
      validationErrors.value.push('Country must be exactly 2 characters');
    }
  }
  
  // Credit card validation - only validate if any credit card field is filled
  const hasCreditCardData = creditCard.cardType.trim() || 
                           cardNumberValue.value.trim() ||
                           creditCard.expirationMonth > 0 ||
                           creditCard.expirationYear > 0;
  
  if (hasCreditCardData) {
    if (!creditCard.cardType.trim()) {
      validationErrors.value.push('Card Type is required');
    }
    
    if (!cardNumberValue.value.trim()) {
      validationErrors.value.push('Card Number is required');
    } else {
      const digitsOnly = cardNumberValue.value.replace(/\D/g, '');
      if (digitsOnly.length < 13 || digitsOnly.length > 19) {
        validationErrors.value.push('Card Number must be 13-19 digits');
      }
    }
    
    if (creditCard.expirationMonth <= 0) {
      validationErrors.value.push('Expiration Month is required');
    } else if (creditCard.expirationMonth < 1 || creditCard.expirationMonth > 12) {
      validationErrors.value.push('Expiration Month must be between 1 and 12');
    }
    
    if (creditCard.expirationYear <= 0) {
      validationErrors.value.push('Expiration Year is required');
    } else if (creditCard.expirationYear < 2024 || creditCard.expirationYear > 2030) {
      validationErrors.value.push('Expiration Year must be between 2024 and 2030');
    }
  }
}

function getPersonValidationMessage(fieldName: string): string {
  switch (fieldName) {
    case 'firstName':
      return !person.firstName.trim() ? 'First Name is required' : 
             person.firstName.length > 50 ? 'First Name cannot exceed 50 characters' : '';
    case 'lastName':
      return !person.lastName.trim() ? 'Last Name is required' : 
             person.lastName.length > 50 ? 'Last Name cannot exceed 50 characters' : '';
    case 'birthDate':
      return !person.birthDate ? 'Birth Date is required' : '';
    default:
      return '';
  }
}

function getSSNValidationMessage(): string {
  if (!ssnValue.value.trim()) {
    return 'SSN is required';
  }
  
  const digitsOnly = ssnValue.value.replace(/\D/g, '');
  if (digitsOnly.length !== 9) {
    return 'SSN must be 9 digits';
  }
  
  return '';
}

function getCardNumberValidationMessage(): string {
  if (!cardNumberValue.value.trim()) {
    return 'Card Number is required';
  }
  
  const digitsOnly = cardNumberValue.value.replace(/\D/g, '');
  if (digitsOnly.length < 13 || digitsOnly.length > 19) {
    return 'Card Number must be 13-19 digits';
  }
  
  return '';
}

function getAddressValidationMessage(fieldName: string): string {
  // Check if any address data is entered
  const hasAddressData = address.streetAddress.trim() || 
                        address.city.trim() || 
                        address.state.trim() || 
                        address.zipCode.trim() ||
                        address.country.trim() ||
                        address.addressType.trim();
  
  if (!hasAddressData) {
    return ''; // No validation if no address data is entered
  }
    
  switch (fieldName) {
    case 'addressType':
      return !address.addressType.trim() ? 'Address Type is required' : '';
    case 'streetAddress':
      return !address.streetAddress.trim() ? 'Street Address is required' : '';
    case 'city':
      return !address.city.trim() ? 'City is required' : '';
    case 'state':
      return !address.state.trim() ? 'State is required' : 
             address.state.length !== 2 ? 'State must be exactly 2 characters' : '';
    case 'zipCode':
      return !address.zipCode.trim() ? 'Zip Code is required' :
             !/^\d{5}(-\d{4})?$/.test(address.zipCode) ? 
             'Zip Code must be in format 12345 or 12345-6789' : '';
    case 'country':
      return !address.country.trim() ? 'Country is required' :
             address.country.length !== 2 ? 'Country must be exactly 2 characters' : '';
    default:
      return '';
  }
}

function getCreditCardValidationMessage(fieldName: string): string {
  // Check if any credit card data is entered
  const hasCreditCardData = creditCard.cardType.trim() || 
                           cardNumberValue.value.trim() ||
                           creditCard.expirationMonth > 0 ||
                           creditCard.expirationYear > 0;
  
  if (!hasCreditCardData) {
    return ''; // No validation if no credit card data is entered
  }
    
  switch (fieldName) {
    case 'cardType':
      return !creditCard.cardType.trim() ? 'Card Type is required' : '';
    case 'expirationMonth':
      return creditCard.expirationMonth <= 0 ? 'Expiration Month is required' :
             creditCard.expirationMonth < 1 || creditCard.expirationMonth > 12 ? 
             'Expiration Month must be between 1 and 12' : '';
    case 'expirationYear':
      return creditCard.expirationYear <= 0 ? 'Expiration Year is required' :
             creditCard.expirationYear < 2024 || creditCard.expirationYear > 2030 ? 
             'Expiration Year must be between 2024 and 2030' : '';
    default:
      return '';
  }
}
</script>
