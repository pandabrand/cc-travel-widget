(function() {
    function async_load(){
      var _css = document.createElement('link');
      _css.setAttribute('rel','stylesheet');
      _css.setAttribute('type','text/css');
      _css.setAttribute('href', 'http://www.collidetravel.com/css/cc-widget.css');
      document.getElementsByTagName('head')[0].appendChild(_css);

      var _js = document.createElement('script');
      _js.type = 'text/javascript';
      _js.async = true;
      _js.src = '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js';
      var _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_js, _jsx);

      var _js2 = document.createElement('script');
      _js2.type = 'text/javascript';
      _js2.async = true;
      _js2.src = 'https://use.fontawesome.com/55857cbf80.js';
      _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_js2, _jsx);

      var _js3 = document.createElement('script');
      _js3.type = 'text/javascript';
      _js3.async = true;
      _js3.src = 'https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js';
      _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_js3, _jsx);

      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'http://www.collidetravel.com/js/ct-payload.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }

    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();
