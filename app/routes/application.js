import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('isFluidLayout', true);
    controller.set('isExpanded', true);
    controller.set('isNavigationOpen', false);
    controller.set('isBagOpen', false);
    controller.set('isPromoPushDownOpen', false);

    var windowWidth = window.innerWidth;
    
    if(windowWidth <= controller.get('xtrSmallBreak')){
      controller.set('breakPointName', 'Xtr-Small');
    } else if(windowWidth > controller.get('xtrSmallBreak')
      && windowWidth <= controller.get('smallBreak')){
      controller.set('breakPointName', 'Small');
    } else if(windowWidth > controller.get('smallBreak')
      && windowWidth <= controller.get('mediumBreak')){
      controller.set('breakPointName', 'Medium');
    } else if(windowWidth > controller.get('mediumBreak')){
      controller.set('breakPointName', 'Large');
    }
  }

});
