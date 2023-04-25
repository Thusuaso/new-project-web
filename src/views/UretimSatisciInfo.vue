<template>
    <div style="margin:auto;text-align:center;width:100%;">
        <DataTable :value="siparisSatisciInfo" v-model:filters="filters" filterDisplay="row" tableStyle="min-width: 50rem;text-align:center;width:350px;margin:auto;">
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

</template>

<script>
import { mapGetters } from 'vuex';
import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapGetters([
            'siparisSatisciInfo'
        ])
    },
    data() {
        return {
            filters: {
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                satisci_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                operasyon_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            }
        }
    }
}
</script>
<style scoped>

</style>