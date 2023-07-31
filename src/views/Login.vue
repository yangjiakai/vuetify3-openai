<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useDisplay } from "vuetify";
import { login } from "@/api/auth";
import { useAuthStore } from "@/stores/authStore";
const router = useRouter();
const authStore = useAuthStore();
const { mdAndUp } = useDisplay();

const username = ref("");

// sign in buttons
const isLoading = ref(false);
const isLoginDisabled = ref(false);
const refLoginForm = ref();
const isFormValid = ref(true);
const email = ref("");
const phone = ref("");
const password = ref("");

// show password field
const showPassword = ref(false);

// Submit
const handleLogin = async () => {
  const { valid } = await refLoginForm.value.validate();
  if (!valid) {
    // Show some message to the user.
    return;
  }

  isLoading.value = true;
  isLoginDisabled.value = true;
  errorProvider.value = false;

  try {
    const res = await login(phone.value, password.value);
    console.log(res);

    authStore.setToken(res.data.token);

    router.push("/");
    // Maybe navigate to another page or show a success message.
  } catch (error) {
    errorProvider.value = true;
    errorProviderMessages.value = error.response.data.message;
    // Show a detailed error message.
  } finally {
    isLoading.value = false;
    isLoginDisabled.value = false;
  }
};

// Error Check
const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const usernameRules = ref([(v: string) => !!v || "UserNmae is required"]);

const phoneRules = ref([
  (v: string) => !!v || "手机号码必填",
  (v: string) => /^1[3-9]\d{9}$/.test(v) || "请输入正确的手机号码",
]);

const passwordRules = ref([
  (v: string) => !!v || "请输入密码",
  (v: string) =>
    (v && v.length <= 10) || "Password must be less than 10 characters",
]);

// error provider
const errorProvider = ref(false);
const errorProviderMessages = ref("");

const error = ref(false);
const errorMessages = ref("");

const resetErrors = () => {
  error.value = false;
  errorMessages.value = "";
};
</script>
<template>
  <div class="h-100 d-flex align-center justify-center flex-column">
    <v-card
      :width="mdAndUp ? 500 : '90%'"
      color="white"
      class="pa-3 ma-3"
      elevation="3"
    >
      <v-card-title primary-title class="my-4 text-h4">
        <span class="flex-fill text-center"> 帐号登录 </span>
      </v-card-title>
      <!-- <v-card-subtitle>Let's build amazing products</v-card-subtitle> -->
      <!-- sign in form -->

      <v-card-text>
        <v-form
          ref="refLoginForm"
          class="text-left"
          v-model="isFormValid"
          lazy-validation
        >
          <!-- 电话号码 -->
          <v-text-field
            ref="refPhone"
            v-model="phone"
            required
            :error="error"
            label="手机号码"
            variant="underlined"
            color="primary"
            bg-color="#fff"
            :rules="phoneRules"
            outlined
            validateOn="blur"
            @keyup.enter="handleLogin"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            ref="refPassword"
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            label="密码"
            density="default"
            variant="underlined"
            color="primary"
            bg-color="#fff"
            :rules="passwordRules"
            name="password"
            outlined
            validateOn="blur"
            @change="resetErrors"
            @keyup.enter="handleLogin"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
          <v-btn
            :loading="isLoading"
            :disabled="isLoginDisabled"
            block
            size="x-large"
            color="primary"
            @click="handleLogin"
            class="mt-2"
            >登录</v-btn
          >

          <div
            class="text-grey text-center text-caption font-weight-bold text-uppercase my-5"
          >
            或注册
          </div>

          <!-- external providers list -->
          <!-- <v-btn
            class="mb-2 lighten-2 text-capitalize"
            block
            size="x-large"
            color="white"
            :disabled="isLoginDisabled"
          >
            <Icon icon="logos:google-icon" class="mr-3 my-2" />
            Google
          </v-btn>
          <v-btn
            class="mb-2 lighten-2 text-capitalize"
            block
            color="white"
            size="x-large"
            :disabled="isLoginDisabled"
          >
            <Icon icon="logos:facebook" class="mr-3" />
            Facebook
          </v-btn> -->

          <div v-if="errorProvider" class="error--text my-5">
            {{ errorProviderMessages }}
          </div>

          <div class="my-5 text-center">
            统一条款
            <br />
            <router-link class="text-primary" to=""> 服务条款</router-link>
            &
            <router-link class="text-primary" to="">隐私政策</router-link>
          </div>
        </v-form></v-card-text
      >
    </v-card>
    <div class="text-center mt-6">
      已经有帐号了？
      <router-link to="/auth/signin" class="text-primary font-weight-bold">
        登录
      </router-link>
    </div>
  </div>
</template>
