import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.createRecord('admin');
  },
  actions: {
    logIn() {

      let model = this.controller.get('model');

      var user = this.get('store').query( 'admin', {
        orderBy : 'emailAddress',
        equalTo : model.get('emailAddress')
      });
      console.log(model.get('emailAddress'));
      console.log(user.get('emailAddress'));
      console.log(user.get('password'));
    },
    registerUser(newUser){
      newUser.save().then( () => {
        this.controller.set('emailAddress' , '');
        this.controller.set('password' , '');

      });
    },
    willTransition() {
      let model = this.controller.get('model');

      if (model.get('isNew')) {
        model.destroyRecord();
      }

    }
  }
});
