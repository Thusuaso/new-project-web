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
            <Column field="odenen_try_tutar" header="Ödenen(TL)">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.odenen_try_tutar) }}
                </template>
                <template #footer>
                        {{ formatPrice(kar_toplam_guncelle.odenen_try_tutar_sum) }}
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
</template>

<script>
import service from "@/service/RaporService";

export default {
    data() {
        return {
            maliyet_listesi_kar: [],
            kar_toplam_guncelle: {
                toplam_bedel_sum: 0,
                toplam_masraflar_sum: 0,
                odenen_usd_tutar_sum: 0,
                odenen_try_tutar_sum: 0,
                kar_zarar_usd_sum: 0,
                kar_zarar_try_sum: 0,
                kar_zarar_orani_sum: 0
            },
            yil_listesi: [],
            selectedYear:[]
        }
    },
    methods: {
        is_selected_year(event) {
            const year = event.value.yil
            this.maliyet_analiz_tablo_load(year)
        },
        maliyet_analiz_tablo_load(yil) {
          service.getMaliyetRaporKar(yil).then(data => {
                this.maliyet_listesi_kar = [...data]
                this.tablo_toplam_guncelle_kar(data)
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

            for (let key in liste) {
                const item = liste[key];
                this.kar_toplam_guncelle.toplam_bedel_sum += item.toplam_bedel
                this.kar_toplam_guncelle.toplam_masraflar_sum += item.masraf_toplam
                this.kar_toplam_guncelle.odenen_usd_tutar_sum += item.odenen_usd_tutar
                this.kar_toplam_guncelle.odenen_try_tutar_sum += item.odenen_try_tutar
                this.kar_toplam_guncelle.kar_zarar_usd_sum += item.kar_zarar
                this.kar_toplam_guncelle.kar_zarar_try_sum += item.kar_zarar_tl


            }
            this.kar_toplam_guncelle.kar_zarar_orani_sum = (((this.kar_toplam_guncelle.odenen_usd_tutar_sum - this.kar_toplam_guncelle.toplam_masraflar_sum) / this.kar_toplam_guncelle.odenen_usd_tutar_sum) * 100).toFixed(2)
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