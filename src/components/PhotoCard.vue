<!--
* @Component: PhotoCard
* @Maintainer: J.K. Yang
* @Description:
-->
<script setup lang="ts">
import { useUnsplashStore } from "@/stores/unsplashStore";
import type { Photo } from "@/types/unsplashTypes";
const props = defineProps<{
  photo: Photo;
}>();
const unsplashStore = useUnsplashStore();
const snackbar = reactive({
  isShow: false,
  timeout: 1000,
  text: "",
});

const toggleLike = (photo: Photo) => {
  if (!photo.liked_by_user) {
    snackbar.text = "Added to your favorite";
    snackbar.isShow = true;
    unsplashStore.addToFavorite(photo);
    photo.likes++;
  } else {
    snackbar.text = "Removed from your favorite";
    snackbar.isShow = true;
    unsplashStore.removeFromFavorite(photo);
    photo.likes--;
  }
  photo.liked_by_user = !photo.liked_by_user;
};

const downloadPhoto = (photo: Photo) => {
  const a = document.createElement("a");
  a.href = `${photo.links.download}&force=true`;
  a.download = `${photo.id}.jpg`;
  a.click();
  snackbar.text = "Downloading now, please wait";
  snackbar.timeout = 2000;
  snackbar.isShow = true;
  snackbar.timeout = 1000;
};

const photoDetailModal = ref(false);

const openDetailModal = () => {
  photoDetailModal.value = true;
};
</script>

<template>
  <div class="">
    <v-card class="shadow-1">
      <v-img
        :src="photo.urls.small"
        height="400"
        cover
        aspect-ratio="1/2"
        @click="openDetailModal"
      >
        <v-card class="photo-card text-white">
          <div class="card-top">
            <v-spacer />

            <v-btn icon variant="text" @click="toggleLike(photo)">
              <v-icon
                v-if="photo.liked_by_user"
                color="pink"
                icon="mdi-heart"
                class="heartBeat"
              />
              <v-icon v-else icon="mdi-heart-outline" />
              <v-tooltip
                activator="parent"
                location="bottom"
                class=""
                :text="photo.liked_by_user ? 'Liked' : 'Like'"
              />
            </v-btn>
            <v-tooltip location="bottom" text="Add To Collection">
              <template #activator="{ props }">
                <v-btn variant="text" v-bind="props" icon="mdi-plus" />
              </template>
            </v-tooltip>
          </div>
          <v-spacer />
          <div class="card-bottom">
            <router-link to="/">
              <v-avatar class="avatar">
                <v-img
                  :src="photo.user.profile_image.small"
                  :lazy-src="photo.user.profile_image.small"
                  alt="alt"
                />
              </v-avatar>
            </router-link>
            <router-link class="username" to="/">
              {{ photo.user.username }}
            </router-link>

            <v-tooltip location="bottom" text="Download">
              <template #activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  icon="mdi-download"
                  @click="downloadPhoto(photo)"
                />
              </template>
            </v-tooltip>
          </div>
        </v-card>
      </v-img>
    </v-card>
    <!-- SnackBar -->
    <v-snackbar v-model="snackbar.isShow" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template #actions>
        <v-btn color="blue" variant="text" @click="snackbar.isShow = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped lang="scss">
.photo-card {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  padding: 1rem;
  opacity: 0;
  cursor: zoom-in;

  &:hover {
    opacity: 1;
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 24px 0px !important;
  }

  .card-top,
  .card-bottom {
    display: flex;
    align-items: center;

    .avatar {
      cursor: pointer;
    }

    .username {
      flex: 1;
      margin: 0 1rem;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.8);

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
