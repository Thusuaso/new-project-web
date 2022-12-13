<template>
  <div class="">
    <DataTable
      :value="$store.getters.customer_product_detail_list"
      responsiveLayout="scroll"
    >
      <Column
        field="kategori"
        header="Kategori"
        headerStyle="width:10%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="urunAdi"
        header="Ürün Adı"
        headerStyle="width:14%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="yuzey"
        header="Yüzey"
        headerStyle="width:14%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="en"
        header="En"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="boy"
        header="Boy"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="kenar"
        header="Kenar"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="birimAdi"
        header="Birim"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="miktar"
        header="Miktar"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      ></Column>
      <Column
        field="satisFiyati"
        header="Fiyat"
        headerStyle="width:6%;"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.satisFiyati) }}
        </template>
      </Column>
      <Column
        field="satisToplam"
        header="Toplam"
        headerStyle="width:8%;"
        bodyStyle="text-align:center;"
      >
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.satisToplam) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped></style>
