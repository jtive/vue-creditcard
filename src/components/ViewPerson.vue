<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
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
        
        <div v-else-if="person" class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">{{ person.firstName }} {{ person.lastName }}</h3>
            <div>
              <router-link :to="`/persons/edit/${person.id}`" class="btn btn-outline-primary me-2">
                <i class="bi bi-pencil"></i> Edit
              </router-link>
              <button class="btn btn-outline-danger" @click="deletePerson">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5>Personal Information</h5>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td><strong>First Name:</strong></td>
                      <td>{{ person.firstName }}</td>
                    </tr>
                    <tr>
                      <td><strong>Last Name:</strong></td>
                      <td>{{ person.lastName }}</td>
                    </tr>
                    <tr>
                      <td><strong>Birth Date:</strong></td>
                      <td>{{ formatDate(person.birthDate) }}</td>
                    </tr>
                    <tr>
                      <td><strong>SSN:</strong></td>
                      <td>{{ person.ssn }}</td>
                    </tr>
                    <tr>
                      <td><strong>Created:</strong></td>
                      <td>{{ formatDateTime(person.createdAt) }}</td>
                    </tr>
                    <tr>
                      <td><strong>Last Updated:</strong></td>
                      <td>{{ formatDateTime(person.updatedAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="col-md-6">
                <h5>Statistics</h5>
                <div class="row">
                  <div class="col-6">
                    <div class="card bg-info text-white">
                      <div class="card-body text-center">
                        <h4>{{ person.addresses.length }}</h4>
                        <p class="mb-0">Address{{ person.addresses.length !== 1 ? 'es' : '' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="card bg-warning text-white">
                      <div class="card-body text-center">
                        <h4>{{ person.creditCards.length }}</h4>
                        <p class="mb-0">Credit Card{{ person.creditCards.length !== 1 ? 's' : '' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="person.addresses.length > 0" class="mt-4">
              <h5>Addresses</h5>
              <div class="row">
                <div v-for="address in person.addresses" :key="address.id" class="col-md-6 mb-3">
                  <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <span class="badge bg-primary">{{ address.addressType }}</span>
                      <span v-if="address.isPrimary" class="badge bg-success">Primary</span>
                    </div>
                    <div class="card-body">
                      <p class="mb-1">{{ address.streetAddress }}</p>
                      <p class="mb-1">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                      <p class="mb-0">{{ address.country }}</p>
                      <small class="text-muted">
                        Created: {{ formatDateTime(address.createdAt) }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="person.creditCards.length > 0" class="mt-4">
              <h5>Credit Cards</h5>
              <div class="row">
                <div v-for="card in person.creditCards" :key="card.id" class="col-md-6 mb-3">
                  <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <span class="badge bg-primary">{{ card.cardType }}</span>
                      <span v-if="card.isActive" class="badge bg-success">Active</span>
                      <span v-else class="badge bg-secondary">Inactive</span>
                    </div>
                    <div class="card-body">
                      <p class="mb-1">**** **** **** {{ card.lastFourDigits }}</p>
                      <p class="mb-1">Expires: {{ card.expirationMonth }}/{{ card.expirationYear }}</p>
                      <small class="text-muted">
                        Created: {{ formatDateTime(card.createdAt) }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="person.addresses.length === 0 && person.creditCards.length === 0" class="mt-4 text-center">
              <i class="bi bi-info-circle display-4 text-muted"></i>
              <h5 class="text-muted">No additional information</h5>
              <p class="text-muted">This person has no addresses or credit cards on file.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiService } from '@/services/api';
import type { PersonDto } from '@/types';

const router = useRouter();
const route = useRoute();

const person = ref<PersonDto | null>(null);
const loading = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  await loadPerson();
});

async function loadPerson() {
  try {
    loading.value = true;
    errorMessage.value = null;

    const personId = route.params.id as string;
    const result = await apiService.getPerson(personId);
    person.value = result;
  } catch (error: any) {
    errorMessage.value = `Failed to load person: ${error.message}`;
  } finally {
    loading.value = false;
  }
}

async function deletePerson() {
  if (confirm('Are you sure you want to delete this person? This action cannot be undone.')) {
    try {
      const personId = route.params.id as string;
      await apiService.deletePerson(personId);
      router.push('/persons');
    } catch (error: any) {
      errorMessage.value = `Failed to delete person: ${error.message}`;
    }
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>
