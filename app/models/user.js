import DS from 'ember-data';

export default DS.Model.extend({
  contracts: DS.hasMany('contract'),
});
