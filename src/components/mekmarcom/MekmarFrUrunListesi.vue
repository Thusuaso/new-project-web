<template>
<section>
    <div class="columns is-centered is-multiline">
        <div class="column is-2 has-text-centered kategori" >
            <b-field label="Kategori">
                <b-select  placeholder="Kategori Seç" rounded @input="kategoriDegisim" v-model="kategori">
                    <option  v-for="item in kategoriList" :key="item.id"  > {{item.name}} </option>
                </b-select>
            </b-field>
        </div>
        <div class="column is-4 urun">
            <b-button type="is-success" @click="yeniUrunAc">YENİ ÜRÜN</b-button>
        </div>
    </div>
    <div class="columns">
        <div class="column is-12">
            <DataTable
            class="p-datatable-responsive p-datatable-cars"
            :value="urunList"
            :filters.sync="filters"
            dataKey="_id"
            selectionMode="simple"
            :selection.sync="selectUrun"
            @row-select="urunSecim($event)"
            >
              <Column field="urunid" header="Id" headerStyle="width : 90px">
                    <template #body="slotProps">
                        {{slotProps.data.urunid}}
                    </template>
                    <template #filter>
                        <InputText type="text" class="p-column-filter" v-model="filters['urunid']" />
                    </template>
                </Column>
                 <Column field="renk_fr" header="Renk" headerStyle="width : 130px">
                    <template #body="slotProps">
                        {{slotProps.data.renk_fr}}
                    </template>
                    <template #filter>
                        <InputText type="text" class="p-column-filter" v-model="filters['renk_fr']" />
                    </template>
                </Column>
                <Column field="urunkod" header="Kod" headerStyle="width : 120px">
                    <template #body="slotProps">
                        {{slotProps.data.urunkod}}
                    </template>
                    <template #filter>
                        <InputText type="text" class="p-column-filter" v-model="filters['urunkod']" />
                    </template>
                </Column>
                <Column field="urunadi_fr" header="Ürün Adı" headerStyle="width : 200px">
                    <template #body="slotProps">
                        {{slotProps.data.urunadi_fr}}
                    </template>
                    <template #filter>
                        <InputText type="text" class="p-column-filter" v-model="filters['urunadi_fr']"  />
                    </template>
                </Column>
                <Column field="tedarikciadi" header="Tedarikçi" headerStyle="width : 110px">
                    <template #body="slotProps">
                        {{slotProps.data.tedarikciadi}}
                    </template>
                </Column>
                 <Column field="fotolar" header="Fotolar">
                    <template #body="slotProps">
                        <div style="overflow: scroll" class="columns">
                            <div  v-for="item in slotProps.data.fotolar" :key="item._id" class="column is-4">
                                <img :src="item.nocdn" />
                            </div>
                        </div>
                    </template>
                 </Column>
            </DataTable>
        </div>
    </div>
    <Dialog  :visible.sync="isUrunDetay" :header.sync="getUrunBaslik" position="top" :modal="true" >
        <section>
            <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <MekmarFrUrunDetay 
                        :yeniurun="yeniUrun"
                        :kategoriList="kategoriList"
                        @urunFotoGuncelleme="kategoriDegisim"
                        />
                    </div>
                </div>
            </div>
        </section>
    </Dialog>
</section>
</template>
<script>
import mekmarService from '../../service/MekmarService';
import MekmarFrUrunDetay from './MekmarFrUrunDetay';
import { mapGetters } from 'vuex';

    export default {
        components : {

            MekmarFrUrunDetay
        },
        data() {
            return {
                isPublic: true,
                kategoriList : null,
                urunList : null,
                kategori : 'Marble',
                filters : {},
                selectUrun : null,
                isUrunDetay : false,
                urunDetayBaslik : '',
                yeniUrun: false
            }
        },
        computed : {

            ...mapGetters(['getUrunBaslik'])

        },
        created(){
            
            mekmarService.getUrunKategoriList(this.kategori).then(data => {

                    this.kategoriList = data.kategoriList;

                    this.urunList = data.urunList;
                   
            })
        },
        methods : {

            kategoriDegisim(){

                if(this.kategori){


                     mekmarService.getUrunKategoriList(this.kategori).then(data => {

                         this.urunList = data.urunList;
                     })
                }
            },
            urunSecim(event){

              
                this.$store.dispatch('setUrunBaslik',`ID : ${event.data.urunid}`)
                this.keyList = [];
                mekmarService.getUrunDetay(event.data.urunid).then(data => {
                   
                    this.$store.dispatch('loadUrun',data)
                    this.yeniUrun = false;
                    this.isUrunDetay = true;
                })
            },
            yeniUrunAc(){

                this.$store.dispatch('setUrunBaslik',`Yeni Ürün Kaydı`)
                 this.keyList = [];
              
                mekmarService.getYeniUrunModel().then(data => {
                    this.$store.dispatch('loadUrun',data)
                    this.yeniUrun = true;
                    this.isUrunDetay = true;
                })
            }
        },
       

    }
</script>
<style scoped>
    .kategori {

        justify-content: center;
        display: flex;
    }
    .urun button {

        margin-top : 30px;
    }
</style>