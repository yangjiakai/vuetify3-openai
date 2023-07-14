<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts"></script>

<template>
  <v-navigation-drawer color="#111827" theme="dark" rail>
    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" value="qa" to="/qa">
        <v-tooltip
          activator="parent"
          location="bottom"
          class=""
          text="home"
        ></v-tooltip>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-image"
        to="/login"
        value="unsplash"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-chat"
        to="/chat"
        value="chat"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
