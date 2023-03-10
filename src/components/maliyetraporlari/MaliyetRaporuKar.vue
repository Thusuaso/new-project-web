<template>
    <div class="columns">
        <div class="column">
            <Dropdown v-model="selectedYear" :options="yil_listesi" optionLabel="yil" placeholder="Select a Year" @change="is_selected_year($event)" />

        </div>
    </div>
    <div class="columns">
            <div class="column is-4">

            </div>
            <div class="column is-4">
        
            </div>
            <div class="column is-4">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Profit TRY</th>
                    <th scope="col">Profit USD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>

                    <td scope="row">
                      {{ formatTL(kar_toplam_guncelle.kar_zarar_try_sum) }}
                    </td>
                    <td scope="row">
                      {{ formatPrice(kar_toplam_guncelle.kar_zarar_usd_sum) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    <div class="columns">
    <div class="column is-12">

        <DataTable
        :value="maliyet_listesi_kar"
        :scrollable="true"
        scrollHeight="400px"
        dataKey="id"
        selectionMode="single"
        :resizableColumns="true" 
        columnResizeMode="expand" 
        showGridlines
        sortField="kar_zarar" :sortOrder="1"
        @row-select="is_selected_maliyet_row($event)"
        v-model:filters="filters"
        filterDisplay="row"
        >
        <template #header>
            <div class="columns is-multiline">
            <div class="column is-12">
                <span style="font-size: 15px">AYO RAPORU </span>
            </div>
            </div>
        </template>
        <Column field="musteri_adi" header="Müşteri Adı">
            <template #body="slotProps">
                {{ slotProps.data.musteri_adi }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
        </Column>
        <Column field="toplam_bedel" header="Toplam Bedel">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.toplam_bedel) }}
                        </template>
                        <template #footer>
                                        {{ formatPrice(kar_toplam_guncelle.toplam_bedel_sum) }}
                                    </template>
                        
                    </Column>
        <Column field="masraf_toplam" header="Masraf Toplamı">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.masraf_toplam) }}
                    </template>
                    <template #footer>
                                {{ formatPrice(kar_toplam_guncelle.toplam_masraflar_sum) }}
                            </template>
                </Column>
                
        <Column field="odenen_usd_tutar" header="Ödenen ($)">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.odenen_usd_tutar) }}
                </template>
                <template #footer>
                    {{ formatPrice(kar_toplam_guncelle.odenen_usd_tutar_sum) }}
                </template>
            </Column>
            <Column field="kalan_bedel" header="Kalan ($)">
                    <template #body="slotProps">
                        <div v-if="slotProps.data.kalan_bedel >8" style="background-color:greenyellow;">
                            {{ formatPrice(slotProps.data.kalan_bedel) }}

                        </div>
                        <div v-else-if="slotProps.data.kalan_bedel<-10" style="background-color:red;color:white">
                            {{ formatPrice(slotProps.data.kalan_bedel) }}
                        </div>
                        <div v-else>
                        {{ formatPrice(slotProps.data.kalan_bedel) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ formatPrice(kar_toplam_guncelle.kalan_bedel_sum) }}
                    </template>
                </Column>

            
            <Column field="kar_zarar" header="Profit($)">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.kar_zarar) }}
                </template>
                <template #footer>
                                    {{ formatPrice(kar_toplam_guncelle.kar_zarar_usd_sum) }}
                                </template>
            </Column>
            <Column field="kar_zarar_tl" header="Profit(TL)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.kar_zarar_tl) }}
                    </template>
                    <template #footer>
                                        {{ formatPrice(kar_toplam_guncelle.kar_zarar_try_sum) }}
                                    </template>
                </Column>
            <Column field="kar_zarar_orani" header="Kar Zarar Orani(%)">
                <template #body="slotProps">
                    % {{ formatDecimal(slotProps.data.kar_zarar_orani) }}
                </template>
                <template #footer>
                                            % {{ formatDecimal(kar_toplam_guncelle.kar_zarar_orani_sum) }}
                                        </template>
            </Column>

        </DataTable>
    </div>
    
    </div>
    <div class="columns">
        <div class="column">
            <Dialog v-model:visible="is_maliyet_ayrinti_form" :header="musteri_adi + ' Ayrıntı'" :modal="true">
                <div style="width:1400px;">
                    <DataTable v-model:value="maliyet_ayrinti_load">
                        <Column field="siparis_no" header="PO">
                        </Column>
                        <Column field="yukleme_tarihi" header="Y.Tarihi">
                        </Column>
                        <Column field="satis_toplami" header="Satış Toplamı">
                                    <template #body="slotProps">
                                        {{ formatPrice(slotProps.data.satis_toplami) }}
                                    </template>
    
                                    </Column>
                        <Column field="navlun_satis" header="Navlun Satış">
                                <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.navlun_satis) }}
                                </template>
    
                                </Column>
                        <Column field="detay_1" header="Detay Satış 1">
                                    <template #body="slotProps">
                                        {{ formatPrice(slotProps.data.detay_1) }}
                                    </template>
    
                                    </Column>
                        <Column field="detay_2" header="Detay Satış 2">
                                        <template #body="slotProps">
                                            {{ formatPrice(slotProps.data.detay_2) }}
                                        </template>
    
                                        </Column>
                        <Column field="detay_3" header="Detay Satış 3">
                                            <template #body="slotProps">
                                                {{ formatPrice(slotProps.data.detay_3) }}
                                            </template>
    
                                            </Column>
                        <Column field="sigorta_tutar_satis" header="Sigorta Satış">
                                                <template #body="slotProps">
                                                    {{ formatPrice(slotProps.data.sigorta_tutar_satis) }}
                                                </template>
    
                                                </Column>
                        <Column field="toplam_bedel" header="Toplam Bedel ($)">
                            <template #body="slotProps">
                                {{ formatPrice(slotProps.data.toplam_bedel) }}
                            </template>
                            <template #footer>
                                {{ formatPrice(kar_toplam_guncelle_ayrinti.toplam_bedel_sum) }}
                            </template>
                            </Column>
                            <Column field="alis_toplami" header="Alış Toplamı">
                                                        <template #body="slotProps">
                                                            {{ formatPrice(slotProps.data.alis_toplami) }}
                                                        </template>
    
                                                        </Column>
                            <Column field="navlun_alis" header="Navlun Alış">
                                                    <template #body="slotProps">
                                                        {{ formatPrice(slotProps.data.navlun_alis) }}
                                                    </template>
    
                                                    </Column>
                            <Column field="detay_alis_1" header="Detay Alış 1">
                                                        <template #body="slotProps">
                                                            {{ formatPrice(slotProps.data.detay_alis_1) }}
                                                        </template>
    
                                                        </Column>
                            <Column field="detay_alis_2" header="Detay Alış 2">
                                                            <template #body="slotProps">
                                                                {{ formatPrice(slotProps.data.detay_alis_2) }}
                                                            </template>
    
                                                            </Column>
                            <Column field="detay_alis_3" header="Detay Alış 3">
                                                                <template #body="slotProps">
                                                                    {{ formatPrice(slotProps.data.detay_alis_3) }}
                                                                </template>
    
                                                                </Column>
                            <Column field="komisyon" header="Komisyon">
                                                                    <template #body="slotProps">
                                                                        {{ formatPrice(slotProps.data.komisyon) }}
                                                                    </template>
    
                                                                    </Column>
                            <Column field="evrak_gideri" header="Evrak Gideri">
                            <template #body="slotProps">
                                {{ formatPrice(slotProps.data.evrak_gideri) }}
                            </template>

                            </Column>
                            <Column field="banka_masrafi" header="Banka Masrafı">
                                <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.banka_masrafi) }}
                                </template>

                                </Column>
                            <Column field="iscilik_masrafi" header="İşçilik">
                                    <template #body="slotProps">
                                        {{ formatPrice(slotProps.data.iscilik_masrafi) }}
                                    </template>

                                    </Column>
                            <Column field="sigorta_alis" header="Sigorta Alış">
                                        <template #body="slotProps">
                                            {{ formatPrice(slotProps.data.sigorta_alis) }}
                                        </template>

                                        </Column>
                            <Column field="fatura_masraflari" header="Faturalar">
                                        <template #body="slotProps">
                                            {{ formatPrice(slotProps.data.fatura_masraflari) }}
                                        </template>

                                        </Column>


                            <Column field="masraf_toplam" header="Masraf Toplamı">
                                <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.masraf_toplam) }}
                                </template>
                                <template #footer>
                                    {{ formatPrice(kar_toplam_guncelle_ayrinti.toplam_masraflar_sum) }}
                                </template>
                            </Column>
                            <Column field="odenen_usd_tutar" header="Ödenen ($)">
                                <template #body="slotProps">
                                        {{ formatPrice(slotProps.data.odenen_usd_tutar) }}
                                    </template>
                                    <template #footer>
                                        {{ formatPrice(kar_toplam_guncelle_ayrinti.odenen_usd_tutar_sum) }}
                                    </template>
                            </Column>
                            <Column field="kalan_bedel" header="Kalan ($)">
                                <template #body="slotProps">
                                    <div v-if="slotProps.data.kalan_bedel>8" style="background-color:greenyellow;">
                                            {{ formatPrice(slotProps.data.kalan_bedel) }}
                                    </div>
                                     <div v-else-if="slotProps.data.kalan_bedel < -10" style="background-color:red;color:white;">
                                                {{ formatPrice(slotProps.data.kalan_bedel) }}
                                        </div>
                                    <div v-else>
                                                    {{ formatPrice(slotProps.data.kalan_bedel) }}
                                            </div>
                                        </template>
                                        <template #footer>
                                            {{ formatPrice(kar_toplam_guncelle_ayrinti.kalan_bedel_sum) }}
                                        </template>
                            </Column>
                            <Column field="kar_zarar" header="Profit ($)">
                                <template #body="slotProps">
                                            {{ formatPrice(slotProps.data.kar_zarar) }}
                                        </template>
                                    <template #footer>
                                            {{ formatPrice(kar_toplam_guncelle_ayrinti.kar_zarar_usd_sum) }}
                                        </template>
                            </Column>
                            <Column field="kar_zarar_tl" header="Profit (TL)">
                                <template #body="slotProps">
                                                {{ formatPrice(slotProps.data.kar_zarar_tl) }}
                                            </template>
                                <template #footer>
                                                {{ formatPrice(kar_toplam_guncelle_ayrinti.kar_zarar_try_sum) }}
                                            </template>
                            </Column>
                            <Column field="kar_zarar_orani" header="Kar Zarar Oranı">
                                <template #body="slotProps">
                                                    {{ formatPrice(slotProps.data.kar_zarar_orani) }}
                                                </template>
                            </Column>
                    </DataTable>
                </div>
                
            </Dialog>
        </div>
    </div>
