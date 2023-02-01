<template>
    <div>
        <div class="columns">
            <div class="column is-2">
        <Dropdown v-model="selectedProject" :options="projects" optionLabel="project" placeholder="Select a Project" @change="project_change_seleted"/>

            </div>
            <div class="column">
        <FileUpload mode="basic" @select="fotoGonder($event)" v-model="file" :maxFileSize="5000000" :multiple="true" :disabled="image_upload_form"/>

            </div>
        </div>


        <div class="columns is-centered" v-if="galleriPhotosList.length>0">
            <div class="column is-6">
                <DataTable 
                
                :value="galleriPhotosList" 
                responsiveLayout="scroll"
                v-model:selection="selectedProduct" 
                selectionMode="single"
                @row-select="delete_photos_button_form = false"
                
                >
                    <Column field="image_link" header="Code" bodyStyle="text-align:center">
                        <template #body="slotProps">
                            <img :src="slotProps.data.image_link" width="150" height="150" />
                        </template>
                    </Column>
                
                </DataTable>
            </div>
            <Button label="Fotoğrafı Sil" @click="deletePhotos" class="p-button-danger" :disabled="delete_photos_button_form"/>

        </div>
        
    </div>
</template>

<script>
import digitalOceanService from "@/service/DigitalOceanService"
import raporService from "@/service/RaporService"
import { mapGetters } from 'vuex';
import socket from '@/service/SocketService';
export default {
    computed: {
        ...mapGetters([
            'galleriPhotosList'
        ])
    },
    data() {
        return {
            fileControl: false,
            selectedProduct: null,
            delete_photos_button_form: true,
            selectedProject: [],
            projects: [
                { id:1,'project': 'Kuwait'},
                { id: 2, 'project': 'Dubai' },
                { id: 3, 'project': 'Singapore' },

            ],
            image_upload_form:true
        }
    },
    props: ['urunId'],
    methods: {
        project_change_seleted() {
            this.image_upload_form = false
        },
        deletePhotos() {
            if (confirm('Silmek istediğinize emin misiniz?')) {
                raporService.setMekmarComGalleriDeletePhotos(this.selectedProduct.id).then(data => {
                    if (data) {
                        this.$toast.add({ severity: 'success', summary: 'Fotoğraf Silme', detail: 'Fotoğraf başarıyla silindi.', life: 3000 })
                        this.delete_photos_button_form = true
                        socket.siparis.emit('mekmar_com_galleria_list_event')

                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Fotoğraf Silme', detail: 'Fotoğraf silme hata.', life: 3000 })
                        socket.siparis.emit('mekmar_com_galleria_list_event')

                    }
                })
          }  
        },
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

                    fotoList.push({ 'fileName': event.files[key].name, 'link': 'https://mekmar-image.fra1.cdn.digitaloceanspaces.com/mekmar-galleria/' + event.files[key].name, 'productId': this.urunId, 'projectId': this.selectedProject.id });

                }
            }

            // Foto Kayıt
            if (!this.fileControl) {
                raporService.galleriaAddProduct(fotoList).then((res) => {
                    if (res) {
                        for (let key in event.files) {
                            digitalOceanService.galleriaFotoGonder(event.files[key]);
                        }
                        this.$toast.add({ severity: 'success', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar başarıyla kaydedildi.', life: 3000 })
                        socket.siparis.emit('mekmar_com_galleria_list_event')
                    } else {
                        this.$toast.add({ severity: 'error', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar kaydederken hata meydana geldi.', life: 3000 })
                        socket.siparis.emit('mekmar_com_galleria_list_event')
                    }
                });
            }
            
        },
    },
    mounted() {
        raporService.getMekmarComGalleriPhotos(this.urunId).then(data => {
            this.$store.dispatch('load_mekmar_galleria_photos_act',data.data)
        })

        socket.siparis.on('mekmar_com_galleria_list_emit', () => {
            raporService.getMekmarComGalleriPhotos(this.urunId).then(data => {
                this.$store.dispatch('load_mekmar_galleria_photos_act', data.data)
            })
        })
    }
}
</script>

<style scoped>
</style>