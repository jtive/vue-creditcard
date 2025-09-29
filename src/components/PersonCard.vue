<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ person.firstName }} {{ person.lastName }}</h5>
      <p class="card-text">
        <small class="text-muted">
          <i class="bi bi-calendar"></i> 
          Born: {{ formatDate(person.birthDate) }}
        </small>
      </p>
      <p class="card-text">
        <small class="text-muted">
          <i class="bi bi-shield-check"></i> 
          SSN: {{ person.ssn }}
        </small>
      </p>
      
      <div class="mb-2">
        <span class="badge bg-info me-1">
          <i class="bi bi-geo-alt"></i> {{ person.addresses.length }} Address{{ person.addresses.length !== 1 ? 'es' : '' }}
        </span>
        <span class="badge bg-warning">
          <i class="bi bi-credit-card"></i> {{ person.creditCards.length }} Card{{ person.creditCards.length !== 1 ? 's' : '' }}
        </span>
      </div>
      
      <p class="card-text">
        <small class="text-muted">
          <i class="bi bi-clock"></i> 
          Created: {{ formatDate(person.createdAt) }}
        </small>
      </p>
    </div>
    <div class="card-footer">
      <div class="btn-group w-100" role="group">
        <button type="button" class="btn btn-outline-primary btn-sm" @click="$emit('view', person.id)">
          <i class="bi bi-eye"></i> View
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="$emit('edit', person.id)">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm" @click="$emit('delete', person.id)">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonDto } from '@/types';

interface Props {
  person: PersonDto;
}

defineProps<Props>();

defineEmits<{
  edit: [id: string];
  view: [id: string];
  delete: [id: string];
}>();

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}
</script>
