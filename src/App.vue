<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div role="navigation">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">Week1</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/review" class="nav-link">Review</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/week2" class="nav-link">Week2</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/week3" class="nav-link">Week3</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/task" class="nav-link">Task</RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>
