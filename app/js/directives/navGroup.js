/**
 * Created by Administrator on 2015/2/25.
 */

/*全局的nav*/
(function(){
    'use strict';
    angular.module('mosign')
        .directive('navGroup', ['$rootScope',
        function($rootScope){
            return {
                restrict: 'EA',
                replace:true,
                scope: {
                    active: '=',
                    abc:'@',
                    abdd:'&'
                },
                templateUrl: 'view/directives/navGroup.html',
                link: function(scope, element, attrs){
                    console.log(element)
                    var $li = element.find('>li');
                    if(scope.active == ''){
                        $li.eq(0).addClass('active');
                    }else{
                        element.find('li>a[href=#' + scope.active + ']').parent().addClass('active');
                    }

                    $li.each(function(i, item){
                        var href = $(item).find('a').attr('href');

                    })
                    $li.click(function(){
                        var _this = $(this);
                        _this.siblings().removeClass('active');
                        _this.addClass('active');
                    });
                }
            }
        }])
})();