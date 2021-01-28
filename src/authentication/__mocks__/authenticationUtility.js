import { PanoramaFishEye } from "@material-ui/icons";
import {CURRENT_USER_URI} from "../constants/uris";

const AuthUtil = {
    getCurrentUser : async () => {
        return Promise.resolve(() => {
            return {
                "principal":{
                    "username":"linda",
                    "authorities":[
                        {"role":"ROLE_TRAINEE"},
                        {"role":"patient:read"}
                    ],
                    "accountNonExpired":true,
                    "accountNonLocked":true,
                    "credentialsNonExpired":true,
                    "enabled":true
                },
                "authorities":[
                    {"role":"ROLE_TRAINEE"},
                    {"role":"patient:read"}
                ],
                "details":{
                    "remoteAddress":"127.0.0.1"
                },
                "authenticated":true
            }
        }) 
    },

    isUserHasPermission : (user, permission) => {
        // findIndex returns -1 if permission is not found
        return user.authorities.findIndex(e => e.role === permission) !== -1;
    }
};

export default AuthUtil;