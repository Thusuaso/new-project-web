<template>
        <DataTable :value="yapilacaklar.yapilmadi" scrollable scrollHeight="400px">
            <template #header>
                Yapılacaklar
            </template>
            <Column field="girisTarihi" header="G.Tarihi"></Column>
            <Column field="gorev_veren_adi" header="G.Veren"></Column>
            <Column field="gorev_sahibi_adi" header="G.Sahibi"></Column>
            <Column field="yapilacak" header="Görev"></Column>
            <Column field="oncelik" header="Öncelik"></Column>
        </DataTable>
        <br/>
        <DataTable :value="yapilacaklar.yapildi" scrollable scrollHeight="400px" >
            <template #header>
                Yapılanlar
            </template>
            <Column field="girisTarihi" header="G.Tarihi"></Column>
            <Column field="yapildiTarihi" header="Y.Tarihi"></Column>
            <Column field="gorev_veren_adi" header="G.Veren"></Column>
            <Column field="gorev_sahibi_adi" header="G.Sahibi"></Column>
            <Column field="yapilacak" header="Görev"></Column>
            <Column field="oncelik" header="Öncelik"></Column>
        </DataTable> 
        <br/>
</template>
<script>
import yapilacaklarService from '@/service/YapilacaklarService';
import socket from '@/service/SocketService';
export default {
    data() {
        return {
            yapilacaklar: [],
        }
    },
    created() {

        yapilacaklarService.getYapilacaklarListAll().then(data => {
            this.yapilacaklar = data;
        });
        
    },
    mounted() {
        socket.siparis.on('get_yapilacaklar_list_on', () => {
            yapilacaklarService.getYapilacaklarListAll().then(data => {
                this.yapilacaklar = data;
            });

        })        
    }
}
</script>
