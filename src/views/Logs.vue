<template>
    <div class="columns">
        <div class="column">
            <Dropdown v-model="yil" :options="yil_list" optionLabel="year" placeholder="Select a Year" class="w-full md:w-14rem" @change="is_change_year($event)"/>
        </div>
    </div>
        <DataTable v-model:filters="filters" v-model:value="logs_maliyet" paginator :rows="10" filterDisplay="row">
        <template #header>
            <div class="flex justify-content-start">
                    Maliyet Logları
            </div>
        </template>
            <Column field="yil" header="Yıl" 
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
            >
                <template #body="slotProps">
                    {{ slotProps.data.yil }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="ay" header="Ay" 
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
            >
                <template #body="slotProps">
                    {{ slotProps.data.ay }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="gun" header="Gün" 
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
                >
                    <template #body="slotProps">
                        {{ slotProps.data.gun }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
            </Column>
            <Column field="kayit_kisi" header="Değişim Yapan" 
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    >
                        <template #body="slotProps">
                            {{ slotProps.data.kayit_kisi }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
            </Column>
            <Column field="siparis_no" header="PO" 
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
                >
                    <template #body="slotProps">
                        {{ slotProps.data.siparis_no }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
            </Column>
            <Column field="yukleme_tarihi" header="Y.Tarihi" 
                    >
                        <template #body="slotProps">
                            {{ slotProps.data.yukleme_tarihi }}
                        </template>
                </Column>
            <Column field="info" header="Bilgi" 
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    >
                        <template #body="slotProps">
                            {{ slotProps.data.info }}
                        </template>
            </Column>
        </DataTable>


    
</template>
<script>
import service from '@/service/RaporService';
import { mapGetters } from 'vuex'
import store from '@/store'
import { FilterMatchMode } from 'primevue/api';

export default {
    computed: {
      ...mapGetters([
          'logs_maliyet',
          'logs_degisimler',
          'yil_list',
          'yil'
      ])  
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('fullscreenLoadingAct', true)
        const now = new Date()
        const year = now.getFullYear()
        service.getLogs(year).then(data => {
            store.dispatch('logs_load_act', data.maliyet)
            store.dispatch("logs_degisimler_load_act", data.digerleri);
             store.dispatch("logs_yil_list_load_act",data.yilList)
            store.dispatch('fullscreenLoadingAct', false)
            next()
        })

        
    },
    data() {
        return {
            active:0,
            filters: {
                yil:        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ay:         { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gun:        { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kayit_kisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                

            },
            filters2: {
                year:  { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                month: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                day:   { value: null, matchMode: FilterMatchMode.STARTS_WITH }
            }
        }
    },
    methods: {
        is_change_year(event) {
            this.$store.dispatch('selected_yil_load_act', event.value)
            store.dispatch('fullscreenLoadingAct', true)
            service.getLogs(event.value.year).then(data => {
                store.dispatch('logs_load_act', data.maliyet)
                store.dispatch("logs_degisimler_load_act", data.digerleri);
                store.dispatch('fullscreenLoadingAct', false)
            })
        } 
    }
    
}
</script>