<template>
<section>
    <div class="columns">
        <div class="column is-12">
            <PickList 
            v-model="depoPickFotoLista" 
            listStyle="height:342px" 
            dataKey="id" 
            @move-to-target="fotoSilEkle($event)"
            @move-all-to-target="fotoSilEkleHepsi($event)"
            @reorder="fotoSiraDegisim($event)"
            @move-to-source="fotoGeriAl($event)"
            @move-all-to-source="fotoGeriAlHepsi($event)"
            >
                <template #sourceHeader>
                    Foto Listesi
                </template>
                <template #targetHeader>
                    Silinecek Foto Listesi
                </template>
                <template #item="slotProps">
                    <div class="p-caritem">
                       
                        <img :src="slotProps.item.link">
                        <div>{{slotProps.item.image}}  </div>
                        <span style="margin-left:25px;">{{slotProps.item.sira}}</span>
                    </div>
                  
                </template>
            </PickList>
        </div>
    </div>
    <div class="columns is-centered">
            <div class="column is-3">
                <b-button @click="fotoDataDegisim" 
                :loading="loading" 
                :disabled="iskaydet" 
                type="is-success" expanded> KAYDET </b-button>
            </div>
        </div>
        
</section>
</template>
<script>

import depoService from '../../service/DepoService';

export default {
    
   
    props : ['urunid','depoPickFotoList'],
    data(){

        return {

            fotolist : null,
            fotosillist : [],
            fotodegisimlist:[],
            iskaydet : true,
            loading: false,
            depoPickFotoLista:[]
        }
    },
    created(){
        this.depoPickFotoLista = this.depoPickFotoList
        this.fotolist = [...this.depoPickFotoList];
    },
    methods : {

        fotoSilEkle(event){

            

            for(let key in event.items){

                const item = event.items[key];

                this.fotosillist.push(item)
            }

            this.kayitKontrol();

           
        },
        fotoSilEkleHepsi(event){

            
             for(let key in event.items){

                const item = event.items[key];

                this.fotosillist.push(item)
            }
            this.kayitKontrol();
           
        },
        fotoSiraDegisim(event){

           
            let sira = 1;
            for(let key in event.value[0]){

                const item = event.value[0][key]

                this.fotodegisimlist.push({...item,sira : sira})

                sira  += 1

            }
            this.kayitKontrol();
            
        },
        fotoGeriAl(event){
            

            for(let key in event.items){

                const item = event.items[key]

                for(let key1 in this.fotosillist){

                    if(this.fotosillist[key1]._id == item._id){
                        
                        this.fotosillist.splice(key1,1)
                    }
                }
            }
            this.kayitKontrol();
            
        },
        fotoGeriAlHepsi(event){

           for(let key in event.items){

                const item = event.items[key]

                for(let key1 in this.fotosillist){

                    if(this.fotosillist[key1]._id == item._id){
                        
                        this.fotosillist.splice(key1,1)
                    }
                }
            }

            this.kayitKontrol();

        },
        kayitKontrol(){

            this.iskaydet = true;
            let urunsil = this.fotosillist.length;
            let urundegisim = this.fotodegisimlist.length

            if(urunsil > 0 || urundegisim > 0) this.iskaydet = false;
        },
        fotoDataDegisim(){

            this.loading = true;
            const fotodata = { 'fotoSilList' : this.fotosillist,'fotoSiraDegisim' : this.fotodegisimlist };
            depoService.depoFotoDegisim(fotodata).then(res => {

                console.log(res.status)
               depoService.getUrunDetay(this.urunid).then(data => {
                   
                    this.emitter.emit('fotoDegisim',data);
                    this.loading = false;
               })
            })
        }
    }
    
  
}
</script>
<style scoped>
  img {

      width: 50px;
      height: 50px;
      vertical-align: middle;
  }
  .p-caritem div {

      float:right;
      vertical-align: middle;
  }
</style>