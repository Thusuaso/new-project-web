<template>
  <div>
    <div class="columns is-gapless" style="margin-left: 230px">
      <div id="statuSecim" class="column">
        <RadioButton
          id="rapor1"
          @input="statuSecim"
          name="rapor1"
          value="Hepsi"
          v-model="rapor"
        />
        <label for="rapor1" class="p-radiobutton-label">Hepsi</label>
      </div>
      <div id="statuSecim" class="column">
        <RadioButton
          id="rapor2"
          @input="statuSecim"
          name="rapor2"
          value="Mekmar"
          v-model="rapor"
        />
        <label for="rapor2" class="p-radiobutton-label">Mekmar</label>
      </div>
      <div id="statuSecim" class="column">
        <RadioButton
          id="rapor3"
          @input="statuSecim"
          name="rapor3"
          value="Ozel"
          v-model="rapor"
        />
        <label for="rapor3" class="p-radiobutton-label">Özel</label>
      </div>
      <div id="statuSecim" class="column">
        <b-button
          @click="get_musteri_list_excell_cikti_btn"
          style="
            background-color: #fff;
            border: none;
            width: 15px;
            margin-top: -8px;
          "
          ><i class="fa-solid fa-file-excel fa-2xl"></i
        ></b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <DataTable
          v-model:value="musteri_list"
          v-model:filters="filters"
          filterDisplay="menu"
        >
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Customer"
              />
            </template>
          </Column>
          <Column
            field="logo"
            header="Logo"
            headerStyle="width:30px;"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              <img
                :src="
                  'https://cdn.mekmarimage.com/countryLogo/' +
                  slotProps.data.logo
                "
                width="40"
                height="40"
              />
            </template>
          </Column>
          <Column
            field="Toplam"
            header="Total"
            headerStyle="width:65px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.Toplam) }}
            </template>
          </Column>
          <Column
            field="ulkeAdi"
            header="Ülke"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ slotProps.data.ulkeAdi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Country"
              />
            </template>
          </Column>
          <Column
            field="temsilci"
            header="Temsilci"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ slotProps.data.temsilci }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @input="filterCallback()"
                class="p-column-filter"
                placeholder="Search by Represantative"
              />
            </template>
          </Column>

          <Column
            field="BuYilUretim"
            header="               2022                                         Uretim    -    Sevkiyat"
            headerStyle="width:100px;white-space:pre-wrap;"
            bodyStyle="text-align:center"
          >
            <template #body="slotProps">
              <div style="column-count: 2; column-rule: 1px solid black">
                <div>
                  {{ formatPrice(slotProps.data.BuYilUretim) }}
                </div>
                <div>
                  {{ formatPrice(slotProps.data.BuYilSevkiyat) }}
                </div>
              </div>
            </template>
          </Column>

          <Column
            field="GecenYil"
            header="2021 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.GecenYil) }}
            </template>
          </Column>
          <Column
            field="OncekiYil"
            header="2020 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OncekiYil) }}
            </template>
          </Column>

          <Column
            field="OnDokuzYili"
            header="2019 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnDokuzYili) }}
            </template>
          </Column>

          <Column
            field="OnSekizYili"
            header="2018 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnSekizYili) }}
            </template>
          </Column>
          <Column
            field="OnYediYili"
            header="2017 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnYediYili) }}
            </template>
          </Column>
          <Column
            field="OnAltiYili"
            header="2016 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnAltiYili) }}
            </template>
          </Column>
          <Column
            field="OnBesYili"
            header="2015 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnBesYili) }}
            </template>
          </Column>
          <Column
            field="OnDortYili"
            header="2014 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnDortYili) }}
            </template>
          </Column>
          <Column
            field="OnUcYili"
            header="2013 - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnUcYili) }}
            </template>
          </Column>
          <Column
            field="OnUcYiliOncesi"
            header="2013 Öncesi - Ddp"
            headerStyle="width:60px;"
            bodyStyle="text-align:center"
            style="flex-grow: 1; flex-basis: 100px"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.OnUcYiliOncesi) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/service/RaporService";
import { mapGetters } from "vuex";
import { FilterMatchMode } from "primevue/api";
export default {
  data() {
    return {
      musteri_list: null,
      ozel_musteri: null,
      liste: null,
      filters: {
        musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      rapor: "Hepsi",
    };
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  created() {
    service.getMusteriList().then((data) => {
      this.ozel_musteri = data;
    });

    service.getGenelMusteriList().then((data) => {
      this.musteri_list = data;
      this.musteri_list = this.musteri_list.sort((a, b) => b.Toplam - a.Toplam);

      this.liste = data;
    });
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    get_musteri_list_excell_cikti_btn() {
      const data = this.musteri_list;
      service.get_musteri_list_excell_cikti(data).then((response) => {
        if (response.status) {
          const link = document.createElement("a");
          link.href = this.servis_adres + "raporlar/musteri/musteriexcellCikti";
          //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
          link.setAttribute("download", "musteri_listesi.xlsx");
          document.body.appendChild(link);
          link.click();
          this.is_excel = false;
        }
      });
    },
    statuSecim() {
      //statü değişiminde

      if (this.rapor) {
        let result;

        if (this.rapor == "Hepsi") {
          result = this.liste;
        }
        if (this.rapor == "Mekmar") {
          result = [...this.liste.filter((x) => x.marketing === this.rapor)];
        }

        if (this.rapor == "Ozel") {
          result = this.ozel_musteri;
        }

        this.musteri_list = result;
      }
    },
  },
};
</script>

<style scoped>
.p-datatable {
  font-size: 10px;
}
#statuSecim {
  font-size: 12px;
}
</style>
