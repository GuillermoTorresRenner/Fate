<template>
  <q-page class="q-mx-md">
    <h4 class="text-center text-primary q-mb-lg">Mis Personajes</h4>
    <q-img src="../../public/FateLogo.png" class="col" width="30%" />
    <div
      class="q-mt-md"
      v-for="c in charactersStore.getCharactersList"
      :key="c._id"
    >
      <q-card class="row justify-between">
        <q-card-section class="column items-center justify-center">
          <p class="text-h4">
            {{ c.identidad.nombre }}
          </p>
        </q-card-section>
        <q-card-section class="column items-end justify-center">
          <q-avatar size="80px"> <q-img :src="c.avatar" /> </q-avatar>
        </q-card-section>
        <q-card-section class="column items-end justify-center">
          <q-btn
            color="purple"
            icon="ion-eye"
            l
            @click="verPersonaje(c._id)"
            size="xl"
          />
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn fab icon="add" color="green" to="/create-character" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useCharacter } from "src/stores/useCharacters";

import { onMounted } from "vue";
import { useRouter } from "vue-router";
const charactersStore = useCharacter();
const router = useRouter();

function verPersonaje(id) {
  router.push(`/watch-character/${id}`);
}

onMounted(() => {
  charactersStore.fillCharacterListFromDB();
});
</script>

<style></style>
