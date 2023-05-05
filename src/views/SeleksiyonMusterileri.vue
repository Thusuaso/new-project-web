<template>
    <div class="grid"> 
        <div class="col">
            <Button class="p-button-primary" @click="newForm" label="Yeni" />

        </div>
        <div class="col">
            <AutoComplete id="surface" name="phone" v-model="selectedSurface" :suggestions="filteredSurfaceList"
                @complete="searchSurface($event)" optionLabel="surface" style="margin-left:100px;"
                @item-select="isSelectedSurface($event)" />
        </div>
        <div class="col">
    <Button class="p-button-info" label="Hepsi" @click="allCleaner" style="margin-left:100px;"/>

        </div>
    </div>
    
    <div class="card" style="height: calc(100vh - 143px);margin-top:25px;padding-top:10px;">
        <div class="mainData"  v-if="!isFilter">
            <div class="mainDataRestricted" v-for="i in customerSurfaceListA" :key="i">
                <h3 style="font-size:20;font-weight:bold;background-color:aliceblue;">
                    {{ i.surfaceName }}
                </h3>
                <DataTable 
                    :value="i.dataList" 
                    :scrollable="true" 
                    scrollHeight="flex" 
                    v-model:filters="filters"
                    filterDisplay="row" 
                    :resizableColumns="true" 
                    columnResizeMode="fit" 
                    showGridlines 
                    responsiveLayout="scroll"
                    style="font-size:80%;"
                    v-model:selection="selectedProduct1"
                    selectionMode="single"
                    @row-select="isSelectedCust($event)"
                >
                    <Column field="firstName" header="Name" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                                :placeholder="`Search by name - `" v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="adress" header="Adress"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phone" header="Phone"></Column>
                </DataTable>
                <br/>
            </div>
        </div>

        <div class="mainData" v-else-if="isFilter">
            <div class="mainDataRestricted">
                <h3 style="font-size:20;font-weight:bold;">
                    {{ surfaceName }}
                </h3>
                <DataTable :value="filteredSurface" :scrollable="true" scrollHeight="flex" v-model:filters="filters"
                    filterDisplay="row" :resizableColumns="true" columnResizeMode="fit" showGridlines responsiveLayout="scroll"
                    style="font-size:80%;" v-model:selection="selectedProduct1" selectionMode="single"
                    @row-select="isSelectedCust($event)">
                    <Column field="firstName" header="Name" :showFilterMenu="false">
                        <template #filter="{filterModel,filterCallback}">
                            <InputText type="text" v-model="filterModel.value" @input="filterCallback()"
                                class="p-column-filter" :placeholder="`Search by name - `"
                                v-tooltip.top.focus="'Hit enter key to filter'" />
                        </template>
                    </Column>
                    <Column field="adress" header="Adress"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phone" header="Phone"></Column>
                </DataTable>
            </div>
        </div>


        
    </div>
    <Dialog v-model:visible="is_form" :modal="true" >
        <div class="testbox">
                <div class="colums">
                    <div class="item">
                        
                        <label for="fname"> First Name<span>*</span></label>
                        <br/>
                        <AutoComplete id="fname" name="fname" v-model="selectedMusteri" :suggestions="filteredMusteriList"
                    @complete="searchMusteri($event)" optionLabel="firstName"
                    @item-select="isSelectedMusteri($event)" style="width:250px;"/>
                    </div>
                    <div class="item">
                        <label for="address1">Address<span>*</span></label>
                        <input id="address1" type="text" name="address1" v-model="customers.adress" />
                    </div>
                    <div class="item">
                        <label for="city">City<span>*</span></label>
                        <input id="city" type="text" name="city" required v-model="customers.city"/>
                    </div>
                    <div class="item">
                        <label for="eaddress">Email Address<span>*</span></label>
                        <input id="eaddress" type="text" name="eaddress" v-model="customers.email"/>
                    </div>
                    <div class="item">
                        <label for="phone">Phone<span>*</span></label>
                        <input id="phone" type="tel" name="phone" v-model="customers.phone"/>
                    </div>
                    <div class="item">
                                <label for="surface">Surface<span>*</span></label>
                            <br/>
                                <AutoComplete id="surface" name="phone" v-model="selectedSurface" :suggestions="filteredSurfaceList"
                                    @complete="searchSurface($event)" optionLabel="surface" />
                    </div>
                </div>
                <div class="btn-block">
                    <Button  @click="save" style="margin-bottom:20px;">Save</Button>
                    <Button @click="deleteCust" class="p-button-danger" v-if="!is_new">Delete</Button>

                </div>
        </div>
    </Dialog>
