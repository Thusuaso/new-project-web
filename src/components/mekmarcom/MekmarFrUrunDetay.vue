<template>
    <section>
        <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="true"></b-loading>
        <b-tabs>
            <b-tab-item label="Ürün">
                <div class="columns is-multiline">
                    <div class="column is-5">
                       <b-field label="Ürün Adı">
                           <b-input v-model="urunDetay.urunadi_fr" />
                       </b-field>
                    </div>
                    <div class="column is-5">
                       <b-field label="Kod">
                           <b-input v-model="urunDetay.urunkod" />
                       </b-field>
                    </div>
                    <div class="column is-2">
                       <b-field>
                            <b-switch type="is-success" v-model="urunDetay.yayinla" > Yayinla </b-switch>
                       </b-field>
                    </div>
                    <div class="column is-6">
                       <b-field label="Açıklama">
                           <b-input type="textarea" rows="7" v-model="urunDetay.aciklama_fr" />
                       </b-field>
                    </div>
                    <div class="column is-6">
                       <b-field label="Anahtarlar">
                           <b-taginput ellipsis icon="label" v-model="keys" />
                       </b-field>
                    </div>
                    <div class="column is-1 has-text-centered">
                       <b-field label="Sıra">
                           <b-input v-model="urunDetay.sira" />
                       </b-field>
                    </div>
                    <div class="column is-1 has-text-centered">
                       <b-field label="Birim">
                           <b-input  v-model="urunDetay.birim" />
                       </b-field>
                    </div>
                    <div class="column is-2 has-text-centered">
                       <b-field label="Tedarikçi">
                           <b-input  v-model="urunDetay.tedarikciadi" />
                       </b-field>
                    </div>
                    <div class="column is-3 has-text-centered">
                       <b-field label="Kategori">
                           <b-select  placeholder="Kategori Seç" rounded  v-model="kategori">
                                <option  v-for="item in kategoriList" :key="item.id"   > {{item.name_fr}} </option>
                            </b-select>
                       </b-field>
                    </div>
                    <div class="column is-2 has-text-centered">
                       <b-field label="Renk" >
                           <b-select  placeholder="Renk Seç" rounded  v-model="renkEn">
                                <option  v-for="item in enRenkListesi" :key="item.id"   > {{item.name}} </option>
                            </b-select>
                       </b-field>
                    </div>
                     <div class="column is-2 has-text-centered">
                       <b-field label="Renk Fr" >
                           <b-select  placeholder="Renk Seç" rounded  v-model="renkFr">
                                <option  v-for="item in frRenkListesi" :key="item.id"  > {{item.name}} </option>
                            </b-select>
                       </b-field>
                    </div>
                </div>
            </b-tab-item>
            <b-tab-item label="Diğer" :disabled="yeniurun">
                <div class="columns has-text-centered">
                    <div class="column is-3">
                        <div class="columns is-multine kenar-button">
                            <div class="column is-4">
                                <b-field label="Yüzey Ekle">
                                   <b-autocomplete
                                   field="name"
                                   v-model="kenarIslem"
                                   :open-on-focus="true"
                                   :data="filterKenarIslemList"
                                    @select="option => selected = option"
                                   >
                                   <template slot-scope="props">
                                       <span> {{props.option.name}} </span>
                                   </template>
                                   </b-autocomplete>
                                </b-field>
                            </div>
                            <div class="column is-3">
                                <b-button @click="yuzeyKaydet" :disabled="isyuzeyekle" type="is-success">Ekle</b-button>
                            </div>
                            <div class="column is-3">
                                <b-button @click="yuzeySil" :disabled="isyuzeysil" type="is-danger">Sil</b-button>
                            </div>
                          
                        </div>
                        <div class="columns">
                              <div class="column is-12 ">
                                 <DataTable 
                                    :value="urunDetay.kenarIslemList"
                                    dataKey="_id"
                                    selectionMode="simple"
                                    :selection.sync="selectKenarIslem"
                                    @row-select="kenarIslemDegisim($event)"
                                 >
                                     <Column field="name" header="İşlem" bodyStyle="text-align:center">
                                        <template #body="slotProps">
                                            {{slotProps.data.name}}
                                        </template>
                                     </Column>
                                 </DataTable>
                            </div>
                        </div> 
                    </div>
                    <div class="column is-4">
                        <div class="columns is-multine kenar-button">
                            <div class="column is-4">
                                <b-field label="Ebat Ekle">
                                   <b-autocomplete
                                   field="name"
                                   v-model="ebat"
                                   :open-on-focus="true"
                                   :data="filterEbatListesi"
                                    @select="option => selected = option"
                                   >
                                   <template slot-scope="props">
                                       <span> {{props.option.name}} </span>
                                   </template>
                                   </b-autocomplete>
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-field label="Fiyat">
                                    <b-input type="text" v-model="ebatFiyat" />
                                </b-field>
                            </div>
                            <div class="column is-2">
                                <b-button @click="ebatKayitIslem" :disabled="isebatekle" type="is-success">Ekle</b-button>
                            </div>
                            <div class="column is-2">
                                <b-button @click="ebatSil" :disabled="isebatsil" type="is-danger">Sil</b-button>
                            </div>
                            <div class="column is-2">
                                <b-button @click="ebatYenile" :disabled="isebatyenile" type="is-info">Yeni</b-button>
                            </div>
                          
                        </div>
                        <div class="columns">
                              <div class="column is-12 ">
                                 <DataTable 
                                    :value="urunDetay.ebatlar"
                                    dataKey="_id"
                                    selectionMode="simple"
                                    :selection.sync="selectEbat"
                                    @row-select="ebatDegisim($event)"
                                 >
                                     <Column field="ebat" header="Ebat" bodyStyle="text-align:center">
                                        <template #body="slotProps">
                                            {{slotProps.data.ebat}}
                                        </template>
                                     </Column>
                                     <Column field="fiyat" header="Fiyat" bodyStyle="text-align:center">
                                        <template #body="slotProps">
                                            {{formatPrice(slotProps.data.fiyat)}}
                                        </template>
                                     </Column>
                                 </DataTable>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns is-multiline">
                            <div class="column is-4">
                                <b-field label="Kategori">
                                    <b-autocomplete
                                    field="name"
                                    :open-on-focus="true"
                                    v-model="onkategori"
                                    :data="filterKategoriList"
                                    @select="option => selected = option"
                                    @input="onKategoriDegisim"
                                    >
                                    </b-autocomplete>
                                </b-field>
                            </div>
                            <div v-if="isproduct"  class="column is-8">
                                <b-field label="Ürün">
                                    <b-autocomplete
                                    field="urunadi_en"
                                    :open-on-focus="true"
                                    v-model="product"
                                    :data="filterProducts"
                                    @select="option => selected = option"
                                    >
                                    </b-autocomplete>
                                </b-field>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-2">
                                <b-button 
                                type="is-success"
                                 :disbaled="is_onerilen_ekle"
                                 >Ekle</b-button>
                            </div>
                            <div class="column is-2">
                                <b-button 
                                type="is-danger"
                                :disabled="is_onerilen_sil"
                                >Sil</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab-item>
            <b-tab-item label="Fotolar" :disabled="yeniurun">
                <div class="columns">
                    <div class="column is-9" >
                       <b-carousel :indicator-inside="false">
                            <b-carousel-item v-for="(item, i) in urunDetay.fotolar" :key="i" >
                                <div class="slide-image" >
                                <span class="image">
                                <img :src="item.nocdn">
                                </span>
                                </div>
                            </b-carousel-item>
                            <template slot="indicators" slot-scope="props">
                                <span class="list-image">
                                    <img :src="getImgUrl(props.i)" :title="props.i">
                                </span>
                            </template>
                        </b-carousel>
                    </div>
                </div>
                <div class="columns is-centered">
                    <div class="column is-5">
                        <b-field class="file">
                            <b-upload v-model="file" multiple @input="fotoGonder"  >
                                <a class="button is-info" expanded>
                                    <b-icon icon="upload"></b-icon>
                                        <span>Fotoğrafları Ekle</span>
                                </a>
                            </b-upload>
                   
                        </b-field>
                    </div>
                    <div class="column is-2">
                        <b-button type="is-success" expanded @click="isfotolist = true">Foto List Aç</b-button>
                        <Dialog :visible.sync="isfotolist" :modal="true" position="top">
                            <section class="section">
                                <div class="container">
                                    <div class="columns">
                                        <div class="column is-12">
                                            <UrunFotoList :urunid="urunDetay.urunid" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Dialog>
                    </div>
                </div>
            </b-tab-item>
            <b-tab-item label="Dosya İşlemler">
                <div class="columns">
                    <div class="column is-6">
                        <div class="columns is-multiline">
                            <div class="column is-4">
                                <b-field class="file">
                                    <b-upload v-model="testfile" @input="testRaporGonder"  >
                                        <a class="button is-info" expanded>
                                            <b-icon icon="upload"></b-icon>
                                                <span>Test Rapor Gönder</span>
                                        </a>
                                    </b-upload>
                   
                                </b-field>
                            </div>
                            <div class="column is-4">
                                <a 
                                 class="button is-success"
                                :disabled="!urunDetay.testrapor"
                                :href="this.urunDetay.testrapor"
                                target="_blank"
                                >Görüntüle</a>
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab-item>
        </b-tabs>
        <hr>
        <div class="columns is-centered">
            <div class="column is-5">
                <b-button @click="urunIslem" type="is-success" expanded>ÜRÜN KAYDET</b-button>
            </div>
        </div>
    </section>
