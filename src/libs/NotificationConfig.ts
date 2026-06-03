

// this is for the local notification
// will add for push notification if needed

import * as notification from "expo-notifications"



interface configureNotificationType {
    shouldPlaySound  :boolean
    shouldSetBadge  : boolean
    shouldShowBanner : boolean
    shouldShowList: boolean
}


interface scheduleNotificationAsyncType {
    content : {
        title : string,
        body : string,
    },
    trigger : null // change this later after reading docs for this
}
export const  configureNotification = (
    {shouldPlaySound, shouldShowBanner, shouldShowList, shouldSetBadge} : configureNotificationType
) => {

    notification.setNotificationHandler({
        handleNotification : async () => ({
            shouldPlaySound : shouldPlaySound,
            shouldShowList : shouldShowList,
            shouldSetBadge  : shouldSetBadge,
            shouldShowBanner : shouldShowBanner
        })
    })


}




// async call

export const notificationContent =   async({content, trigger}: scheduleNotificationAsyncType) => {

    notification.scheduleNotificationAsync({
       content,
        trigger
    })

}