</template>

<script>
import service from "../service/MusteriIslemService"
import { mapGetters } from "vuex"
import { FilterMatchMode } from 'primevue/api';
export default {
    computed:{
        ...mapGetters([
            'customerSurfaceList',
            'surfaceList',
            'customerSurfaceListA',
            '__getUserId'
        ])
    },
    data() { 
        return {
            selectedMusteri: [],
            filteredMusteriList:[],
            surfaceName:"",
            filteredSurface:[],
            isFilter:false,
            filteredSurfaceList: [],
            musteri_listesi:[],
            selectedSurface: "",
            selectedProduct1:[],
            filters: {
                firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                surface: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
            },
            is_form: false,
            customers: {
                id:0,
                name: "",
                surname: "",
                adress: "",
                city: "",
                email: "",
                phone: "",
                surface: "",
                user_id:this.__getUserId
            },
            is_new:false
        }
    },
    created() { 
        this.$store.dispatch('fullscreenLoadingAct',true)
        service.getCustomerSurfaceList(this.__getUserId).then(data => { 
            this.$store.dispatch('customers_surface_list_load_act', data)
        this.$store.dispatch('fullscreenLoadingAct', false)

        })
    },
    methods: {
        allCleaner() {
            this.isFilter = false
            this.selectedSurface = null
        },
        
        isSelectedSurface(event) {
            this.isFilter = true
            this.surfaceName = event.value.surface
            this.filteredSurface = (this.customerSurfaceList.filter(x => x.surfaceId == event.value.id))
        },
        isSelectedMusteri(event) {
            this.customers.name = event.value.firstName
            this.customers.adress = event.value.adress
            this.customers.city = event.value.city
            this.customers.email = event.value.email
            this.customers.phone = event.value.phone
        },
        searchSurface(event) {
                let result;
                if (event.query.length === 0) {
                    result = [...this.surfaceList];
                } else {
                    result = this.surfaceList.filter((ted) => {
                        return ted.surface
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase());
                    });
                }

                this.filteredSurfaceList = result;
        },
        searchMusteri(event) {
            let result;
            if (event.query.length === 0) {
                result = [...this.musteri_listesi];
            } else {
                result = this.musteri_listesi.filter((ted) => {
                    return ted.firstName
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase());
                });
            }

            this.filteredMusteriList = result;
        },

        deleteCust() {
            this.$store.dispatch('fullscreenLoadingAct', true)

            service.setCustomerSurfaceDelete(this.customers.id,this.__getUserId).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', summary: 'Silme', detail: 'Silme Başarılı', life: 3000 })
                    this.$store.dispatch('customers_surface_list_load_act', data.customerList)
                    this.is_form = false
                    this.$store.dispatch('fullscreenLoadingAct', false)


                } else {
                    this.$toast.add({ severity: 'error', summary: 'Silme', detail: 'Silme Hatalı', life: 3000 })
                    this.$store.dispatch('customers_surface_list_load_act', data.customerList)
                    this.$store.dispatch('fullscreenLoadingAct', false)

                }
            })
        },
        newForm() {
            this.reset()
            this.is_form = true
            this.is_new = true
            this.$store.dispatch('fullscreenLoadingAct', true)

            service.getAutoDatas().then(data => {
                this.musteri_listesi = data
                this.$store.dispatch('fullscreenLoadingAct', false)

            })
        },
        isSelectedCust(event) {
            this.customers = {
                id:event.data.id,
                name: event.data.firstName,
                adress: event.data.adress,
                city: event.data.city,
                email: event.data.email,
                phone: event.data.phone,
                oldSurface : event.data.surface
                
            }
            this.selectedSurface = this.surfaceList.find(x => x.surface == event.data.surface)
            
            
            this.is_new = false
            this.is_form = true
            
        },
        reset() {
            this.customers = {
                id:0,
                name: "",
                surname: "",
                adress: "",
                city: "",
                email: "",
                phone: "",
                surface: ""
            }
        },
        save() { 
            if (this.is_new) {
                if (this.selectedSurface.surface) {
                    this.customers.surface = this.selectedSurface.surface

                } else {
                    this.customers.surface = this.selectedSurface

                }
                this.$store.dispatch('fullscreenLoadingAct', true)

                this.customers.user_id = this.__getUserId
                service.setCustomerSurface(this.customers).then(data => {
                    if (data.status) {
                        this.$toast.add({ severity: 'success', summary: 'Kayıt', detail: 'Kayıt Başarılı', life: 3000 })
                        this.$store.dispatch('customers_surface_list_load_act', data.customerList)
                        this.reset()
                        this.$store.dispatch('fullscreenLoadingAct', false)


                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Kayıt', detail: 'Kayıt Hatalı', life: 3000 })
                        this.$store.dispatch('customers_surface_list_load_act', data.customerList)
            this.$store.dispatch('fullscreenLoadingAct', false)

                    }
                })
            }
            else {
                if (this.selectedSurface.surface) {
                    this.customers.surface = this.selectedSurface.surface
                } else {
                    this.customers.surface = this.selectedSurface
                }
            this.$store.dispatch('fullscreenLoadingAct', true)

                this.customers.user_id = this.__getUserId
                service.setCustomerSurfaceUpdate(this.customers).then(data => {
                    if (data.status) {
                        this.$toast.add({ severity: 'success', summary: 'Güncelleme', detail: 'Güncelleme Başarılı', life: 3000 })
                        this.$store.dispatch('customers_surface_list_load_act', data.customerList)
            this.$store.dispatch('fullscreenLoadingAct', false)


                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Güncelleme', detail: 'Güncelleme Hatalı', life: 3000 })
                        this.$store.dispatch('customers_surface_list_load_act', data.customerList)
            this.$store.dispatch('fullscreenLoadingAct', false)

                    }
                })
            } 
        }
            
    },
}
</script>

