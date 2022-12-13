<template>
    <section>
        <div class="columns">
            <div class="column is-10">
                <b-tabs>
                    <b-tab-item label="Sipariş Bilgileri">
                        <div class="columns">
                            <div class="column is-12">
                                <BmSiparisBilgileri />
                            </div>
                        </div>
                    </b-tab-item>
                    <b-tab-item label="Proforma Bilgileri">
                    </b-tab-item>
                    <b-tab-item label="Masraflar">
                    </b-tab-item>
                    <b-tab-item label="Tedarikçiler">
                    </b-tab-item>
                    <b-tab-item label="Çeki Listesi">
                    </b-tab-item>
                </b-tabs>
            </div>
            <div class="column is-2">
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="columns is-multiline">
                            <div class="column is-12">
                                <b-field label="Po" label-position="on-border" >
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Sipariş Tarihi" label-position="on-border">
                                    <b-datepicker size="is-small" icon-pack="far" icon="calendar-alt" trap-focus />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Müşteri Adı" label-position="on-border" >
                                    <b-autocomplete size="is-small" placeholder="Müşteri Seçin"></b-autocomplete>
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Temsilci" label-position="on-border" >
                                    <b-autocomplete size="is-small" placeholder="Temsilci Seçin"></b-autocomplete>
                                </b-field>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="column is-multiline">
                            <div class="column is-12">
                                <b-field label="Toplam" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Navlun" label-position="on-border" >
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Diğer" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="G.Toplam" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Peşinat" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="column is-multiline">
                            <div class="column is-12">
                                <b-field label="Yükleme Tarihi" label-position="on-border">
                                   <b-datepicker size="is-small" icon-pack="far" icon="calendar-alt" trap-focus />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Eta" label-position="on-border">
                                    <b-datepicker size="is-small" icon-pack="far" icon="calendar-alt" trap-focus />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Konteynır No" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                            <div class="column is-12">
                                <b-field label="Fatura No" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field> 
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="column is-multiline">
                            <div class="column is-12">
                                <b-field label="Üretici" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Özel İşçilik" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Navlun" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Diğer" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Komisyon" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Fob Masraflar" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field label="Toplam" label-position="on-border">
                                    <b-input size="is-small" />
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import BmSiparisBilgileri from './siparisGiris/BmSiparisBilgileri';

export default {
    
    components : {

        BmSiparisBilgileri
    }
};


</script>
<style scoped>
     .custom-box{

        width: 100%;
        transition: 0.4s;
        box-shadow: 3px 3px 14px 2px rgba(0,0,0,0.18), -3px -3px 14px 2px rgba(0,0,0,0.10);
        
        margin-top:10px;
        
    }

</style>