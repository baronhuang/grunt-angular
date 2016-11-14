/**
 * Created by Administrator on 2015/2/23.
 */

/*所有的公用的filters都在这里了*/
(function(){
    'use strict';
    angular.module('mosign')
        .filter('ellipsis', [function(){
            return function(input, length){
                if(input.length > length){
                    return input.substring(0, length) + '....';
                }else{
                    return input;
                }

            }
        }])
})();
