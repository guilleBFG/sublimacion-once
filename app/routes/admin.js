import Ember from 'ember';
export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  model(){
    return this.store.createRecord('admin');
  },
  actions: {
    logIn() {
        let model     = this.controller.get('model');
        var email     = model.get('emailAddress');
        var password  = model.get('password');
        this.get('session').open('firebase', {
              provider: 'password',
              email: email,
              password: password
            }).then(() => {
              this.transitionTo('consultlist');
            }.bind(this));
    },
    registerUser(newUser){

      let model = this.controller.get('model');
      var email = model.get('emailAddress');
      var password = model.get('password');
      var ref = this.get('firebaseApp');
      var _error;
      ref.auth().createUserWithEmailAndPassword( email, password).catch(
        function(error)
        {
          _error = error;

        }
      ).then(() => {
        if (!_error) {
          newUser.save().then( () => {
             this.controller.set('emailAddress', '');
             this.controller.set('password','');
           });
          this.transitionTo('consultlist');
        }else {
          alert(_error);
        }
      });
    },
    willTransition() {
      let model = this.controller.get('model');
      if (model.get('isNew')) {
        this.controller.set('model' , null);
      }
    }
  }
});
