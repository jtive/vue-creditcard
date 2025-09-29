<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h3 class="mb-0">Edit Person</h3>
          </div>
          <div class="card-body">
            <div v-if="loading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p>Loading person data...</p>
            </div>
            
            <div v-else-if="errorMessage" class="alert alert-danger" role="alert">
              <h4 class="alert-heading">Error!</h4>
              <p>{{ errorMessage }}</p>
              <hr>
              <button class="btn btn-outline-danger" @click="loadPerson">Try Again</button>
            </div>
            
            <form v-else @submit.prevent="handleSubmit">
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
                <label for="ssn" class="form-label">SSN</label>
                <input 
                  id="ssn" 
                  :value="originalPerson?.ssn || ''" 
                  type="text" 
                  class="form-control" 
                  readonly
                />
                <div class="form-text">SSN cannot be changed after creation</div>
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
                  <span>{{ loading ? 'Saving...' : 'Save Changes' }}</span>
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
import { useRouter, useRoute } from 'vue-router';
import { apiService } from '@/services/api';
import type { PersonDto, UpdatePersonDto } from '@/types';

const router = useRouter();
const route = useRoute();

const person = reactive<UpdatePersonDto>({
  firstName: '',
  lastName: '',
  birthDate: ''
});

const originalPerson = ref<PersonDto | null>(null);
const loading = ref(false);
const errorMessage = ref<string | null>(null);
const validationErrors = ref<string[]>([]);

onMounted(async () => {
  await loadPerson();
});

async function loadPerson() {
  try {
    loading.value = true;
    errorMessage.value = null;

    const personId = route.params.id as string;
    const result = await apiService.getPerson(personId);
    originalPerson.value = result;
    
    person.firstName = result.firstName;
    person.lastName = result.lastName;
    person.birthDate = result.birthDate.split('T')[0]; // Convert to YYYY-MM-DD format
    
    updateValidationErrors();
  } catch (error: any) {
    errorMessage.value = `Failed to load person: ${error.message}`;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  updateValidationErrors();
  
  if (validationErrors.value.length > 0) {
    errorMessage.value = `Please fix the following errors: ${validationErrors.value.join(', ')}`;
    return;
  }

  try {
    loading.value = true;
    errorMessage.value = null;

    const personId = route.params.id as string;
    await apiService.updatePerson(personId, person);
    router.push('/persons');
  } catch (error: any) {
    errorMessage.value = `Failed to update person: ${error.message}`;
  } finally {
    loading.value = false;
  }
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
</script>
