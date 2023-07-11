<script setup lang="ts">
import { useCustomizeThemeStore } from "@/stores/customizeTheme";
import MainSidebar from "@/components/MainSidebar.vue";
import SubSidebar from "@/components/SubSidebar.vue";
import AppBar from "@/components/AppBar.vue";
import CustomizationMenu from "@/components/CustomizationMenu.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const customizeTheme = useCustomizeThemeStore();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    alert("7777");
    if (user) {
      authStore.setLoggedIn(true);
    } else {
      authStore.setLoggedIn(false);
    }
  });
});
</script>

<template>
  <v-app id="app" :theme="customizeTheme.darkTheme ? 'dark' : 'light'">
    <!-- ---------------------------------------------- -->
    <!---Main Sidebar -->
    <!-- ---------------------------------------------- -->
    <MainSidebar />
    <!-- ---------------------------------------------- -->
    <!---Sub Sidebar -->
    <!-- ---------------------------------------------- -->
    <SubSidebar />
    <!-- ---------------------------------------------- -->
    <!---AppBar -->
    <!-- ---------------------------------------------- -->
    <AppBar />
    <!-- ---------------------------------------------- -->
    <!---Main -->
    <!-- ---------------------------------------------- -->
    <v-main>
      <RouterView />
    </v-main>
    <!-- ---------------------------------------------- -->
    <!---CustomizationMenu -->
    <!-- ---------------------------------------------- -->
    <!-- <CustomizationMenu /> -->
  </v-app>
</template>

<style scoped></style>
