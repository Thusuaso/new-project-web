<template>
  <div>
    <div class="p-col-12 p-md-12" style="margin-top: 10px">
      <custom-file-input
        style="margin-left: 155px"
        baslik="Etiket Yükle"
        @sunucuDosyaYolla="EtiketGonder($event)"
      />
    </div>
    <InputText v-model="etiketKodu" placeholder="etiket kodu"></InputText>

    <!-- <Dropdown v-model="codeSelected" style="width:250px;"
            :options="musteri == 213 ? etiketlerVeikKutu : etiketlerNovaKutu" optionLabel="urun"
            @change="isDropDownChange" placeholder="Kutu Etiketi Seç" />
        <Dropdown v-model="codeSelectedKasa" style="width:250px;"
            :options="musteri == 213 ? etiketlerVeikKasa : etiketlerNovaKasa" optionLabel="urun"
            @change="isDropDownChangeTwo" placeholder="Kasa Etiketi Seç" />
        <Button type="button" @click="etiketDowload()" icon="fas fa-download"
            style="margin-right: .5em;padding-bottom: 2px;"></Button> -->
  </div>
</template>

<script>
import CustomInputFile from "../../../components/shared/CustomInputFile";
import fileService from "../../../service/FileService";
import Opservice from "../../../service/OperasyonService";
export default {
  props: ["musteri"],

  components: {
    customFileInput: CustomInputFile,
  },
  data() {
    return {
      etiketlerVeikKutu: [
        { code: "SNS01", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
        { code: "SNS02", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
        { code: "SBR01", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
        { code: "SBR02", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
        { code: "SBY01", urun: "ELA KENARI KIRIK (SBY01)" },
        { code: "SBY02", urun: "ELA DÜZ KENAR (SBY02)" },
        { code: "SBS01", urun: "PICASSO KENARI KIRIK (SBS01)" },
        { code: "SBS02", urun: "PICASSO DÜZ KENAR (SBS02)" },
        { code: "ST-450", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
        { code: "ST-448", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
        { code: "VKGD-SNS", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
        { code: "VKCS-FM01", urun: "GOLD (VKCS-FM01)" },
        { code: "VKCS-FM02", urun: "SILVER (VKCS-FM02)" },
      ],

      etiketlerNovaKutu: [
        { code: "FP-01", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],

      etiketlerVeikKasa: [
        { code: "SNS-01-K", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
        { code: "SNS-02-K", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
        { code: "SBR-01-K", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
        { code: "SBR-02-K", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
        { code: "SBY-01-K", urun: "ELA KENARI KIRIK (SBY01)" },
        { code: "SBY-02-K", urun: "ELA DÜZ KENAR (SBY02)" },
        { code: "SBS-01-K", urun: "PICASSO KENARI KIRIK (SBS01)" },
        { code: "SBS-02-K", urun: "PICASSO DÜZ KENAR (SBS02)" },
        { code: "ST-450-K", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
        { code: "ST-448-K", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
        { code: "VKGD-SNS-K", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
        { code: "VKCS-FM01-K", urun: "GOLD (VKCS-FM01)" },
        { code: "VKCS-FM02-K", urun: "SILVER (VKCS-FM02)" },
      ],

      etiketlerNovaKasa: [
        { code: "FP-01-K", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02-K", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03-K", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04-K", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05-K", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06-K", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07-K", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08-K", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09-K", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10-K", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],

      codeSelected: "",
      codeSelectedKasa: "",
      etiketKodu: "",
      etiketLink: "",
      code: "",
    };
  },
  created() {
    console.log("musteri", this.musteri);
  },
  methods: {
    isDropDownChange(event) {
      this.code = event.value.code;
    },
    isDropDownChangeTwo(event) {
      this.code = event.value.code;
    },
    EtiketGonder(event) {
      const musterino = 1;
      const dosyaismi = event.name;

      fileService
        .etiketDosyaGonder(event, musterino, dosyaismi)
        .then((data) => {
          console.log("etiketDosyaGonder ", data);
          const etiket = {
            musterino: musterino,
            dosya_adi: dosyaismi,
            etiketKodu: this.etiketKodu,
          };
          Opservice.setEtiketKayit(etiket).then((veri) => {
            if (veri.status) {
              alert("Evrak başarılı şekilde yüklendi!");
            } else {
              alert("Ops! Lütfen Tekrar Deneyiniz!");
            }
          });
        });
    },
    etiketDowload() {
      Opservice.getEtiketKayit(this.code).then((data) => {
        this.evrak_indir(data, "Etiket");
      });
    },
    evrak_indir(dosya_link, dosya_adi) {
      const link = document.createElement("a");
      link.href = dosya_link;
      link.setAttribute("download", `${dosya_adi}.doc`);
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>

<style scoped></style>
