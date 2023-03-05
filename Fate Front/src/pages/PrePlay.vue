<template>
  <q-page class="q-mx-md">
    <h4 class="text-center text-primary">
      {{ campaignStore.getCurrentCampaign.nombre }}
    </h4>
    <q-card class="">
      <q-separator />
      <q-card-section>
        <h6 class="text-purple">Descripción</h6>
        <p class="">{{ campaignStore.getCurrentCampaign.descripcion }}</p>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section>
        <h6 class="text-purple">Mi personaje</h6>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import CampaignForm from "src/components/CampaignForm.vue";
import { useCampaing } from "src/stores/useCampaign";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const campaignStore = useCampaing();
const route = useRoute();

onMounted(() => {
  campaignStore.getCurrentCampaignFromDB(route.params.id);
});
</script>

<style></style>
