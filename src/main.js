import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/rhea/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputSwitch from "primevue/inputswitch";
import Toast from "primevue/toast";
import Checkbox from "primevue/checkbox";
import Textarea from "primevue/textarea";
import AutoComplete from "primevue/autocomplete";
import Image from "primevue/image";
import Tooltip from "primevue/tooltip";
import TabMenu from "primevue/tabmenu";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import OverlayPanel from "primevue/overlaypanel";
import ToastService from "primevue/toastservice";
import MultiSelect from "primevue/multiselect";
import Panel from "primevue/panel";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import Carousel from "primevue/carousel";
import Chips from "primevue/chips";
import FileUpload from "primevue/fileupload";
import Rating from "primevue/rating";
import BadgeDirective from "primevue/badgedirective";
import ElementPlus from "element-plus";
import PickList from 'primevue/picklist';
import Galleria from 'primevue/galleria';
import Steps from 'primevue/steps';
import "element-plus/dist/index.css";
import "/node_modules/primeflex/primeflex.css";
import mitt from 'mitt'
// var Emitter = require('tiny-emitter');
// var emitter = new Emitter();

const app = createApp(App)


app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("RadioButton", RadioButton);
app.component("Chart", Chart);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Card", Card);
app.component("Calendar", Calendar);
app.component("Dropdown", Dropdown);
app.component("InputSwitch", InputSwitch);
app.component("Toast", Toast);
app.component("Checkbox", Checkbox);
app.component("Textarea", Textarea);
app.component("AutoComplete", AutoComplete);
app.component("Image", Image);
app.component("TabMenu", TabMenu);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("OverlayPanel", OverlayPanel);
app.component("MultiSelect", MultiSelect);
app.component("Panel", Panel);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("Carousel", Carousel);
app.component("Chips", Chips);
app.component("FileUpload", FileUpload);
app.component("Rating", Rating);
app.component("PickList", PickList);
app.component("Galleria", Galleria);
app.component("Steps",Steps)


app.directive("badge", BadgeDirective);

app.directive("tooltip", Tooltip);
const emitter = mitt();
app.config.globalProperties.emitter = emitter 
app.use(PrimeVue)
app.use(ElementPlus)
app.use(store)
app.use(ToastService)

app.use(router)

app.mount('#app')
