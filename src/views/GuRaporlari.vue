<template>
    <TabView>
        <TabPanel header="Ayo Maliyet">
            <MaliyetRaporuKar/>
        </TabPanel>
        <TabPanel header="Konteynır Rapor (Mekmar)">
            <MekmarRaporlari/>
        </TabPanel>
        <TabPanel header="Mekus">
            <mekusMasraflar/>
        </TabPanel>
        <TabPanel header="Logs">
            <Logs/>
        </TabPanel>

    </TabView>
</template>
<script>
import MaliyetRaporuKar from '../components/maliyetraporlari/MaliyetRaporuKar.vue';
import MekmarRaporlari from '../views/MekmarRaporlari.vue';
import mekusMasraflar from '../components/musteriraporlari/mekusMasraflar.vue';
import Logs from '../views/Logs.vue';
export default {
    components: {
        MaliyetRaporuKar,
        MekmarRaporlari,
        mekusMasraflar,
        Logs,
    }
}
</script>