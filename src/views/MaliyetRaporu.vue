<template>
  <section>
    <div>
      <div class="columns is-multiline is-centered">
        <div class="column is-2">
          <Dropdown
            v-model="select_yil"
            :disabled="is_general_form"
            @change="yil_degisim_event"
            :options="yil_listesi"
            optionLabel="yil"
            placeholder="Select a Year"
          />
        </div>
        <div class="column is-2">
          <Dropdown
            v-model="select_ay"
            :disabled="is_general_form"
            @change="ay_degisim_event"
            :options="ay_listesi"
            optionLabel="ay_str"
            placeholder="Select a Month"
          />
        </div>
        <div class="column is-2">
          <Dropdown
            v-model="select_faturalama"
            :disabled="is_general_form"
            @change="fatura_degisim_event"
            :options="faturalamaList"
            optionLabel="fatura"
            placeholder="Select a Invoicing"
          />
        </div>
        <div class="column is-2" style="margin-top: 5px">
          <Checkbox
            @input="hepsi_input_event"
            v-model="is_hepsi"
            :binary="true"
          /><span style="margin-left: 5px">Hepsi</span>
        </div>
        <div class="column is-2">
          <Dropdown
            v-model="selected_quarter"
            :disabled="is_quarter_dropdown"
            @change="quarter_year_change"
            :options="quarter_year"
            optionLabel="quarter"
            placeholder="Select a Quarter"
          />
        </div>

        <div class="column is-2">
          <Button
            class="p-button-success"
            @click="excel_cikti_click"
            label="Excel"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">

        </div>
        <div class="column is-4">
        
        </div>
        <div class="column is-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Profit TRY</th>
                <th scope="col">Profit USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row" v-if="toplam_try_profit <= 0">
                  {{ 0 }}
                </td>
                <td scope="row" v-else>
                  {{ formatTL(toplam_try_profit) }}
                </td>
                <td scope="row">
                  {{ formatPrice(toplam_kar_zarar) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <DataTable
            v-if="quarter_maliyet_form"
            v-model:filters="filters"
            filterDisplay="menu"
            :value="quarterMaliyet"
            :loading="$store.getters.datatableLoading"
            :scrollable="true"
            scrollHeight="400px"
            dataKey="id"
            selectionMode="single"
            v-model:selection="select_maliyet"
            @row-select="maliyet_row_select($event)"
            @filter="filter_data_change($event)"
            :resizableColumns="true" 
            columnResizeMode="expand" 
            showGridlines
          >
            <template #header>
              <div class="columns is-multiline">    
                <div class="column is-12">
                  <span style="font-size: 15px">AYO RAPORU </span>
                </div>
              </div>
            </template>

            <Column
              field="siparisci"
              header="Satışçı"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparisci }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="operasyon"
              header="Operasyon"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.operasyon }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="siparis_no"
              header="Po"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                <div
                  :style="{ backgroundColor: slotProps.data.alisFiyatiKontrol }"
                >
                  {{ slotProps.data.siparis_no }}
                </div>
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="marketing"
              header="Marketing"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.marketing }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="faturatur"
              header="Faturalama"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.faturatur }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="siparis_tarihi"
              header="Order Date"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparis_tarihi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="yukleme_tarihi"
              header="Ship Date"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.yukleme_tarihi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="musteri_adi"
              header="Customer"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.musteri_adi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="ulke_adi"
              header="Client Origin"
              bodyStyle="text-align:left"
            >
              <template #body="slotProps">
                {{ slotProps.data.ulke_adi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="teslim_sekli"
              header="Sale"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.teslim_sekli }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="toplam_bedel"
              header="Invoiced"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.toplam_bedel) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_toplam_bedel) }}
              </template>
            </Column>
            <Column
              field="mekmar_alim"
              header="Mekmer Ü."
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekmar_alim > 0 &&
                      slotProps.data.mekmar_alim_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekmar_alim) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_mekmar_alim) }}
              </template>
            </Column>
            <Column
              field="mekmoz_alim"
              header="Mek-Moz Ü."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekmoz_alim > 0 &&
                      slotProps.data.mekmoz_alim_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekmoz_alim) }}
                </div>
              </template>

              <template #footer>
                {{ formatPrice(toplam_mekmoz_alim) }}
              </template>
            </Column>
            <Column
              field="dis_alim"
              header="Dış Alım"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      (slotProps.data.dis_alim > 0 &&
                        slotProps.data.dis_alim_tedarikci_sayisi !=
                          slotProps.data.tedarikci_sayisi) ||
                      slotProps.data.dis_alim_fatura_sayisi !=
                        slotProps.data.tedarikci_sayisi
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.dis_alim) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_dis_alim) }}
              </template>
            </Column>
            <Column
              field="nakliye"
              header="Nakliye"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.nakliye_evrak.length == 0 &&
                      slotProps.data.nakliye > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.nakliye) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_nakliye) }}
              </template>
            </Column>
            <Column
              field="gumruk"
              header="Gümrük"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.gumruk_evrak.length == 0 &&
                      slotProps.data.gumruk > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.gumruk) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_gumruk) }}
              </template>
            </Column>
            <Column
              field="ilaclama"
              header="İlaçlama"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.ilaclama_evrak.length == 0 &&
                      slotProps.data.ilaclama > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.ilaclama) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_ilaclama) }}
              </template>
            </Column>
            <Column
              field="liman"
              header="Liman"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.liman_evrak.length == 0 &&
                      slotProps.data.liman > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.liman) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_liman) }}
              </template>
            </Column>
            <Column field="lashing" header="Lashing" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.lashing_evrak.length == 0 &&
                    slotProps.data.lashing > 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.lashing) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_lashing) }}
              </template>
            </Column>
            <Column field="booking" header="Booking" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.booking_evrak.length == 0 &&
                    slotProps.data.booking > 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.booking) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_booking) }}
              </template>
            </Column>
            <Column field="spazlet" header="Spazlet" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.spazlet_evrak.length == 0 &&
                      slotProps.data.spazlet > 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.spazlet) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_spazlet) }}
              </template>
            </Column>
            <Column
              field="sigorta"
              header="Sigorta"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.sigorta_id == 1 &&
                      slotProps.data.sigorta == 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.sigorta) }}
                </div>
              </template>
            </Column>
            <Column
              field="navlun"
              header="Navlun"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.navlun > 0 &&
                      slotProps.data.navlun_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.navlun) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_navlun) }}
              </template>
            </Column>
            <Column
              field="detay_1"
              header="Diğer 1"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_1) }}
                </div>
              </template>
            </Column>
            <Column
              field="detay_2"
              header="Diğer 2"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_2) }}
                </div>
              </template>
            </Column>
            <Column
              field="detay_3"
              header="Diğer 3"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_3) }}
                </div>
              </template>
            </Column>
            <Column
              field="mekus_masraf"
              header="Mekus M."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekus_id == 1 ? '#ADFF2F' : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekus_masraf) }}
                </div>
              </template>
            </Column>

            <Column
              field="pazarlama"
              header="Pazarlama"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.pazarlama) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_pazarlama) }}
              </template>
            </Column>
            <Column
              field="ozel_iscilik"
              header="Özel İşçilik"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.ozel_iscilik > 0 &&
                      slotProps.data.ozel_iscilik_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.ozel_iscilik) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_ozel_iscilik) }}
              </template>
            </Column>
            <Column
              field="banka_masrafi"
              header="Banka M."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.banka_masrafi) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_banka_masrafi) }}
              </template>
            </Column>
            <Column
              field="kurye_masrafi"
              header="Kurye"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.kurye_masrafi) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_kurye_masrafi) }}
              </template>
            </Column>
            <Column
              field="masraf_toplam"
              header="Total in"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.masraf_toplam) }}
              </template>
            </Column>
            <Column
              field="kar_zarar"
              header="Profit / USD"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.kar_zarar) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_kar_zarar) }}
              </template>
            </Column>
            <Column
              header="Profit / TRY"
              field="kar_zarar_tl"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.kar_zarar_tl) }}
              </template>
              <template #footer>
                {{ formatTL(toplam_try_profit) }}
              </template>
            </Column>
            <Column field="kar_zarar_tl_yuzdesi" header="Kar Zarar(%)">
              <template #body="slotProps">
                % {{ slotProps.data.kar_zarar_tl_yuzdesi }}
              </template>
              <template #footer>
                % {{ toplam_kar_zarar_orani }}
              </template>
            </Column>
            <Column
              field="dosya_kapanma_date"
              header="Kapanma T."
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.dosya_kapanma_date }}
              </template>
            </Column>
          </DataTable>
          <DataTable
            v-else
            v-model:filters="filters"
            filterDisplay="menu"
            :value="isFilteredFaturalama ? filteredFaturalama : maliyet_listesi"
            :loading="$store.getters.datatableLoading"
            :scrollable="true"
            scrollHeight="400px"
            dataKey="id"
            selectionMode="single"
            v-model:selection="select_maliyet"
            @row-select="maliyet_row_select($event)"
            @filter="filter_data_change($event)"
            :resizableColumns="true" 
            columnResizeMode="expand" 
            showGridlines
          >
            <template #header>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <span style="font-size: 15px">AYO RAPORU </span>
                </div>
              </div>
            </template>

            <Column
              field="siparisci"
              header="Satışçı"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparisci }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="operasyon"
              header="Operasyon"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.operasyon }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="siparis_no"
              header="Po"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{ backgroundColor: slotProps.data.alisFiyatiKontrol }"
                >
                  {{ slotProps.data.siparis_no }}
                </div>
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="marketing"
              header="Marketing"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.marketing }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="faturatur"
              header="Faturalama"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.faturatur }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="siparis_tarihi"
              header="Order Date"
              headerStyle="width:75px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.siparis_tarihi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="yukleme_tarihi"
              header="Ship Date"
              headerStyle="width:75px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.yukleme_tarihi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="musteri_adi"
              header="Customer"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.musteri_adi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>

            <Column
              field="ulke_adi"
              header="Client Origin"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.ulke_adi }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="teslim_sekli"
              header="Sale"
              headerStyle="width:60px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.teslim_sekli }}
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @input="filterCallback()"
                  class="p-column-filter"
                  :placeholder="`Search by name - `"
                  v-tooltip.top.focus="'Hit enter key to filter'"
                />
              </template>
            </Column>
            <Column
              field="toplam_bedel"
              header="Invoiced"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.toplam_bedel) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_toplam_bedel) }}
              </template>
            </Column>
            <Column
              field="mekmar_alim"
              header="Mekmer Ü."
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekmar_alim > 0 &&
                      slotProps.data.mekmar_alim_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekmar_alim) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_mekmar_alim) }}
              </template>
            </Column>
            <Column
              field="mekmoz_alim"
              header="Mek-Moz Ü."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekmoz_alim > 0 &&
                      slotProps.data.mekmoz_alim_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekmoz_alim) }}
                </div>
              </template>

              <template #footer>
                {{ formatPrice(toplam_mekmoz_alim) }}
              </template>
            </Column>
            <Column
              field="dis_alim"
              header="Dış Alım"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      (slotProps.data.dis_alim > 0 &&
                        slotProps.data.dis_alim_tedarikci_sayisi !=
                          slotProps.data.tedarikci_sayisi) ||
                      slotProps.data.dis_alim_fatura_sayisi !=
                        slotProps.data.tedarikci_sayisi
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.dis_alim) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_dis_alim) }}
              </template>
            </Column>
            <Column
              field="nakliye"
              header="Nakliye"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.nakliye_evrak.length == 0 &&
                      slotProps.data.nakliye > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.nakliye) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_nakliye) }}
              </template>
            </Column>
            <Column
              field="gumruk"
              header="Gümrük"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.gumruk_evrak.length == 0 &&
                      slotProps.data.gumruk > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.gumruk) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_gumruk) }}
              </template>
            </Column>
            <Column
              field="ilaclama"
              header="İlaçlama"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.ilaclama_evrak.length == 0 &&
                      slotProps.data.ilaclama > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.ilaclama) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_ilaclama) }}
              </template>
            </Column>
            <Column
              field="liman"
              header="Liman"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.liman_evrak.length == 0 &&
                      slotProps.data.liman > 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.liman) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_liman) }}
              </template>
            </Column>
            <Column
              field="sigorta"
              header="Sigorta"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.sigorta_id == 1 &&
                      slotProps.data.sigorta == 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.sigorta) }}
                </div>
              </template>
            </Column>
            <Column
              field="navlun"
              header="Navlun"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.navlun > 0 &&
                      slotProps.data.navlun_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.navlun) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_navlun) }}
              </template>
            </Column>
            <Column field="lashing" header="Lashing" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.lashing > 0 &&
                    slotProps.data.lashing_evrak.length <= 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.lashing) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_lashing) }}
              </template>
            </Column>
            <Column field="booking" header="Booking" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.booking > 0 &&
                    slotProps.data.booking_evrak.length <= 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.booking) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_booking) }}
              </template>
            </Column>
            <Column field="spazlet" header="Spazlet" headerStyle="width:70px" bodyStyle="text-align:center">
              <template #body="slotProps">
                <div :style="{
                  'background-color':
                    slotProps.data.spazlet > 0 &&
                    slotProps.data.spazlet_evrak.length <= 0
                      ? '#F1948A'
                      : '',
                }">
                  {{ formatPrice(slotProps.data.spazlet) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_spazlet) }}
              </template>
            </Column>
            <Column
              field="detay_1"
              header="Diğer 1"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_1) }}
                </div>
              </template>
            </Column>
            <Column
              field="detay_2"
              header="Diğer 2"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_2) }}
                </div>
              </template>
            </Column>
            <Column
              field="detay_3"
              header="Diğer 3"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div>
                  {{ formatPrice(slotProps.data.detay_3) }}
                </div>
              </template>
            </Column>
            <Column
              field="mekus_masraf"
              header="Mekus M."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.mekus_id == 1 ? '#ADFF2F' : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.mekus_masraf) }}
                </div>
              </template>
            </Column>

            <Column
              field="pazarlama"
              header="Pazarlama"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.pazarlama) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_pazarlama) }}
              </template>
            </Column>
            <Column
              field="ozel_iscilik"
              header="Özel İşçilik"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                <div
                  :style="{
                    'background-color':
                      slotProps.data.ozel_iscilik > 0 &&
                      slotProps.data.ozel_iscilik_evrak.length <= 0
                        ? '#F1948A'
                        : '',
                  }"
                >
                  {{ formatPrice(slotProps.data.ozel_iscilik) }}
                </div>
              </template>
              <template #footer>
                {{ formatPrice(toplam_ozel_iscilik) }}
              </template>
            </Column>
            <Column
              field="banka_masrafi"
              header="Banka M."
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.banka_masrafi) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_banka_masrafi) }}
              </template>
            </Column>
            <Column
              field="kurye_masrafi"
              header="Kurye"
              headerStyle="width:70px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.kurye_masrafi) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_kurye_masrafi) }}
              </template>
            </Column>
            <Column
              field="masraf_toplam"
              header="Total in"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.masraf_toplam) }}
              </template>
            </Column>
            <Column
              field="kar_zarar"
              header="Profit / USD"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatPrice(slotProps.data.kar_zarar) }}
              </template>
              <template #footer>
                {{ formatPrice(toplam_kar_zarar) }}
              </template>
            </Column>
            <Column
              field="kar_zarar_tl"
              header="Profit / TRY"
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ formatTL(slotProps.data.kar_zarar_tl) }}
              </template>
              <template #footer>
                <div>
                  {{ formatTL(toplam_try_profit) }}
                </div>
              </template>
            </Column>
            <Column field="kar_zarar_tl_yuzdesi" header="Kar Zarar(%)">
              <template #body="slotProps">
                % {{ slotProps.data.kar_zarar_tl_yuzdesi }}
              </template>
              <template #footer>
                % {{ toplam_kar_zarar_orani }}
              </template>
            </Column>

            <Column
              field="dosya_kapanma_date"
              header="Kapanma T."
              headerStyle="width:80px"
              bodyStyle="text-align:center"
            >
              <template #body="slotProps">
                {{ slotProps.data.dosya_kapanma_date }}
              </template>
            </Column>
          </DataTable>
        </div>
        <Dialog
          v-model:visible="is_maliyet_form"
          :header="maliyet_form_baslik"
          :modal="true"
          maximizable
          position="top"
          :breakpoints="{'960px': '75vw', '640px': '100vw'}" 
          :style="{width: '100%'}"
        >
              <MaliyetAyrinti />

        </Dialog>
      </div>
      
    </div>
  </section>
