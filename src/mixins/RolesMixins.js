export default {
    computed: {
        hasEntityRole() {
            const role = ["Entity Initiator", "Entity Approver"];
            let roles = this.$user.roles();
            if (roles && roles.length > 0) {
              roles = JSON.parse(roles).split(",");
              return role.some(r => roles.includes(r));
            }
        },
        hasCSERole() {
            const role = ["CSE Approver", "CSE Reviewer A", "CSE Reviewer B", "CSE Special Reviewer"];
            let roles = this.$user.roles();
            if (roles && roles.length > 0) {
              roles = JSON.parse(roles).split(",");
              return role.some(r => roles.includes(r));
            }
        },
        hasAdminRole() {
            const role = ["Admin", "Entity Initiator", "Entity Approver", "CSE Approver", "CSE Reviewer"];
            let roles = this.$user.roles();
            if (roles && roles.length > 0) {
              roles = JSON.parse(roles).split(",");
              return role.some(r => roles.includes(r));
            }
        },
        hasOnlyAdminRole() {
          const role = ["Admin"];
          let roles = this.$user.roles();
          if (roles && roles.length > 0) {
            roles = JSON.parse(roles).split(",");
            return role.some(r => roles.includes(r));
          }
      },
        hasOnlyEntityInitiatorRole() {
          let roles = this.$user.roles();
          if (roles && roles.length > 0) {
            roles = JSON.parse(roles).split(",");
            return 'Entity Initiator' === roles.toString();
          }
        },
        isCSEApproverRole() {
          let roles = this.$user.roles();
          if (roles && roles.length > 0) {
            roles = JSON.parse(roles).split(",");
            return roles.includes("CSE Approver");
          }
      },
    },
}