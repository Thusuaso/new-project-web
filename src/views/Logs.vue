<template>
    <div class="columns">
        <div class="column">
            <Dropdown v-model="yil" :options="yil_list" optionLabel="year" placeholder="Select a Year" class="w-full md:w-14rem" @change="is_change_year($event)"/>
        </div>
    </div>
    <Card>
        <template #title >
            Maliyet Logları
        </template>
        <template #content>
            <DataTable :value="logs_maliyet" v-model:filters="filters" filterDisplay="row" paginator :rows="15">
                <Column field="yil" header="Yıl">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>
                <Column field="ay" header="Ay">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>
                <Column field="gun" header="Gün">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>
                <Column field="siparis_no" header="PO">
                    <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                        </template>
                </Column>
                <Column field="yukleme_tarihi" header="Yükleme Tarihi"></Column>
                <Column field="info" header="Değişiklik"></Column>
                <Column field="kayit_kisi" header="Değişimi Yapan"></Column>
        </DataTable>
        </template>
    </Card>
    <Card>
        <template #title>
            Diğer Loglar
        </template>
        <template #content>
            <DataTable :value="logs_degisimler" v-model:filters="filters2" filterDisplay="row" paginator :rows="15">
            <Column field="year" header="Yıl">
                <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                        </template>
            </Column>
            <Column field="month" header="Ay">
                <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                        </template>
            </Column>
                <Column field="day" header="Gün">
                    <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by " />
                        </template>
                </Column>

            <Column field="degisiklikYapan" header="Değişiklik Yapan"></Column>
            <Column field="yapilanDegisiklik" header="Değişiklik"></Column>
        </DataTable>
        </template>
    </Card>
    <vs-button
    :active="active == 0"
    @click="active = 0"
    >
    Active
    </vs-button>
    
    
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
                yil: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
               ay: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gun: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            filters2: {
                year: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                month: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                day: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
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