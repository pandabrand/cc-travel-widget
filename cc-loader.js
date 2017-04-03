(function() {
    function async_load(){
      var _css = document.createElement('link');
      _css.setAttribute('rel','stylesheet');
      _css.setAttribute('type','text/css');
      _css.setAttribute('href', 'https://rawgit.com/pandabrand/cc-travel-widget/master/cc-widget.css');
      document.getElementsByTagName('head')[0].appendChild(_css);

      var _js = document.createElement('script');
      _js.type = 'text/javascript';
      _js.async = true;
      _js.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js';
      var _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_js, _jsx);

      var _js2 = document.createElement('script');
      _js2.type = 'text/javascript';
      _js2.async = true;
      _js2.src = 'https://use.fontawesome.com/55857cbf80.js';
      _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_js2, _jsx);

      var _jsCloudinary = document.createElement('script');
      _jsCloudinary.type = 'text/javascript';
      _jsCloudinary.async = true;
      _jsCloudinary.src = 'https://rawgit.com/pandabrand/cc-travel-widget/master/jquery.cloudinary.js';
      _jsx = document.getElementsByTagName('script')[0];
      _jsx.parentNode.insertBefore(_jsCloudinary, _jsx);

      // var _js3 = document.createElement('script');
      // _js3.type = 'text/javascript';
      // _js3.async = true;
      // _js3.src = 'https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js';
      // _jsx = document.getElementsByTagName('script')[0];
      // _jsx.parentNode.insertBefore(_js3, _jsx);
      //
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://rawgit.com/pandabrand/cc-travel-widget/master/ct-payload.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);

      var _jsResponsive = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      _jsResponsive.textContent = '$.cloudinary.responsive()';
      var z = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(_jsResponsive, z);
    }

    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();
