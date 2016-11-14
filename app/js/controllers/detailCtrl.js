/**
 * Created by Administrator on 2015/2/23.
 */

/*详细信息模块*/
(function(){
    'use strict';
    angular.module('mosign')
        .controller('detailCtrl', ['$scope', '$routeParams', 'mosignHttp',
        function ($scope, $routeParams, mosignHttp) {
            $scope.getNote = function(){
                mosignHttp.getNote({id:$routeParams.id}).success(function(data){
                    $scope.note = data;
                })
            }
            $scope.getNote();

        }]);
})();