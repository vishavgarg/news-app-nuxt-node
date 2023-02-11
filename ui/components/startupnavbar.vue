<template>
  <Disclosure as="nav" class="bg-gray-800">
    <div class=" px-2 sm:px-6 lg:px-8">
      <div class="flex  h-16  flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="hidden h-8 w-auto lg:block" src="../assets/logo/tnews-logo.svg" alt="Your Company">
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure } from '@headlessui/vue'
</script>