<style scoped>
.mainData{
    width:100%;
    height:auto;
    margin:0px;
    padding:0px;
    text-align:center;
}
.mainDataRestricted{
    display:inline-block;
    float:left;
    width:49%;
    height:auto;
    margin-left:10px;
    padding:0px;
    text-align:center;
}
div,
form,
input,
select,
textarea,
label,
p {
    padding: 0;
    margin: 0;
    outline: none;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    color: #666;
    line-height: 22px;
}

h1 {
    position: absolute;
    margin: 0;
    font-size: 40px;
    color: #fff;
    z-index: 2;
    line-height: 83px;
}

textarea {
    width: calc(100% - 12px);
    padding: 5px;
}

.testbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    padding: 20px;
}

form {
    width: 100%;
    padding: 20px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 8px #669999;
}

.banner {
    position: relative;
    height: 300px;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.banner::after {
    content: "";
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 100%;
    height: 100%;
}

input,
select,
textarea {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

input {
    width: calc(100% - 10px);
    padding: 5px;
}

input[type="date"] {
    padding: 4px 5px;
}

textarea {
    width: calc(100% - 12px);
    padding: 5px;
}

.item:hover p,
.item:hover i,
.question:hover p,
.question label:hover,
input:hover::placeholder {
    color: #669999;
}

.item input:hover,
.item select:hover,
.item textarea:hover {
    border: 1px solid transparent;
    box-shadow: 0 0 3px 0 #669999;
    color: #669999;
}

.item {
    position: relative;
    margin: 10px 0;
}

.item span {
    color: red;
}

.week {
    display: flex;
    justfiy-content: space-between;
}

.colums {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
}

.colums div {
    width: 48%;
}

input[type="date"]::-webkit-inner-spin-button {
    display: none;
}

.item i,
input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    font-size: 20px;
    color: #a3c2c2;
}

.item i {
    right: 1%;
    top: 30px;
    z-index: 1;
}

input[type=radio],
input[type=checkbox] {
    display: none;
}

label.radio {
    position: relative;
    display: inline-block;
    margin: 5px 20px 15px 0;
    cursor: pointer;
}

.question span {
    margin-left: 30px;
}

.question-answer label {
    display: block;
}

label.radio:before {
    content: "";
    position: absolute;
    left: 0;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 2px solid #ccc;
}

input[type=radio]:checked+label:before,
label.radio:hover:before {
    border: 2px solid #669999;
}

label.radio:after {
    content: "";
    position: absolute;
    top: 6px;
    left: 5px;
    width: 8px;
    height: 4px;
    border: 3px solid #669999;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    opacity: 0;
}

input[type=radio]:checked+label:after {
    opacity: 1;
}

.flax {
    display: flex;
    justify-content: space-around;
}

.btn-block {
    margin-top: 10px;
    text-align: center;
}

button {
    width: 150px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #669999;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background: #a3c2c2;
}

@media (min-width: 568px) {

    .name-item,
    .city-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .name-item input,
    .name-item div {
        width: calc(50% - 20px);
    }

    .name-item div input {
        width: 97%;
    }

    .name-item div label {
        display: block;
        padding-bottom: 5px;
    }
}
</style>