<template>
    <div>
        <Dropdown v-model="selectedYear" :options="years" optionLabel="year" placeholder="Select a Year" @change="ulkeye_gore_year($event)" />

        <hr/>
        <div class="columns">
            <div class="column is-4">
                <DataTable 
                    :value="ulkeyeGoreList" 
                    responsiveLayout="scroll" 
                    v-model:filters="filters1" 
                    filterDisplay="row" 
                    @filter="ulkeye_gore_filtered($event)"
                    v-model:selection="selectedUlkeyeGore" 
                    selectionMode="single"
                    @row-select="ulkeye_gore_selected($event)"
                
                
                >
                    <template #header>
                        Ülkeye Göre ({{ toplam_ulke_sayisi }})
                    </template>
                    <Column field="ulke_adi" header="Ülke" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="sip_sayisi" header="Sipariş Sayısı">
                        <template #footer>
                            {{ ulke_toplam_sip }}
                        </template>
                    </Column>
                    <Column field="konteynir_sayisi" header="Konteynır Sayısı">
                        <template #footer>
                            {{ ulke_toplam_konteynir }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="column is-4">
                <DataTable :value="musteriyeGoreList" 
                responsiveLayout="scroll" 
                v-model:filters="filters2" 
                filterDisplay="row" 
                @filter="musteriye_gore_filtered($event)"
                v-model:selection="selectedMusteriyeGore" 
                selectionMode="single"
                @row-select="musteriye_gore_selected($event)"
                >
                    <template #header>
                        Müşteriye Göre ({{ toplam_musteri_sayisi }})
                    </template>
                    <Column field="ulke_adi" header="Ülke" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="firma_adi" header="Müşteri" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="yuk_mus_sayisi" header="Yüklenen Sipariş">
                        <template #footer>
                            {{ musteri_toplam_sip }}
                        </template>
                    
                    
                    </Column>
                    <Column field="konteynir_sayisi" header="Konteynır Sayısı">
                        <template #footer>
                            {{ musteri_toplam_konteynir }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="column is-4">
                <DataTable :value="tedarikciyeGoreList" 
                responsiveLayout="scroll" 
                v-model:filters="filters3" 
                filterDisplay="row" 
                @filter="tedarikciye_gore_filtered($event)"
                v-model:selection="selectedTedarikciyeGore" 
                selectionMode="single"
                @row-select="tedarikciye_gore_selected($event)"
                >
                    <template #header>
                        Tedarikçiye Göre ({{ toplam_tedarikci_sayisi }})
                    </template>
                    <Column field="firma_adi" header="Tedarikçi Adı" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                :placeholder="`Search by - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="yuklenen_tedarikci_sayisi" header="Toplam Yüklenen Tedarikçi">
                        <template #footer>
                            {{ tedarikci_toplam_yuklenen }}
                        </template>
                    </Column>
                    <Column field="total_alis" header="Toplam Alış">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.total_alis) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(tedarikci_toplam_alis_bedeli) }}
                        </template>
                    
                    </Column>
                </DataTable>
            </div>
        </div>

        <Dialog v-model:visible="ulkeye_gore_form" :modal="true" :header="ulke_baslik + 'Ülkeye Göre Ayrıntı'">
                <DataTable :value="ulkeye_gore_ayrinti_list" showGridlines responsiveLayout="scroll">
                    <Column field="musteri_adi" header="Müşteri"></Column>
                    <Column field="siparis_no" header="PO"></Column>
                    <Column field="fob_toplami" header="Fob ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.fob_toplami) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.fob) }}
                        </template>
                    </Column>
                    <Column field="navlun" header="Navlun Satış ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.navlun) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.navlun) }}
                        </template>
                    </Column>
                    <Column field="detay_1" header="Detay 1 ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.detay_1) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.detay1) }}
                        </template>
                    </Column>
                    <Column field="detay_2" header="Detay 2 ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.detay_2) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.detay2) }}
                        </template>
                    </Column>
                    <Column field="detay_3" header="Detay 3 ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.detay_3) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.detay3) }}
                        </template>
                    </Column>
                    <Column field="detay_4" header="Detay 4 ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.detay_4) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.detay4) }}
                        </template>
                    </Column>
                    <Column field="sigorta" header="Sigorta Satış ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.sigorta) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.sigorta) }}
                        </template>
                    </Column>
                    <Column field="dtp_toplami" header="Dtp ($)">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.dtp_toplami) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(ulkeye_gore_top_ayrinti.dtp) }}
                        </template>
                    </Column>



                </DataTable>
        </Dialog>
        <Dialog v-model:visible="musteriye_gore_form" :modal="true" :header="musteri_baslik + 'Müşteriye Göre Ayrıntı'">
            <DataTable :value="musteriye_gore_ayrinti_list" showGridlines responsiveLayout="scroll">
                <Column field="musteri_adi" header="Müşteri"></Column>
                <Column field="siparis_no" header="PO"></Column>
                <Column field="fob_toplami" header="Fob ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.fob_toplami) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.fob) }}
                    </template>
                </Column>
                <Column field="navlun" header="Navlun Satış ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.navlun) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.navlun) }}
                    </template>
                </Column>
                <Column field="detay_1" header="Detay 1 ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.detay_1) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.detay1) }}
                    </template>
                </Column>
                <Column field="detay_2" header="Detay 2 ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.detay_2) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.detay2) }}
                    </template>
                </Column>
                <Column field="detay_3" header="Detay 3 ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.detay_3) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.detay3) }}
                    </template>
                </Column>
                <Column field="detay_4" header="Detay 4 ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.detay_4) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.detay4) }}
                    </template>
                </Column>
                <Column field="sigorta" header="Sigorta Satış ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.sigorta) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.sigorta) }}
                    </template>
                </Column>
                <Column field="dtp_toplami" header="Dtp ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.dtp_toplami) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(musteriye_gore_top_ayrinti.dtp) }}
                    </template>
                </Column>
        
        
        
            </DataTable>
        </Dialog>

        <Dialog v-model:visible="tedarikciye_gore_form" :modal="true" :header="tedarikci_baslik + 'Tedarikciye Göre Ayrıntı'">
            <DataTable :value="tedarikciye_gore_ayrinti_list" showGridlines responsiveLayout="scroll">
                <Column field="firma_adi" header="Müşteri"></Column>
                <Column field="siparis_no" header="PO"></Column>
                <Column field="alis_toplami" header="Alış Toplamı ($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.alis_toplami) }}
                    </template>
                    <template #footer>
                        {{ formatPrice(tedarikciye_gore_top_ayrinti.alis_toplami) }}
                    </template>
                </Column>
        
        
        
            </DataTable>
        </Dialog>



    </div>
