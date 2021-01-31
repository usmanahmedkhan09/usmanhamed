
export default {
  data()
  {
    return {
      detail: false,
      update: false,
      form: {
        userID: null,
        id: null,
        userTypes: [],
        userSectors: [],
        firstname: null,
        lastname: null,
        emailAddress: null,
        phoneNumber: null,
        entityTypeID: [],
        entitySectorID: [],
        type: []
      }
    }
  },
  methods: {
    showDetail(item)
    {
      this.$userService
        .getUser(item.id)
        .then(res =>
        {
          if (res.success)
          {
            res.data.userSectors.forEach((item) =>
            {
              this.form.entitySectorID.push(item.entitysectorID)
            })
            this.form.userSectors = res.data.userSectors
            this.form.phoneNumber = res.data.phoneNumber
            this.form.id = res.data.id
            this.form.emailAddress = res.data.emailAddress
            this.form.firstname = res.data.name
            this.form.lastname = res.data.surname
            this.isCreateDialog = true;
            // this.$refs['userModel'].show()
            this.$bvModal.show('userModel')
            this.form.type = res.data.roleNames.join();
            this.detail = true;
          } else
          {
            this.$swal({
              icon: 'error',
              type: 'error',
              title: res.message.message
            })
          }
        })
        .catch(error =>
        {
          this.$swal({
            type: "error",
            title: error
          });
        });
    },
    saveUser()
    {
      if (this.form.firstname)
      {
        this.sending = true;
        var formSub = {};
        formSub = this.form
        if (this.data)
        {
          formSub.tenantId = this.data ? this.data.id : 0;
        }
        formSub.userName = this.form.firstname;
        formSub.name = this.form.firstname;
        formSub.fullName = this.form.firstname + ' ' + this.form.lastname;
        formSub.surname = this.form.lastname;
        formSub.isActive = true;
        formSub.roleNames = [];
        formSub.entityTypeID = this.form.entityTypeID,
          formSub.entitySectorID = this.form.entitySectorID,
          formSub.emailAddress = this.form.emailAddress.trim();
        formSub.roleNames.push(this.form.type.trim());
        formSub.password = "qwe123";

        if (!this.update)
        {
          this.createService(formSub);
        } else
        {
          formSub = this.form
          formSub.emailAddress = this.form.emailAddress.trim();
          formSub.name = this.form.firstname;
          formSub.fullName = this.form.firstname + ' ' + this.form.lastname;
          formSub.surname = this.form.lastname;
          this.updateService(formSub);
        }
      }

    },
    updateService(formSub)
    {
      this.$userService
        .updateUser(formSub)
        .then(res =>
        {
          if (res.success)
          {
            this.$swal({
              icon: 'success',
              type: 'success',
              confirmButtonText: "موافق",
              title: this.$t('userUpdatedSuccessfully')
            }).then(() =>
            {
              this.$router.go();
            })
            this.isCreateDialog = false;
          } else
          {
            this.$swal({
              icon: 'error',
              type: 'error',
              confirmButtonText: "موافق",
              title: res.message.message
            })
          }

          this.sending = false;
        })
        .catch(error =>
        {
          this.$swal({
            type: "error",
            confirmButtonText: "موافق",
            title: error
          });
        });
    },
    createService(formSub)
    {
      this.$userService
        .createUser(formSub)
        .then(res =>
        {
          if (res.success)
          {
            this.$swal({
              icon: 'success',
              type: 'success',
              confirmButtonText: "موافق",
              title: this.$t('userCreatedSuccessfully')
            }).then(() =>
            {
              this.$router.go();
            })
            this.isCreateDialog = false;
          } else
          {
            this.$swal({
              icon: 'error',
              type: 'error',
              confirmButtonText: "موافق",
              title: res.message.message
            })
          }

          this.sending = false;
        })
        .catch(error =>
        {
          this.$swal({
            type: "error",
            confirmButtonText: "موافق",
            title: error
          });
        });
    },
  },
  computed: {
    getSubmitText()
    {
      return this.update ? this.$t('update') : this.$t('create');
    }
  }
}