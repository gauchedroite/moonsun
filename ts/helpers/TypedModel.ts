/*
 * This class is commented out because it's not needed right now
 * and I want to remove the dependency on Backbone (+jQuery +underscore) for this project.
 * 
 * Reference: http://stackoverflow.com/questions/15298215/backbone-and-typescript-an-unhappy-marriage-building-a-type-safe-get
 * 

import Backbone = require("backbone");


class TypedModel<t> extends Backbone.Model {
  constructor(attributes?: t, options?: any) {
    super(attributes, options);

    var defaults = this.defaults();
    for (var key in defaults) {
      var value = defaults[key];

      ((k: any) => {
        Object.defineProperty(this, k, {
          get: (): typeof value => {
            return this.get(k);
          },
          set: (value: any) => {
            this.set(k, value);
          },
          enumerable: true,
          configurable: true
        });
      })(key);
    }
  }

  public defaults(): t {
    throw new Error('You must implement this');
    return <t>{};
  }
}


export = TypedModel;
*/
