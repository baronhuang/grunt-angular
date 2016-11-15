/**
 * Created by Administrator on 2015/2/23.
 */

/*记事本列表模块*/
(function(){
    'use strict';
    angular.module('mosign')
        .controller('listCtrl', ['$scope', 'mosignHttp', function ($scope, mosignHttp) {

            $scope.listNotes = function(){
                mosignHttp.listNotes().success(function(data){
                    if(data.statusCode == 200){
                        var data = data.data;
                        if($.isArray(data)){
                            console.log(data)
                            $scope.dataList = data;
                        }
                    }

                })
            }

            $scope.removeNote = function(id){
                mosignHttp.removeNote({id:id}).success(function(data){
                    if(data.statusCode == 200){
                        alert('删除成功！');
                        $scope.listNotes();
                    }
                })
            }

            $scope.listNotes();

        }])
})();
