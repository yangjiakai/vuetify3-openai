<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
interface Props {
  content?: string;
  isLoading?: boolean;
  role?: "user" | "assistant" | "system";
  dateTime?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <!-- 助手信息 -->
    <div v-if="props.role === 'assistant'">
      <div class="pa-5 d-flex align-start flex-row">
        <v-avatar class="mr-4" rounded="sm" variant="elevated">
          <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
        </v-avatar>
        <v-card class="rounded-xl rounded-bs-0">
          <div>
            <MdPreview :modelValue="props.content" />
          </div>
        </v-card>
      </div>
    </div>
    <!-- 用户信息 -->
    <div v-else-if="props.role === 'user'">
      <div class="pa-5 d-flex align-center flex-row-reverse">
        <v-avatar class="ml-4" rounded="lg" variant="elevated">
          <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
        </v-avatar>
        <v-card class="gradient gray rounded-xl rounded-be-0" theme="dark">
          <v-card-text>
            <b> {{ props.content }}</b></v-card-text
          >
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(#md-editor-v3-preview),
.user-message {
  font-size: 14px !important;
  font-weight: 600 !important;
}
</style>
