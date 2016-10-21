import Ember from 'ember';

export default Ember.Route.extend({

  model(){
    return this.store.createRecord('contact');
  },


  actions:  {
    saveContact(newContact){
      let model = this.controller.get('model');

      if(model.get('isValid')){
        newContact.save().then( () => {
           this.controller.set('emailAddress', '');
           this.controller.set('message','');
           this.controller.set('responseMessage', true);
        });
        this.controller.set('errorMessage', false);
      }else{
        this.controller.set('errorMessage', true);
      }
    },
    willTransition() {
      let model = this.controller.get('model');

      if (model.get('isNew')) {
        model.destroyRecord();
      }

      this.controller.set('responseMessage', false);
    }
  }
});
