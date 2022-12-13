<template>
    <div>
        <div class="columns " style="margin-top:10px;margin-left:15px;">

            <Dropdown v-model="selectedYear" :options="years" optionLabel="year" placeholder="Select a Year"
                @change="isSelectedYear" />


            <b-button @click="get_fobMasraf_excell_cikti_btn" style="width:10px;height:32px;margin-left:10px;"><i
                    class="fa-solid fa-file-excel fa-2xl"></i></b-button>

        </div>

        <DataTable :value="fobMasraflar" :scrollable="true" scrollHeight="400px">
            <Column field="evrakAdi" header="Evrak Adı" bodyStyle="text-align:center;"></Column>
            <Column field="totalFob" header="Toplam Fob Masrafları ($)" bodyStyle="text-align:center;">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.totalFob) }}
                </template>
                <template #footer>
                    {{ formatPrice(topFobMiktar) }}
                </template>
            </Column>

        </DataTable>
    </div>
</template>
<script>
import service from '../../service/RaporService'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            fobMasraflar: null,
            selectedYear: 2022,
            years: [
                { year: 2022 },
                { year: 2021 },
                { year: 2020 },
            ],
            topFobMiktar: 0

        }
    },
    computed: {

        ...mapGetters([


            'servis_adres'

        ])
    },
    methods: {
        fobMasraflarService(year) {
            service.getFobMasraflar(year).then(data => {
                this.fobMasraflar = data
                this.miktarTopla(data)
            })
        },
        isSelectedYear(event) {
            this.fobMasraflarService(event.value.year)
        },
        formatDecimal(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },


        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        miktarTopla(data) {
            this.topFobMiktar = 0
            for (let item of data) {
                this.topFobMiktar += item.totalFob
            }
        },
        get_fobMasraf_excell_cikti_btn() {
            service.getFobMasraflarExcel(this.fobMasraflar).then(response => {

                if (response.status) {
                    const link = document.createElement("a")
                    link.href = this.servis_adres + 'islemler/listeler/fobMasraflarExcel'
                    link.setAttribute('download', 'fobMasraflar.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    this.is_excel = false
                }
            })
        }
    },
    created() {
        this.fobMasraflarService(this.selectedYear)
        this.selectedYear = { 'year': 2022 }
    },

}
</script>

<style scoped>
</style>