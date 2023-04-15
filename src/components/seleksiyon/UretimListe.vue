<template>

    <br/>
    <!-- <div class="grid">
      <div class="col-2">
        <Dropdown class="urunSecmeDropdown" v-model="selectedUrun" :options="urunler" :filter="true" optionLabel="name"
          placeholder="Ürün Seç" />
      </div>
      <div class="col-2">
        <Button class="urunSecmeDropdown" @click="isSelected" label="Göster" />
      </div>

    </div> -->

    <div  v-if="slk_enb_mekmar">
            <DataTable :value="seleksiyon_mekmar_uretimlist" tableStyle="width:100%;" v-model:filters="filters" filterDisplay="row" :paginator="true"
              :rows="20" dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
              @row-select="uretimSec($event)" class="p-datatable-sm" @filter="isFilters">
              <Column field="kasa_no" header="No" bodyStyle="text-align:left;" 
               style="width:4%;"
               :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
               
               >
                <template #body="slotProps">
                  <div :class="slotProps.data.disarda == true ? 'disarda_css' : ''">
                    {{ slotProps.data.kasa_no }}
                  </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" 
                    placeholder="Search by CrateNo" style="width:70px;" />
                </template>
              </Column>
        
              <Column field="tarih" header="Tarih" bodyStyle="text-align:left" 
                style="width:5%;"
               :showFilterMatchModes="false"
                :showClear="false"
                :showFilterMenu="false"
                :showClearButton="false"
               
               >
                <template #body="{ data }">
                  {{ data.tarih }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Date" style="width:70px;"/>
                </template>
              </Column>
              <Column field="kategori" header="Kategori" bodyStyle="text-align:left" 
              :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              style="width:5%;">
                <template #body="slotProps">
                  {{ slotProps.data.kategori }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Category" style="width:70px;" />
                </template>
              </Column>
              <Column field="ocak" header="Ocak" bodyStyle="text-align:left"
               style="width:4%;"
               :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
               
               >
                <template #body="slotProps">
                  {{ slotProps.data.ocak }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Mine" style="width:70px;" />
                </template>
              </Column>
              <Column field="urunadi" header="Ürün"
               bodyStyle="text-align:left" style="width:4%;"
               :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
               
               >
                <template #body="slotProps">
                  <div v-if="slotProps.data.urunadi.includes('Vein Cut')" style="color: red">
                    {{ slotProps.data.urunadi }}
                  </div>
                  <div v-else>
                    {{ slotProps.data.urunadi }}
                  </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Surface" style="width:70px;"/>
                </template>
                <template #footer>
                  {{ adet_kasa }}
                </template>
              </Column>
              <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left" 
              style="width:5%;"
              :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              
              
              >
                <template #body="slotProps">
                  {{ slotProps.data.kenarislem }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Surface" style="width:70px;"/>
                </template>
              </Column>
              <Column field="en" header="E" bodyStyle="text-align:left" style="width:4%;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.en }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Surface" style="width:70px;"/>
                </template>
              </Column>
              <Column field="boy" header="B" bodyStyle="text-align:left" style="width:4%;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.boy }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Surface" style="width:70px;"/>
                </template>
              </Column>
              <Column field="kenar" header="K" bodyStyle="text-align:left"  style="width:4%;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.kenar }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by Surface" style="width:70px;"/>
                </template>
              </Column>
              <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:left;" style="width:2%;">
                <template #body="slotProps">
                  {{ slotProps.data.kasaadet }}
                </template>

              </Column>
              <Column field="kutuadet" header="Kutu" bodyStyle="text-align:left" style="width:2%;">
                <template #body="slotProps">
                  {{ slotProps.data.kutuadet }}
                </template>
              </Column>
              <Column field="m2" header="M2" bodyStyle="text-align:left;" style="width:2%;">
                <template #body="slotProps">
                  <div style="width:30px;">
                  {{ slotProps.data.m2 }}

                  </div>
                </template>
                <template #footer>
                  {{ formatDecimal(toplam_m2) }}
                </template>
              </Column>
              <!-- <Column
                    field="adet"
                    header="Adet"
                    bodyStyle="text-align:center"
                    headerStyle="width:40px;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.adet }}
                    </template>
                    <template #footer>
                      {{ formatDecimal(toplam_adet) }}
                    </template>
                  </Column>
                  <Column
                    field="mt"
                    header="Mt"
                    bodyStyle="text-align:center"
                    headerStyle="width:40px;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.mt }}
                    </template>
                    <template #footer>
                      {{ formatDecimal(toplam_mt) }}
                    </template>
                  </Column>
                  <Column
                    field="ton"
                    header="Ton"
                    bodyStyle="text-align:center"
                    headerStyle="width:40px;"
                  >
                    <template #body="slotProps">
                      {{ slotProps.data.ton }}
                    </template>
                    <template #footer>
                      {{ formatDecimal(toplam_ton) }}
                    </template>
                  </Column> -->
              <Column field="kutu" header="Kutu" bodyStyle="text-align:left" style="width:1.4%;">
                <template #body="slotProps">
                  <div v-if="slotProps.data.kutu == true" style="flood-color;: black">
                    ✓
                  </div>
                  <div v-else style="color: black">X</div>
                </template>
              </Column>
              <Column field="bagli" header="Baglı" bodyStyle="text-align:left" style="width:1.4%;">
                <template #body="slotProps">
                  <div v-if="slotProps.data.bagli == true" style="color: black">
                    ✓
                  </div>
                  <div v-else style="color: black">X</div>
                </template>
              </Column>
              <Column field="siparisaciklama" header="Po" bodyStyle="text-align:left"  style="width:4%;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.siparisaciklama }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()"
                    class="p-column-filter" placeholder="Search by PO" style="width:70px;"/>
                </template>
              </Column>
              <Column field="aciklama" header="Not" bodyStyle="text-align:left"  style="width:4%;"
                :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.aciklama }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText style="width:70px;" type="text" v-model="filterModel.value" @input="filterCallback()"
                    class="p-column-filter" placeholder="Search by Description" />
                </template>
              </Column>
            </DataTable>
    </div>
    <div  v-else-if="slk_enb_dis">
      <DataTable :value="seleksiyon_dis_uretimlist.disUretim" :paginator="true" :rows="20" dataKey="id"
        selectionMode="single" :selection="select_uretim" ref="seleksiyon_data" @row-select="uretimSec($event)"
        v-model:filters="filters" filterDisplay="row" @filter="isFilters"
        class="p-datatable-sm">
        <Column field="kasa_no" header="No" bodyStyle="text-align:left"
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            <div :class="slotProps.data.disarda == true ? 'disarda_css' : ''">
              {{ slotProps.data.kasa_no }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
  
        <Column field="tarih" header="Tarih" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kategori" header="Kategori" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kategori }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="ocak" header="Ocak" bodyStyle="text-align:left"
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.ocak }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.tedarikci }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="urunadi" header="Ürün" bodyStyle="text-align:left"
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.urunadi.includes('Vein Cut')" style="color: red">
              {{ slotProps.data.urunadi }}
            </div>
            <div v-else>
              {{ slotProps.data.urunadi }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
          <template #footer>
            {{ seleksiyon_dis_uretimlist.slk_dis_kasa_top }}
          </template>
        </Column>
        <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left"
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenarislem }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="en" header="E" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="boy" header="B" bodyStyle="text-align:left"
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kenar" header="K" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.kasaadet }}
          </template>
        </Column>
        <Column field="kutuadet" header="Kutu" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.kutuadet }}
          </template>
        </Column>
        <Column field="m2" header="M2" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.m2 }}
          </template>
          <template #footer>
            {{ formatDecimal(toplam_m2) }}
          </template>
        </Column>
        <!-- <Column
              field="adet"
              header="Adet"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.adet }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_adet) }}
              </template>
            </Column>
            <Column
              field="mt"
              header="Mt"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.mt }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_mt) }}
              </template>
            </Column>
            <Column
              field="ton"
              header="Ton"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.ton }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_ton) }}
              </template>
            </Column> -->
        <Column field="kutu" header="Kutu" bodyStyle="text-align:left">
          <template #body="slotProps">
            <div v-if="slotProps.data.kutu == true" style="color:black">
              ✓
            </div>
            <div v-else style="color:black">X</div>
          </template>
        </Column>
        <Column field="bagli" header="Baglı" bodyStyle="text-align:left">
          <template #body="slotProps">
            <div v-if="slotProps.data.bagli == true" style="color:black">
              ✓
            </div>
            <div v-else style="color:black">X</div>
          </template>
        </Column>
        <Column field="siparisaciklama" header="Po" bodyStyle="text-align:left"
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.siparisaciklama }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="aciklama" header="Not" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.aciklama }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
      </DataTable>
    </div>
    <div  v-else-if="slk_enb_mekmer_dis">
      <DataTable :value="seleksiyon_mekmer_dis_uretimlist" v-model:filters="filters" filterDisplay="row" :paginator="true"
        :rows="20" dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
        @row-select="uretimSec($event)"  @filter="isFilters" class="p-datatable-sm">
        <Column field="kasa_no" header="No" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            <div :class="slotProps.data.disarda == true ? 'disarda_css' : ''">
              {{ slotProps.data.kasa_no }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
  
        <Column field="tarih" header="Tarih" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.tarih }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kategori" header="Kategori" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.kategori }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="ocak" header="Ocak" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.ocak }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" 
        :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        
        >
          <template #body="slotProps">
            {{ slotProps.data.tedarikci }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="urunadi" header="Ürün" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            <div v-if="slotProps.data.urunadi.includes('Vein Cut')" style="color: red">
              {{ slotProps.data.urunadi }}
            </div>
            <div v-else>
              {{ slotProps.data.urunadi }}
            </div>
          </template>
          <template #footer>
            {{ adet_kasa }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenarislem }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="en" header="E" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.en }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="boy" header="B" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.boy }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kenar" header="K" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.kenar }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.kasaadet }}
          </template>
        </Column>
        <Column field="kutuadet" header="Kutu" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.kutuadet }}
          </template>
        </Column>
        <Column field="m2" header="M2" bodyStyle="text-align:left">
          <template #body="slotProps">
            {{ slotProps.data.m2 }}
          </template>
          <template #footer>
            {{ formatDecimal(toplam_m2) }}
          </template>
        </Column>
        <!-- <Column
              field="adet"
              header="Adet"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.adet }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_adet) }}
              </template>
            </Column>
            <Column
              field="mt"
              header="Mt"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.mt }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_mt) }}
              </template>
            </Column>
            <Column
              field="ton"
              header="Ton"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.ton }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_ton) }}
              </template>
            </Column> -->
        <Column field="kutu" header="Kutu" bodyStyle="text-align:left">
          <template #body="slotProps">
            <div v-if="slotProps.data.kutu == true" style="color:black">
              ✓
            </div>
            <div v-else style="color:black">X</div>
          </template>
        </Column>
        <Column field="bagli" header="Baglı" bodyStyle="text-align:left">
          <template #body="slotProps">
            <div v-if="slotProps.data.bagli == true" style="color:black">
              ✓
            </div>
            <div v-else style="color:black">X</div>
          </template>
        </Column>
        <Column field="siparisaciklama" header="Po" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.siparisaciklama }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
        <Column field="aciklama" header="Not" bodyStyle="text-align:left" 
          :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
        >
          <template #body="slotProps">
            {{ slotProps.data.aciklama }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
              placeholder="Search by CrateNo" />
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else-if="slk_enb_bulunamadi">
        <DataTable :value="seleksiyon_mekmer_bulunamayan_uretimlist" v-model:filters="filters" filterDisplay="row" :paginator="true"
          :rows="20" dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
          @row-select="uretimSec($event)"  @filter="isFilters" class="p-datatable-sm">
          <Column field="kasa_no" header="No" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              <div :class="slotProps.data.disarda == true ? 'disarda_css' : ''">
                {{ slotProps.data.kasa_no }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
  
          <Column field="tarih" header="Tarih" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.tarih }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="kategori" header="Kategori" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kategori }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="ocak" header="Ocak" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.ocak }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.tedarikci }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="urunadi" header="Ürün" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              <div v-if="slotProps.data.urunadi.includes('Vein Cut')" style="color: red">
                {{ slotProps.data.urunadi }}
              </div>
              <div v-else>
                {{ slotProps.data.urunadi }}
              </div>
            </template>
            <template #footer>
              {{ adet_kasa }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kenarislem }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="en" header="E" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.en }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="boy" header="B" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.boy }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="kenar" header="K" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.kenar }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:left">
            <template #body="slotProps">
              {{ slotProps.data.kasaadet }}
            </template>
          </Column>
          <Column field="kutuadet" header="Kutu" bodyStyle="text-align:left">
            <template #body="slotProps">
              {{ slotProps.data.kutuadet }}
            </template>
          </Column>
          <Column field="m2" header="M2" bodyStyle="text-align:left" >
            <template #body="slotProps">
              {{ slotProps.data.m2 }}
            </template>
            <template #footer>
              {{ formatDecimal(toplam_m2) }}
            </template>
          </Column>
          <!-- <Column
              field="adet"
              header="Adet"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.adet }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_adet) }}
              </template>
            </Column>
            <Column
              field="mt"
              header="Mt"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.mt }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_mt) }}
              </template>
            </Column>
            <Column
              field="ton"
              header="Ton"
              bodyStyle="text-align:center"
              headerStyle="width:40px;"
            >
              <template #body="slotProps">
                {{ slotProps.data.ton }}
              </template>
              <template #footer>
                {{ formatDecimal(toplam_ton) }}
              </template>
            </Column> -->
          <Column field="kutu" header="Kutu" bodyStyle="text-align:left">
            <template #body="slotProps">
              <div v-if="slotProps.data.kutu == true" style="color:black">
                ✓
              </div>
              <div v-else style="color:black">X</div>
            </template>
          </Column>
          <Column field="bagli" header="Baglı" bodyStyle="text-align:left">
            <template #body="slotProps">
              <div v-if="slotProps.data.bagli == true" style="color:black">
                ✓
              </div>
              <div v-else style="color:black">X</div>
            </template>
          </Column>
          <Column field="siparisaciklama" header="Po" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisaciklama }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
          <Column field="aciklama" header="Not" bodyStyle="text-align:left" 
            :showFilterMatchModes="false"
                  :showClear="false"
                  :showFilterMenu="false"
                  :showClearButton="false"
          >
            <template #body="slotProps">
              {{ slotProps.data.aciklama }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                placeholder="Search by CrateNo" />
            </template>
          </Column>
        </DataTable>

    </div>

    
  <Dialog v-model:visible="is_uretimform" header="Seleksiyon Form" :modal="true" maximizable position="top">
  
    <div v-if="select_uretim">
      <UretimForm :kayitstatu="false" :kasano="select_uretim.kasa_no" @seleksiyon_form_kapat="is_uretimform = false" />
    </div>
  </Dialog>
  
  <Dialog v-model:visible="is_filterForm" header="Seleksiyon Form" :modal="true" maximizable position="top">
    <div class="grid">
      <div class="col">
            <DataTable :value="filterProducts" v-model:filters="filters3" filterDisplay="menu" :paginator="true" :rows="20"
              dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
              @filter="filter_data_change2($event)" @row-select="uretimSec($event)">
              <Column field="kasa_no" header="No" bodyStyle="text-align:center">
                <template #body="slotProps">
                  <div :class="slotProps.data.disarda == true ? 'disarda_css' : ''">
                    {{ slotProps.data.kasa_no }}
                  </div>
                </template>
              </Column>
            
              <Column field="tarih" header="Tarih" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.tarih }}
                </template>
              </Column>
              <Column field="kategori" header="Kategori" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.kategori }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="ocak" header="Ocak" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.ocak }}
                </template>
              </Column>
              <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left">
                <template #body="slotProps">
                  {{ slotProps.data.tedarikci }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="urunadi" header="Ürün">
                <template #body="slotProps">
                  <div v-if="slotProps.data.urunadi.includes('Vein Cut')" style="color: red">
                    {{ slotProps.data.urunadi }}
                  </div>
                  <div v-else>
                    {{ slotProps.data.urunadi }}
                  </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
                <template #footer>
                  {{ adet_kasa_a }}
                </template>
              </Column>
              <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left">
                <template #body="slotProps">
                  {{ slotProps.data.kenarislem }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="en" header="E" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.en }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="boy" header="B" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.boy }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="kenar" header="K" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.kenar }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.kasaadet }}
                </template>
              </Column>
              <Column field="kutuadet" header="Kutu" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.kutuadet }}
                </template>
              </Column>
              <Column field="m2" header="M2" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.m2 }}
                </template>
                <template #footer>
                  {{ formatDecimal(toplam_m2_a) }}
                </template>
              </Column>
              <Column field="adet" header="Adet" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.adet }}
                </template>
            
                <template #footer>
                  {{ formatDecimal(toplam_adet_a) }}
                </template>
              </Column>
              <Column field="mt" header="Mt" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.mt }}
                </template>
                <template #footer>
                  {{ formatDecimal(toplam_mt_a) }}
                </template>
              </Column>
              <Column field="ton" header="Ton" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.ton }}
                </template>
            
                <template #footer>
                  {{ formatDecimal(toplam_ton_a) }}
                </template>
              </Column>
              <Column field="kutu" header="Kutu" bodyStyle="text-align:center">
                <template #body="slotProps">
                  <div v-if="slotProps.data.kutu == true" style="backgroundcolor: greenyellow">
                    ✓
                  </div>
                  <div v-else style="backgroundcolor: red; color: white">X</div>
                </template>
              </Column>
              <Column field="bagli" header="Baglı" bodyStyle="text-align:center">
                <template #body="slotProps">
                  <div v-if="slotProps.data.bagli == true" style="backgroundcolor: greenyellow">
                    ✓
                  </div>
                  <div v-else style="backgroundcolor: red; color: white">X</div>
                </template>
              </Column>
              <Column field="siparisaciklama" header="Po" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.siparisaciklama }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
              <Column field="aciklama" header="Not" bodyStyle="text-align:center">
                <template #body="slotProps">
                  {{ slotProps.data.aciklama }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter"
                    placeholder="Search by" />
                </template>
              </Column>
            </DataTable>
      </div>
    </div>

  
  </Dialog>
</template>
<script>
import { mapGetters } from "vuex";
import UretimForm from "./UretimForm";
import socket from "@/service/SocketService";
import seleksiyonService from "@/service/SeleksiyonService";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    UretimForm,
  },
  created() {
    seleksiyonService.getUretimList().then((data) => {
      this.$store.dispatch("loadUretimList", data);
    });
    const genislik = window.innerWidth;
    if (genislik < 600) {
      this.isDesktop = false;
    }

    this.toplam_guncelle();

    socket.siparis.on("seleksiyon_yenikayit_emit", (data) => {
      this.$store.dispatch("seleksiyon_yenikayit_act", data);
      this.toplam_guncelle();
    });

    socket.siparis.on("seleksiyon_kayitguncelle_emit", (data) => {
      this.$store.dispatch("seleksiyon_guncelle_act", data);
      this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar
        ? this.seleksiyon_dis_uretimlist
        : this.seleksiyon_mekmar_uretimlist;
      this.toplam_guncelle();
    });

    socket.siparis.on("seleksiyon_kayitsil_emit", (kasa_id) => {
      this.$store.dispatch("seleksiyon_kayitsil_act", kasa_id);
      this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar
        ? this.seleksiyon_dis_uretimlist
        : this.seleksiyon_mekmar_uretimlist;
      this.toplam_guncelle();
    });

    socket.siparis.on("seleksiyon_coklukayit_emit", (kasa_list) => {
      this.$store.dispatch("seleksiyon_coklukayit_act", kasa_list);
      this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar
        ? this.seleksiyon_dis_uretimlist
        : this.seleksiyon_mekmar_uretimlist;

      this.toplam_guncelle();
    });
  },

  computed: {
    ...mapGetters([
      "seleksiyon_uretimlist",
      "seleksiyon_mekmar_uretimlist",
      "seleksiyon_dis_uretimlist",
      "seleksiyon_mekmer_dis_uretimlist",
      "seleksiyon_mekmer_bulunamayan_uretimlist",
      "slk_enb_mekmar",
      "slk_enb_dis",
      "slk_enb_mekmer_dis",
      "slk_enb_bulunamadi",
      "seleksiyon_dis_top_kasa",
    ]),

    sort_seleksiyon_uretimlist() {
      return this.liste(this.seleksiyon_uretimlist);
    },
  },
  data() {
    return {
      isProductNew: false,
      isDesktop: true,
      filters: {
        tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kasa_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ocak: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.EQUALS },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenarislem: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        siparisaciklama: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      filters3: {
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tedarikci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kenarislem: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisaciklama: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      select_uretim: null,
      is_mekmar: true,
      is_uretimform: false,
      toplam_m2: 0,
      toplam_mt: 0,
      toplam_adet: 0,
      toplam_ton: 0,
      adet_kasa: 0,

      toplam_m2_a: 0,
      toplam_mt_a: 0,
      toplam_adet_a: 0,
      toplam_ton_a: 0,
      adet_kasa_a: 0,

      short_data: [],
      activeColor: "black",
      urn_adi: "Vein Cut",
      urn_adi2: "Silver Com",
      selectedUrun: null,
      is_filterForm: false,
      filterProducts: [],
      urunler: [
        { name: "Classic Vein Cut" },
        { name: "Silver Vein Cut" },
        { name: "Mina Rustic Vein Cut " },
        { name: "Classic Light" },
        { name: "Classic Mina" },
        { name: "Desert Silver" },
        { name: "Ela" },
        { name: "Emerald Beige" },
        { name: "Emerald Light" },
        { name: "Gold" },
        { name: "Gold Vein Cut" },
        { name: "Golden Ink" },
        { name: "Golden Ink Vein Cut" },
        { name: "Ivory Rustic" },
        { name: "Latte" },
        { name: "Medium" },
        { name: "Medium Com" },
        { name: "Mina Rustic" },
        { name: "Mix" },
        { name: "Noche" },
        { name: "Noche Com" },
        { name: "Noche Vein Com" },
        { name: "Noche Vein Cut" },
        { name: "Onyx" },
        { name: "Pablo" },
        { name: "Pablo Vein Cut" },
        { name: "Picasso Ivory" },
        { name: "Romano" },
        { name: "Safir Hrktl" },
        { name: "Scabos" },
        { name: "Scott Rustic" },
        { name: "Silver Com" },
        { name: "Silver Com Vein Cut" },
        { name: "Silver Corner" },
        { name: "Silver Dark Vein Cut" },
        { name: "Silver Grey" },
        { name: "Silver Picasso" },
        { name: "Silver Rustic" },
        { name: "Silver Rustic Vein Cut" },
        { name: "Storm Noche" },
        { name: "Storm Noche Kristalli" },
        { name: "Storm Noche Vein Cut" },
        { name: "Thula Mix" },
        { name: "Tuscany Mix" },
        { name: "Valencia" },
        { name: "Volcano" },
        { name: "Volcano Mix" },
        { name: "Volcano Vein Cut" },
        { name: "Walnut Mix" },
        { name: "Walnut Vein Cut" },
        { name: "Classic Cubic" },
        { name: "Classic Panel" },
        { name: "Classic Vein Cut 3D" },
        { name: "Gold Beige Panel" },
        { name: "Gold Classic" },
        { name: "Ivory" },
        { name: "Noche Beige Corner" },
        { name: "Noche Beige Panel" },
        { name: "Noche Panel" },
        { name: "Philadelphia Panel" },
        { name: "Red" },
        { name: "Rustic" },
        { name: "Silver Cubic Mix" },
        { name: "Sultana" },
      ],
    };
  },
  mounted() {},
  methods: {

    
    isFilters(event) {
      this.toplam_islem(event.filteredValue);
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isSelected() {
      this.filterProducts = [];
      this.is_filterForm = true;
      for (var i in this.seleksiyon_mekmar_uretimlist) {
        if (this.selectedUrun.name == "Classic Vein Cut") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Cream Vein Cut"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Classic Mina") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Beige" ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Classic" ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Denizli Beige" ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Mina"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Classic Light") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Cream" ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Onyx"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Ela") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Elia"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Gold Vein Cut") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Yellow Vein Cut"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Picasso Ivory") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Picasso"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Silver Grey") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi == "Silver"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else if (this.selectedUrun.name == "Silver Rustic Vein Cut") {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              this.selectedUrun.name ||
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
              "Silver Com Vein Cut"
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        } else {
          if (
            this.seleksiyon_mekmar_uretimlist[i].urunadi ==
            this.selectedUrun.name
          ) {
            this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i]);
          }
        }
      }
      this.toplam_islem_ayrinti(this.filterProducts);
    },
    sort_list(liste) {
      return liste.sort((a, b) => {
        return a.kasano - b.kasano;
      });
    },
    uretimSec(event) {
      this.$store.dispatch('fullscreenLoadingAct', true)

      this.select_uretim = event.data;

      this.$store.dispatch("seleksiyonSelectItemActions");
      this.is_uretimform = true;
    },

    toplam_islem(liste) {
      this.toplam_m2 = 0;
      this.toplam_mt = 0;
      this.toplam_adet = 0;
      this.toplam_ton = 0;
      this.adet_kasa = liste.length;

      for (let key in liste) {
        const item = liste[key];
        this.toplam_m2 = this.toplam_m2 + item.m2;

        this.toplam_adet += item.adet;
        this.toplam_mt += item.mt;
        this.toplam_ton += item.ton;
      }
    },
    toplam_islem_ayrinti(liste) {
      this.toplam_m2_a = 0;
      this.toplam_mt_a = 0;
      this.toplam_adet_a = 0;
      this.toplam_ton_a = 0;
      this.adet_kasa_a = liste.length;

      for (let key in liste) {
        const item = liste[key];
        this.toplam_m2_a = this.toplam_m2_a + item.m2;

        this.toplam_adet_a += item.adet;
        this.toplam_mt_a += item.mt;
        this.toplam_ton_a += item.ton;
      }
    },

    filter_data_change(event) {
      this.$store.dispatch("filter_seleksiyon_list_load", event.filterValue);
      this.toplam_islem(event.filterValue);
      return 1;
    },
    filter_data_change2(event) {
      this.$store.dispatch("filter_seleksiyon_list_load", event.filteredValue);
      this.toplam_islem_ayrinti(event.filteredValue);
      return 1;
    },

    toplam_guncelle() {
      const data = !this.slk_enb_mekmar
        ? this.seleksiyon_dis_uretimlist
        : this.seleksiyon_mekmar_uretimlist;

      this.toplam_islem(data);
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 10px;
}
.disarda_css {
  background-color: #f0ffff;
  color: #1434a4;
}
.urunSecmeBolumu {
  margin-left: 11px;
}
.urunSecmeDropdown {
  width: 200px;
}

.inputTextArama {
  margin-left: 82.5%;
  margin-top: 0%;
}
</style>
