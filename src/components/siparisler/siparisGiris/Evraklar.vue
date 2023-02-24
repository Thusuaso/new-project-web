<template>
  <section>
    <div class="p-col-12 p-md-11">
      <div class="p-col-10 p-md-10" style="margin-left: 50px">
        <DataTable
          :value="yuklemeList"
          class="p-datatable-customers"
          :loading="$store.getters.datatableLoading"
        >
          <Column
            field="faturano"
            header="#"
            bodyStyle="text-align:left;"
            headerStyle="width:5%;"
          ></Column>
          <Column
            field="yuklemeTarihi"
            headerStyle="width:5%;"
            bodyStyle="text-align:left"
            header="Evrak Yukleme Tarihi"
          ></Column>
          <Column
            field="adi"
            header="Evrak Adı"
            headerStyle="width:10%;"
            bodyStyle="text-align:left"
          ></Column>

          <Column
            header="İndir"
            headerStyle="width:4%;"
            bodyStyle="text-align:left"
          >
            <template #body="slotProps">
              <Button
                type="button"
                @click="faturaDowload(slotProps.data.id)"
                icon="fas fa-download"
                class="p-button"
                style="margin-right: 0.5em; background-color: #3cb371"
              ></Button>
            </template>
          </Column>
          <Column
            header="Yükleyen"
            field="kullanici"
            headerStyle="width:5%"
            bodyStyle="text-align:left"
          >
          </Column>
          <Column headerStyle="width:10%;" bodyStyle="text-align:left">
            <template #body="slotProps">
              <Button
                :disabled="false"
                label="Sil"
                class="p-button-danger"
                @click="faturaDosyaSilme(slotProps.data.faturaId)"
              />
            </template>
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import service from "../../../service/OperasyonService";
import { mapGetters } from "vuex";
import socket from '@/service/SocketService'
export default {
  computed: {
    ...mapGetters(["yuklemeList"]),
  },
  data() {
    return {
      select_row: null,
    };
  },

  props: ["siparisNo"],
  created() {

    

    this.$store.dispatch('fullscreenLoadingAct', true)

    service.getEvrakFaturaList(this.siparisNo).then((data) => {
      this.$store.dispatch("siparis_evrak_list_load", data.fatura_listesi);
    this.$store.dispatch('fullscreenLoadingAct', false)


    });
  },
  methods: {
    faturaDosyaSilme(event) {
      if (confirm("Gerçekten silmek istiyor musunuz?")) {
        service.setDeleteFaturaEvrak(event, this.siparisNo).then((data) => {
          if (data) {
            this.$store.dispatch("datatableLoadingBeginAct");
            service.getEvrakFaturaList(this.siparisNo).then((data) => {
              this.$toast.add({
                severity: "success",
                summary: "Evrak Silme",
                detail: "Evrak başarıyla silindi.",
                life: 3000,
              });
              this.$store.dispatch(
                "siparis_evrak_list_load",
                data.fatura_listesi
              );

              this.$store.dispatch("datatableLoadingEndAct");
            });
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Evrak Silme",
              detail: "Evrak silme hata.",
              life: 3000,
            });
          }
        });
      } else {
        console.log("hayır");
      }
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;
      link.setAttribute("download", `${dosya_adi}.pdf`);
      document.body.appendChild(link);
      link.click();
    },

    teklifDowload(id) {
      this.evrak_indir(
        this.aylik_teklif__ayrinti[id].teklif_cloud_dosya,
        "Teklif"
      );
    },
    faturaDowload(id) {
      window.open(this.yuklemeList[id].Draft, "_blank");
    },
  },
  mounted() {
        this.$store.dispatch('fullscreenLoadingAct', true)

    socket.siparis.on('isf_form_load_emit', () => {
      service.getEvrakFaturaList(this.siparisNo).then((data) => {
        this.$store.dispatch("siparis_evrak_list_load", data.fatura_listesi);
        this.$store.dispatch('fullscreenLoadingAct', false)


      });
    })
  }
};
</script>
<style scoped>
.p-datatable {
  font-size: 11px;
}
</style>