</template>

<script>
import service from "@/service/RaporService";
import { FilterMatchMode } from 'primevue/api';
export default {
    data() {
        return {
            filters: {
                'musteri_adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
            },
            maliyet_ayrinti_load:[],
            is_maliyet_ayrinti_form:false,
            musteri_adi:"",
            maliyet_ayrinti:[],
            maliyet_listesi_kar: [],
            kar_toplam_guncelle: {
                toplam_bedel_sum: 0,
                toplam_masraflar_sum: 0,
                odenen_usd_tutar_sum: 0,
                odenen_try_tutar_sum: 0,
                kar_zarar_usd_sum: 0,
                kar_zarar_try_sum: 0,
                kar_zarar_orani_sum: 0,
                kalan_bedel_sum:0
            },
            kar_toplam_guncelle_ayrinti: {
                toplam_bedel_sum: 0,
                toplam_masraflar_sum: 0,
                odenen_usd_tutar_sum: 0,
                odenen_try_tutar_sum: 0,
                kar_zarar_usd_sum: 0,
                kar_zarar_try_sum: 0,
                kar_zarar_orani_sum: 0,
                kalan_bedel_sum:0
            },
            yil_listesi: [],
            selectedYear:[]
        }
    },
    methods: {
        is_selected_maliyet_row(event) {
            this.musteri_adi = event.data.musteri_adi
            this.maliyet_ayrinti_load = this.maliyet_ayrinti.filter(x => x.musteri_id == event.data.musteri_id)
            this.tablo_toplam_guncelle_kar_ayrinti(this.maliyet_ayrinti_load)
            this.is_maliyet_ayrinti_form = true
        },
        is_selected_year(event) {
            const year = event.value.yil
            this.maliyet_analiz_tablo_load(year)
        },
        maliyet_analiz_tablo_load(yil) {
            this.$store.dispatch('fullscreenLoadingAct',true)
          service.getMaliyetRaporKar(yil).then(data => {
                this.maliyet_listesi_kar = [...data]
              this.tablo_toplam_guncelle_kar(data)
              service.getMaliyetRaporKarAyrinti(yil).then(data => {
                this.maliyet_ayrinti = data
                this.$store.dispatch('fullscreenLoadingAct', false)

              })

            })  
        },
        tablo_toplam_guncelle_kar(liste) {
            this.kar_toplam_guncelle.toplam_bedel_sum = 0;
            this.kar_toplam_guncelle.toplam_masraflar_sum = 0;
            this.kar_toplam_guncelle.odenen_usd_tutar_sum = 0;
            this.kar_toplam_guncelle.odenen_try_tutar_sum = 0;
            this.kar_toplam_guncelle.kar_zarar_usd_sum = 0;
            this.kar_toplam_guncelle.kar_zarar_try_sum = 0;
            this.kar_toplam_guncelle.kar_zarar_orani_sum = 0;
            this.kar_toplam_guncelle.kalan_bedel_sum = 0;

            for (let key in liste) {
                const item = liste[key];
                this.kar_toplam_guncelle.toplam_bedel_sum += item.toplam_bedel
                this.kar_toplam_guncelle.toplam_masraflar_sum += item.masraf_toplam
                this.kar_toplam_guncelle.odenen_usd_tutar_sum += item.odenen_usd_tutar
                this.kar_toplam_guncelle.odenen_try_tutar_sum += item.odenen_try_tutar
                this.kar_toplam_guncelle.kar_zarar_usd_sum += item.kar_zarar
                this.kar_toplam_guncelle.kar_zarar_try_sum += item.kar_zarar_tl
                this.kar_toplam_guncelle.kalan_bedel_sum += item.kalan_bedel


            }
            this.kar_toplam_guncelle.kar_zarar_orani_sum = (((this.kar_toplam_guncelle.odenen_usd_tutar_sum - this.kar_toplam_guncelle.toplam_masraflar_sum) / this.kar_toplam_guncelle.odenen_usd_tutar_sum) * 100).toFixed(2)
        },
        tablo_toplam_guncelle_kar_ayrinti(liste) {
            this.kar_toplam_guncelle_ayrinti.toplam_bedel_sum = 0;
            this.kar_toplam_guncelle_ayrinti.toplam_masraflar_sum = 0;
            this.kar_toplam_guncelle_ayrinti.odenen_usd_tutar_sum = 0;
            this.kar_toplam_guncelle_ayrinti.odenen_try_tutar_sum = 0;
            this.kar_toplam_guncelle_ayrinti.kar_zarar_usd_sum = 0;
            this.kar_toplam_guncelle_ayrinti.kar_zarar_try_sum = 0;
            this.kar_toplam_guncelle_ayrinti.kar_zarar_orani_sum = 0;
            this.kar_toplam_guncelle_ayrinti.kalan_bedel_sum = 0;

            for (let key in liste) {
                const item = liste[key];
                this.kar_toplam_guncelle_ayrinti.toplam_bedel_sum += item.toplam_bedel
                this.kar_toplam_guncelle_ayrinti.toplam_masraflar_sum += item.masraf_toplam
                this.kar_toplam_guncelle_ayrinti.odenen_usd_tutar_sum += item.odenen_usd_tutar
                this.kar_toplam_guncelle_ayrinti.odenen_try_tutar_sum += item.odenen_try_tutar
                this.kar_toplam_guncelle_ayrinti.kar_zarar_usd_sum += item.kar_zarar
                this.kar_toplam_guncelle_ayrinti.kar_zarar_try_sum += item.kar_zarar_tl
                this.kar_toplam_guncelle_ayrinti.kalan_bedel_sum += item.kalan_bedel


            }
            this.kar_toplam_guncelle_ayrinti.kar_zarar_orani_sum = (((this.kar_toplam_guncelle_ayrinti.odenen_usd_tutar_sum - this.kar_toplam_guncelle_ayrinti.toplam_masraflar_sum) / this.kar_toplam_guncelle_ayrinti.odenen_usd_tutar_sum) * 100).toFixed(2)
        },
        formatDecimal(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
       formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatTL(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    },

    created() {
        const date = new Date()
        const year = date.getFullYear()
        service.getMaliyetYilListesi().then(data => {
            this.yil_listesi = data
            this.selectedYear = data.find(x => x.yil == year)

        })
        this.maliyet_analiz_tablo_load(year)
        
    }
}
</script>

<style scoped>
.p-datatable {
  font-size: 9px;
}
.p-column-filter {
  font-size: 9px;
}
.page-button-excell {
  margin-top: 30px;
}
</style>