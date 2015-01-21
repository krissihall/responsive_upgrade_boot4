import Ember from 'ember';
// import {requestFullscreen, exitFullscreen} from 'fullscreen';

/**
 * components/slide-in.js
 *
 * Component for a page which slides in on top of another.
 * Takes a single parameter, `up`, bound to boolean variable.
 * Styled via styles/components/slide-in.styl.
 * 
 * @example
 *   {{#slide-in over=slide-in-login}}
 *     <div id="login">Login</div>
 *   {{/slide-in}}
 *
 * The above can be placed anywhere on the page. In practice, it would best be placed
 * at the bottom, outside the 'container'.
 *
 * The `full` parameter may be given to force to slide-in to occupy the page.
 *
 * An element inside the slide-in may use `{{action 'close' target='view'}}`.
 *
 * The `fullscreen` method has been implemented for fun, but should not be used:
 * * Probably doesn't work on Safari mobile.
 * * May nag user with messages asking permission to go full screen.
 *
 * @module components
 */

export default Ember.Component.extend({

  classNames: ['slide-in'],
  classNameBindings: ['slideInOpen', 'slideInDir', 'slideInFull', 'slideIn90'],
  slideInOpen: Ember.computed.alias('over'),

  slideInDir: function() {
    return "slide-in-dir-" + this.get('dir');
  }.property('dir'),

  slideInFull: Ember.computed.bool('full'),

  /**
   * Should the slide-in occupy the whole screen?
   *
   * @property full
   */
  full: false,

  /**
   * Should body also scroll in concert?
   *
   * @property body
   */
  body: false,

  /**
   * Should scrolling on the <body> tag be disabled?
   *
   * @property disableBodyScroll
   */
  disableBodyScroll: false,

  /**
   * Should the slide-in go to 90%?
   *
   * @property slideTo90
   */
  slideIn90: false,

  /**
   * Direction of sliding--up or down, left or right.
   *
   * @property dir
   */
  dir: 'up', // or 'down', or 'right', or 'left'

  method: 'scrollTo', /* or 'fullscreen' */

  /**
   * Enter or leave full-screen mode when sliding up or down.
   *
   * @method upDidChange
   */
  overDidChange: function() {

    var over = this.get('over'),
        dir = this.get('dir'),
        vertical = dir === 'up' || dir === 'down';

    switch (this.get('method')) {

      // case 'fullscreen':
      //   if (over) {
      //     requestFullscreen.call(document.documentElement);
      //   } else {
      //     exitFullscreen.call(document);
      //   }
      //   break;
        
      case 'scrollTo':
        if (over) {
          window.scrollTo(0, 1);
          this.set('oldPos', document.body.scrollTop);
        } else {
          window.scrollTo(0, this.get('oldPos'));
        }
        break;
      
    }

    if(this.get('disableBodyScroll') && this.get('over')){
      document.body.className += " disableScroll";
    } else {
      document.body.classList.remove('disableScroll');
    }

    // Send an 'adjust' action with direction and offset.
    // The invoker of the component can handle this to arrange other part of the page.
    // Specifically, the `bodyMargins` action handler on the application route
    // will juggle the page around in a useful way.
    this.sendAction(
      'adjust',
      vertical ? 'top' : 'left', 
      !over ? 0 : (dir === 'up' || dir === 'left' ? -1 : 1) * 
        this.get('element')[
          vertical ? 'offsetHeight' : 'offsetWidth'
        ]
    );

  }.observes('over'),
  
  actions: {

    close: function() {
      this.set('over', false);
    }

  }
  
});
