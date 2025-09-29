<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Persons</h2>
          <router-link to="/persons/add" class="btn btn-primary">
            <i class="bi bi-plus"></i> Add Person
          </router-link>
        </div>

        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>Loading persons...</p>
        </div>
        
        <div v-else-if="errorMessage" class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error!</h4>
          <p>{{ errorMessage }}</p>
          <hr>
          <button class="btn btn-outline-danger" @click="loadPersons">Try Again</button>
        </div>
        
        <div v-else>
          <div v-if="persons.length > 0" class="row">
            <div v-for="person in persons" :key="person.id" class="col-md-6 col-lg-4 mb-3">
              <PersonCard 
                :person="person" 
                @edit="editPerson" 
                @view="viewPerson" 
                @delete="deletePerson" 
              />
            </div>
          </div>
          <div v-else class="text-center py-5">
            <i class="bi bi-person display-1 text-muted"></i>
            <h3 class="text-muted">No persons found</h3>
            <p class="text-muted">Get started by adding your first person.</p>
            <router-link to="/persons/add" class="btn btn-primary">
              <i class="bi bi-plus"></i> Add Person
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/services/api';
import PersonCard from './PersonCard.vue';
import type { PersonDto } from '@/types';

const router = useRouter();
const persons = ref<PersonDto[]>([]);
const loading = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  await loadPersons();
});

async function loadPersons() {
  try {
    loading.value = true;
    errorMessage.value = null;

    const result = await apiService.getPersons();
    persons.value = result;
  } catch (error: any) {
    errorMessage.value = `Failed to load persons: ${error.message}`;
  } finally {
    loading.value = false;
  }
}

function editPerson(id: string) {
  router.push(`/persons/edit/${id}`);
}

function viewPerson(id: string) {
  router.push(`/persons/${id}`);
}

async function deletePerson(id: string) {
  if (confirm('Are you sure you want to delete this person?')) {
    try {
      await apiService.deletePerson(id);
      await loadPersons();
    } catch (error: any) {
      errorMessage.value = `Failed to delete person: ${error.message}`;
    }
  }
}
</script>