</template>
<script>
import raporService from "@/service/RaporService";
import { FilterMatchMode } from 'primevue/api';

export default {
    data() {
        return {
            years: [],
            selectedYear: { 'year': 2023 },
            ulkeyeGoreList: [],
            musteriyeGoreList: [],
            tedarikciyeGoreList: [],
            tedarikci_toplam_alis_bedeli: 0,
            tedarikci_toplam_yuklenen: 0,
            ulke_toplam_sip: 0,
            ulke_toplam_konteynir: 0,
            musteri_toplam_sip: 0,
            musteri_toplam_konteynir: 0,
            filters1: {
                'ulke_adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filters2: {
                'ulke_adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'firma_adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filters3: {
                'firma_adi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            ulke_baslik: "",
            ulkeye_gore_ayrinti_list: [],
            ulkeye_gore_form: false,
            ulkeye_gore_top_ayrinti: {
                fob: 0,
                navlun: 0,
                detay1: 0,
                detay2: 0,
                detay3: 0,
                detay4: 0,
                sigorta: 0,
                dtp:0
            },
            selectedMusteriyeGore: [],
            musteri_baslik: "",
            musteriye_gore_ayrinti_list: [],
            musteriye_gore_form: false,
            musteriye_gore_top_ayrinti: {
                fob: 0,
                navlun: 0,
                detay1: 0,
                detay2: 0,
                detay3: 0,
                detay4: 0,
                sigorta: 0,
                dtp: 0
            },


            selectedTedarikciyeGore: [],
            tedarikci_baslik: "",
            tedarikciye_gore_ayrinti_list: [],
            tedarikciye_gore_form: false,
            tedarikciye_gore_top_ayrinti: {
                alis_toplami:0
            },
            toplam_ulke_sayisi:0,
            toplam_tedarikci_sayisi:0,
            toplam_musteri_sayisi:0
            
        }
    },
    created() {
        raporService.getUlkeBazindaSevkiyatYears().then(data => {
            this.years = data
        })
        raporService.getMekmarUlkeyeGore(this.selectedYear.year).then(data => {
            this.ulkeyeGoreList = data
            this.toplam_ulke_sayisi = data.length
            this.toplam_ulke(data)

        })
        raporService.getMekmarMusteriyeGore(this.selectedYear.year).then(data => {
            this.musteriyeGoreList = data
            this.toplam_musteri_sayisi = data.length
            this.toplam_musteri(data)

        })
        raporService.getMekmarTedarikciyeGore(this.selectedYear.year).then(data => {
            this.tedarikciyeGoreList = data
            this.toplam_tedarikci_sayisi = data.length
            this.toplam_tedarikci(data)

        })

    },
    methods: {
        tedarikciye_gore_selected(event) {
        this.$store.dispatch('fullscreenLoadingAct', true)

            this.tedarikci_baslik = event.data.firma_adi
            raporService.getMekmarTedarikciyeGoreAyrinti(event.data.tedarikci_id, this.selectedYear.year).then(data => {
                this.tedarikciye_gore_ayrinti_list = data
                this.tedarikciye_gore_top_ayrinti.alis_toplami = 0
                for (let item of data) {
                    this.tedarikciye_gore_top_ayrinti.alis_toplami += item.alis_toplami
                }
                this.tedarikciye_gore_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)

            })
        },
        musteriye_gore_ayrinti_toplami(data) {
            this.musteriye_gore_top_ayrinti = {
                fob: 0,
                navlun: 0,
                detay1: 0,
                detay2: 0,
                detay3: 0,
                detay4: 0,
                sigorta: 0,
                dtp: 0
            }
            for (let i of data) {
                this.musteriye_gore_top_ayrinti.fob += i.fob_toplami
                this.musteriye_gore_top_ayrinti.navlun += i.navlun
                this.musteriye_gore_top_ayrinti.detay1 += i.detay_1
                this.musteriye_gore_top_ayrinti.detay2 += i.detay_2
                this.musteriye_gore_top_ayrinti.detay3 += i.detay_3
                this.musteriye_gore_top_ayrinti.detay4 += i.detay_4
                this.musteriye_gore_top_ayrinti.sigorta += i.sigorta
                this.musteriye_gore_top_ayrinti.dtp += i.dtp_toplami


            }
        },
        musteriye_gore_selected(event) {
        this.$store.dispatch('fullscreenLoadingAct', true)

            this.musteri_baslik = event.data.firma_adi
            raporService.getMekmarMusteriyeGoreAyrinti(event.data.id, this.selectedYear.year).then(data => {
                this.musteriye_gore_ayrinti_list = data
                this.musteriye_gore_ayrinti_toplami(data)
                this.musteriye_gore_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)

            })  
        },
        ulkeye_gore_ayrinti_toplami(data) {
            this.ulkeye_gore_top_ayrinti= {
                fob: 0,
                navlun: 0,
                detay1: 0,
                detay2: 0,
                detay3: 0,
                detay4: 0,
                sigorta: 0,
                dtp: 0
            }
            for (let i of data) {
                this.ulkeye_gore_top_ayrinti.fob += i.fob_toplami
                this.ulkeye_gore_top_ayrinti.navlun += i.navlun
                this.ulkeye_gore_top_ayrinti.detay1 += i.detay_1
                this.ulkeye_gore_top_ayrinti.detay2 += i.detay_2
                this.ulkeye_gore_top_ayrinti.detay3 += i.detay_3
                this.ulkeye_gore_top_ayrinti.detay4 += i.detay_4
                this.ulkeye_gore_top_ayrinti.sigorta += i.sigorta
                this.ulkeye_gore_top_ayrinti.dtp += i.dtp_toplami


            }  
        },
        ulkeye_gore_selected(event) {
        this.$store.dispatch('fullscreenLoadingAct', true)

            this.ulke_baslik = event.data.ulke_adi
            raporService.getMekmarUlkeyeGoreAyrinti(event.data.ulke_id, this.selectedYear.year).then(data => {
                this.ulkeye_gore_ayrinti_list = data
                this.ulkeye_gore_ayrinti_toplami(data)
                this.ulkeye_gore_form = true
        this.$store.dispatch('fullscreenLoadingAct', false)

            })
        },
        tedarikciye_gore_filtered(event) {
            this.toplam_tedarikci(event.filteredValue)  
        },
        musteriye_gore_filtered(event) {
          this.toplam_musteri(event.filteredValue)  
        },
        ulkeye_gore_filtered(event) {
            this.toplam_ulke(event.filteredValue)
        },
        ulkeye_gore_year(event) {
        this.$store.dispatch('fullscreenLoadingAct', true)

            this.toplam_ulke_sayisi= 0
            this.toplam_tedarikci_sayisi= 0
            this.toplam_musteri_sayisi= 0
            raporService.getMekmarUlkeyeGore(event.value.year).then(data => {
                this.ulkeyeGoreList = data
                this.toplam_ulke_sayisi = data.length
                this.toplam_ulke(data)
            })
            raporService.getMekmarMusteriyeGore(event.value.year).then(data => {
                this.musteriyeGoreList = data
                this.toplam_musteri_sayisi = data.length
                this.toplam_musteri(data)
            })
            raporService.getMekmarTedarikciyeGore(event.value.year).then(data => {
                this.tedarikciyeGoreList = data
                this.toplam_tedarikci_sayisi = data.length

                this.toplam_tedarikci(data)
        this.$store.dispatch('fullscreenLoadingAct', false)

            })
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatDecimal(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        toplam_tedarikci(data) {
            this.tedarikci_toplam_alis_bedeli = 0
            this.tedarikci_toplam_yuklenen = 0
            for (let i of data) {
                this.tedarikci_toplam_alis_bedeli += i.total_alis
                this.tedarikci_toplam_yuklenen += i.yuklenen_tedarikci_sayisi
            }
        },
        toplam_ulke(data) {
            this.ulke_toplam_sip= 0
            this.ulke_toplam_konteynir = 0
            for (let i of data) {
                this.ulke_toplam_sip += i.sip_sayisi
                this.ulke_toplam_konteynir += i.konteynir_sayisi
            }
        },
        toplam_musteri(data) {
            this.musteri_toplam_sip= 0
            this.musteri_toplam_konteynir = 0
            for (let i of data) {
                this.musteri_toplam_sip += i.yuk_mus_sayisi
                this.musteri_toplam_konteynir += i.konteynir_sayisi

            }
        }
    }
}
</script>

<style scoped>


</style>