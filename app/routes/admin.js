import Ember from 'ember';
export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model(){
    return this.store.createRecord('admin');
  },
  actions: {
    logIn() {
        let model = this.controller.get('model');
        var email = model.get('emailAddress');
        var password = model.get('password');
        this.get('session').open('firebase', {
              provider: 'password',
              email: email,
              password: password
            }).then(() => {
              this.transitionTo('consultlist');
            }.bind(this));
    },
    registerUser(){
      let model = this.controller.get('model');
      var email = model.get('emailAddress');
      var password = model.get('password');
      var ref = this.get('firebaseApp');
      var _this = this;
      ref.auth().createUserWithEmailAndPassword(
            email,
            password
          ).catch(function(error, userData){
            if(error) {
            alert(error);
            } else {
              _this.get('session').open('firebase', {
              provider    : 'password',
              'email'     : email,
              'password'  : password,
            });
            var user = _this.store.createRecord('admin',{
              id : userData.uid,
              emailAddress  : email,
              password      : password,
            });
            user.save().then(() => {
              _this.transitionTo('consultlist');
            });
          }
      }
    );
      //newUser.save().then(()=> this.transitionTo('consultlist'));
    },
    willTransition() {
      let model = this.controller.get('model');

      if (model.get('isNew')) {
        model.destroyRecord();
      }

    }
  }
});
