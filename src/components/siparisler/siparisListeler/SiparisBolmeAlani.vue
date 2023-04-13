<template>
    <section >
        <b-loading :is-full-page="true" :active.sync="getLoadStatus" :can-cancel="true"></b-loading>
      <div class="columns is-multiline ">
          <div class="column is-12">
              <div class="box">
                  <div class="columns is-multiline">
                      <div class="column is-12">
                          <span class="p-float-label">
                              <InputText id="siparisNo" v-model="siparislerBilgisi.siparis.siparisNo"></InputText>
                              <label for="siparisNo"><b>Sipariş No</b></label>
                          </span>
                      </div>

                      <div class="column is-12">
                            <Dropdown v-model="selectedProduct" :options="products" optionLabel="aciklama" placeholder="Select a Products" style="width:500px;" @change="isProductChange" />
                            <span><Button @click="isChangeProductsClick" label="Değiştir" :disabled="sip_bol_form"></Button></span>
                            <span class="p-float-label" v-if="isProduct" style="margin-top:25px;">
                              <InputText id="products" v-model="productAmount" @input="productAmountInput" style="width:50px;"></InputText> <span> {{productAmountDetail}}</span>
                              <label for="products"><b>Giden Ürün Miktarı</b></label>
                          </span>
                          
                          <hr>
                          <h3 style="text-align:center;margin-bottom:8px;"><b>Kalan Ürün Miktarı</b></h3>
                          <ul >
                              <li v-for="i in productsNewAmount" :key="i">Ürün Bilgisi - {{i.aciklama}} : {{formatDecimal(i.newAmount)}} {{ i.unit }}</li>
                          </ul>
                          
                      </div>
                                        
                  </div>
              </div>
              
          </div>
          <div class="column is-12">
              <div class="box" style="color:red;">
                <div>
                  * Proforma bilgilerini kontrol etmeyi unutmayınız...

                </div>
                <div>
                  * Kasa ve M2 bilgilerini kontrol etmeyi unutmayınız...

                </div>
                <div>
                    * Peşinat ve ödemelerini kontrol etmeyi unutmayınız...
                </div>
              </div>
              
          </div>
          
      </div>
      <div class="columns is-multiline ">
          <div class="column is-12">
              <div class="box">
                  <div class="columns is-multiline is-centered">
                      <div class="column is-12">
                        <Button @click="siparisibol" label="Siparişi Böl" ></Button>
                      </div>
                      
                       
                  </div>
              </div>
          </div>
      </div>

       
    </section>

        
