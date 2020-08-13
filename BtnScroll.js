
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.imgScroll = factory(root.jQuery);
    }
}(this, function ($) {
    var BtnScroll = function (opt) {
        //valores por defecto
        var _d = {
            wrap: null,         // Contenedor base
            listTag: "ul",      // Objeto lista
            btn01: null,        // Boton de desplazamiento hacia arriba
            btn02: null,        // Boton de desplazamiento hacia abajo
            speed: 500          // Velocidad de animacion
        };

        // Extractor de parametros
        var arg = $.extend(_d, opt);                
        var list = $(arg.wrap).find(arg.listTag);
        var btn01 = $(arg.wrap).find(arg.btn01);
        var btn02 = $(arg.wrap).find(arg.btn02);
        var len = list.find("li").length;
        var index = 1;
        var s = arg.speed;

        // Botón de desplazamiento hacia arriba
        $(btn01).click(function (e) {
            e.preventDefault();
            console.log("Bajando lista...");   
            if (len <= 0 || list.is(":animated")) { return false; }                     
            index--;
            if (index < 1) {
                index = 1;
                return false;
            } else {
                var _h = $(list.find("li").get(0)).css("height").replace("px", "");
                var _s = $(list).css("margin-top").replace("px", "");
                var calc = (Number(_h) + 5);
                var rcalc = (Number(_s) + calc );

                list.stop().animate({ "margin-top": rcalc }, s); 
            }
        });
        //Boton de desplazamiento hacia abajo
        $(btn02).click(function (e) {
            e.preventDefault();
            if (len <= 0 || list.is(":animated")) { return false; }
          
            if (index === len) {
                index = len;
                return false;
            } else {
                var _h = $(list.find("li").get(0)).css("height").replace("px", "");
                list.stop().animate({ "margin-top": (-_h + -5) * index }, s);
                index++;
            }
        });
    };
    $.fn.BtnScroll = function (opt) {
        var ext = {
            wrap: $(this)
        };
        opt = $.extend(opt, ext);
        BtnScroll(opt);
    };
    return BtnScroll;
}));
