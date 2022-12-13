<template style="width: 100%">
  <div style="margin-left: 10px; width: 100%">
    <div style="width: 100%">
      <Dropdown
        v-model="selectedYear"
        :options="years"
        optionLabel="year"
        placeholder="Select a Year"
        style="margin-right: 15px; text-align: center"
        @change="isSelectedYear"
      />
      <Dropdown
        v-model="selectedMonth"
        @input="ifSelected"
        :options="months"
        optionLabel="month"
        placeholder="Select a Month"
        :disabled="isSelectedYearDropdown"
        @change="isSelectedMonth"
      />
      <Button
        label="Göster"
        @click="showtables"
        style="margin-left: 15px"
        :disabled="isSelectedMonthDropdown"
      />
    </div>

    <Dialog
      v-model:visible="is_form"
      :modal="true"
      maximizable
      header="Müşteri Bazında Aylık"
      position="top"
    >
      <div class="columns is-multiline">
        <div class="column is-3">
          <Button
            @click="excel_cikti_click"
            icon="fa-solid fa-file-excel fa-2xl"
          />
        </div>
      </div>
      <div
        v-if="selectMonth == 1"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasOcak"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable v-model:value="s" 
          ><template #header>
            <div>{{ selectedMonth.month }} Ayına Kadar Toplam</div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 2"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasSubat" >
          <template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasSubatToplami" >
          <template #header>
            <div>{{ selectedMonth.month }} Ayına Kadar Toplam</div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div
        v-else-if="selectMonth == 3"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasMart" >
          <template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable v-model:value="musteriDatasMartToplami" >
          <template #header>
            <div>{{ selectedMonth.month }} Ayına Kadar Toplam</div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div
        v-else-if="selectMonth == 4"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasNisan"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasNisanToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 5"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasMayis"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasMayisToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 6"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasHaziran" 
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasHaziranToplami" 
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>

      <div
        v-else-if="selectMonth == 7"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasTemmuz" 
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasTemmuzToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 8"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasAgustos" 
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasAgustosToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 9"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasEylul"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasEylulToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 10"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasEkim" 
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasEkimToplami"
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 11"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasKasim"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasKasimToplami" 
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div
        v-else-if="selectMonth == 12"
        style="display: grid; grid-template-columns: auto auto"
      >
        <DataTable v-model:value="musteriDatasAralik"
          ><template #header>
            <div>
              {{ selectedMonth.month }}
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>

        <DataTable v-model:value="musteriDatasAralikToplami" 
          ><template #header>
            <div>
              {{ selectedYear.year }} - {{ selectedMonth.month }} Ayına Kadar
              Toplam
            </div>
          </template>
          <Column
            field="musteri"
            header="Müşteri Adı"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ slotProps.data.musteri }}
            </template>
          </Column>
          <Column
            field="fob"
            header="FOB"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.fob) }}
            </template>
          </Column>
          <Column
            field="ddp"
            header="DDP"
            bodyStyle="text-align:center"
            headerStyle="width:60px;"
          >
            <template #body="slotProps">
              {{ formatPrice(slotProps.data.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import service from "@/service/RaporService";
import { mapGetters } from "vuex";
export default {
  components: {
    Dropdown,
    Dialog,
  },
  data() {
    return {
      isSelectedMonthDropdown: true,
      isSelectedYearDropdown: true,
      datas: null,
      datasSum: null,
      datasValue: null,
      musteriDatasOcak: null,

      musteriDatasSubat: null,
      musteriDatasSubatToplami: null,

      musteriDatasMart: null,
      musteriDatasMartToplami: null,

      musteriDatasNisan: null,
      musteriDatasNisanToplami: null,

      musteriDatasMayis: null,
      musteriDatasMayisToplami: null,

      musteriDatasHaziran: null,
      musteriDatasHaziranToplami: null,

      musteriDatasTemmuz: null,
      musteriDatasTemmuzToplami: null,

      musteriDatasAgustos: null,
      musteriDatasAgustosToplami: null,

      musteriDatasEylul: null,
      musteriDatasEylulToplami: null,

      musteriDatasEkim: null,
      musteriDatasEkimToplami: null,

      musteriDatasKasim: null,
      musteriDatasKasimToplami: null,

      musteriDatasAralik: null,
      musteriDatasAralikToplami: null,

      selectedYear: null,
      selectedMonth: null,
      selectMonth: null,

      is_form: false,
      years: [{ year: 2022 }, { year: 2021 }, { year: 2020 }],
      months: [
        { month: "Ocak" },
        { month: "Şubat" },
        { month: "Mart" },
        { month: "Nisan" },
        { month: "Mayıs" },
        { month: "Haziran" },
        { month: "Temmuz" },
        { month: "Ağustos" },
        { month: "Eylül" },
        { month: "Ekim" },
        { month: "Kasım" },
        { month: "Aralık" },
      ],
      monthsNumber: {
        Ocak: 1,
        Şubat: 2,
        Mart: 3,
        Nisan: 4,
        Mayıs: 5,
        Haziran: 6,
        Temmuz: 7,
        Ağustos: 8,
        Eylül: 9,
        Ekim: 10,
        Kasım: 11,
        Aralık: 12,
      },
    };
  },
  mounted() {},
  methods: {
    isSelectedMonth() {
      this.$store.dispatch("loadingBeginAct");
      this.ifSelected();
      this.isSelectedMonthDropdown = false;
      this.$store.dispatch("loadingEndAct");

    },
    isSelectedYear() {
      this.isSelectedYearDropdown = false;
    },
    showtables() {
      var monthNum = this.monthsNumber[this.selectedMonth.month];
      service
        .getMusteriBazindaAyrinti(this.selectedYear.year, monthNum)
        .then((data) => {
          if (this.selectMonth == 1) {
            this.musteriDatasOcak = data;
            this.datas = data;
          } else if (this.selectMonth == 2) {
            this.musteriDatasSubat = data.subat;
            this.musteriDatasSubatToplami = data.subatToplami;
            this.datas = data.subat;
            this.datasSum = data.subatToplami;
          } else if (this.selectMonth == 3) {
            this.musteriDatasMart = data.mart;
            this.musteriDatasMartToplami = data.martToplami;
            this.datas = data.mart;
            this.datasSum = data.martToplami;
          } else if (this.selectMonth == 4) {
            this.musteriDatasNisan = data.nisan;
            this.musteriDatasNisanToplami = data.nisanToplami;
            this.datas = data.nisan;
            this.datasSum = data.nisanToplami;
          } else if (this.selectMonth == 5) {
            this.musteriDatasMayis = data.mayis;
            this.musteriDatasMayisToplami = data.mayisToplami;
            this.datas = data.mayis;
            this.datasSum = data.mayisToplami;
          } else if (this.selectMonth == 6) {
            this.musteriDatasHaziran = data.haziran;
            this.musteriDatasHaziranToplami = data.haziranToplami;
            this.datas = data.haziran;
            this.datasSum = data.haziranToplami;
          } else if (this.selectMonth == 7) {
            this.musteriDatasTemmuz = data.temmuz;
            this.musteriDatasTemmuzToplami = data.temmuzToplami;
            this.datas = data.temmuz;
            this.datasSum = data.temmuzToplami;
          } else if (this.selectMonth == 8) {
            this.musteriDatasAgustos = data.agustos;
            this.musteriDatasAgustosToplami = data.agustosToplami;
            this.datas = data.agustos;
            this.datasSum = data.agustosToplami;
          } else if (this.selectMonth == 9) {
            this.musteriDatasEylul = data.eylul;
            this.musteriDatasEylulToplami = data.eylulToplami;
            this.datas = data.eylul;
            this.datasSum = data.eylulToplami;
          } else if (this.selectMonth == 10) {
            this.musteriDatasEkim = data.ekim;
            this.musteriDatasEkimToplami = data.ekimToplami;
            this.datas = data.ekim;
            this.datasSum = data.ekimToplami;
          } else if (this.selectMonth == 11) {
            this.musteriDatasKasim = data.kasim;
            this.musteriDatasKasimToplami = data.kasimToplami;
            this.datas = data.kasim;
            this.datasSum = data.kasimToplami;
          } else if (this.selectMonth == 12) {
            this.musteriDatasAralik = data.aralik;
            this.musteriDatasAralikToplami = data.aralikToplami;
            this.datas = data.aralik;
            this.datasSum = data.aralikToplami;
          }
        });

      this.is_form = true;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    ifSelected() {
      this.selectMonth = this.monthsNumber[this.selectedMonth.month];
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const months = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];
      if (this.selectedYear.year == year && this.selectMonth > month) {
        const messages =
          "Hatalı yıl ve ay seçimi lütfen" +
          " " +
          months[month - 1] +
          " " +
          "ayı ve öncesini seçiniz.";
        this.$toast.add({
          severity: "warn",
          summary: "Hatalı Ay Seçimi",
          detail: messages,
        });
      }
    },
    excel_cikti_click() {
      if (this.selectedMonth.month == "Ocak") {
        this.datasValue = {
          datas: this.datas,
        };
      } else {
        this.datasValue = {
          datas: this.datas,
          dataSum: this.datasSum,
        };
      }

      service.getmusteriBazindaAylikExcell(this.datasValue).then((responce) => {
        if (responce.status) {
          const link = document.createElement("a");
          link.href =
            this.servis_adres + "raporlar/listeler/musteriBazindaRaporExcell";
          link.setAttribute("download", "musterisip_bazinda_rapor.xlsx");
          document.body.appendChild(link);
          link.click();
          this.loading = false;
          this.is_excel = false;
        }
      });
    },
  },
  computed: {
    ...mapGetters(["servis_adres"]),
  },
  watch: {
    is_form() {
      if (this.is_form == false) {
        (this.isSelectedMonthDropdown = true),
          (this.isSelectedYearDropdown = true);
      }
    },
  },
};
</script>

<style scoped></style>
