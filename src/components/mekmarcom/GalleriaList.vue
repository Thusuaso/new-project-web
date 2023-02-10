<template>
    <div>
        <div class="columns">
            <div class="column is-2">
                <Dropdown v-model="selectedProject" :options="projects" optionLabel="project" placeholder="Select a Project" @change="project_change_seleted"/>

            </div>
            <div class="column">
                <FileUpload mode="basic" @select="fotoGonder($event)" chooseLabel="Fotoğraf Ekle" v-model="file" :maxFileSize="5000000" :multiple="true" :disabled="image_upload_form"/>

            </div>
            <div class="column">
            <Button class="p-button-primary" label="Video Ekle" @click="is_videos_form = true" :disabled="image_upload_form"/>

            </div>
        </div>
        <Dialog v-model:visible="is_videos_form" :modal="true" header="Video Ekleme">
            <InputText v-model="videos.videos_link" type="text" placeholder="Video Linki"/>
            <Button class="p-button-success" @click="video_add" label="Videoyu Ekle"/>
        </Dialog>

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
                            <img :src="slotProps.data.image_link" v-if="slotProps.data.videos_control == false" width="150" height="150" />
                            <iframe v-else width="300" height="250" :src="slotProps.data.image_link" title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen></iframe>

                        </template>
                    </Column>
                
                </DataTable>
            </div>
            <Button label="Sil" @click="deletePhotos" class="p-button-danger" :disabled="delete_photos_button_form"/>

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
            is_videos_form:false,
            fileControl: false,
            selectedProduct: null,
            delete_photos_button_form: true,
            selectedProject: [],
            projects: [
                { id:1,'project': 'Kuwait'},
                { id: 2, 'project': 'Dubai' },
                { id: 3, 'project': 'Singapore' },

            ],
            image_upload_form: true,
            videos: {
                videos_link: "",
                videos_project_id:0,
                videos_product_id:0,
                videos_file_name: "",
                videos_control:1
            }
        }
    },
    props: ['urunId'],
    methods: {
        video_add() {
            this.videos.videos_project_id = this.selectedProject.id
            this.videos.videos_product_id = this.urunId
            this.videos.videos_file_name = "Videos"
            raporService.galleryAddVideo(this.videos).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Video Kayıt', detail: 'Video Kayıt Başarılı', life: 3000 })
                    this.is_videos_form = false
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Video Kayıt', detail: 'Video Kayıt Hatalı', life: 3000 })

                }
            })
        },
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