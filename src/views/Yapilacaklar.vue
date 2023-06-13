<template>
    <Button class="btn btn-success w-100" label="Yeni" @click="yapilacaklarNewButton"></Button>
    <div class="row m-auto mt-3">
        <div class="col" v-if="yapilacaklarYapilmadiList.length > 0">
            <DataTable 
                :value="yapilacaklarYapilmadiList" 
                rowGroupMode="rowspan" 
                groupRowsBy="girisTarihi"
                v-if="yapilacaklarYapilmadiList.length > 0"
                v-model:selection="selectedYapilacaklar"
                selectionMode="single"
                @row-click="yapilacaklarSelected($event)"
            >   
                <template #header>
                    Yapilacaklar
                </template>
                <Column field="girisTarihi" header="Giriş Tarihi"></Column>
                <Column field="gorev_sahibi_adi" header="Görev Sahibi"></Column>
                <Column field="yapilacak" header="Görev">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.gorev_veren_id == 10 ? 'yellow':''}">
                            {{ slotProps.data.yapilacak }}
                        </div>
                    </template>
                </Column>
                <Column field="gorev_veren_adi" header="Görevi Veren"></Column>
                <Column field="oncelik" header="Öncelik"></Column>
                <Column header="Durum">
                    <template #body="slotProps">
                        <Button class="btn btn-warning" label="Yapılmadı" @click="yapilacaklarStatus(slotProps.data.id, !slotProps.data.yapildi)"></Button>
                    </template>
                </Column>
                <Column header="Sil">
                    <template #body="slotProps" >
                        <Button 
                            class="btn btn-danger" label="Sil" @click="yapilacaklarDelete(slotProps.data.id)"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col" v-if="yapilacaklarYapildiList.length > 0">
            <DataTable 
                :value="yapilacaklarYapildiList" 
                rowGroupMode="rowspan" 
                groupRowsBy="girisTarihi"
                v-if="yapilacaklarYapildiList.length > 0"
            >
            <template #header>
                Yapılanlar
            </template>
            <Column field="girisTarihi" header="Giriş Tarihi"></Column>
            <Column field="yapildiTarihi" header="Yapılma Tarihi"></Column>
            <Column field="gorev_sahibi_adi" header="Görev Sahibi"></Column>
            <Column field="yapilacak" header="Görev"></Column>
            <Column field="gorev_veren_adi" header="Görevi Veren"></Column>
            <Column field="oncelik" header="Öncelik"></Column>
            <Column header="Durum">
                <template #body="slotProps">
                    <Button class="btn btn-success" label="Yapıldı" @click="yapilacaklarStatus(slotProps.data.id, slotProps.data.yapildi)"></Button>
                </template>
            </Column>
            <Column header="Sil">
                <template #body="slotProps">
                    <Button class="btn btn-danger" v-if="((slotProps.data.gorev_sahibi_adi == slotProps.data.gorev_veren_adi) && slotProps.data.gorev_veren_id == userId) ? true : false"  label="Sil" @click="yapilacaklarDelete(slotProps.data.id)"></Button>
                    <Button v-if="slotProps.data.userStatus" 
                                class="btn btn-danger" label="Sil" @click="yapilacaklarDelete(slotProps.data.id)"></Button>
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="yapilacaklar_dialog_form" modal>
        <yapilacaklarForm />
    </Dialog>

</template>
<script>
import form from '@/components/yapilacaklar/form';
import { mapGetters } from 'vuex';
import socket from '@/service/SocketService';
import yapilacaklarService from '@/service/YapilacaklarService';
import LocalService from '@/service/LocalService';

export default {
    components: {
        yapilacaklarForm:form,
    },
    computed: {
        ...mapGetters(['yapilacaklarYapildiList','yapilacaklarYapilmadiList'])
    },
    data() {
        return {
            yapilacaklar_dialog_form: false,
            userId: null,
            selectedYapilacaklar: {},
            
        }
    },
    created() {
        this.userId = localStorage.getItem('userId');
    },
    methods: {
        yapilacaklarSelected(event) {
            this.$store.dispatch('yapilacaklar_model_load_act', event.data);
            this.yapilacaklar_dialog_form = true;
            this.$store.dispatch('yapilacaklar_yeni_button_form_load_act', false);

        },
        yapilacaklarDelete(id) {
            if (confirm('Are you sure you want to delete')) {
                 yapilacaklarService.delete(id).then(data => {
                    if (data.status) {
                        socket.siparis.emit('get_yapilacaklar_list_event')
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                    }
                })
            }
           
        },
        yapilacaklarNewButton() {
            this.$store.dispatch('yapilacaklar_yeni_button_form_load_act', true);
            this.yapilacaklar_dialog_form = true;
            yapilacaklarService.getYapilacaklarModel().then(model => {
              this.$store.dispatch('yapilacaklar_model_load_act', model);
                     
            })
        },
        yapilacaklarStatus(id, status) {
            const value = {
                'id': id,
                'status': status,
                'yapildiTarihi': new LocalService().getDateString(new Date())
            }
            this.$store.dispatch('fullscreenLoadingAct', true);
            yapilacaklarService.setYapildiStatus(value).then(data => {
                if (data.status) {
                    socket.siparis.emit('get_yapilacaklar_list_event');
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'success', detail: 'Görev Durumu Değiştirildi', life: 3000 });
                }
            })
        }
    },
    mounted() {
        socket.siparis.on('get_yapilacaklar_list_on', () => {
            this.$store.dispatch('fullscreenLoadingAct', true);
            if (localStorage.getItem('userId') == 10) {
                yapilacaklarService.getYapilacaklarListGorevVeren(localStorage.getItem('userId')).then(yapilacaklar => {
                    this.$store.dispatch('yapilacaklar_list_load_act', yapilacaklar);
                    this.$store.dispatch('fullscreenLoadingAct', false);

                })
            } else {
                yapilacaklarService.getYapilacaklarList(localStorage.getItem('userId')).then(yapilacaklar => {
                    this.$store.dispatch('yapilacaklar_list_load_act', yapilacaklar);
                    this.$store.dispatch('fullscreenLoadingAct', false);

                })
            }

        })
    }
}
</script>
<style scoped>

</style>