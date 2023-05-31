<template>
    <div class="row m-auto mt-3">
        <div class="col">
                <span class="p-float-label">
                    <Textarea v-model="yapilacaklarModel.yapilacak" rows="5" cols="55"></Textarea>
                    <label for="username">Yapılacak</label>
                </span>
        </div>
        <div class="col">
            <Dropdown v-model="selectedUser" :options="yapilacaklarUserList" optionLabel="kullanici" placeholder="Görev Sahibi" class="w-full md:w-14rem" @change="userSelected($event)"/>
        </div>
        <div class="col">
            <Dropdown v-model="selectedOncelik" :options="oncelikler" optionLabel="oncelik" placeholder="Önceliklendirme" class="w-full md:w-14rem" @change="oncelikSelected($event)"/>
        </div>
        
    </div>
    <div class="row m-auto mt-3">
        <Button label="Kaydet" @click="yapilacaklarIslem" class="btn btn-success"></Button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LocalService from '@/service/LocalService';
import yapilacaklarService from '@/service/YapilacaklarService';
import socket from '@/service/SocketService';
import { FIRST_LAST_KEYS } from 'element-plus';
export default {
    computed: {
        ...mapGetters(['yapilacaklarModel','yapilacaklarUserList','__getUserId','yapilacaklarYeniButtonForm'])
    },
    data() {
        return {
            'gorev_sahibi_dropdown': false,
            'oncelikler': [
                { 'oncelik': 'A'},
                { 'oncelik': 'B'},
                { 'oncelik': 'C'},
            ],
            selectedOncelik: {},
            selectedUser: {},
            
        }
    },
    localDateService: null,
    created() {

        this.localDateService = new LocalService();
        if (!this.yapilacaklarYeniButtonForm) {
            this.selectedUser = this.yapilacaklarUserList.find(x => x.id == this.yapilacaklarModel.gorev_veren_id);
            this.selectedOncelik = this.oncelikler.find(x => x.oncelik == this.yapilacaklarModel.oncelik);
        }
    },
    methods: {
        yapilacaklarIslem() {
            if (this.yapilacaklarYeniButtonForm) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.$store.dispatch('fullscreenLoadingAct', true);

            this.yapilacaklarModel.gorev_veren_adi = localStorage.getItem('username');
            this.yapilacaklarModel.gorev_veren_id = localStorage.getItem('userId');
            this.yapilacaklarModel.girisTarihi = this.localDateService.getDateString(new Date());
            yapilacaklarService.getYapilacaklarModel().then(model => {
                this.selectedOncelik = {};
                this.$store.dispatch('yapilacaklar_model_load_act', model);
            })
            yapilacaklarService.save(this.yapilacaklarModel).then(status => {
                if (status) {
                    socket.siparis.emit('get_yapilacaklar_list_event')
                    this.$store.dispatch('fullscreenLoadingAct', false);

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$store.dispatch('fullscreenLoadingAct', false);
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        update() {
            this.$store.dispatch('fullscreenLoadingAct', true);

            yapilacaklarService.update(this.yapilacaklarModel).then(data => {
                if (data.status) {
                    socket.siparis.emit('get_yapilacaklar_list_event');

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                    this.$store.dispatch('fullscreenLoadingAct', false);

                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                    this.$store.dispatch('fullscreenLoadingAct', false);

                }
            })
        },
        userSelected(event) {
            this.yapilacaklarModel.gorev_sahibi_adi = event.value.kullanici;
            this.yapilacaklarModel.gorev_sahibi_id = event.value.id;
        },
        oncelikSelected(event) {
            this.yapilacaklarModel.oncelik = event.value.oncelik;
        }
    }
}
</script>
<style scoped>

</style>