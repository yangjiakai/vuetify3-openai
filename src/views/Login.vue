<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
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

const signInWithGoolgle = async () => {
  // TODO Loading开始
  // 进行Google授权登录
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  // 登录成功可获取Google用户信息
  const { user } = userCredential;
  // 从userCollection中获取该用户信息
  const userDoc = await getDoc(doc(db, "users", user.uid));
  // 如果userCollection不存在该用户,就创建一个
  if (!userDoc.exists()) {
    const profile = await addUserToUsersCollectionGoogle(user);
    // 如果用户创建失败,就报错
    if (!profile.created) {
      console.log("something went wrong");
      return;
    }
  }
};

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

const addUserToUsersCollectionGoogle = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);
  const { uid, email, displayName, photoURL } = user;
  const userDocData = {
    uid,
    email,
    displayName,
    photoURL,
    created: new Date(),
    disabled: false,
    verified: true,
    roles: [],
  };

  try {
    await setDoc(userDocRef, userDocData);
    return { created: true };
  } catch (error) {
    // TODO 错误处理
    return {
      created: false,
    };
  }
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
      // router.push("/");
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
