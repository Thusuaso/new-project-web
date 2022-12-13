<template>
  <div>
    <Button @click="newMekmarFatura" label="Yeni"></Button>
    <DataTable
      :value="mekmerDisFaturaList"
      responsiveLayout="scroll"
      :selection="selectedFatura"
      selectionMode="single"
      @row-select="isSelectedFatura"
    >
      <Column field="tarih" header="Tarih"></Column>
      <Column field="firmaAdi" header="Firma Adı"></Column>
      <Column field="aciklama" header="Açıklama"></Column>
      <Column field="tutarTl" header="Tutar TL">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.tutarTl) }}
        </template>
      </Column>
      <Column field="tutarDolar" header="Tutar ($)">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.tutarDolar) }}
        </template>
      </Column>
      <Column field="kur" header="Kur">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.kur) }}
        </template>
      </Column>
      <Column field="fileLink" header="Link">
        <template #body="slotProps">
          <Button
            type="button"
            :disabled="slotProps.data.fileLink != null ? false : true"
            @click="proformaDowload(slotProps.data.fileLink)"
            icon="fas fa-cloud-download-alt"
            class="p-button-success"
            style="margin-right: 0.5em"
          ></Button>
        </template>
      </Column>
    </DataTable>
    <Dialog
      v-model:visible="isMekmarFaturaForm"
      header="Mekmer Dis Fatura Giriş"
      :modal="true"
    >
      <mekmerFaturaForm></mekmerFaturaForm>
    </Dialog>
    <Dialog
      v-model:visible="isMekmerFaturaYukleForm"
      header="Mekmer Dis Fatura Yükle"
      :modal="true"
    >
      <div class="columns">
        <div class="column">
          <custom-file-input
            baslik="Proforma Yükle"
            @sunucuDosyaYolla="faturaDosyaGonder($event)"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import operasyonService from "../service/OperasyonService";
import store from "@/store";
import mekmerFaturaForm from "../components/mekmerdisfatura/mekmerDisFaturaDetay.vue";
import mekmerDisFatura from "../service/mekmerDisFatura";
import { mapGetters } from "vuex";
import fileService from "../service/FileService";
import customFileInput from "../components/shared/CustomInputFile.vue";
export default {
  computed: {
    ...mapGetters(["mekmerDisFaturaList"]),
  },
  components: {
    mekmerFaturaForm,
    customFileInput,
  },
  beforeRouteEnter(to, from, next) {
    operasyonService.getMekmerDisFaturaModel().then((faturaModel) => {
      mekmerDisFatura.getMekmerDisFaturaList().then((data) => {
        store.dispatch("mekmer_dis_model_act", faturaModel);
        store.dispatch("mekmer_dis_fatura_list_act", data);
        next();
      });
    });
  },
  data() {
    return {
      isMekmarFaturaForm: false,
      isMekmerFaturaYukleForm: false,
      id: null,
    };
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    faturaDosyaGonder(event) {
      console.log(event.name);
      if (event.size > 1000000) {
        alert("Lütfen Evrak Boyutunu Kontrol Ediniz.");
      } else {
        fileService.mekmerDisfaturaDosyaGonder(event, this.id).then((data) => {
          console.log("faturaDosyaGonder ", data);

          mekmerDisFatura
            .setMekmerDisFaturaKaydet(this.id, event.name)
            .then((veri) => {
              if (veri) {
                alert("Evrak başarılı şekilde yüklendi!");
              } else {
                alert("Ops! Lütfen Tekrar Deneyiniz!");
              }
            });
        });
      }
    },
    isSelectedFatura(event) {
      this.id = event.data.id;
      this.isMekmerFaturaYukleForm = true;
    },
    evrak_indir(dosya_link, dosya_adi) {
      this.$store.dispatch("loadBegin");
      const link = document.createElement("a");
      link.href = dosya_link;

      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
      this.$store.dispatch("loadEnd");
    },

    proformaDowload(link) {
      this.evrak_indir(link, "Proforma");
    },
    newMekmarFatura() {
      this.isMekmarFaturaForm = true;
    },
  },
};
</script>

<style scoped></style>