</template>
<script>
import KullaniciService from '../../../service/KullaniciService';
import siparisService from '../../../service/SiparisService'
export default {
    props:['sipBilgiler','isPesinat'],
    data(){
        return{
            siparislerBilgisi:null,
            kullaniciList:null,
            kullaniciService:null,
            selectedFinansman:null,
            filteredFinansman:null,
            finansmanId:null,
            selectedSatisci:null,
            satisciId:null,
            filteredSatisci:null,
            selectedOperasyon:null,
            operasyonId:null,
            filteredOperasyon:null,
            selectedProduct:null,
            products:[],
            isProduct:false,
            productAmount:0,
            productAmountDetail:null,
            sipUrunBilgisi:null,
            oldAmount:null,
            newAmount:null,
            productsNewAmount:[],
            oldPayment:null,
            newPayment:null,
            newInformation:[],
            sip_bol_form:true,


        }
    },
    created(){
        this.siparislerBilgisi = this.sipBilgiler
        this.kullaniciService = new KullaniciService()
        this.kullaniciListLoad()
        this.sipNoDuzenleme()
        this.productList()
        
    },
    mounted(){
        this.oldPayment = this.sipBilgiler.siparis.pesinat
    },
    methods:{
        siparisibol() {
            
            siparisService.setsiparisBolmeGuncelle(this.sipBilgiler).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Sipariş Bölme', detail: 'Sipariş bölme başarıyla gerçekleştirildi. Proforma bilgileri, kasa, m2, peşinat ve ödemeleri kontrol ediniz.', life: 3000 })
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Sipariş Bölme', detail: 'Sipariş bölme hatalı.', life: 3000 })

                }
                
            })
                
            
        },
        isChangePayment(event) {
            this.newPayment = this.oldPayment - event
            this.sipBilgiler.siparis.newPesinat = this.newPayment
        }
        ,
        isChangeProductsClick(){
            this.newAmount = this.formatInteger(this.oldAmount) - this.formatInteger(this.productAmount)
            this.productsNewAmount.push({ 'aciklama': this.selectedProduct.aciklama, 'newAmount': this.newAmount , 'unit': this.productAmountDetail
            })
            this.sip_bol_form = true;
            for (let i of this.sipBilgiler.siparisUrunler) {
                if (i.musteriAciklama == this.selectedProduct.aciklama) {
                    if (i.m2 > 0) {
                        i.newAmountm2 = this.newAmount
                        i.newAmountmiktar = this.newAmount
                        i.isChange = true
                    } else if (i.mt >0) {
                        i.newAmountmt = this.newAmount
                        i.newAmountmiktar = this.newAmount
                        i.isChange = true

                    } else if (i.adet > 0) {
                        i.newAmountadet = this.newAmount
                        i.newAmountmiktar = this.newAmount
                        i.isChange = true

                    }
                }
            }
        },
        productAmountInput(event) {
            console.log("productAmountInput",event)
            this.productAmount = event.target.value.replace(',','.')
            if(this.sipUrunBilgisi.m2>0){
                for(let i of this.sipBilgiler.siparisUrunler){
                    if(i.musteriAciklama == this.selectedProduct.aciklama){
                        
                        i.m2 = this.formatInteger(this.productAmount)
                        i.miktar = this.formatInteger(this.productAmount)
                    }
                }
            }else if(this.sipUrunBilgisi.adet>0){
                for(let i of this.sipBilgiler.siparisUrunler){
                    if(i.musteriAciklama == this.selectedProduct.aciklama){
                        
                        i.adet = this.formatInteger(this.productAmount)
                        i.miktar = this.formatInteger(this.productAmount)
                    }
                }
            }else if(this.sipUrunBilgisi.mt>0){
                for(let i of this.sipBilgiler.siparisUrunler){
                    if(i.musteriAciklama == this.selectedProduct.aciklama){
                        
                        i.mt = this.formatInteger(this.productAmount)
                        i.miktar = this.formatInteger(this.productAmount)
                    }
                }
            }
            
        },
        formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
        formatInteger(val){
            return parseFloat(val)
        },
        kullaniciListLoad(){
            this.kullaniciService.getKullaniciList().then(data=>{
            this.filteredFinansman = data
            this.filteredSatisci = data
            this.filteredOperasyon = data
            this.kullaniciList = data
            this.selectedFinansman = data.find(x=>x.id == this.siparislerBilgisi.siparis.finansman)
            this.selectedSatisci = data.find(x=>x.id==this.siparislerBilgisi.siparis.siparisSahibi)
            this.selectedOperasyon = data.find(x=>x.id==this.siparislerBilgisi.siparis.operasyon)
        })
        },
        filterFinansList(event){
            this.filteredFinansman = this.kullaniciList.filter((val)=>{
                return val.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            })
        },
        finansmanSelected(){
            this.finansmanId = this.kullaniciList.find(x=>x.kullaniciAdi == this.selectedFinansman.kullaniciAdi).id
            this.siparislerBilgisi.siparis.finansman = this.finansmanId
        },
        filterSatisciList(event){
            this.filteredSatisci = this.kullaniciList.filter((val)=>{
                return val.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            })
        },
        satisciSelected(){
            this.satisciId = this.kullaniciList.find(x=>x.kullaniciAdi == this.selectedSatisci.kullaniciAdi).id
            this.siparislerBilgisi.siparis.siparisSahibi = this.satisciId
        },
        filterOperasyonList(event){
            this.filteredOperasyon = this.kullaniciList.filter((val)=>{
                return val.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
            })
        },
        operasyonSelected(){
            this.operasyonId = this.kullaniciList.find(x=>x.kullaniciAdi == this.selectedOperasyon.kullaniciAdi).id
            this.siparislerBilgisi.siparis.operasyon = this.operasyonId
        },
        sipNoDuzenleme(){
            const result = this.siparislerBilgisi.siparis.siparisNo.split("-")

            if(result.length == 2){
                
                this.siparislerBilgisi.siparis.gidenSiparisNo = this.siparislerBilgisi.siparis.siparisNo
                this.siparislerBilgisi.siparis.kalanSiparisNo = result[0] + '-' + (parseInt(result[1]) + 1)
            }
            else{
                this.siparislerBilgisi.siparis.gidenSiparisNo = this.siparislerBilgisi.siparis.siparisNo + '-' + '1'
                this.siparislerBilgisi.siparis.kalanSiparisNo = this.siparislerBilgisi.siparis.siparisNo + '-' + '2'
            }

        },
        productList(){
            
            for(let i of this.sipBilgiler.siparisUrunler){
                
                this.products.push({'aciklama':i.musteriAciklama})
            }
        },
        isProductChange(){
            this.isProduct = true
            this.sipUrunBilgisi = this.sipBilgiler.siparisUrunler.find(x=>x.musteriAciklama == this.selectedProduct.aciklama)
            this.sip_bol_form = false;

            if(this.sipUrunBilgisi.m2>0){
                this.productAmount = this.sipUrunBilgisi.m2
                this.oldAmount = this.sipUrunBilgisi.m2
                this.productAmountDetail = 'M2'
            }else if (this.sipUrunBilgisi.adet>0){
                this.productAmount = this.sipUrunBilgisi.adet
                this.oldAmount = this.sipUrunBilgisi.adet
                this.productAmountDetail = 'ADET'
            }else if (this.sipUrunBilgisi.mt>0){
                this.productAmount = this.sipUrunBilgisi.mt
                this.oldAmount = this.sipUrunBilgisi.mt
                this.productAmountDetail = 'MT'
            }

        }
        
    },
    
}
</script>
<style scoped>

.table{
    display:table;
    width:100%;
    height:auto;
    border: 1px solid gray;
    
}
.table-row{
    border: 1px solid gray;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  
}
.grid-item {
  text-align: left;
}
.bolButton{
    border:1px solid gray;
    background-color: #affacc;
    color:black;
    font-size: 15px;
    font-weight: bold;
    transition:background-color 2s 0s ease;
}
.bolButton:hover{
    background-color: #025570;
    color:white;
}
</style>