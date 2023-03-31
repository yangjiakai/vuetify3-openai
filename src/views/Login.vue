<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { auth } from "../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const router = useRouter();
const email = ref("");
const password = ref("");
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      console.log("Success");
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
};

const signInWithGoolgle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const isLoggedIn = ref(false);
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      isLoggedIn.value = true;

      const uid = user.uid;
      // ...
    } else {
      isLoggedIn.value = false;
      // User is signed out
      // ...
    }
  });
});

const logout = () => {
  auth.signOut().then(
    () => {
      router.push("/");
    },
    (error) => {
      console.log(error);
    }
  );
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
        v-if="isLoggedIn"
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
      </v-btn></v-card
    >
  </div>
</template>

<style scoped lang="scss"></style>
