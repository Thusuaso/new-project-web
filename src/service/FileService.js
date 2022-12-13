import axios from "@/helpers/custom_fileaxios";

const FileService = {
  mekmerDisfaturaDosyaGonder(file,id){

      let kontrol = file.name.split('.').length;
      if(kontrol > 2){

        alert("Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz.")
        return;
      }
    //  let uzanti = file.name.split('.')[1];
     // let dosya = 'numune.' + uzanti; 
      let dosya = file.name; 
      const url = '/file/upload/mekmerDisFatura/' + id + '/' + dosya ;

      let formData = new FormData();
      formData.append('file',file);
      return axios.post(url,formData).then((res) => {
        
        
        return {...res.data,dosyaAdi : id.toString()}
      })
  },
  bgpProjectGonder(file, id) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //let uzanti = file.name.split('.')[1];
    let dosya = file.name;

    const url = "file/upload/bgpProject/" + id + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  proformaGonder(file, teklifId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //let uzanti = file.name.split('.')[1];
    let dosya = file.name;

    const url = "file/upload/teklif/proforma/" + teklifId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  teklifDosyaGonder(file, teklifId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    console.log("TeklifDosya", file);

    let dosya = file.name;

    const url = "file/upload/teklif/teklifDosya/" + teklifId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  teklifSonGorulmeGonder(file, teklifId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = file.name;

    const url =
      "file/upload/teklif/teklifGorusmeDosya/" + teklifId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  teklifNumuneGonder(file, teklifId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = file.name;

    const url = "file/upload/teklif/teklifNumune/" + teklifId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  }, //  const url = 'file/upload/download/'+ id + '/'  + siparisno  ;
  satisciDosyaGonder(file, saticiId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = file.name;

    const url = "file/upload/satisci/satisciDosya/" + saticiId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  }, //  const url = 'file/upload/download/'+ id + '/'  + siparisno  ;
  faturaDosyaGonder(file, teklifId, siparisno) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = siparisno;

    const url = "file/upload/" + teklifId + "/" + dosya;
    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },

  etiketDosyaGonder(file, musterino, evrakAdi) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = evrakAdi;

    const url = "file/upload/etiket/" + musterino + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },

  IcSiparisDosyaGonder(file, firmaId, siparisno) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = siparisno;

    const url = "file/upload/evrak/icsiparis/" + firmaId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },

  EtiketDosyaGonder(file, musteriId, etiketdosyaAdi) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }

    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = etiketdosyaAdi;

    const url = "file/upload/etiket/etikets/" + musteriId + "/" + dosya;
    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },

  TedarikciDosyaGonder(file, siparisno, evrak) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = siparisno;

    const url = "file/tedarikci/upload/30/" + siparisno + "/" + evrak;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  nakliyeDosyaGonder(file, firmaId, evrakadi) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = evrakadi;

    const url = "file/customer/upload/" + firmaId + "/" + dosya;

    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      return { ...res.data, dosyaAdi: dosya };
    });
  },
  numuneNumuneGonder(file, numuneId) {
    let kontrol = file.name.split(".").length;
    if (kontrol > 2) {
      alert(
        "Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz."
      );
      return;
    }
    //  let uzanti = file.name.split('.')[1];
    // let dosya = 'numune.' + uzanti;
    let dosya = file.name;

    const url = "file/upload/numune/numuneDosya/" + numuneId + "/" + dosya;
    console.log("file ", url);
    let formData = new FormData();
    formData.append("file", file);

    return axios.post(url, formData).then((res) => {
      console.log("numuneee", res);
      return { ...res.data, dosyaAdi: dosya };
    });
  },
};

export default FileService;
