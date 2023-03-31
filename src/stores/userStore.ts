import { defineStore } from "pinia";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { db } from "@/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth } from "@/firebase";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    users: [],
  }),

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["user"] }],
  },

  getters: {},
  actions: {
    // async fetchUsers() {
    //   const userCollection = collection(db, "users");
    //   const userSnapshot = await getDocs(userCollection);
    //   this.users = userSnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    // },
    // async addTask(user) {
    //   const userCollection = collection(db, "users");
    //   await addDoc(userCollection, user);
    //   this.fetchUsers();
    // },
    // async updateTask(id, updatedTask) {
    //   const userRef = doc(db, "users", id);
    //   await updateDoc(userRef, updatedTask);
    //   this.fetchUsers();
    // },
    // async deleteTask(id) {
    //   const userRef = doc(db, "users", id);
    //   await deleteDoc(userRef);
    //   this.fetchUsers();
    // },
    // // ...
    // async signInWithGoogle() {
    //   const provider = new GoogleAuthProvider();
    //   const result = await signInWithPopup(auth, provider);
    //   this.setUser(result.user);
    // },
    // async signInWithGithub() {
    //   const provider = new GithubAuthProvider();
    //   const result = await signInWithPopup(auth, provider);
    //   this.setUser(result.user);
    // },
  },
});
