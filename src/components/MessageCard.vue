<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import moment from "moment";
interface Props {
  content?: string;
  isLoading?: boolean;
  role?: Chat.Role;
  dateTime?: string;
}

const props = defineProps<Props>();

const getDateTime = computed(() => {
  return moment(props.dateTime).format("MM-DD HH:mm");
});
</script>

<template>
  <div>
    <!-- 助手信息 -->
    <div v-if="props.role === 'assistant'">
      <div class="pa-5 d-flex align-start flex-row">
        <v-avatar
          class="mr-4"
          rounded="xl"
          variant="outlined"
          color="grey-lighten-1"
        >
          <img src="@/assets/images/avatars/avatar_assistant.jpg" alt="alt" />
        </v-avatar>
        <div>
          <v-card class="rounded-xl rounded-bs-0">
            <div>
              <MdPreview :modelValue="props.content" />
            </div>
          </v-card>
          <div class="mt-2 ml-1 text-grey-lighten-1 text-caption">
            {{ getDateTime }}
          </div>
        </div>
      </div>
    </div>
    <!-- 用户信息 -->
    <div v-else-if="props.role === 'user'">
      <div class="pa-5 d-flex align-center flex-row-reverse">
        <v-avatar
          class="ml-4"
          rounded="xl"
          variant="outlined"
          color="grey-lighten-1"
        >
          <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
        </v-avatar>
        <div>
          <v-card class="gradient purple rounded-xl rounded-be-0" theme="dark">
            <v-card-text>
              <b> {{ props.content }}</b></v-card-text
            >
          </v-card>
          <div class="mt-2 mr-1 text-right text-grey-lighten-1 text-caption">
            {{ getDateTime }}
          </div>
        </div>
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
