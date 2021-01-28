import {CURRENT_USER_URI} from "../constants/uris";

const AuthUtil = {
    getCurrentUser : async () => {
        return await fetch(CURRENT_USER_URI, {method: 'GET'})
            .then(response => response.json());
    },

    isUserHasPermission : (user, permission) => {
        // findIndex returns -1 if permission is not found
        return user.authorities.findIndex(e => e.role === permission) !== -1;
    }
};

export default AuthUtil;