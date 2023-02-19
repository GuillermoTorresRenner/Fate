<template>
  <q-page class="q-mx-xl">
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn fab icon="add" color="green" to="/create-character" />
    </q-page-sticky>
    <h4 class="text-center text-primary q-mb-lg">Mis Personajes</h4>
    <div
      class="q-mt-md"
      v-for="c in charactersStore.getCharactersList"
      :key="c._id"
    >
      <q-card class="q-mx-md row justify-between">
        <q-card-section class="col-8">
          <div class="row">
            <q-img src="../../public/FateLogo.png" height="5%" width="10%" />
          </div>
          <div class="text-h6 row justify-center">{{ c.identidad.nombre }}</div>
          <div class="text-subtitle2 row justify-center">
            {{ c.identidad.descripcion }}
          </div>
          <q-btn color="purple" icon="ion-eye" l @click="verPersonaje" />
        </q-card-section>
        <q-card-section class="col-4 items-end">
          <q-avatar size="50x">
            <q-img :src="c.avatar" />
          </q-avatar>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <!-- <q-form @submit="guardarPersonaje">
    <q-file standout v-model="personaje.avatar" hint="Foto de Personaje">
      <template v-slot:append>
        <q-avatar>
          <q-icon size="md" />
        </q-avatar>
      </template>
    </q-file>

    <q-input v-model="personaje.nombre" type="text" label="nombre" />
    <q-input v-model="personaje.descripcion" type="text" label="descripcion" />
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
  {{ avatar }} -->
  <pre>{{ user.getUser.data._id }}</pre>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useCharacter } from "src/stores/useCharacters";
import { useUser } from "src/stores/useUser";
import { ref, onMounted } from "vue";
const charactersStore = useCharacter();
const user = useUser();

function verPersonaje() {}

const avatar = ref();

onMounted(() => {
  charactersStore.fillCharacterListFromDB();
});
</script>

<style></style>
