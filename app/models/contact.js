import DS from 'ember-data';

export default DS.Model.extend({
  emailAddress: DS.attr('string'),
  message: DS.attr('string'),

  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageEnoughLong: Ember.computed.gte('message.length', 5),

  isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),
  isNotValid: Ember.computed.not('isValid')
});
