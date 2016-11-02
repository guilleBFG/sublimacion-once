import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    console.log(this.get('session'));
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('application');
    }
  },
  model(){
    console.log(this.store.findAll('contact'));
    return this.store.findAll('contact');
  },
  afterModel(){
    this.get('session').close();
  }
});
