import { defineStore } from "pinia";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  type User,
} from "firebase/auth";
import { db } from "@/firebase";
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { auth } from "@/firebase";

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

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userData: null as UserDocData | null,
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

    async signInWithGoolgle() {
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
        const profile = await this.addUserToUsersCollectionGoogle(user);
        // 如果用户创建失败,就报错
        if (!profile.created) {
          console.log("something went wrong");
          return;
        }
      }
    },

    async addUserToUsersCollectionGoogle(user: User) {
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
        // this.user = userDocData;
        return { created: true };
      } catch (error) {
        // TODO 错误处理
        return {
          created: false,
        };
      }
    },
  },
});
