import Ember from 'ember';
import jQuery from 'jquery';

export default Ember.Controller.extend({

  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0,

  isNavigationOpen: false,
  isBagOpen: false,

  isFluidLayout: function(){
    return true;
  }.property(),

  isLayoutChanged: function(){
    return false;
  }.property(),

  windowWidth: function(){
    return window.innerWidth;
  }.property(),

  windowHeight: function(){
    return window.innerHeight;
  }.property(),

  handleResize: function() {
    var windowWidth = window.innerWidth;
    this.set('windowWidth', windowWidth);
  },

  bindResizeEvent: function() {
    jQuery(window).on('resize', Ember.run.bind(this, this.handleResize));
  }.on('init'),

  bodyMargins: function(dir, margin) {
    this.set("margin" + dir.capitalize(), margin);
  },

  /**
   * Adjust the margins if so requested.
   * Bound to `adjust` action-mapping parameter to `{{slide-in}}`.
   *
   * @method adjustMargins
   */
  adjustMargins: function (dir, px) {
    if (this.get('doAdjustMargins')) {
      // This message will be picked up by the application router.
      this.send('bodyMargins', dir, px);
    }
  },

  actions: {

    /**
     * Method to invoke slide up animation.
     * Based on component slideup,
     * @method slideUp
     */
    isNavigationOpenSlideUp: function() {
      this.set('isNavigationOpen', true);
    },

    /**
     * Method to invoke slide up animation.
     * Based on component slideDown,
     * @method slideDown
     */
    isNavigationOpenSlideDown: function() {
      this.set('isNavigationOpen', false);
    },

    /**
     * Method to invoke slide up animation.
     * Based on component slideup,
     * @method slideUp
     */
    isBagOpenSlideUp: function() {
      this.set('isBagOpen', true);
    },

    /**
     * Method to invoke slide up animation.
     * Based on component slideDown,
     * @method slideDown
     */
    isBagOpenSlideDown: function() {
      this.set('isBagOpen', false);
    },

    openSizedWindow: function(size){
      var route = window.location.href,
          sizePixel = this.get('windowWidth');

      if(size === 'small'){
        sizePixel = 768;
      } else if(size === 'xtrSmall') {
        sizePixel = 480;
      } else if(size === 'medium'){
        sizePixel = 992;
      } else if(size === 'large'){
        sizePixel = 1200;
      }
      
      var newWindow = window.open(route, '', 'height=' + this.get('windowHeight') + ', width=' + sizePixel + '');
      newWindow.focus();
    },

    setLayoutStyle: function(setting){
      var self = this;

      if(setting === 'fluid'){
        this.set('isFluidLayout', true);      } else {
        this.set('isFluidLayout', false);
      }

      this.set('isLayoutChanged', true);
      Ember.run.later(function(){
        self.set('isLayoutChanged', false);
      }, 5000);
    },

    expandCollapse: function(){
      if(this.get('isExpanded')){
        this.set('isExpanded', false);
      } else {
        this.set('isExpanded', true);
      }
    }

  }//actions

});
