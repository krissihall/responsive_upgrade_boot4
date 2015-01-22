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
    controller.resetAllSizes();
    
    if(windowWidth <= controller.get('xtrSmallBreak')){
      controller.set('breakPointName', 'Xtr-Small');
      controller.set('isXtrSmall', true);
    } else if(windowWidth > controller.get('xtrSmallBreak')
      && windowWidth <= controller.get('smallBreak')){
      controller.set('breakPointName', 'Small');
      controller.set('isSmall', true);
    } else if(windowWidth > controller.get('smallBreak')
      && windowWidth <= controller.get('mediumBreak')){
      controller.set('breakPointName', 'Medium');
      controller.set('isMedium', true);
    } else if(windowWidth > controller.get('mediumBreak')){
      controller.set('breakPointName', 'Large');
      controller.set('isLarge', true);
    }
  }

});
