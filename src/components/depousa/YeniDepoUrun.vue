<template>
    <div>
        <TabView>
            <TabPanel header="Ürün Bilgileri (EN)" >
                <br/>
                <Card>
                    <template #header>
                        Ürün Bilgileri Alanı
                    </template>
                    <template #content>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <AutoComplete id="skuNo" v-model="selectedProductList" :suggestions="filteredUsaProductList"
                                        @complete="searchUsaProduct($event)" optionLabel="skuNo"
                                        @item-select="selectedUsaProductList($event)" />
                                    <label for="skuNo">Sku No</label>
                                </span>
                            </div>
                        
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="urun_id" type="text" v-model="usaProduct.product_id" />
                                    <label for="urun_id">Ürün Id</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="urun_tanim" type="text" v-model="usaProduct.product_definition" />
                                    <label for="urun_tanim">Ürün Tanım</label>
                                </span>
                        
                            </div>
                            <div class="column is-6">
                                <span class="p-float-label">
                                    <Textarea id="urun_aciklama" type="text" v-model="usaProduct.product_description" rows="6" cols="85" />
                                    <label for="urun_aciklama">Ürün Açıklama</label>
                                </span>
                        
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_category" type="text" v-model="usaProduct.product_category" />
                                    <label for="product_category">Kategori (En)</label>
                                </span>
                            </div>
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_mekmar_code" type="text" v-model="usaProduct.product_mekmar_code" />
                                    <label for="product_mekmar_code">Mekmar Kod</label>
                                </span>
                            </div>
                            
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_page_keys" type="text" v-model="usaProduct.product_page_keys" />
                                    <label for="product_page_keys">Anahtarlar (En)</label>
                                </span>
                            </div>
                            
                            
                        </div>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_mk_price" type="text" v-model="usaProduct.product_mk_price" />
                                    <label for="product_mk_price">Mekmar Fiyat ($)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_surface" type="text" v-model="usaProduct.product_surface" />
                                    <label for="product_surface">Yüzey</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_edge" type="text" v-model="usaProduct.product_edge" />
                                    <label for="product_edge">Kenar İşlem</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_color" type="text" v-model="usaProduct.product_mk_color" />
                                    <label for="product_color">Renk (En)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_dimension" type="text" v-model="usaProduct.product_usa_dimension" />
                                    <label for="product_dimension">Ebat</label>
                                </span>
                            </div>
                        </div>
                    </template>
                </Card>
                <Card>
                    <template #header>
                        Kasa Detay
                    </template>
                    <template #content>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_box" type="text" v-model="usaProduct.product_crate_box" />
                                    <label for="product_crate_box">Kasa Kutu</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_amount" type="text" v-model="usaProduct.product_crate_amount" />
                                    <label for="product_crate_amount">Kasa İçi Adet</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_sqft" type="text" v-model="usaProduct.product_crate_sqft" />
                                    <label for="product_crate_sqft">Kasa Miktar (sqft)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_m2" type="text" v-model="usaProduct.product_crate_m2" />
                                    <label for="product_crate_m2">Kasa Miktar (m2)</label>
                                </span>
                            </div>
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_crate_detail" type="text" v-model="usaProduct.product_crate_detail" />
                                    <label for="product_crate_detail">Kasa Detay *</label>
                                </span>
                            </div>
                        </div>
                        

                    </template>
                </Card>
                <Card>
                    <template #header>
                        Kutu Detay
                    </template>
                    <template #content>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_box_amount" type="text" v-model="usaProduct.product_box_amount" />
                                    <label for="product_box_amount">Kutu Adet</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_box_sqft" type="text" v-model="usaProduct.product_box_sqft" />
                                    <label for="product_box_sqft">Kutu Miktar (sqft)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_box_m2" type="text" v-model="usaProduct.product_box_m2" />
                                    <label for="product_box_m2">Kutu Miktar (m2)</label>
                                </span>
                            </div>
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_box_detail" type="text" v-model="usaProduct.product_box_detail" />
                                    <label for="product_box_detail">Kutu Detay *</label>
                                </span>
                            </div>
                            <div class="column is-3">
                                <span class="p-float-label">
                                    <InputText id="product_max_stock" type="text" v-model="usaProduct.product_max_stock" />
                                    <label for="product_max_stock">Max Stock </label>
                                </span>
                            </div>
                            
                        </div>
                
                
                    </template>
                </Card>
                
            </TabPanel>
            <TabPanel header="Ürün Bilgileri (FR)" :disabled="usa_product_form">
                <br/>
                <Card>
                    <template #header>
                        Ürün Bilgileri Alanı
                    </template>
                    <template #content>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="urun_tanim" type="text" v-model="usaProduct.product_definition_fr" />
                                    <label for="urun_tanim">Ürün Tanım (Fr)</label>
                                </span>
                
                            </div>
                            <div class="column is-6">
                                <span class="p-float-label">
                                    <Textarea id="urun_aciklama" type="text" v-model="usaProduct.product_description_fr" rows="6"
                                        cols="85" />
                                    <label for="urun_aciklama">Ürün Açıklama (Fr)</label>
                                </span>
                
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_surface_fr" type="text" v-model="usaProduct.product_surface_fr" />
                                    <label for="product_surface_fr">Yüzey (Fr)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_color" type="text" v-model="usaProduct.product_edge_fr" />
                                    <label for="product_color">Kenar İşlemi (Fr)</label>
                                </span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_color" type="text" v-model="usaProduct.product_color" />
                                    <label for="product_color">Renk (Fr)</label>
                                </span>
                            </div>
 
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_page_keys" type="text" v-model="usaProduct.product_page_keys_fr" />
                                    <label for="product_page_keys">Anahtarlar (Fr)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_detail_fr" type="text" v-model="usaProduct.product_crate_detail_fr" />
                                    <label for="product_crate_detail_fr">Kasa Detay (Fr)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_box_detail_fr" type="text" v-model="usaProduct.product_box_detail_fr" />
                                    <label for="product_box_detail_fr">Kutu Detay (Fr)</label>
                                </span>
                            </div>
                
                        </div>
                    </template>
                </Card>
            </TabPanel>
            <TabPanel header="Ürün Bilgileri (ES)" :disabled="usa_product_form">
                <br/>
                <Card>
                    <template #header>
                        Ürün Bilgileri Alanı
                    </template>
                    <template #content>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="urun_tanim" type="text" v-model="usaProduct.product_definition_es" />
                                    <label for="urun_tanim">Ürün Tanım (Es)</label>
                                </span>
                
                            </div>
                            <div class="column is-6">
                                <span class="p-float-label">
                                    <Textarea id="urun_aciklama" type="text" v-model="usaProduct.product_description_es" rows="6"
                                        cols="85" />
                                    <label for="urun_aciklama">Ürün Açıklama (Es)</label>
                                </span>
                
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_surface_fr" type="text" v-model="usaProduct.product_surface_es" />
                                    <label for="product_surface_fr">Yüzey (Es)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_color" type="text" v-model="usaProduct.product_edge_es" />
                                    <label for="product_color">Kenar İşlemi (Es)</label>
                                </span>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_color" type="text" v-model="usaProduct.product_color_es" />
                                    <label for="product_color">Renk (Es)</label>
                                </span>
                            </div>
                
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_page_keys" type="text" v-model="usaProduct.product_page_keys_es" />
                                    <label for="product_page_keys">Anahtarlar (Es)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_crate_detail_fr" type="text" v-model="usaProduct.product_crate_detail_es" />
                                    <label for="product_crate_detail_fr">Kasa Detay (Es)</label>
                                </span>
                            </div>
                            <div class="column is-2">
                                <span class="p-float-label">
                                    <InputText id="product_box_detail_fr" type="text" v-model="usaProduct.product_box_detail_es" />
                                    <label for="product_box_detail_fr">Kutu Detay (Es)</label>
                                </span>
                            </div>
                
                        </div>
                    </template>
                </Card>
            </TabPanel>
            <TabPanel header="Ürün Fotoğrafı Ekleme" :disabled="usa_product_form">
                <urunFotoEkleme :productId = "product_id"></urunFotoEkleme>
            </TabPanel>
            <TabPanel header="Kullanım Alanı" :disabled="usa_product_form">
                <urunKullanimAlani :urunid="product_id"></urunKullanimAlani>
            </TabPanel>
        </TabView>
            <div class="columns is-gapless" style="text-align:center;">
                <div class="column is-12">
                    <Button label="Kaydet" class="p-button-success" @click="saveusaproduct" />
                </div>
            </div>
        

    </div>
