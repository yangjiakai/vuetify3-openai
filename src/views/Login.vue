<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuthStore } from "@/stores/authStore";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");

interface GoogleUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: any[];
  stsTokenManager: Object;
  createdAt: Date;
  lastLoginAt: Date;
  apiKey: string;
  appName: string;
}

interface UserDocData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  created: Date;
  disabled: boolean;
  verified: boolean;
  roles: string[];
}

const register = () => {
  authStore.registerWithEmailAndPassword(email.value, password.value);
};

const login = () => {
  authStore.loginWithEmailAndPassword(email.value, password.value);
};

const logout = () => {
  authStore.logout();
};

const signInWithGoolgle = () => {
  authStore.loginWithGoogle();
};

const alertIslogin = () => {
  alert(authStore.isLoggedIn);
};
</script>

<template>
  <div class="pa-5">
    <v-card max-width="500" class="pa-5">
      <v-text-field label="Email" outlined v-model="email"></v-text-field>
      <v-text-field
        label="Password"
        outlined
        v-model="password"
        type="password"
      ></v-text-field>
      <v-btn
        elevation="1"
        width="400"
        class="mb-2 lighten-2 text-capitalize"
        size="x-large"
        @click="register"
      >
        注册
      </v-btn>
      <v-btn
        elevation="1"
        width="400"
        class="mb-2 lighten-2 text-capitalize"
        size="x-large"
        @click="login"
      >
        登录
      </v-btn>

      <v-btn
        elevation="1"
        width="400"
        class="mb-2 lighten-2 text-capitalize"
        size="x-large"
        v-if="authStore.isLoggedIn"
        @click="logout"
      >
        登出
      </v-btn>
      <v-btn
        elevation="1"
        width="400"
        class="mb-2 lighten-2 text-capitalize"
        size="x-large"
        @click="signInWithGoolgle"
      >
        <Icon icon="logos:google-icon" />
        Google
      </v-btn>
      <v-btn
        elevation="1"
        width="400"
        class="mb-2 lighten-2 text-capitalize"
        size="x-large"
        @click="alertIslogin"
      >
        isLogin
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
