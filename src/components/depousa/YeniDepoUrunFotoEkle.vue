<template>
    <div class="columns">
        <div class="column">
            <FileUpload mode="basic" @select="fotoGonder($event)" v-model="file" :maxFileSize="5000000" :multiple="true" />
        </div>
    </div>
</template>

<script>
import digitalOceanService from "@/service/DigitalOceanService"
import panelService from "@/service/MekmarPanelService";

import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
        
      ])  
    },
    props: ['productId'],
    data() {
        return {
            file:[]
        }
    },
    methods: {
        fotoGonder(event) {
            let fotoList = [];
            for (let key in event.files) {
                if (event.files[key].name.split('.')[1] != 'jpg') {

                    this.fileControl = true
                    this.$toast.add({ severity: 'error', summary: 'Fotoğraf Kayıt', detail: 'Lütfen dosya uzantısını .jpg olarak değiştirerek deneyiniz.', life: 3000 })
                    break;
                }
            }
            if (!this.fileControl) {
                for (let key in event.files) {

                    fotoList.push({ 'productId': this.productId, 'image': event.files[key].name, 'webp': event.files[key].name });

                }
            }

            // Foto Kayıt
            if (!this.fileControl) {
                this.$store.dispatch('fullscreenLoadingAct', true)

                panelService.addUsaPhotos(fotoList).then((res) => {
                    if (res) {
                        for (let key in event.files) {
                            digitalOceanService.usaFotoGonder(event.files[key]);
                        }
                        this.$store.dispatch('fullscreenLoadingAct', false)

                        this.$toast.add({ severity: 'success', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar başarıyla kaydedildi.', life: 3000 })
                    } else {
                        this.$store.dispatch('fullscreenLoadingAct', false)

                        this.$toast.add({ severity: 'error', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar kaydederken hata meydana geldi.', life: 3000 })
                    }
                });
            }

        },
    }
}
</script>

<style scoped>

</style>