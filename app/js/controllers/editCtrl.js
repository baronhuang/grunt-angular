/**
 * Created by Administrator on 2015/2/23.
 */

/*编辑模块*/
(function(){
    'use strict';
    angular.module('mosign')
        .controller('editCtrl', ['$scope', '$location', 'mosignHttp', '$routeParams',
        function ($scope, $location, mosignHttp, $routeParams) {
            $scope.note = {};
            var isUpdate = !!$routeParams.id; //有ID则证明是编辑模式
            $scope.saveNote = function(){
                var params = $scope.note;
                var operate;
                if(isUpdate){
                    operate = mosignHttp.updateNote;
                }else{
                    operate = mosignHttp.createNote;
                }

                operate(params).success(function(data){
                    console.log(data);
                    if(data.statusCode == 200){
                        alert('保存成功！');
                        $location.path('list');
                    }
                })

            }

            /*如果有id参数，则证明是编辑*/
            if(isUpdate){
                mosignHttp.getNote({id:$routeParams.id}).success(function(data){
                    if(data.statusCode == 200){
                        $scope.note = data.data;

                    }

                })
            }
        }]);
})();

