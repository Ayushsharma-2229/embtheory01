(function($){
  'use strict';
  $.fn.multipleFilterMasonry = function(options){
    var cache=[];
    var filters = [];
    var msnry ;

    if(options.selectorType === "list") {
      $(options.filtersGroupSelector).children().each(function() {
        filters.push($(this).data("filter"));
      });
    }

    //the main job of the function is to cache the item,because we are going to filter the items later
    var init = function($container){
      $container.find(options.itemSelector).each(function(){
        cache.push($(this));

      });
      
      msnry = new Masonry($container[0],{
        options
      }) 
      $container.masonry(options);
       if($container.find('.before-after-container').length){
            $container.find(".before-after-container").twentytwenty();
            
         }
    };

    //filter items in cache
    var filterItems = function(selector){
      var result=[];
      $(cache).each(function(item){

        $(selector).each(function(index,sel) {

          if(cache[item].is(sel)){
            if($.inArray(cache[item], result) === -1) result.push(cache[item]);
          }
        });
      });

      return result;
    };

    //reload masonry
    var reload = function($container,items){
      var cls  = $container.find(options.columnWidth).attr('class');
      var anim_type = $container.data('anim');
     
      $container.empty();

      $(items).each(function(){
        $(this).addClass(anim_type).addClass('start_animation');
        $($container).append($(this));


      });
      if(cls !=='undefined'){
            $($container).append('<div class="'+cls+'">');
      }
  
      if($container.find('.before-after-container').length){
            $container.find(".before-after-container").twentytwenty();
            
         }

       var msnry = new Masonry($container[0],options);

       msnry.reloadItems();
       msnry.layout(); 
       

    };

    // Hash filter
    var hashFilter = function($container) {
      var hash = window.location.hash.replace("#", "");
      if($.inArray(hash, filters) !== -1) {
        reload($container, $("." + hash));
      }
    };

    var proc = function($container){
      var btns = $(options.filtersGroupSelector).find('input[type="checkbox"]');
      btns.each(function(){
      
        $(this).change(function(){
            btns.prop('checked', false);
            $(this).prop('checked',true);
          var selector = [];
          btns.removeClass('selected');
          btns.each( function() {
            if ( $(this).is(':checked') ) {
              $(this).addClass("selected");
              selector.push( "." + $(this).val() );
            }
          });
          var items = cache;
          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container,items);
        });
      });
    };

    var procUL = function($container){
      var btns = $(options.filtersGroupSelector).children();
      btns.each(function(){
        $(this).click(function(){
          btns.removeClass('selected');
          window.location.hash = $(this).data("filter");
          var selector = [];
          selector.push( "." + $(this).data("filter") );
          $(this).addClass("selected");
          var items = cache;

          if (selector.length > 0) {
            items = filterItems(selector);
          }
          reload($container,items);
        });
      });

      hashFilter($container);
      btns.removeClass('selected');
      $('.filters li[data-filter="'+window.location.hash.replace("#", "")+'"]').addClass("selected");
    };

    return this.each(function() {
      var $$ = $(this);
      init($$);
      options.selectorType === "list" ? procUL($$) : proc($$);
    });
  };
}(window.jQuery));
