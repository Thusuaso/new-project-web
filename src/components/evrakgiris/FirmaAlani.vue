<template>
  <section>
    <div class="columns is-multiline">
      <div class="columns">
        <div
          class="column is-12 card is-multiline"
          style="margin-top: 35px; margin-left: 35px"
        >
          <div class="columns">
            <div class="column is-6">
              <span class="p-float-label">
                <InputText id="firma_adi" v-model="veri.firma_adi" />
                <label for="firma_adi">Firma Adı</label>
              </span>
            </div>
            <div class="column is-6">
              <span class="p-float-label">
                <InputText id="mail" v-model="veri.mail" />
                <label for="mail">Mail Adres</label>
              </span>
            </div>
          </div>
          <div class="columns">
            
            <div class="column is-6">
              <span class="p-float-label">
                <InputText id="telefon" v-model="veri.telefon" />
                <label for="telefon">Telefon</label>
              </span>
            </div>
            <div class="column is-6">
              <span class="p-float-label">
                <InputText id="aciklama" v-model="veri.aciklama" />
                <label for="aciklama">Not</label>
              </span>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <Button
                label="Kaydet"
                @click="kaydet"
                style="background-color: green; width: 145px"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-12">
        <DataTable
          :filters="filters"
          :value="firma_listesi"
          :loading="loading"
          :scrollable="true"
          scrollHeight="450px"
          dataKey="id"
          :rows="40"
          :paginator="true"
          :resizableColumns="true" 
          columnResizeMode="fit" 
          showGridlines
        >
          <Column
            field="id"
            header="#"
            headerStyle="width:5px"
            bodyStyle="text-align:left;margin-left:-5px;"
          >
            <template #body="slotProps">
              <div style="text-align: left; margin-left: -5px">
                {{ slotProps.data.id }}
              </div>
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['id']"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="firma_adi"
            header="Firma"
            headerStyle="width:15px"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.firma_adi }}
            </template>
          </Column>

          <Column
            field="telefon"
            header="Telefon"
            headerStyle="width:5px"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              <div style="margin-left: -9px; word-break: break-all">
                {{ slotProps.data.telefon }}
              </div>
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['telefon']"
                class="p-column-filter"
              />
            </template>
          </Column>
          <Column
            field="mail"
            header="Mail"
            headerStyle="width:8px"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.mail }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['mail']"
                class="p-column-filter"
              />
            </template>
          </Column>

          <Column
            field="aciklama"
            header="Not"
            headerStyle="width:5px"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              {{ slotProps.data.aciklama }}
            </template>
            <template #filter>
              <InputText
                type="text"
                v-model="filters['aciklama']"
                class="p-column-filter"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../../service/OperasyonService";
export default {
  data() {
    return {
      isMobile: null,
      filters: {},
      firma_listesi: null,
      loading: false,
      veri: {
        firma_adi: null,
        mail: null,
        telefon: null,
        aciklama: null,
      },
      select_konteyner: null,
    };
  },
  created() {
    service.getEvrakFirmaListesi().then((veri) => {
      this.firma_listesi = veri;
    }),
      service.getFirmaModel().then((veri) => {
        this.veri = veri;
      });
  },

  methods: {
    kaydet() {
      service.EvrakFirmaKaydet(this.veri).then((status) => {
        if (status.status) {
          alert("Kayıt İşlemi Yapıldı.");
          this.veri = "";
          service.getEvrakFirmaListesi().then((veri) => {
            this.firma_listesi = veri;
          }),
            service.getFirmaModel().then((veri) => {
              this.veri = veri;
            });
          service.getNakliyeIslemListesi().then((data) => {
            this.firma_list = data.nakliye_liste;
            this.siparis_list = data.siparis_list;
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 12px;
}
.isMobile {
  font-size: 9px;
  word-break: break-all;
}
</style>
