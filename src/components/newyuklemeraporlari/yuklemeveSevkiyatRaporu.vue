<template>

    <Dropdown v-model="selectedYear" :options="years" optionLabel="yil" class="w-full md:w-14rem mt-3 mb-3 mr-3" />
    <Button
        icon="pi pi-file-excel"
        class="p-button-primary  mt-3 mb-3"
        label="Excel"
        @click="excel_cikti_islem"
        />
    <div class="columns">
        <div class="column">
            <DataTable :value="mkRaporListMusteri" >
                <template #header>
                    {{ selectedYear.yil }} Müşterilere Göre Bu Yıl Gelen Siparişler ve Bu Yıl Yüklemeler
                </template>
                <Column field="musteriadi" header="Müşteri"></Column>
                <Column field="siparisfob" :header="'Sipariş ' + selectedYear.yil">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.siparisfob) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(toplam.siparis) }}
                    </template>
                </Column>
                <Column field="yuklenenfob" header="Yüklenen (FOB)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.yuklenenfob) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(toplam.yuklenen) }}
                    </template>
                </Column>
                <Column field="yuklenenddp" header="Yüklenen (DDP)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.yuklenenddp) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(toplam.yuklenenDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <!-- <div class="col">
                <DataTable :value="mkRaporListPo" >
                    <template #header>
                        {{ selectedYear.yil }} Po Bazında Bu Yıl Gelen Siparişlerin Yüklemeleri
                    </template>
                    <Column field="musteriadi" header="Müşteri"></Column>
                    <Column field="po" header="Po"></Column>
                    <Column field="siparistarihi" header="Sipariş Tarihi"></Column>
                    <Column field="yuklemetarihi" header="Yükleme Tarihi"></Column>


                    <Column field="siparisfob" header="Sipariş">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.siparisfob) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(toplam.siparis) }}
                        </template>
                    </Column>
                    <Column field="yuklenenfob" header="Yüklenen (FOB)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.yuklenenfob) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(toplamPo.yuklenen) }}
                        </template>
                    </Column>
                    <Column field="yuklenenddp" header="Yüklenen (DDP)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.yuklenenddp) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(toplamPo.yuklenenDdp) }}
                        </template>
                    </Column>
                </DataTable>
        </div> -->
    </div>
</template>
<script>
import raporService from '@/service/RaporService';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'servis_adres'
        ])
    },
    data() {
        return {
            mkRaporListMusteri: [],
            mkRaporListPo: [],
            selectedYear: { 'yil': 2023 },
            years: [
                { 'yil': 2023 },
                { 'yil': 2022 },
                { 'yil': 2021 },
                { 'yil': 2020 },
                { 'yil': 2019 },
            ],
            toplam: {
                'siparis': 0,
                'yuklenen': 0,
                'yuklenenDdp': 0,
            },
            toplamPo: {
                'siparis': 0,
                'yuklenen': 0,
                'yuklenenDdp': 0,
            }
        }
    },
    created() {

        raporService.getMkYuklenenvSiparisRapor(this.selectedYear.yil).then(data => {
            this.toplam =  {
                'siparis': 0,
                'yuklenen': 0,
                'yuklenenDdp': 0,
            };
            this.toplamPo = {
                'siparis': 0,
                'yuklenen': 0,
                'yuklenenDdp': 0,
            };
            this.mkRaporListMusteri = data.musteri;
            this.mkRaporListPo = data.po;
            for (let item of data.musteri) {
                this.toplam.siparis += item.siparisfob;
                this.toplam.yuklenen += item.yuklenenfob;
                this.toplam.yuklenenDdp += item.yuklenenddp;
            }
            for (let item of data.po) {
                this.toplamPo.siparis += item.siparisfob;
                this.toplamPo.yuklenen += item.yuklenenfob;
                this.toplamPo.yuklenenDdp += item.yuklenenddp;
            }
        })
    },
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatDecimal(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        excel_cikti_islem() {
            raporService.getMkYuklenenvSiparislerExcel(this.mkRaporListMusteri).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.servis_adres + "raporlar/mkrapor/sevksip/excel";
                    //link.href = "http://localhost:5000/raporlar/musteri/musteriexcellCikti"
                    link.setAttribute("download", "mk_sevk_sip_listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            })
        }
    }
}
</script>

<style scoped>
.p-datatable {
  font-size: 12px;
}
</style>