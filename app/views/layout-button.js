import Ember from 'ember';

export default Ember.View.extend({

  templateName: 'layout-button',
  tagName: 'button',
  classNames: ['btn', 'btn-xs', 'col-xs-6'],
  classNameBindings: ['isActive:btn-default:btn-drop'],
  isActive: false,

  isLayoutSelectionChanged: function(){
    this.set('isActive', false);
    if(this.get('link') === 'fluid' && this.get('isActiveLayout')){
      this.set('isActive', true);
    } else if(this.get('link') === 'fixed' && !this.get('isActiveLayout')){
      this.set('isActive', true);
    }
  }.observes('isActiveLayout'),

  click: function(){
    this.get('controller').send('setLayoutStyle', this.get('link'));
  },

  willInsertElement: function(){
    if(this.get('link') === 'fluid' && this.get('isActiveLayout')){
      this.set('isActive', true);
    } else if(this.get('link') === 'fixed' && !this.get('isActiveLayout')){
      this.set('isActive', true);
    }
  }

});
