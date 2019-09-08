  M.AutoInit();
  // Or with jQuery
  let options = {};
  document.addEventListener('DOMContentLoaded', function() {
    var nav = document.querySelectorAll('.sidenav');
    var tab = document.querySelectorAll('.tabs');
     M.Sidenav.init(nav, options);
     M.Tabs.init(tab, options);
  });
  $(document).ready(function(){
    $('.tabs').tabs();
  });
  