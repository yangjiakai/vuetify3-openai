<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";

const countries = ref([]);

async function getCountries() {
  const { data } = await supabase.from("countries").select();
  countries.value = data;
}

const ranking = ref([]);

async function getRanking() {
  let { data: ranking, error } = await supabase.from("ranking").select("id");

  console.log("ranking", ranking);
}

const countryName = ref("");

async function addCountryApi() {
  await supabase.from("countries").insert([{ name: countryName.value }]);
}

const addCountry = () => {
  if (!countryName.value) return;

  addCountryApi();
  countryName.value = "";
  getCountries();
};

const deleteCountryApi = async (id) => {
  const { data } = await supabase.from("countries").delete().match({ id });
  console.log("data", data);
  getCountries();
};

onMounted(() => {
  getCountries();
  getRanking();
});

watchEffect(() => {
  console.log("countries", countries.value);
});
</script>

<template>
  <div class="">
    <v-card class="mx-auto my-5" width="1000" min-height="600">
      <ul>
        <li v-for="country in countries" :key="country.id">
          {{ country.name }}
          <v-btn color="error" @click="deleteCountryApi(country.id)"
            >delete</v-btn
          >
        </li>
      </ul>
      <v-text-field v-model="countryName"></v-text-field>
      <v-btn @click="addCountry">Add Country</v-btn>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
