<template>
  <div>
    <DataTable
      :value="bgpProjectCompanyList"
      responsiveLayout="scroll"
      :filters="filters1"
      filterDisplay="menu"
      showGridlines
    >
      <Column field="projectName" header="Proje Adı" headerStyle="width:8%">
        <template #body="slotProps">
          {{ slotProps.data.projectName }}
        </template>
        <template #filter>
          <InputText v-model="filters1['projectName']" style="width: 100%" />
        </template>
      </Column>
      <Column field="firmaAdi" header="Firma Adı" headerStyle="width:8%">
        <template #body="slotProps">
          {{ slotProps.data.firmaAdi }}
        </template>
        <template #filter>
          <InputText v-model="filters1['firmaAdi']" style="width: 100%" />
        </template>
      </Column>
      <Column field="kayitTarihi" header="Kayıt Tarihi" headerStyle="width:8%">
        <template #body="slotProps">
          {{ slotProps.data.kayitTarihi }}
        </template>
      </Column>
      <Column field="baslik" header="Başlık" headerStyle="width:8%">
        <template #body="slotProps">
          {{ slotProps.data.baslik }}
        </template>
      </Column>
      <Column field="aciklama" header="Açıklama" headerStyle="width:14%">
        <template #body="slotProps">
          {{ slotProps.data.aciklama }}
        </template>
      </Column>
      <Column
        field="hatirlatmaTarihi"
        header="Hatırlatma Tarihi"
        headerStyle="width:8%"
      >
        <template #body="slotProps">
          {{ slotProps.data.hatirlatmaTarihi }}
        </template>
      </Column>
      <Column
        field="hatirlatmaAciklama"
        header="Hatırlatma Açıklama"
        headerStyle="width:8%"
      >
        <template #body="slotProps">
          {{ slotProps.data.hatirlatmaAciklama }}
        </template>
      </Column>
      <Column
        field="email"
        header="Email"
        headerStyle="width:8%"
        bodyStyle="word-break:break-all;"
      >
        <template #body="slotProps">
          {{ slotProps.data.email }}
        </template>
      </Column>
      <Column field="phoneNumber" header="Telefon No" headerStyle="width:8%">
        <template #body="slotProps">
          {{ slotProps.data.phoneNumber }}
        </template>
      </Column>
      <Column
        field="wrongNumber"
        header="W.N"
        headerStyle="width:3%;"
        bodyStyle="text-align:center;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.wrongNumber" style="color: green">✓</div>
          <div v-else style="color: red">X</div>
        </template>
      </Column>
      <Column
        field="notResponse"
        header="N.R"
        headerStyle="width:3%;"
        bodyStyle="text-align:center;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.notResponse" style="color: green">✓</div>
          <div v-else style="color: red">X</div>
        </template>
      </Column>
      <Column
        field="notInterested"
        header="N.I"
        headerStyle="width:3%;"
        bodyStyle="text-align:center;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.notInterested" style="color: green">✓</div>
          <div v-else style="color: red">X</div>
        </template>
      </Column>
      <Column
        field="interested"
        header="I"
        headerStyle="width:3%;"
        bodyStyle="text-align:center;"
        :sortable="true"
      >
        <template #body="slotProps">
          <div v-if="slotProps.data.interested" style="color: green">✓</div>
          <div v-else style="color: red">X</div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["bgpProjectCompanyList"]),
  },
  data() {
    return {
      filters1: {},
    };
  },
};
</script>
<style scoped></style>
