import DS from 'ember-data';

export default DS.Model.extend({
  contract: DS.belongsTo('contract'),
});
