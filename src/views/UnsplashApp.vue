<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: Imitate Nitori App
-->
<script setup lang="ts">
import { getRandomPhotoApi, getPhotosApi } from "@/api/unsplashApi";
import type { Photo } from "@/types/unsplashTypes";
import PhotoCard from "@/components/PhotoCard.vue";

const banner = ref<Photo>();
const photos = ref<Photo[]>([]);

const initData = async () => {
  const photosResponse = await getPhotosApi();
  photos.value = photosResponse.data;

  const bannerResponse = await getRandomPhotoApi();
  banner.value = bannerResponse.data;
};

initData();
</script>

<template>
  <div>
    <v-parallax v-if="banner" height="800" :src="banner.urls.full" class="">
      <v-sheet
        color="rgba(100,100,100,.3)"
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <v-card width="800" elevation="0" color="transparent">
          <h1 class="text-h2 font-weight-black mb-4">Unsplash</h1>
          <h4 class="subheading">
            The internet’s source for visuals. Powered by creators everywhere.
          </h4>
        </v-card>
      </v-sheet>
    </v-parallax>
    <v-sheet
      class="mx-auto my-5 pa-5"
      max-width="1600"
      v-if="photos.length > 0"
      min-height="80vh"
    >
      <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="photo in photos"
          :key="photo.id"
        >
          <PhotoCard :photo="photo"></PhotoCard>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss"></style>
