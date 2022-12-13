<template>
    
    <InputText 
    type="text" 
    v-model="currencyValue"
    @blur="isInputActive = false" 
    @focus="isInputActive = true"
     @input="miktar_input_event($event)"
    :disabled="disAktif" 
    />
   
    
</template>
<script>

export default {
    
    data:function (){ 

        return {

            isInputActive : false,
            
        }
    },
    props : {

        value :  {
            type: Number,
            default: 0
        },
        ondalik : {
            type: Number,
            default: 2
        },
        disAktif : {
            type : Boolean,
            default : false
        }
    },
    computed : {
        currencyValue:{
            get: function(){
                if(this.isInputActive){
                   
                    return this.value.toString()
                }else{
                   
                    let val = (this.value /1).toFixed(2).replace('.', ',')
                    return "€" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                   
                }
            },
            set:function(modifiedValue){
                let newValue = parseFloat(modifiedValue/*.replace(/[^\d\.]/g, "")*/)
                if(isNaN(newValue)){
                    newValue = 0
                }

                this.emitter.emit('input',newValue)
            }
        }
    },
    methods : {
        miktar_input_event(event){

            if(event) this.currencyValue = event.replace(',','.')
        },
    }
}
</script>
<style scoped>
  body {
    margin: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
input {
    border: 1px solid #888;
    font-size: 14px;
    padding: 0.5rem;
    text-align: center;
}
</style>