</template>
<script>
import mekmarService from '../../service/MekmarService';
import { mapGetters } from 'vuex';
import UrunFotoList from './UrunFotoList';
import spaceService from '../../service/SpaceService';

export default {
    components : {

        UrunFotoList
    },
    props : [
       
        'yeniurun',
        'kategoriList'
    ],
    computed : {

        ...mapGetters([

        'urunDetay',
        'onerilenUrunler',
        'benzerUrunler',
        'keyListFr',      
        'enRenkListesi',
        'frRenkListesi',
        'ebatListesi',
        'kenarIslemList',
        ]),
        filterEbatListesi(){

            return this.ebatListesi.filter((option) => {

                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.ebat.toLowerCase()) >= 0;

            } )
        },
        filterKategoriList(){

            return this.kategoriList.filter((option) => {

                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.onkategori.toLowerCase()) >= 0
            })
        },
        filterProducts(){

            return this.products.filter((option) => {

                return option.urunadi_en
                .toString()
                .toLowerCase()
                .indexOf(this.product.toLowerCase()) >= 0
            })
        },
        filterKenarIslemList(){

            return this.kenarIslemList.filter((option) => {

                return option.name 
                .toString()
                .toLowerCase()
                .indexOf(this.kenarIslem.toLowerCase()) >= 0;
            })
        }
    },
    data () {

        return  {

            loading : false,
            file : null,
            testfile : null,
            kategori : '',
            renkEn : '',
            renkFr : '',
            kenarIslem: '',
            selectKenarIslem : null,
            ebat : '',
            onkategori : '',
            selectEbat : null,
            ebatFiyat : null,
            isyuzeyekle : false,
            isyuzeysil : true,
            isebatekle : true,
            isebatsil : true,
            isfotolist : false,
            keys : null,
            products : null,
            product : '',
            isproduct: false,
            isebatyenile : false,
            is_onerilen_ekle : true,
            is_onerilen_sil : true

             
        }
    },
    created(){

      
         this.kategori  = this.kategoriList.find(x=>x.id == this.urunDetay.kategori_id).name_fr

         this.keys = [];

         if(this.keyListFr){

             if(this.keyListFr.length > 0) this.keys = this.keyListFr;
             
         }
         
       if(!this.yeniurun){

          
           this.renkFr = this.urunDetay.renk_fr;
           this.renkEn = this.urunDetay.renk_en
           
       }

      
    },
    methods : {

        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        fotoGonder(){

            this.loading = true;

            let formData = new FormData();
            for(let key in this.file){

                formData.append('file',this.file[key])

            }

            

            mekmarService.fotoGonder(formData).then(res => {

                if(res.status){ 

                    mekmarService.getUrunDetay(this.urunDetay.urunid).then(data => {
                         
                         this.$store.dispatch('loadUrun',data)
                         this.emitter.emit('urunFotoGuncelleme')
                         this.loading = false;
                    })
                }
            })

            

        },
        onKategoriDegisim(){

           if(this.onkategori){

               this.loading = true;
               mekmarService.getUrunKategoriList(this.onkategori).then(data => {

                   this.products = data.urunList;
                   this.isproduct = true;
                   this.loading = false;
               })
           }
        },
        testRaporGonder(){

            if(!this.testfile){

                alert('Rapor seçmeniz gerekiyor.')
                return;
            }

            let formData = new FormData()

            formData.append('file',this.testfile)

            this.loading = true;
            spaceService.testRaporGonder(formData).then(res => {

                if(res.status){

                    const product = {

                        urunid : this.urunDetay.urunid,
                        testrapor : 'https://mekmar-image.fra1.digitaloceanspaces.com/test-reports/' + this.testfile.name
                    }

                    mekmarService.testRaporDataGuncelle(product).then(data => {

                        if(data.status){

                            this.urunDetay.testrapor = product.testrapor
                            this.loading = false
                        }
                    })
                }
            })
        },
        urunIslem(){
           
            if(this.yeniurun)this.urunKaydet();
            if(!this.yeniurun)this.urunGuncelle();
        },
        urunKaydet(){

            this.loading = true;

            this.anahtarAyarla();
            
            mekmarService.urunKaydet(this.urunDetay).then(res => {
               
                if(res.status){
                    this.$store.dispatch('setUrunBaslik',`ID : ${res.urunid} `)
                    mekmarService.getUrunDetay(res.urunid).then(data => {
                         this.$store.dispatch('loadUrun',data)
                        this.yeniurun = false;
                        this.loading = false;
                    })
                }
            })
        },
        urunGuncelle(){

            this.anahtarAyarla();
           
            this.loading = true;
            mekmarService.urunGuncelle(this.urunDetay).then(data => {

                if(data.status){
                 
                   alert('Ürün Bilgileri Değiştirildi.')

                }

                this.loading = false;
            })
        },
        anahtarAyarla(){

            let anahtar_en = ''
            let uzunluk = this.keys.length;
            let indeks = 1;

            if(uzunluk > 0){

                for(let key in this.keys){

                    anahtar_en += this.keys[key]
                    indeks +=1

                    if(uzunluk >= indeks){

                        anahtar_en += ','
                    }
                }
            }
            
            this.urunDetay.kategori_id = this.kategoriList.find(x=>x.name_fr === this.kategori).id;
            this.urunDetay.renk_en = this.renkEn;
            this.urunDetay.renk_fr = this.renkFr;
            this.urunDetay.anahtarlar_fr = anahtar_en;
            
        },
        
        kenarIslemDegisim(event){

            this.kenarIslem = event.data.name;
            this.selectKenarIslem = event.data;
            this.isyuzeyekle = true;
            this.isyuzeysil = false;
        },
        ebatDegisim(event){

            this.ebat = event.data.ebat;
            this.selectEbat = event.data;
            this.ebatFiyat = event.data.fiyat;
            this.isebatekle = false;
            this.isebatsil  = false;

           
        },
        getImgUrl(value) {
           
          return this.urunDetay.fotolar[value].fotoWeb;
      },
      ebatKayitIslem(){

          if(this.selectEbat){

              this.ebatGuncelle();
          }
          else {

              this.ebatKaydet();
          }
      },
      ebatKaydet(){

          if(!this.ebat || !this.ebatFiyat){

              alert('Ebat veya fiyatı boş geçemezsiniz.')
              return
          }
          
            const ebatData = {

                urunid : this.urunDetay.urunid,
                ebat : this.ebat,
                fiyat : this.ebatFiyat,
                birim : this.urunDetay.birim

            }
            this.loading = true;
            mekmarService.ebatKaydet(ebatData).then(data => {

                
                this.urunDetay.ebatlar = data.ebatList;
                this.ebat = ''
                this.ebatFiyat = null;
                this.isebatsil = true;
                this.isebatekle = true;
                this.isebatyenile = false;
                this.loading = false;
            })
      },
      ebatGuncelle(){

            const ebatData = {

                urunid : this.urunDetay.urunid,
                ebat : this.ebat,
                fiyat : this.ebatFiyat,
                birim : this.urunDetay.birim,
                _id : this.selectEbat._id.toString()

            }

           
            this.loading = true;
            mekmarService.ebatGuncelle(ebatData).then(data => {

                
                this.urunDetay.ebatlar = data.ebatList;
                this.ebat = ''
                this.ebatFiyat = null;
                this.isebatsil = true;
                this.isebatekle = true;
                this.isebatyenile = false;
                this.selectEbat = null;
                this.loading = false;
            })
      },
      ebatSil(){

          if(this.selectEbat){

              this.loading = true;
              mekmarService.ebatSil(this.selectEbat._id).then(data => {

                  this.isebatsil = true;
                  this.isebatekle = false;

                  this.urunDetay.ebatlar = data.ebatList;
                  this.selectEbat = null;
                  this.isebatekle = true;
                  this.ebat = ''
                  this.ebatFiyat = null;
                   this.loading = false;
              })
          }
      },
      ebatYenile(){

          this.isebatekle = false;
          this.isebatsil = true;
          this.selectEbat = null;
      },
      yuzeyKaydet(){

          if(!this.kenarIslem){

              alert('Yüzey işlem seçiniz.')
              return
          }

          const yuzeyData = {

              islemadi : this.kenarIslem,
              dil : 'en',
              kategori_id : this.urunDetay.kategori_id,
              urunid : this.urunDetay.urunid
          }
           this.loading = true;
          mekmarService.yuzeyIslemKaydet(yuzeyData).then(data => {

              this.urunDetay.kenarIslemList = data.yuzeyList;
              this.kenarIslem = ''
               this.loading = false;
          })
      },
      yuzeySil(){

          if(this.selectKenarIslem){
               this.loading = true;
              mekmarService.yuzeyIslemSilme(this.selectKenarIslem._id).then(data => {

               
                  this.urunDetay.kenarIslemList = data.yuzeyList;
                  this.isyuzeyekle = false;
                  this.isyuzeysil = true;
                  this.selectKenarIslem = null;
                  this.kenarIslem = ''
                   this.loading = false;
              })
          }
      }
      
    }
}
</script>
<style scoped>
    
    .slide-image img{

        width: 100%;
        height: 420px;
        border-radius: 25px;
    }
    input {

        text-align: center;
    }
    .kenar-button button{

        margin-top: 30px;
    }
    .list-image img{

        width: 250px;
        height: 100px;
    }
</style>