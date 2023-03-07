<template>
  <Checkbox
    v-model="alisFiyatiDurum"
    @change="isAlisFiyatiControlChange"
    :binary="true"
  />
  Alış Fiyatı <span v-if="alisFiyatiDurum" >Var</span>
  <InputText type="text" v-model="container.amount"  style="margin-right:10px;margin-left:10px;width:50px;text-align:center;"/>
  <Button class="p-button-success" label="Konteynır Kayıt" @click="containerSave"/>
  <section>
    <div class="column is-12">
      <DataTable :value="masraf_list" :loading="loading">
        <template #header>
          <div class="columns is-multiline">
            <div class="column is-12">
              <span style="font-size: 15px">Masraflar</span>
            </div>
          </div>
        </template>
        <Column
          field="invoiced"
          header="Fatura"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#8AFF8A;"
        >
          <template #body="slotProps">
            <span style="color: #007500; font-weight: bold">{{
              formatPrice(slotProps.data.invoiced)
            }}</span>
          </template>
        </Column>

        <Column
          field="mekmer_alim"
          header="Mekmar Üretim"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.mekmer_alim)
            }}</span>
          </template>
        </Column>
        <Column
          field="mek_moz_alim"
          header="Mek-Moz Üretim"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.mek_moz_alim)
            }}</span>
          </template>
        </Column>
        <Column
          field="dis_alim"
          header="Dış Üretim"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.dis_alim)
            }}</span>
          </template>
        </Column>
        <Column
          field="nakliye"
          header="Nakliye"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.nakliye)
            }}</span>
          </template>
        </Column>
        <Column
          field="gumruk"
          header="Gümrük"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.gumruk)
            }}</span>
          </template>
        </Column>
        <Column
          field="ilaclama"
          header="İlaçlama"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.ilaclama)
            }}</span>
          </template>
        </Column>
        <Column
          field="liman"
          header="Liman"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.liman)
            }}</span>
          </template>
        </Column>
        <Column
          field="sigorta"
          header="Sigorta"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.sigorta)
            }}</span>
          </template>
        </Column>
        <Column
          field="navlun_alis"
          header="Navlun"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.navlun_alis)
            }}</span>
          </template>
        </Column>
        <Column
          field="detay_1"
          header="Detay 1 "
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.detay_1)
            }}</span>
          </template>
        </Column>
        <Column
          field="detay_2"
          header="Detay 2 "
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.detay_2)
            }}</span>
          </template>
        </Column>
        <Column
          field="detay_3"
          header="Detay 3 "
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.detay_3)
            }}</span>
          </template>
        </Column>
        <Column
          field="mekus_masraf"
          header="Mekus Masraf"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.mekus_masraf)
            }}</span>
          </template>
        </Column>
        <Column
          field="komisyon"
          header="Komisyon"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.komisyon)
            }}</span>
          </template>
        </Column>
        <Column
          field="ozel_iscilik"
          header="Özel İşçilik"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.ozel_iscilik)
            }}</span>
          </template>
        </Column>
        <Column
          field="banka_masrafi"
          header="Banka Masrafı"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.banka_masrafi)
            }}</span>
          </template>
        </Column>
        <Column
          field="kurye"
          header="Kurye"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.kurye)
            }}</span>
          </template>
        </Column>
        <Column
          field="total_in"
          header="Maliyet-USD"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#FDEDEC;"
        >
          <template #body="slotProps">
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPrice(slotProps.data.total_in)
            }}</span>
          </template>
        </Column>
        <Column
          header="Maliyet-TRY"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#FDEDEC;"
        >
          <template #body>
            <span style="color: #e74c3c; font-weight: bold">{{
              formatPriceTL(maliyet_try)
            }}</span>
          </template>
        </Column>
        <Column
          header="Profit-USD"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#8AFF8A;"
        >
          <template #body="slotProps">
            <span style="color: #007500; font-weight: bold">{{
              formatPrice(slotProps.data.invoiced - slotProps.data.total_in)
            }}</span>
          </template>
          <template #footer> </template>
        </Column>
        <Column
          header="Profit-TRY"
          headerStyle="width:20px;"
          bodyStyle="text-align:center;background-color:#8AFF8A;"
        >
          <template #body>
            <span
              v-if="profit_try <= 0"
              style="color: #007500; font-weight: bold"
              >{{ formatPriceTL(0) }}</span
            >
            <span v-else style="color: #007500; font-weight: bold">{{
              formatPriceTL(profit_try)
            }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="columns">
      <div class="column is-6">
        <DataTable :value="banka" :loading="loading">
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">Banka Özeti</span>
              </div>
            </div>
          </template>
          <Column
            field="tarih"
            header="Ödenme Tarihi"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data.tarih }}</span>
            </template>
          </Column>
          <Column
            field="tutar"
            header="Gelen-USD"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <span>{{ formatPrice(slotProps.data.tutar) }}</span>
            </template>
            <template #footer>
              {{ formatPrice(toplam_usd) }}
            </template>
          </Column>
          <Column
            field="tutartl"
            header="Gelen-TRY"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <span>{{ formatPriceTL(slotProps.data.tutartl) }}</span>
            </template>
            <template #footer>
              {{ formatPriceTL(toplam_try) }}
            </template>
          </Column>
          <Column
            field="masraf"
            header="Banka Masrafı"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <span>{{ formatPrice(slotProps.data.masraf) }}</span>
            </template>
            <template #footer>
              {{ formatPrice(toplam_masraf) }}
            </template>
          </Column>
          <Column
            field="kur"
            header="Kur"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data.kur }}</span>
            </template>
          </Column>
          <Column
            header="Maliyet Kur"
            headerStyle="width:20px;"
            bodyStyle="text-align:center;"
          >
            <template #footer>
              <span>{{ formatPrice(ortalama_kur) }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="column is-6">
        <DataTable
          :value="evrakList"
          :sortOrder="-1"
          :scrollable="true"
          scrollHeight="330%"
          :loading="loading"
          class="p-datatable-customers"
        >
          <template #header>
            <div class="columns is-multiline">
              <div class="column is-12">
                <span style="font-size: 15px">Yüklenen Evraklar</span>
              </div>
            </div>
          </template>
          <Column
            field="faturano"
            header="#"
            bodyStyle="text-align:center;"
            headerStyle="width:5%;"
          ></Column>
          <Column
            field="yuklemeTarihi"
            headerStyle="width:2px;"
            bodyStyle="text-align:center;"
            header="Evrak Yukleme Tarihi"
          ></Column>
          <Column
            field="adi"
            header="Evrak Adı"
            headerStyle="width:6px;"
            bodyStyle="text-align:left"
          ></Column>

          <Column
            header="İndir"
            headerStyle="width:9%;"
            bodyStyle="text-align:center;"
          >
            <template #body="slotProps">
              <Button
                type="button"
                :disabled="slotProps.data.adi.length > 0 ? false : true"
                @click="faturaDowload(slotProps.data.id)"
                icon="fas fa-download"
                class="p-button"
                style="margin-right: 0.5em; background-color: #3cb371"
              ></Button>
            </template>
          </Column>
          <Column
            field="kullanici"
            headerStyle="width:5px;"
            bodyStyle="text-align:center;"
          >
          </Column>
          <template #footer> </template>
        </DataTable>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import service from "../../service/RaporService";
import operasyon from "../../service/OperasyonService";

export default {
  computed: {
    ...mapGetters(["maliyet_data"]),
  },
  created() {
    this.siparisno = this.maliyet_data.siparis_no;
    this.loading = true;
    operasyon.getEvrakFaturaList(this.siparisno).then((data) => {
      this.loading = true;
      this.evrakList = data.fatura_listesi;
      this.olmayan_evraklar = data.color_listesi;

      this.loading = false;
    });
    this.loading = true;
    service.getMaliyetAyrintiYeni(this.siparisno).then((data) => {
      this.masraf_list = data.maliyet;
      this.alisFiyatiDurum = this.masraf_list[0].alisFiyatiControl
      this.maliyet_usd = data.maliyet[0].total_in;

      this.banka = data.banka;
      this.toplam_try = 0;
      this.toplam_usd = 0;
      this.toplam_masraf = 0;
      this.ortalama_kur = 0;

      for (let key in this.banka) {
        const item = this.banka[key];

        this.toplam_try += item.tutartl;
        this.toplam_usd += item.tutar;
        this.toplam_masraf += item.masraf;
      }
      this.ortalama_kur = this.toplam_try / this.toplam_usd;
      if (!this.ortalama_kur) {
        this.ortalama_kur = 0;
      }
      this.profit_try = this.ortalama_kur * this.maliyet_usd;
      this.maliyet_try = this.ortalama_kur * this.maliyet_usd;
      this.profit_try = this.toplam_try - this.profit_try;
      this.loading = false;
    });
    service.getOrderContainerAmount(this.siparisno).then(data => {
      console.log(data)
      this.container.amount = data.data[0].container_amount
    })


  },
  
  data() {
    return {
      container: {
        amount: 0,
        siparisNo:""
      },
      alisFiyatiDurum:false,
      siparisno: null,
      masraf_list: null,
      banka: null,
      toplam_try: 0,
      toplam_usd: 0,
      profit_try: 0,
      maliyet_usd: 0,
      ortalama_kur: 0,
      toplam_masraf: 0,
      evrakList: null,
      loading: false,
      maliyet_try: 0,
      olmayan_evraklar: null,
    };
  },
  methods: {
    containerSave() {
      this.container.siparisNo = this.siparisno
      operasyon.setContainerAmount(this.container).then(data => {
        if (data) {
          this.$toast.add({severity:'success',summary:'Konteynır Kayıt',detail:'Konteynır Kayıt Başarılı',life:3000})
        }
      })

    },
    isAlisFiyatiControlChange() {
      const data = {
        'siparisno': this.siparisno,
        'alisFiyatiControl': this.alisFiyatiDurum
      }
      service.setAlisFiyatiControl(data).then(data => {
        if (data) {
          this.$toast.add({ severity: 'success', summary: 'Alış Fiyatı Kontrol', detail: 'Alış fiyatı durumu başarıyla değiştirildi.', life: 3000 });
        }
      })
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
    faturaDowload(id) {
      console.log(this.evrakList[id].Draft);
      window.open(this.evrakList[id].Draft, "_blank");
      //  this.evrak_indir(this.yuklemeList[id].Draft,'Fatura')
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatPriceTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
<style scoped>
.input-css {
  text-align: center;
}
.p-datatable {
  font-size: 9px;
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
