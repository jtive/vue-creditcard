<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="mb-4">Personal Information Management Dashboard</h1>
        
        <div class="row mb-4">
          <div class="col-md-3">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h4 class="card-title">{{ personsCount }}</h4>
                    <p class="card-text">Total Persons</p>
                  </div>
                  <div class="align-self-center">
                    <i class="bi bi-person display-4"></i>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <router-link to="/persons" class="btn btn-light btn-sm">View All</router-link>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="card bg-info text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h4 class="card-title">{{ addressesCount }}</h4>
                    <p class="card-text">Total Addresses</p>
                  </div>
                  <div class="align-self-center">
                    <i class="bi bi-geo-alt display-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="card bg-warning text-white">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h4 class="card-title">{{ creditCardsCount }}</h4>
                    <p class="card-text">Credit Cards</p>
                  </div>
                  <div class="align-self-center">
                    <i class="bi bi-credit-card display-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Quick Actions</h5>
              </div>
              <div class="card-body">
                <div class="d-grid gap-2">
                  <router-link to="/persons/add" class="btn btn-primary">
                    <i class="bi bi-plus"></i> Add New Person
                  </router-link>
                  <router-link to="/persons" class="btn btn-info">
                    <i class="bi bi-list"></i> Manage Persons
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">System Status</h5>
              </div>
              <div class="card-body">
                <div v-if="systemHealthy" class="alert alert-success" role="alert">
                  <i class="bi bi-check-circle"></i> System is healthy and running
                </div>
                <div v-else-if="healthCheckFailed" class="alert alert-danger" role="alert">
                  <i class="bi bi-exclamation-triangle"></i> System health check failed
                </div>
                <div v-else class="text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Checking system health...</span>
                  </div>
                  <p class="mt-2">Checking system health...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="recentPersons.length > 0" class="row mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Recent Persons</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div v-for="person in recentPersons.slice(0, 6)" :key="person.id" class="col-md-4 mb-3">
                    <div class="border rounded p-3">
                      <h6>{{ person.firstName }} {{ person.lastName }}</h6>
                      <p class="text-muted mb-1">
                        <i class="bi bi-calendar"></i> 
                        Created: {{ formatDate(person.createdAt) }}
                      </p>
                      <span class="badge bg-primary">Person</span>
                    </div>
                  </div>
                </div>
                <div class="text-center mt-3">
                  <router-link to="/persons" class="btn btn-outline-primary">View All Persons</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiService } from '@/services/api';
import type { PersonDto, HealthDto } from '@/types';

const personsCount = ref(0);
const addressesCount = ref(0);
const creditCardsCount = ref(0);
const recentPersons = ref<PersonDto[]>([]);
const systemHealthy = ref(false);
const healthCheckFailed = ref(false);

onMounted(async () => {
  await loadDashboardData();
});

async function loadDashboardData() {
  try {
    // Load statistics
    const persons = await apiService.getPersons();
    personsCount.value = persons.length;
    addressesCount.value = persons.reduce((sum, p) => sum + p.addresses.length, 0);
    creditCardsCount.value = persons.reduce((sum, p) => sum + p.creditCards.length, 0);
    recentPersons.value = persons.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Check system health
    await checkSystemHealth();
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    healthCheckFailed.value = true;
  }
}

async function checkSystemHealth() {
  try {
    await apiService.getHealth();
    systemHealthy.value = true;
  } catch (error) {
    console.error('Health check failed:', error);
    healthCheckFailed.value = true;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}
</script>
