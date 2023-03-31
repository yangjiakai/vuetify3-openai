import { defineStore } from "pinia";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import { db, auth } from "@/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  created: boolean;
}

export const useAuthStore = defineStore("authentication", {
  state: () => ({
    user: null as User | null,
    profile: null as Profile | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    userId: (state) => state.user?.uid,
    userEmail: (state) => state.user?.email,
    userAvatar: (state) => state.user?.photoURL,
    userName: (state) => state.user?.displayName,
  },

  actions: {
    async addUserToUsersCollectionGgoogle(User: User) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    },

    async authenticateWithGoogle() {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "consent",
        display: "popup",
      });

      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const profile = await this.addUserToUsersCollectionGgoogle(
          user as User
        );

        // if (!profile.created) {
        //   console.log("something went wrong");
        //   return;
        // }
      }
    },
  },
});
