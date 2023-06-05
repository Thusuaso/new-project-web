<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <Button class="p-button-success" label="Yeni Maliyet" @click="maliyetForm" />
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="maliyet_hata_list" tableStyle="min-width: 50rem" v-if="maliyet_hata_list.length > 0" v-model:selection="selectedMaliyetHata" selectionMode="single" @row-click="maliyetHataSelected($event)">
            <Column field="tarih" header="Tarih"></Column>

            <Column field="hata" header="Hata"></Column>
            <Column field="maliyet" header="Maliyet">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.maliyet) }}
                </template>
            </Column>
            <Column field="kullanici_adi" header="Kullanıcı"></Column>
        </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="maliyet_form_visible" modal header=""> 
        <MaliyetHataForm/>
    </Dialog>
    
</template>
<script>
import { mapGetters } from 'vuex';
import MaliyetHataForm from '../components/maliyetraporlari/MaliyetHataForm';

import maliyetHataRaporService from '../service/MaliyetHataRaporService';
import socket from '../service/SocketService';
export default {
    computed: {
        ...mapGetters([
            'maliyet_hata_list'
        ])
    },
    components: {
        MaliyetHataForm
    },
    data() {
        return {
            maliyet_form_visible: false,
            selectedMaliyetHata: {},
        }
    },
    methods: {
        maliyetHataSelected(event) {
            this.$store.dispatch('maliyet_hata_model_list_load_act', event.data);
            this.$store.dispatch('maliyet_hata_new_button_load_act', false);
            this.maliyet_form_visible = true;

        },
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        maliyetForm() {
            this.$store.dispatch("fullscreenLoadingAct", true);
            maliyetHataRaporService.getModel().then(data => {
                this.$store.dispatch('maliyet_hata_model_list_load_act', data);
                this.$store.dispatch('maliyet_hata_new_button_load_act', true);
                this.maliyet_form_visible = true;
                this.$store.dispatch("fullscreenLoadingAct", false);
            })
        }
    },
    mounted() {
        socket.siparis.on('get_maliyet_hata_list_on', () => {
            this.$store.dispatch("fullscreenLoadingAct", true);
            maliyetHataRaporService.getList().then(data => {
                this.$store.dispatch('maliyet_hata_list_load_act', data);
                this.$store.dispatch("fullscreenLoadingAct", false);

            })
        })
        this.emitter.on('maliyet_hata_dialog_close', () => {
            this.maliyet_form_visible = false;
        })
    }
    
}
</script>