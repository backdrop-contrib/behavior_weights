(function($){
  function sortBackdropBehaviors() {
    var weights = {};
    for (var k in Backdrop.behaviors) {
      var v = Backdrop.behaviors[k];
      var pieces = k.split('.');
      if (pieces.length == 2 && pieces[1] === 'weight') {
        // This v is not a behavior, but a weight setting for another behavior.
        weights[pieces[0]] = v;
        delete Backdrop.behaviors[k];
      }
      else if (typeof weights[k] != 'number') {
        // This v is a behavior object, but it might contain a weight setting.
        if (typeof v == 'object' && v && typeof v.weight == 'number') {
          weights[k] = v.weight;
        }
        else if (weights[k] == undefined) {
          weights[k] = false;
        }
      }
    }

    var ww = [0];
    var by_weight = {0: {}};
    for (var k in weights) {
      if (Backdrop.behaviors[k] == undefined) {
        continue;
      }
      var w = weights[k];
      w = (typeof w == 'number') ? w : 0;
      if (by_weight[w] == undefined) {
        by_weight[w] = {};
        ww.push(w);
      }
      by_weight[w][k] = Backdrop.behaviors[k];
    }
    ww.sort(function(a,b){return a - b;});

    // Other scripts that want to mess with behaviors, will only see those with weight = 0.
    Backdrop.behaviors = by_weight[0];

    var sorted = [];
    for (var i = 0; i < ww.length; ++i) {
      var w = ww[i];
      sorted.push(by_weight[w]);
    }
    return sorted;
  }

  var attachBehaviors_original = Backdrop.attachBehaviors;

  Backdrop.attachBehaviors = function(context, settings) {
    var sorted = sortBackdropBehaviors();
    Backdrop.attachBehaviors = function(context, settings) {
      context = context || document;
      settings = settings || Backdrop.settings;
      // Execute all of them.
      for (var i = 0; i < sorted.length; ++i) {
        $.each(sorted[i], function() {
          if (typeof this.attach == 'function') {
            this.attach(context, settings);
          }
        });
      }
    }
    Backdrop.attachBehaviors.apply(this, [context, settings]);
  };

})(jQuery);

