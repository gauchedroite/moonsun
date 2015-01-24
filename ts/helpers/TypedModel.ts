
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
