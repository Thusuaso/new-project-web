<template>
        <DataTable 
                    :value="yapilacaklar.yapilmadi" 
                    v-model:filters="filters1"
                    filterDisplay="row"
                    @filter="yapilmadiFilter($event)"
                    >
                    <template #header>
                        Yapılacaklar ({{ yapilmadiTotal }})
                    </template>
                    <Column 
                        field="girisTarihi" 
                        header="G.Tarihi"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                        style="width:30px;"
                        >
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                        </template>
                    </Column>
                    <Column field="gorev_veren_adi" header="G.Veren"
                        :showFilterMenu="false"
                            :showFilterOperator="false"
                            :showClearButton="false"
                            :showApplyButton="false"
                            :showFilterMatchModes="false"
                            :showAddButton="false"
                        style="width:30px;"


                    >
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="gorev_sahibi_adi" header="G.Sahibi" 
                        :showFilterMenu="false"
                            :showFilterOperator="false"
                            :showClearButton="false"
                            :showApplyButton="false"
                            :showFilterMatchModes="false"
                            :showAddButton="false"
                        style="width:30px;"


                    >
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="yapilacak" header="Görev" headerStyle="width:400px;"></Column>
                    <Column field="oncelik" header="Öncelik" 
                        :showFilterMenu="false"
                            :showFilterOperator="false"
                            :showClearButton="false"
                            :showApplyButton="false"
                            :showFilterMatchModes="false"
                            :showAddButton="false"
                        style="width:30px;"


                    >
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
        </DataTable>
        
        <br/>
        <DataTable 
            :value="yapilacaklar.yapildi" 
            v-model:filters="filters2"
            filterDisplay="row"
            @filter="yapildiFilter($event)"
            >
            <template #header>
                Yapılanlar ({{ yapildiTotal }})
            </template>
            <Column field="girisTarihi" header="G.Tarihi"
            :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                        style="width:30px;"

            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="yapildiTarihi" header="Y.Tarihi"
                :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                        style="width:30px;"

            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="gorev_veren_adi" header="G.Veren"
                :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                        style="width:30px;"

            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="gorev_sahibi_adi" header="G.Sahibi"
            :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                        style="width:30px;"

            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="yapilacak" header="Görev" headerStyle="width:400px;"></Column>
            <Column field="oncelik" header="Öncelik"
            :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                        style="width:30px;"

            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
        </DataTable> 
        <br/>
</template>
<script>
import yapilacaklarService from '@/service/YapilacaklarService';
import socket from '@/service/SocketService';
import { FilterMatchMode } from 'primevue/api';
export default {
    data() {
        return {
            yapilacaklar: [],
            filters1: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filters2: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yapildiTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            yapildiTotal: 0,
            yapilmadiTotal: 0,
        }
    },
    created() {

        yapilacaklarService.getYapilacaklarListAll().then(data => {
            this.yapilacaklar = data;
            this.yapildiToplam(data.yapildi);
            this.yapilmadiToplam(data.yapilmadi);
        });
        
    },
    methods: {
        yapildiFilter(event) {
            this.yapildiTotal = event.filteredValue.length; 
        },
        yapilmadiFilter(event) {
            this.yapilmadiTotal = event.filteredValue.length;
        },
        yapildiToplam(data) {
            this.yapildiTotal = data.length;
        },
        yapilmadiToplam(data) {
            this.yapilmadiTotal = data.length;
        }
    },
    mounted() {

        socket.siparis.on('get_yapilacaklar_list_on', () => {
            yapilacaklarService.getYapilacaklarListAll().then(data => {
                this.yapilacaklar = data;
            });

        })        
    }
}
</script>
