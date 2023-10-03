<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { creationsData } from "@/data/chatData";
import SidebarToggle from "@/components/SidebarToggle.vue";

const creationList = ref<Creation.Creation[]>();
onMounted(() => {
  creationList.value = creationsData;
});

const typeList = computed(() => {
  const list = creationList.value?.map((item) => {
    return item.type;
  });

  list?.unshift("全部");
  return Array.from(new Set(list));
});

const currentCreationId = ref<number>(1);
const activeType = ref<string>("全部");
const searchKeyword = ref<string>("");
const displayList = computed(() => {
  if (activeType.value === "全部") {
    const filteredList =
      creationList.value &&
      creationList.value.filter((item) =>
        item.title.includes(searchKeyword.value)
      );
    return filteredList;
  } else {
    const filteredList = creationList.value?.filter(
      (item) =>
        item.type === activeType.value &&
        item.title.includes(searchKeyword.value)
    );

    return filteredList;
  }
});

const handleCollect = (item: Creation.Creation) => {
  item.isCollected = !item.isCollected;
};
</script>

<template>
  <div class="h-100">
    <v-toolbar border color="white">
      <SidebarToggle />
      <v-toolbar-title class="text-h6 font-weight-bold text-grey-darken-2">
        創作センター
      </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-sheet class="pa-3 creations-container">
        <!-- 关键词过滤 -->
        <v-text-field
          v-model="searchKeyword"
          hide-details
          rounded="xl"
          variant="solo"
          placeholder="Keyword"
          class="mx-4"
        >
          <template v-slot:prepend-inner>
            <v-icon color="grey">mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <!-- 分类 -->
        <div class="pa-4">
          <v-chip
            v-for="item in typeList"
            @click="activeType = item"
            class="mr-2 font-weight-bold"
            :variant="activeType === item ? 'elevated' : 'outlined'"
            :key="item"
            :color="item === activeType ? 'primary' : 'grey'"
            >{{ item }}</v-chip
          >
        </div>
        <!-- 详情列表 -->
        <div class="px-2">
          <v-row>
            <v-col
              cols="6"
              md="4"
              lg="3"
              v-for="item in displayList"
              :key="item.creationId"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  rounded="xl"
                  variant="outlined"
                  class="mx-auto pa-4"
                  :class="[
                    isHovering ? 'active-card' : 'default-card',
                    item.creationId === currentCreationId ? 'active-card' : '',
                  ]"
                  height="250"
                  @click="currentCreationId = item.creationId"
                >
                  <v-card-title class="justify-space-between align-start">
                    <v-btn
                      variant="outlined"
                      color="grey-lighten-1"
                      rounded="lg"
                      size="50"
                    >
                      <v-icon color="primary" size="24">
                        {{ item.icon }}
                      </v-icon>
                    </v-btn>
                    <v-btn
                      variant="text"
                      size="30"
                      :color="item.isCollected ? 'yellow-darken-2' : 'grey'"
                      @click.stop="handleCollect(item)"
                    >
                      <v-icon size="18">
                        {{
                          item.isCollected ? "mdi-heart" : "mdi-heart-outline"
                        }}
                      </v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text class="my-4">
                    <p class="font-weight-bold text-h6 text-grey-darken-2">
                      {{ item.title }}
                    </p>
                    <p class="text-grey">
                      {{ item.description }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.creations-container {
  height: calc(100vh - 100px);
  overflow: scroll;
}

.default-card {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.active-card {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 3px solid #705cf6;
}
</style>
