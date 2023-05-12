<template>
    <div>
        <Dropdown v-model="selectedYear" :options="years" optionLabel="year" class="mr-3" @change="yearChange($event)"/>
        <Button class="p-button-secondary mr-3" label="Excel" @click="excel_cikti_click"></Button>
        <DataTable :value="byMarketingUretimList2" tableStyle="min-width: 50rem;mt-3" sortField="tarih" sortOrder="1">
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