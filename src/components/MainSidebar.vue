<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts"></script>

<template>
  <v-navigation-drawer color="#111827" theme="dark" rail>
    <v-list>
      <v-list-item prepend-icon="mdi-view-dashboard" value="dashboard">
        <v-tooltip
          activator="parent"
          location="bottom"
          class=""
          text="home"
        ></v-tooltip>
      </v-list-item>
      <v-list-item prepend-icon="mdi-image" value="unsplash"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
