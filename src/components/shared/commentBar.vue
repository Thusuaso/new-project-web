<template>
    <div class="panel">
            <div class="panel-body" >
            <!-- Newsfeed Content -->
            <!--===================================================-->
            <div class="media-block" @mouseleave="followControl(item)">
            <a class="media-left" href="#"><img class="img-circle img-sm" style="margin-right:10px;" alt="Profile Picture" :src="item.data.who_send_image"></a>
            <div class="media-body" >
                <div class="mar-btm" >
                <a href="#" class="btn-link text-semibold media-heading box-inline"  style="text-decoration: none;" :style="{ 'color': item.data.follow ? 'red' : 'black' }">{{ item.data.who_send_name }}</a>
                <p class="text-muted text-sm">{{ formatDate(item.data.tarih) }}</p>
                </div>
                <p>
                    {{ item.data.message }}
                </p>
                <div class="pad-ver">
                <a class="btn btn-sm btn-default btn-hover-primary" @click="is_answer_selected_form = true" v-if="!is_answer_selected_form" v-show="item.data.who_send_id != $store.getters.__getUserId">Cevapla</a>
                <div>
                    <span>
                    <Textarea v-if="is_answer_selected_form" v-model="textArea" rows="3" cols="50"/>

                    </span>
                    <span>
                    <Button class="pi pi-send" style="height:93px;margin-left:5px;" @click="sendMessageAnswer(item)" v-if="is_answer_selected_form" />

                    </span>
                </div>
            

                </div>
                <hr v-if="item.children">

                <!-- Comments -->
                <div v-if="item.children" >
                    <CommentBarAnswered v-for="item2 of item.children" :key="item2" :item2="item2"/>

            
                </div>
            </div>
            </div>
            <!--===================================================-->
            <!-- End Newsfeed Content -->
        </div>
    </div>
</template>

<script>
import notificationService from "@/service/AnlikBildirimService"
import socket from "@/service/SocketService"
import CommentBarAnswered from "@/components/shared/commentBarAnswered"
import moment from 'moment'
export default {
    components: {
      CommentBarAnswered  
    },
    computed: {
        
    },
    props: ['item'],
    data() {
        return {
            is_answer_selected_form_sub:false,
            is_answer_selected_form: false,
            textArea:""

        }
    },
    methods: {
        followControl(item) {
            if (item.data.follow) {
                notificationService.setNotificationFollow(item.data).then(data => {
                    if (data.status) {
                        socket.siparis.emit('get_notification_list_event', data)
                        socket.siparis.emit('get_notification_list_follow_event')
                    }
                })   
            }
            
        },
        formatDate(value) {
            return moment(value).fromNow()
            
        },
        sendMessageAnswer(item) {
            
            item.data.newMessage = this.textArea
            item.data.receiver_name = item.data.who_send_name
            item.data.receiver_id = item.data.who_send_id
            item.data.user_id = this.$store.getters.__getUserId
            item.data.user_name = this.$store.getters.__getUsername
            notificationService.setNotificationSaveSub(item.data).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Bildirim Durum', detail: 'Mesajınız Başarıyla Gönderildi', life: 3500 })
                    socket.siparis.emit('get_notification_list_second_event', item)
                    socket.siparis.emit('get_notification_list_follow_event')


                } else {
                this.$toast.add({ severity: 'danger', summary: 'Bildirim Durum', detail: 'Mesajınız Gönderimi Başarısız', life: 3500 })

                }
            })
        }
    }
}
</script>
<style>

.img-sm {
    width: 46px;
    height: 46px;
}

.panel {
    box-shadow: 0 2px 0 rgba(0,0,0,0.075);
    border-radius: 0;
    border: 0;
    margin-bottom: 15px;
}

.panel .panel-footer, .panel>:last-child {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.panel .panel-heading, .panel>:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.panel-body {
    padding: 25px 20px;
}


.media-block .media-left {
    display: block;
    float: left
}

.media-block .media-right {
    float: right
}

.media-block .media-body {
    display: block;
    overflow: hidden;
    width: auto
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
    vertical-align: middle
}

.thumbnail {
    border-radius: 0;
    border-color: #e9e9e9
}

.tag.tag-sm, .btn-group-sm>.tag {
    padding: 5px 10px;
}

.tag:not(.label) {
    background-color: #fff;
    padding: 6px 12px;
    border-radius: 2px;
    border: 1px solid #cdd6e1;
    font-size: 12px;
    line-height: 1.42857;
    vertical-align: middle;
    -webkit-transition: all .15s;
    transition: all .15s;
}
.text-muted, a.text-muted:hover, a.text-muted:focus {
    color: #acacac;
}
.text-sm {
    font-size: 0.9em;
}
.text-5x, .text-4x, .text-5x, .text-2x, .text-lg, .text-sm, .text-xs {
    line-height: 1.25;
}

.btn-trans {
    background-color: transparent;
    border-color: transparent;
    color: #929292;
}

.btn-icon {
    padding-left: 9px;
    padding-right: 9px;
}

.btn-sm, .btn-group-sm>.btn, .btn-icon.btn-sm {
    padding: 5px 10px !important;
}

.mar-top {
    margin-top: 15px;
}
.dropdown-menu{
    width:250px;
}
.dropdown-item{
    width:250px;
}

</style>