import user from '../auth'


export function returnTrueRole(role) {
    let roles = user.roles();
    if(roles && roles.length>0) {
        roles = JSON.parse(roles).split(','); 
        return role.some(r=> roles.includes(r))
    } return false;
}
export default {
    guest (to, from, next) {
        next(!user.check()? true : {
            path: '/main',
            query: {
                redirect: to.name
            }
        })
    },

    auth (to, from, next) {                
        next(user.check() ? true : {
            path: '/auth/login',
            query: {
                redirect: to.name
            }
        })
    },
    hasOTPAuth (to, from, next) {                
        next(!user.otpCode() && user.check()? true : {
            path: '/main',
            query: {
                redirect: to.name
            }
        })
    },
    // isAdmin(to, from, next) {    
    //     next(user.check() && returnTrueRole('Admin') ? true : {
    //         path: from.fullPath
    //     })      
    // },
    // isCSEReviewer(to, from, next) {
    //     next(user.check() && returnTrueRole('CSE Reviewer') ? true : {
    //         path: from.fullPath
    //     }) 
    // },
    // isCSEApprover(to, from, next) {
    //     next(user.check() && returnTrueRole('CSE Approver') ? true : {
    //         path: from.fullPath
    //     }) 
    // },
    // isEntityApprover(to, from, next) {
    //     next(user.check() && returnTrueRole('Entity Approver') ? true : {
    //         path: from.fullPath
    //     })
    // },
    // isEntityInitiator(to, from, next) {
    //     next(user.check() && returnTrueRole('Entity Initiator') ? true : {
    //         path: from.fullPath
    //     })
    // },
    
    checkRole(to, from, next) {
        next(user.check() && returnTrueRole(to.meta.roles)? true : {
            path: from.fullPath
        })
    }
}