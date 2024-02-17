<script setup>
import { useNotificationStore } from "@/store/notification.store"
import { watch } from "vue"
import { useToast } from "vue-toast-notification"
import "vue-toast-notification/dist/theme-sugar.css"

const toast = useToast()

watch(
  () => useNotificationStore().show,
  (show) => {
    if (show) {
      const options = {
        position: "bottom",
        duration: 5000,
        queue: true,
        onDismiss: () => {
          useNotificationStore().clearNotification()
        },
      }

      switch (useNotificationStore().type) {
        case "success":
          toast.success(useNotificationStore().message, options)
          break
        case "error":
          toast.error(useNotificationStore().message, options)
          break
        case "warning":
          toast.warning(useNotificationStore().message, options)
          break
        case "info":
          toast.info(useNotificationStore().message, options)
          break
      }
    }
  }
)
</script>

<template>
  <router-view></router-view>
</template>