</template>
<script>
import panelService from "@/service/MekmarPanelService";
import urunFotoEkleme from "./YeniDepoUrunFotoEkle"
import urunKullanimAlani from "./UrunKullanimForm"

export default {
    components: {
        urunFotoEkleme,
        urunKullanimAlani
    },
    data() {
        return {
            usaProductList: [],
            filteredUsaProductList: [],
            selectedProductList: null,
            usaProduct: [],
            product_id: 0,
            usa_product_form:true
        }
    },
    created() {
        panelService.getUsaProductList().then(data => {
            this.usaProductList = data
        })
    },
    methods: {
        saveusaproduct() {
            this.$store.dispatch('fullscreenLoadingAct',true)
            panelService.setUsaProductSave(this.usaProduct).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Usa Ürün Kayıt', detail: 'Usa ürün kayıt başarılı.', life: 3000 })
                    this.$store.dispatch('fullscreenLoadingAct', false)

                } else {
                    this.$toast.add({ severity: 'error', summary: 'Usa Ürün Kayıt', detail: 'Usa ürün kayıt hata.', life: 3000 })
                    this.$store.dispatch('fullscreenLoadingAct', false)

                }
            })
        },
        updateusaproduct() {
            this.$store.dispatch('fullscreenLoadingAct', true)

            panelService.setUsaProductUpdate(this.usaProduct).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Usa Ürün Kayıt', detail: 'Usa ürün kayıt başarılı.', life: 3000 })
                    this.$store.dispatch('fullscreenLoadingAct', false)

                } else {
                    this.$toast.add({ severity: 'error', summary: 'Usa Ürün Kayıt', detail: 'Usa ürün kayıt hata.', life: 3000 })
                    this.$store.dispatch('fullscreenLoadingAct', false)

                }
            })
        },
        deleteusaproduct() {
            
        },
        selectedUsaProductList(event) {
            this.usaProduct = event.value
            this.product_id = event.value.id
            this.usa_product_form = false
        },
        searchUsaProduct(event) {
            let result;
            if (event.query.length > 0) {
                result = [...this.usaProductList]
            } else {
                result = this.usaProductList.filter((ted) => {
                    return ted.skuNo
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase());
                });
            }
            this.filteredUsaProductList = result
        }
    }
}
</script>
<style scoped>

</style>