<template>
        <Dropdown v-model="selectedYear" :options="years" optionLabel="year" class="w-full md:w-14rem mt-3 mb-3 mr-3"  @change="yearChange($event)"/>
        <Button
          icon="pi pi-file-excel"
          class="p-button-primary  mt-3 mb-3"
          label="Excel"
          @click="excel_cikti_click"
        />
    <div class="columns">
        <div class="column">
            <DataTable 
            :value="byMarketingUretimList2" 
            tableStyle="mt-3" sortField="tarih" sortOrder="1" responsiveLayout="scroll">
            <template #header >
                <div class="table-header" style="font-size: 15px">
                    Po Bazında Yıllık Siparişler
                </div>
            </template>

                <Column field="tarih" header="Tarih"></Column>
                <Column field="firma" header="Firma"></Column>
                <Column field="po" header="Po"></Column>
                <Column field="teslim" header="Teslim Tür"></Column>
                <Column field="fob" header="Fob">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(total.fob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(total.ddp) }}
                    </template>
                </Column>

            </DataTable>
        </div>
        
    </div>
</template>
<script>
import raporService from '../../service/RaporService';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['byMarketingUretimList2','servis_adres'])
    },
    data() {
        return {
            selectedYear: { 'year': 2023 },
            years: [
                { 'year': 2023 },
                { 'year': 2022 },
                { 'year': 2021 },
                { 'year': 2020 },
                { 'year': 2019 },
            ],
            total: {
                'fob': 0,
                'ddp': 0,
            }
        }
    },
    methods: {
        yearChange(event) {
            raporService.getByMarketingRapor(event.value.year).then(data => {
                this.$store.dispatch('byMarketingUretimLoadListAct', data);
                this.totalSum(data);
            });
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        totalSum(data) {
            this.total = {
                'fob': 0,
                'ddp': 0,
            };
            for (let item of data) {
                this.total.fob += item.fob;
                this.total.ddp += item.ddp;
            }
        },
        excel_cikti_click() {
            raporService.getByPoUretimExcel(this.byMarketingUretimList2).then((response) => {
                if (response) {
                    const link = document.createElement("a");
                    link.href =
                        this.servis_adres +
                        "raporlar/marketing/poBazinda/siparisPoBazinda/excel";
                    link.setAttribute("download", "by_po_uretim_liste.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            });
        },
    },
    created() {
        raporService.getByMarketingRapor(this.selectedYear.year).then(data => {
            this.$store.dispatch('byMarketingUretimLoadListAct', data);
            this.totalSum(data);
        })
    }
}
</script>
<style scoped>
.p-datatable {
  font-size: 12px;
}
</style>