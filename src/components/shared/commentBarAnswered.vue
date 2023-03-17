<template>
    <div class="media-block"  >
    <a class="media-left" href="#" style="margin-right:10px;"><img class="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar2.png"></a>
    <div class="media-body">
    <div class="mar-btm">
        <a href="#" class="btn-link text-semibold media-heading box-inline">{{ item2.data.who_send_name }}</a>
        <p class="text-muted text-sm"></p>
    </div>
    <p>
        {{ item2.data.message }}
    </p>
    <div class="pad-ver">
        <a class="btn btn-sm btn-default btn-hover-primary" @click="is_answer_selected_form_sub = true" v-if="!is_answer_selected_form_sub">Cevapla</a>
    <div>
        <span>
        <Textarea v-if="is_answer_selected_form_sub" v-model="textArea" rows="3" cols="40"/>

        </span>
        <span>
        <Button class="pi pi-send" style="height:93px;margin-left:5px;" @click="sendMessageAnswer(item2)" v-if="is_answer_selected_form_sub" />

        </span>
    </div>
    </div>
    <hr>
    </div>
</div>
</template>
<script>
import notificationService from "@/service/AnlikBildirimService"
import socket from "@/service/SocketService"
export default {
    props: ['item2'],
    data() {
        return {
            is_answer_selected_form_sub: false,
            textArea:""
        }
    },
    created() {
    },
    methods: {
        sendMessageAnswer(item) {
            item.data.newMessage = this.textArea
            item.data.user_id = this.$store.getters.__getUserId
            item.data.user_name = this.$store.getters.__getUsername
            notificationService.setNotificationSaveSub(item.data).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Bildirim Durum', detail: 'Mesajınız Başarıyla Gönderildi', life: 3500 })
                    socket.siparis.emit('get_notification_list_event', data)

                } else {
                    this.$toast.add({ severity: 'danger', summary: 'Bildirim Durum', detail: 'Mesajınız Gönderimi Başarısız', life: 3500 })

                }
            })
        }
    }
}
</script>