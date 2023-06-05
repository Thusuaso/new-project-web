<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <span class="p-float-label">
                <Textarea id="hata" v-model="maliyet_hata_model.hata" rows="5" cols="30" />
                <label for="hata">Hata</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="maliyet" type="text" v-model="maliyet_hata_model.maliyet" @input="maliyet_hata_model.maliyet = formatPoint($event.target.value)"/>
                <label for="maliyet">Maliyet</label>
            </span>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <Button type="button" class="p-button-success" @click="process" label="Kaydet"/>
        </div>
        <div class="col">
            <Button type="button" class="p-button-error" @click="deleteForm" label="Sil"/>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import maliyetHataRaporService from '../../service/MaliyetHataRaporService';
import socket from '../../service/SocketService';
import LocalService from '../../service/LocalService';
export default {
    computed: {
        ...mapGetters([
            'maliyet_hata_model',
            'maliyet_hata_new_button',
        ])
    },
    created() {

    },
    methods: {
        deleteForm() {
            this.$store.dispatch('fullscreenLoadingAct', true);

            maliyetHataRaporService.delete(this.maliyet_hata_model.id).then(data => {
                if (data.status) {
                    this.emitter.emit('maliyet_hata_dialog_close');
                    socket.siparis.emit('get_maliyet_hata_list_event')
                    this.$store.dispatch('fullscreenLoadingAct', false);

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life:3000 });
                } else {
                    this.$store.dispatch('fullscreenLoadingAct', false);

                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        },
        process() {
            console.log(this.maliyet_hata_new_button)
            if (this.maliyet_hata_new_button) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.$store.dispatch('fullscreenLoadingAct', true);
            this.maliyet_hata_model.kullanici_id = localStorage.getItem('userId');
            this.maliyet_hata_model.kullanici_adi = localStorage.getItem('username');
            this.maliyet_hata_model.tarih = new LocalService().getDateString(new Date());
            maliyetHataRaporService.save(this.maliyet_hata_model).then(data => {
                if (data.status) {
                    socket.siparis.emit('get_maliyet_hata_list_event');
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            });
        },
        update() {
            maliyetHataRaporService.update(this.maliyet_hata_model).then(data => {
                if (data.status) {
                    socket.siparis.emit('get_maliyet_hata_list_event');
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'success', detail: 'Güncelleme Başarılı', life: 3000 });
                } else {
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            });
        },
        formatPoint(event) {
            if (event.split(',').length >= 2) {
                return event.replace(',', '.');
            } else {
                return event;
            }
        }
    }
}
</script>