</template>
<script>
import service from "../service/RaporService";
import { mapGetters } from "vuex";
import MaliyetAyrinti from "../components/maliyetraporlari/MaliyetAyrinti";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    MaliyetAyrinti, //maliyet ayrintiya git (yeni sayfa)
  },
  data() {
    return {
      kar_toplam_guncelle: {
        toplam_bedel_sum: 0,
        toplam_masraflar_sum: 0,
        odenen_usd_tutar_sum: 0,
        odenen_try_tutar_sum: 0,
        kar_zarar_usd_sum: 0,
        kar_zarar_try_sum: 0,
        kar_zarar_orani_sum:0
      },

      maliyet_listesi_kar:[],
      selected_quarter:null,
      maliyet_listesi_excel: [],
      is_quarter_dropdown: true,
      quarter_year: [
        { id: 1, quarter: "Hepsi" },
        { id: 2, quarter: "1. Çeyrek" },
        { id: 3, quarter: "2. Çeyrek" },
        { id: 4, quarter: "3. Çeyrek" },
        { id: 5, quarter: "4. Çeyrek" },
      ],
      maliyet_listesi: null,
      maliyet_yil_listesi: null,
      local_maliyet_data: null,
      filters: {
        siparisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        faturatur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparis_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        yukleme_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ulke_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        teslim_sekli: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      loading: false,
      ay_giris: null,
      yil_giris: null,
      yil_listesi: null,
      ay_listesi: null,
      faturalamaList: [
        { fatura: "Hepsi" },
        { fatura: "Mekmar" },
        { fatura: "Mekmer" },
        { fatura: "Efes" },
      ],

      select_yil: 0,
      select_ay: 0,
      select_aystr: "",
      select_faturalama: { fatura: "Hepsi" },
      toplam_toplam_bedel: 0,
      toplam_alim: 0,
      toplam_mekmoz_alim: 0,
      toplam_dis_alim: 0,
      toplam_nakliye: 0,
      toplam_gumruk: 0,
      toplam_ilaclama: 0,
      toplam_liman: 0,
      toplam_booking: 0,
      toplam_lashing: 0,
      toplam_spazlet: 0,
      toplam_navlun: 0,
      toplam_pazarlama: 0,
      toplam_banka_masrafi: 0,
      toplam_kurye_masrafi: 0,
      toplam_kar_zarar: 0,
      toplam_kar_zarar_tl: 0,
      toplam_mekmar_alim: 0,
      select_maliyet: null,
      is_maliyet_form: false,
      maliyet_form_baslik: "",
      toplam_diger_masraflar: 0,
      toplam_ozel_iscilik: 0,
      is_hepsi: false,
      toplam_try_profit: 0,
      isFilteredFaturalama: false,
      quarterMaliyet: null,
      quarter_maliyet_form: false,
      is_general_form: false,
      toplam_bedel_sum: 0,
      toplam_masraf_sum: 0,
      toplam_kar_zarar_orani:0
    };
  },
  computed: {
    ...mapGetters([
      "servis_adres", //alici adresi
    ]),
  },
  created() {
    this.$store.dispatch("loadingBeginAct");
    service.getMaliyetYilListesi().then((yil_list) => {
      this.yil_listesi = yil_list;
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth()
      this.is_hepsi = false;
      this.select_yil = this.yil_listesi.find((x) => x.yil == year);
      service.getMaliyetAyListesi(this.select_yil.yil).then((ay_list) => {
        this.ay_listesi = ay_list;

        this.select_ay = ay_list.find((x) => x.ay == month );

        this.maliyet_listesi_yukle();
      });
    });


  },
  methods: {
    quarter_year_change(event) {
      event = event.value.quarter;
      if (event == "1. Çeyrek") {
        this.quarterMaliyet = this.maliyet_listesi.filter(
          (x) => x.yukleme_month >= 1 && x.yukleme_month <= 3
        );
        this.toplam_kar_zar_orani(this.quarterMaliyet)
        this.tablo_toplam_guncelle(this.quarterMaliyet);
        this.maliyet_listesi_excel = this.quarterMaliyet;

        this.quarter_maliyet_form = true;
      } else if (event == "2. Çeyrek") {
        this.quarterMaliyet = this.maliyet_listesi.filter(
          (x) => x.yukleme_month >= 4 && x.yukleme_month <= 6
        );
        this.toplam_kar_zar_orani(this.quarterMaliyet)

        this.tablo_toplam_guncelle(this.quarterMaliyet);
        this.maliyet_listesi_excel = this.quarterMaliyet;

        this.quarter_maliyet_form = true;
      } else if (event == "3. Çeyrek") {
        this.quarterMaliyet = this.maliyet_listesi.filter(
          (x) => x.yukleme_month >= 7 && x.yukleme_month <= 9
        );
        this.toplam_kar_zar_orani(this.quarterMaliyet)

        this.tablo_toplam_guncelle(this.quarterMaliyet);
        this.maliyet_listesi_excel = this.quarterMaliyet;

        this.quarter_maliyet_form = true;
      } else if (event == "4. Çeyrek") {
        this.quarterMaliyet = this.maliyet_listesi.filter(
          (x) => x.yukleme_month >= 10 && x.yukleme_month <= 12
        );
        this.toplam_kar_zar_orani(this.quarterMaliyet)

        this.tablo_toplam_guncelle(this.quarterMaliyet);
        this.maliyet_listesi_excel = this.quarterMaliyet;

        this.quarter_maliyet_form = true;
      } else if (event == "Hepsi") {
        this.quarterMaliyet = this.maliyet_listesi;
        this.tablo_toplam_guncelle(this.quarterMaliyet);
        this.toplam_kar_zar_orani(this.quarterMaliyet)

        this.maliyet_listesi_excel = this.quarterMaliyet;

        this.quarter_maliyet_form = true;
      }
    },
    filter_data_change(event) {
      //console.log(this.short_data.sort((a, b) => a.urunadi - b.name ))

      this.tablo_toplam_guncelle(event.filteredValue);
      this.maliyet_listesi_excel = event.filteredValue;
      this.toplam_kar_zar_orani(event.filteredValue)


      return 1;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatTL(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    excel_cikti_click() {
      service
        .getMaliyetExcelCikti(this.maliyet_listesi_excel)
        .then((response) => {
          if (response.status) {
            this.musteri_loading = true;
            const link = document.createElement("a");
            link.href =
              this.servis_adres + "maliyet/dosyalar/maliyetRaporExcelListe";

            link.setAttribute("download", "ayo_maliyet_listesi.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        });
    },
    toplam_kar_zar_orani(data) {
      this.toplam_bedel_sum = 0
      this.toplam_masraf_sum = 0
      for (let i of data) {
        this.toplam_bedel_sum += i.toplam_bedel
        this.toplam_masraf_sum += i.masraf_toplam
      }
      let toplam_kar_zarar = (this.toplam_bedel_sum - this.toplam_masraf_sum)
      this.toplam_kar_zarar_orani = ((toplam_kar_zarar / this.toplam_bedel_sum) * 100).toFixed(2)
    },
    toplam_kar_zar_orani_kar(data) {
      this.kar_zarar_orani_kar.toplam_bedel_sum = 0
      this.kar_zarar_orani_kar.toplam_masraf_sum = 0
      for (let i of data) {
        this.kar_zarar_orani_kar.toplam_bedel_sum += i.toplam_bedel
        this.kar_zarar_orani_kar.toplam_masraf_sum += i.masraf_toplam
      }
      let toplam_kar_zarar = (this.kar_zarar_orani_kar.toplam_bedel_sum - this.kar_zarar_orani_kar.toplam_masraf_sum)
      this.kar_zarar_orani_kar.toplam_kar_zarar_orani = ((toplam_kar_zarar / this.kar_zarar_orani_kar.toplam_bedel_sum) * 100).toFixed(2)
    },
    maliyet_listesi_yukle() {
      this.select_faturalama = { fatura: "Hepsi" };
      this.$store.dispatch("datatableLoadingBeginAct");
      console.log(this.select_ay)
      service
        .getMaliyetRapor(this.select_yil.yil, this.select_ay.ay)
        .then((data) => {
          
          this.toplam_kar_zar_orani(data)
          this.maliyet_listesi = [...data];
          this.local_maliyet_data = [...data];
          this.maliyet_listesi_excel = data;
          this.tablo_toplam_guncelle(data);
          this.$store.dispatch("datatableLoadingEndAct");

          this.$store.dispatch("loadingEndAct");
        });
      
    },
    maliyet_yil_listesi_yukle(event) {
      this.isFilteredFaturalama = false;
      this.$store.dispatch("datatableLoadingBeginAct");

      if (!this.maliyet_yil_listesi) {
        service.getMaliyetRaporYil(event).then((data) => {
          this.toplam_kar_zar_orani(data)
          this.maliyet_listesi = data;
          this.maliyet_listesi_excel = data;
          this.tablo_toplam_guncelle(data);
          this.is_quarter_dropdown = false;
          this.$store.dispatch("datatableLoadingEndAct");
        });
      } else {
        this.maliyet_listesi = null;
        this.maliyet_listesi = this.maliyet_yil_listesi;
        this.tablo_toplam_guncelle();
        this.maliyet_listesi_excel = data;
        this.$store.dispatch("datatableLoadingEndAct");
      }
    },
    yil_degisim_event() {
      this.isFilteredFaturalama = false;
      /* service.getMaliyetYilListesi().then(data => {

                this.yil_listesi = data
                this.select_yil = data[0].yil
                this.ay_listesi_yukle()
            })*/

      this.is_hepsi = false;
      this.ay_listesi_yukle();
    },
    ay_listesi_yukle() {
      this.isFilteredFaturalama = false;
      service.getMaliyetAyListesi(this.select_yil.yil).then((data) => {
        this.ay_listesi = data;
        this.select_ay = data.find(x=>x.id == this.select_ay.id)
        this.maliyet_listesi_yukle();
      });
    },
    ay_degisim_event() {
      this.isFilteredFaturalama = false;
      //   this.select_ay = this.ay_listesi.find(
      //       (x) => x.ay_str == this.select_aystr.ay_str
      //   );
      this.is_hepsi = false;
      this.maliyet_listesi_yukle();
    },
    fatura_degisim_event(event) {
      event = event.value.fatura;
      if (event == "Hepsi") {
        this.isFilteredFaturalama = false;
        this.maliyet_listesi_yukle();
      } else if (event == "Mekmar") {
        this.isFilteredFaturalama = true;
        this.filteredFaturalama = this.maliyet_listesi.filter(
          (x) => x.faturatur == "Mekmar"
        );
        this.toplam_kar_zar_orani(this.filteredFaturalama)
        this.maliyet_listesi_excel = this.filteredFaturalama;
        this.local_maliyet_data = this.filteredFaturalama;
        this.tablo_toplam_guncelle(this.filteredFaturalama);
        this.is_hepsi = false;
      } else if (event == "Mekmer") {
        this.isFilteredFaturalama = true;
        this.filteredFaturalama = this.maliyet_listesi.filter(
          (x) => x.faturatur == "Mekmer"
        );
        this.toplam_kar_zar_orani(this.filteredFaturalama)

        this.maliyet_listesi_excel = this.filteredFaturalama;
        this.local_maliyet_data = this.filteredFaturalama;
        this.tablo_toplam_guncelle(this.filteredFaturalama);
        this.is_hepsi = false;
      } else if (event == "Efes") {
        this.isFilteredFaturalama = true;
        this.filteredFaturalama = this.maliyet_listesi.filter(
          (x) => x.faturatur == "Efes"
        );
        this.toplam_kar_zar_orani(this.filteredFaturalama)

        this.maliyet_listesi_excel = this.filteredFaturalama;
        this.local_maliyet_data = this.filteredFaturalama;
        this.tablo_toplam_guncelle(this.filteredFaturalama);
        this.is_hepsi = false;
      }
    },
    tablo_toplam_guncelle(liste) {
      this.toplam_toplam_bedel = 0;
      this.toplam_alim = 0;
      this.toplam_mekmoz_alim = 0;
      this.toplam_dis_alim = 0;
      this.toplam_nakliye = 0;
      this.toplam_gumruk = 0;
      this.toplam_ilaclama = 0;
      this.toplam_liman = 0;
      this.toplam_lashing = 0;
      this.toplam_booking = 0;
      this.toplam_spazlet = 0;


      this.toplam_navlun = 0;
      this.toplam_pazarlama = 0;
      this.toplam_banka_masrafi = 0;
      this.toplam_kurye_masrafi = 0;
      this.toplam_kar_zarar = 0;
      this.toplam_kar_zarar_tl = 0; 
      this.toplam_mekmar_alim = 0;
      this.toplam_diger_masraflar = 0;
      this.toplam_ozel_iscilik = 0;
      this.toplam_try_profit = 0;
      for (let key in liste) {
        const item = liste[key];

        this.toplam_toplam_bedel += item.toplam_bedel;
        this.toplam_alim += item.mekmar_alim;
        this.toplam_mekmoz_alim += item.mekmoz_alim;
        this.toplam_dis_alim += item.dis_alim;
        this.toplam_nakliye += item.nakliye;
        this.toplam_gumruk += item.gumruk;
        this.toplam_ilaclama += item.ilaclama;
        this.toplam_liman += item.liman;
        this.toplam_lashing += item.lashing;
        this.toplam_booking += item.booking;
        this.toplam_spazlet += item.spazlet;



        this.toplam_navlun += item.navlun;
        this.toplam_pazarlama += item.pazarlama;
        this.toplam_banka_masrafi += item.banka_masrafi;
        this.toplam_kurye_masrafi += item.kurye_masrafi;
        this.toplam_kar_zarar += item.kar_zarar;
        this.toplam_kar_zarar_tl += item.kar_zarar_tl;
        this.toplam_mekmar_alim += item.mekmar_alim;
        this.toplam_ozel_iscilik += item.ozel_iscilik;
        this.toplam_diger_masraflar += item.diger_masraflar;

        this.toplam_try_profit += item.odenen_try_tutar - (item.ortalama_kur * item.masraf_toplam);
        
        // this.toplam_try_profit += item.kar_zarar_tl
      }
    },
    


    maliyet_row_select(event) {
      this.select_maliyet = event.data;

      this.$store.dispatch("maliyet_data_yukle_act", event.data);
      this.maliyet_form_baslik = `${event.data.musteri_adi} / ${event.data.siparis_no}`;
      this.is_maliyet_form = true;
    },
    hepsi_input_event() {
      if (this.is_hepsi) {
        this.maliyet_yil_listesi_yukle(this.select_yil.yil);
        this.is_general_form = true;
      } else {
        this.maliyet_listesi_yukle();
        this.is_general_form = false;
        this.is_quarter_dropdown = true;
      }
    },
  },
};
</script>
<style scoped>
.p-datatable {
  font-size: 9px;
}
.p-column-filter {
  font-size: 9px;
}
.page-button-excell {
  margin-top: 30px;
}
</style>
