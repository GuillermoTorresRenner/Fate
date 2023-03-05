<template>
  <q-page class="q-mx-md">
    <h4 class="text-center text-primary q-mb-lg">Campañas</h4>
    <q-img src="../../public/FateLogo.png" class="col" width="30%" />
    <h5 class="text-center text-green">Mis campañas</h5>
    <div
      class="q-mt-md"
      v-for="c in campaignStore.getCampaignList"
      :key="c._id"
    >
      <q-card class="row justify-between">
        <q-card-section class="column items-center justify-center">
          <p class="text-h6 text-center">
            {{ c.nombre }}
          </p>
          <p class="text-caption text-center text-purple">
            creado por <strong> {{ c.nombre_master }}</strong>
          </p>
        </q-card-section>

        <q-card-section class="column items-end justify-center">
          <q-btn
            color="green-10"
            icon="ion-play"
            l
            @click="watchCampaign(c._id)"
            size="xl"
          />
        </q-card-section>
      </q-card>
    </div>
    <h5 class="text-warning text-center">Invitado</h5>
    <div
      class="q-mt-md"
      v-for="c in campaignStore.getCampaigsInvitedList"
      :key="c._id"
    >
      <q-card class="row justify-between">
        <q-card-section class="column items-center justify-center">
          <p class="text-h6 text-center">
            {{ c.nombre }}
          </p>
          <p class="text-caption text-center text-purple">
            creado por <strong> {{ c.nombre_master }}</strong>
          </p>
        </q-card-section>

        <q-card-section class="column items-end justify-center">
          <q-btn
            :color="c.joined ? 'green-10' : 'warning'"
            icon="ion-play"
            l
            @click="prePlay(c._id)"
            size="xl"
          />
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-btn fab icon="add" color="green" to="/create-campaign" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { useCampaing } from "src/stores/useCampaign";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const campaignStore = useCampaing();

function prePlay(id) {
  router.push(`/pre-play/${id}`);
}

function watchCampaign(id) {
  router.push(`/watch-campaign/${id}`);
}

onMounted(() => {
  campaignStore.fillCampaignListFromDB();
  campaignStore.fillCampaignInvitedListFromDB();
});
</script>

<style></style>
