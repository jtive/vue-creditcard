<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-person-badge"></i>
          Personal Info System
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/persons">Persons</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container-fluid mt-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// Main app component
</script>

<style>
.navbar-brand {
  font-weight: bold;
}

.router-link-active {
  font-weight: bold;
}
</style>
