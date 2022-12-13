<template>
    <div>
        <div class="columns " style="margin-top:10px;margin-left:15px;">

            <Dropdown v-model="selectedYear" :options="years" optionLabel="year" placeholder="Select a Year"
                @change="isSelectedYear" />


            <b-button @click="get_komisyon_excell_cikti_btn" style="width:10px;height:32px;margin-left:10px;"><i
                    class="fa-solid fa-file-excel fa-2xl"></i></b-button>

        </div>

        <DataTable :value="komisyonMasraflar" :scrollable="true" scrollHeight="400px">
            <Column field="musteri" header="Müşteri Adı" bodyStyle="text-align:center;"></Column>
            <Column field="komisyon" header="Komisyon ($)" bodyStyle="text-align:center;">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.komisyon) }}
                </template>
                <template #footer>
                    {{ formatPrice(topKomisyon) }}
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
            komisyonMasraflar: null,
            selectedYear: 2022,
            years: [
                { year: 2022 },
                { year: 2021 },
                { year: 2020 },

            ],
            topKomisyon:null

        }
    },
    computed: {

        ...mapGetters([


            'servis_adres'

        ])
    },
    methods: {
        KomisyonMasraflarService(year) {
            service.getKomisyonMasraflar(year).then(data => {
                this.komisyonMasraflar = data
                this.miktarTopla(data)
            })
        },
        isSelectedYear(event) {
            this.KomisyonMasraflarService(event.value.year)
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
            this.topKomisyon = 0
            for (let item of data) {
                this.topKomisyon += item.komisyon
                
            }
        },
        get_komisyon_excell_cikti_btn() {
            service.getKomisyonMasraflarExcel(this.komisyonMasraflar).then(response => {

                if (response.status) {
                    const link = document.createElement("a")
                    link.href = this.servis_adres + 'islemler/listeler/komisyonMasraflarExcel'
                    link.setAttribute('download', 'komisyonMasraflarExcel.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    this.is_excel = false
                }
            })
        }
    },
    created() {
        this.KomisyonMasraflarService(this.selectedYear)
        this.selectedYear = { 'year': 2022 }
    },

}
</script>

<style scoped>
</style>