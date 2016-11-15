/**
 * Created by Administrator on 2015/2/23.
 */

/*所有请求服务都放在这里*/
(function(){
    'use strict';
    angular.module('mosign')
        .factory('mosignHttp', ['$http', function($http){
            var URL = MOSIGN_CONFIG.httpUrl;
            return {
                /*记事本列表*/
                listNotes: function(params){
                    var method = "GET"
                        ,url = URL + 'listNotes'
                    return $http({method:method, url:url, params:params});
                },
                /*新建记事本*/
                createNote:function(params){
                    var method = "POST"
                        ,url = URL + 'createNote';
                    return $http({method:method, url:url, data:params});
                },
                /*更新记事本*/
                updateNote:function(params){
                    var method = "POST"
                        ,url = URL + 'updateNote';
                    return $http({method:method, url:url, data:params});
                },
                /*删除记事本*/
                removeNote:function(params){
                    var method = "GET"
                        ,url = URL + 'removeNote';
                    return $http({method:method, url:url, params:params});
                },
                /*获取记事本详细信息*/
                getNote:function(params){
                    var method = "GET"
                        ,url = URL + 'getNote';
                    return $http({method:method, url:url, params:params});
                }
            }
        }]);
})();