import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('isFluidLayout', true);
    controller.set('isExpanded', true);
    controller.set('isNavigationOpen', false);
    controller.set('isBagOpen', false);
    controller.set('isPromoPushDownOpen', false);
  }

});
