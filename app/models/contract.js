import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  package: DS.belongsTo('package'),
});
