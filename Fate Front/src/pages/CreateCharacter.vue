<template>
  <q-page class="q-mx-sm">
    <q-form @submit="saveCharacter">
      <q-expansion-item
        icon="perm_identity"
        label="IDENTIDAD"
        class="bg-dark text-white q-mt-xl"
        :default-opened="true"
      >
        <q-card>
          <q-card-section class="row">
            <q-file
              v-model="character.identidad.avatar"
              hint="Avatar"
              class="col"
              dense=""
              name="avatar"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon name="person" dense />
                </q-avatar>
              </template>
            </q-file>

            <div class="col">
              <div class="text-primary text-center text-h6">
                P. fate: {{ character.fate.puntos }}
              </div>
              <div class="text-green text-center text-h8">
                P. rec: {{ character.fate.recuperacion }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="character.identidad.nombre"
              type="text"
              label="Nombre"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  val.length > 0 || 'Ingrese un nombre para el personaje',
              ]"
              dense
            />
            <q-input
              v-model="character.identidad.descripcion"
              type="textarea"
              label="descripcion"
              class="row"
              dense
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- ------------------------------------------------------------------------------------------------------------------------- -->

      <q-expansion-item
        icon="ion-thumbs-up"
        label="ASPECTOS"
        class="bg-dark text-white q-mt-xl"
      >
        <q-card>
          <q-card-section>
            <q-input
              v-model="character.aspectos.principal"
              type="text"
              label="Aspecto Principal"
              dense
            />
            <q-input
              v-model="character.aspectos.complicacion"
              type="text"
              label="Complicación"
              dense
            />
            <q-input
              v-model="character.aspectos.aspecto1"
              type="text"
              label="Aspecto 1"
              dense
            />
            <q-input
              v-model="character.aspectos.aspecto2"
              type="text"
              label="Aspecto 2"
              dense
            />
            <q-input
              v-model="character.aspectos.aspecto3"
              type="text"
              label="Aspecto 3"
              dense
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!-- ------------------------------------------------------------------------------------------------------------------------- -->

      <q-expansion-item
        icon="grade"
        label="ESTILOS"
        class="bg-dark text-white q-mt-xl"
      >
        <q-card>
          <q-card-section>
            <q-input
              v-model="character.estilos.cauto"
              type="number"
              min="0"
              max="3"
              label="CAUTO"
              dense
            />
            <q-input
              v-model="character.estilos.furtivo"
              type="number"
              min="0"
              max="3"
              label="FURTIVO"
              dense
            />
            <q-input
              v-model="character.estilos.ingenioso"
              type="number"
              min="0"
              max="3"
              label="INGENIOSO"
              dense
            />
            <q-input
              v-model="character.estilos.llamativo"
              type="number"
              min="0"
              max="3"
              label="LLAMATIVO"
              dense
            />
            <q-input
              v-model="character.estilos.rapido"
              type="number"
              min="0"
              max="3"
              label="RAPIDO"
              dense
            />
            <q-input
              v-model="character.estilos.vigoroso"
              type="number"
              min="0"
              max="3"
              label="VIGOROSO"
              dense
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!-- ------------------------------------------------------------------------------------------------------------------------- -->

      <q-expansion-item
        icon="ion-battery-charging"
        label="PROEZAS"
        class="bg-dark text-white q-mt-xl"
      >
        <q-card>
          <q-card-section>
            <q-input
              v-model="character.proezas.proeza1"
              type="textarea"
              label="PROEZA 1"
              dense
            />
            <q-input
              v-model="character.proezas.proeza2"
              type="textarea"
              label="PROEZA 2"
              dense
            />
            <q-input
              v-model="character.proezas.proeza3"
              type="textarea"
              label="PROEZA 3"
              dense
            />
            <q-input
              v-model="character.proezas.proeza4"
              type="textarea"
              label="PROEZA 4"
              dense
            />
            <q-input
              v-model="character.proezas.proeza5"
              type="textarea"
              label="PROEZA 5"
              dense
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="text-center q-mt-md">
        <q-btn icon="ion-save" type="submit" color="green" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useCharacter } from "../stores/useCharacters";
import { api } from "src/boot/axios";
import { useUser } from "src/stores/useUser";
const characterStore = useCharacter();
const user = useUser();
const character = ref({
  userId: user.getUser.data._id,
  avatar: "",
  identidad: {
    nombre: "Pepito ",
    descripcion: "descripcio ",
  },
  aspectos: {
    principal: "PRINCIPAL",
    complicacion: "COMPLICACIÓN",
    aspecto1: "ASPECTO 1",
    aspecto2: "ASPECTO 2",
    aspecto3: "ASPECTO 3",
  },
  fate: {
    puntos: 3,
    recuperacion: 3,
  },
  estilos: {
    cauto: 3,
    furtivo: 2,
    ingenioso: 2,
    llamativo: 1,
    rapido: 1,
    vigoroso: 0,
  },
  proezas: {
    proeza1: "PROEZA 1",
    proeza2: "PROEZA 2",
    proeza3: "PROEZA 3",
    proeza4: "PROEZA 4",
    proeza5: "PROEZA 5",
  },
  stress: {
    stress1: false,
    stress2: false,
    stress3: false,
  },
  consecuencias: {
    consecuencia2: {
      consecuencia2: false,
      descripcion: "",
    },
    consecuencia4: {
      consecuencia4: false,
      descripcion: "",
    },
    consecuencia6: {
      consecuencia6: false,
      descripcion: "",
    },
  },
});
const $q = useQuasar();
function saveCharacter() {
  api
    .post("/create-character", character.value, {
      headers: {
        //"content-type": "multipart/form-data",
        token: user.getToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      $q.notify({
        message: res.data.message,
        color: "green",
        icon: "check",
        position: "bottom",
      });
    })
    .catch((res) => {
      console.log(res.data);
      $q.notify({
        message: res.data.message,
        color: "red",
        icon: "ion-close-circle",
        position: "bottom",
      });
    });
}
</script>

<style></style>
