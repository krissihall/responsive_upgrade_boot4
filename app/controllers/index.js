import Ember from 'ember';

export default Ember.Controller.extend({

  isPromoPushDownOpen: false,

  actions: {

    /**
     * Method to invoke slide up animation.
     * Based on component slideup,
     * @method slideUp
     */
    isPromoPushDownOpenSlideUp: function() {
      this.set('isPromoPushDownOpen', false);
    },

    /**
     * Method to invoke slide up animation.
     * Based on component slideDown,
     * @method slideDown
     */
    isPromoPushDownOpenSlideDown: function() {
      this.set('isPromoPushDownOpen', true);
    }

  }//actions

});
