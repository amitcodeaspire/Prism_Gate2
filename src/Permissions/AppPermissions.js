import {request, Permission, requestMultiple} from 'react-native-permissions';

export const askForPermisson = permission => {
  request(permission)
    .then(ms => console.log(ms))
    .catch(er => console.log(er));
};
export const askForMultiplyPermission = permission => {
  requestMultiple(permission).then(
   
  );
};
// import { PERMISSIONS,check,RESULTS,request } from "react-native-permissions";
// import {Platform} from "react-native"
// const PlATFORM_MICROPHONE_PERMISSIONS = {
//     android:PERMISSIONS.ANDROID.RECORD_AUDIO
// }

// const REQUEST_PERMISSION_TYPE = {
//     microphone : PlATFORM_MICROPHONE_PERMISSIONS
// }
// const PERMISSIONS_TYPE ={
//     microphone:'microphone'
// }
// class AppPermission {
//     checkPermission = async (type): Promise<boolean> => {
//         console.log("AppPermission checkpermissoon type: ",type)
//         const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
//         console.log("AppPermission checkpermissoon type: ",permissions)
//         if (!permissions){
//             return true
//         }
//         try {
//             const result = await check(permissions)
//             console.log("AppPermission checkpermissoon result: ",result)
//             if (result == RESULTS.GRANTED) return true
//             return this.requestPermission() //request permission
//         }
//         catch (error){
//             console.log("AppPermission checkpermissoon error: ",error)
//             return false
//         }

//     }
//     requestPermission = async (permissions): Promise<boolean> =>{
//         console.log("AppPermission requestpermissoon perm: ",permissions)
//         try {
//             const result = await request(permissions)
//             console.log("AppPermission requestpermissoon result: ",result)
//             return result == RESULTS.GRANTED
//         }
//         catch (error) {
//             console.log("AppPermission requestpermissoon error: ",error)
//             return false
//         }
//     }
// }

// const Permission = new AppPermission()
// export {Permission,PERMISSIONS_TYPE}
