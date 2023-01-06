<template>
    <span class="p-float-label">
        <InputText id="textValue" type="text" v-model="value" @input="input_change_()" :disabled="dis_aktif" class="has-text-centered"/>
        <label for="textValue">{{ label }}</label>
    </span>
</template>
<script>
export default {
    props: ['label','text_value','dis_aktif'],
    data() {
        return {
            value:0,
       } 
    },
    methods: {
        input_change_() {
            
            this.value = this.value.replace(",", ".")
            this.$emit('money_input_text_change', this.value)
        }
    },
    watch: {
        text_value(){
            this.value = this.text_value
        }
    }
}
</script>

