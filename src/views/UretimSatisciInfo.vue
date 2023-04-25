<template>
    <div class="columns" style="margin:auto;text-align:center;width:100%;">
        <div class="column">
            <DataTable :value="siparisSatisciInfo" v-model:filters="filters" v-model:selection="selectedSiparisSatisci" selectionMode="single" @row-select="siparisSatisci($event)" filterDisplay="row" tableStyle="min-width: 50rem;text-align:center;width:350px;margin:auto;">
                <Column field="po" header="PO"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"

                >
                    <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
                <template #footer>
                    {{ satisciInfoSum }}

                </template>
            
                </Column>
                <Column field="satisci_adi" header="Satışçı"
                    :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                </template>
            
                </Column>
                <Column field="operasyon_adi" header="Operasyoncu"
                    :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            
                </Column>
            </DataTable>
        </div>
        <div class="column">
            <DataTable :value="ssOzetList" sortField="adet" sortOrder="-1">
                    <template #header>
                        Siparişçi Özet
                    </template>
                    <Column field="ad" header="Ad"></Column>
                    <Column field="adet" header="Adet">
                        <template #footer>
                            {{ ssSum }}

                        </template>
                    </Column>
                </DataTable>
                <br/>
            <DataTable :value="opOzetList" sortField="adet" sortOrder="-1">
                <template #header>
                    Operasyon Özet
                </template>
                <Column field="ad" header="Ad"></Column>
                <Column field="adet" header="Adet">
                    <template #footer>
                                {{ opSum }}

                            </template>
                </Column>
            </DataTable>
        </div>
        
    </div>
    <Dialog v-model:visible="satisci_info_form" :header="po" modal>
        <AutoComplete v-model="ssSelected" :suggestions="filterSiparisciList" optionLabel="kullaniciAdi" @complete="searchSiparisci($event)"/>
        <AutoComplete v-model="opSelected" :suggestions="filterOperasyonList" optionLabel="kullaniciAdi" @complete="searchOperasyon($event)" />
        <Button label="Değiştir" @click="siparisciChangeClick" class="p-button-warning"/>


    </Dialog>

</template>

<script>
import { mapGetters } from 'vuex';
import { FilterMatchMode } from 'primevue/api';
import raporService from '../service/RaporService';
export default {
    computed: {
        ...mapGetters([
            'siparisSatisciInfo',
            'opOzetList',
            'ssOzetList',
            'kullaniciList',
            'satisciInfoSum',
            'ssSum',
            'opSum'
        ])
    },
    data() {
        return {
            filters: {
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                satisci_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                operasyon_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedSiparisSatisci: null,
            po: "",
            ssSelected: null,
            opSelected: null,
            filterSiparisciList: [],
            filterOperasyonList: [],
            satisci_info_form: false,
            
        }
    },
    methods: {
        searchOperasyon(event) {
            setTimeout(() => {
                let result;
                if (event.query.length === 0) {
                    result = [...this.kullaniciList];
                } else {
                    result = this.kullaniciList.filter((ted) => {
                        return ted.kullaniciAdi
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase());
                    });
                }

                this.filterOperasyonList = result;
            }, 250);
        },
        searchSiparisci(event) {
            setTimeout(() => {
                let result;
                if (event.query.length === 0) {
                    result = [...this.kullaniciList];
                } else {
                    result = this.kullaniciList.filter((ted) => {
                        return ted.kullaniciAdi
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase());
                    });
                }

                this.filterSiparisciList = result;
            }, 250);
        },
        siparisSatisci(event) {
            this.ssSelected = this.kullaniciList.find(x => x.id == event.data.satisci_id);
            this.opSelected = this.kullaniciList.find(x => x.id == event.data.operasyon_id);
            this.satisci_info_form = true;
            this.po = event.data.po;
             


        }
        ,
        siparisciChangeClick() {
            raporService.setOpSsChange(this.po, this.ssSelected.id, this.opSelected.id).then(data => {
                if (data) {
                    raporService.getUretimSatisciInfo().then(data => {
                        this.$store.dispatch('siparis_satisci_info_act', data);
                    })
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla güncellendi.', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme başarısız.', life: 3000 });
                }
            })
        }
    }
}
</script>
<style scoped>

</style>