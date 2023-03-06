<template>
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
        :loading="$store.getters.datatableLoading"
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
            <Column field="masraf_toplam" header="Masraf Toplamı">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.masraf_toplam) }}
                </template>
                <template #footer>
                            {{ formatPrice(kar_toplam_guncelle.toplam_masraflar_sum) }}
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
                    {{ formatPrice(slotProps.data.kar_zarar_orani) }}
                </template>
                <template #footer>
                                            {{ formatPrice(kar_toplam_guncelle.kar_zarar_orani_sum) }}
                                        </template>
            </Column>

        </DataTable>
    </div>
    <Dialog
        v-model:visible="is_maliyet_form"
        :header="maliyet_form_baslik"
        :modal="true"
        maximizable
        position="top"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" 
        :style="{ width: '100%' }"
    >
            <MaliyetAyrinti />

    </Dialog>
    </div>
</template>

<script>
export default {
    props: ['maliyet_listesi_kar','kar_toplam_guncelle'],
    methods: {
       formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatTL(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
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