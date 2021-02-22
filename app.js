var testApp = angular.module('testApp', ['ngRoute', 'ngResource', 'chart.js']);
var requestHeader = {
    getHeader: {
        'headers': {
            'accept': 'application/json;odata=nometadata'
        }
    },
    postHeader: {
        'headers': {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            'content-type': 'application/json;odata=verbose',
            'accept': 'application/json;odata=verbose'
        }
    },
    deleteHeader: {
        'headers': {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            'content-type': 'application/json;odata=verbose',
            "IF-MATCH": "*"
        }
    },
    updateHeader: {
        'headers': {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            'content-type': 'application/json;odata=verbose',
            'accept': 'application/json;odata=verbose',
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        }
    },
};
testApp.factory('myService', function ($http) {
    var promise;
    //    alert(promise)
    var myService = {
        async: function () {
            if (!promise) {
                // $http returns a promise, which has a then function, which also returns a promise
                promise = $http.get(_spPageContextInfo.webAbsoluteUrl + '/_api/web/currentuser?$select=Title,Email', requestHeader.getHeader).then(function (response) {
                    // The then function here is an opportunity to modify the response
                    //                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
            }
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});
testApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/', {
        templateUrl: 'rp_latestRequests.html',
    }).when('/current', {
//        controller: 'currentUser',
        templateUrl: 'rp_latestRequests.html',
    })
        .when('/queue', {
        templateUrl: 'rp_queue.html',
    })
        .when('/history', {
//        controller: 'currentUser',
        templateUrl: 'rp_history.html',
    })
        .when('/admin', {
        controller: 'mainController',
        templateUrl: 'rp_admin.html',
    })
        .when('/form', {
        templateUrl: 'rp_form.html',
    })
        .when('/allRequests', {
        templateUrl: 'rp_allrequests.html',
    })
        .when('/reports', {
        templateUrl: 'rp_reports.html',
    })
        .when('/admin/:param1', {
        controller: 'paramController',
        templateUrl: 'rp_edit.html',
    })
        .when('/remove/:param2', {
        controller: 'removeController',
        templateUrl: 'rp_remove.html',
    })
}]);


testApp.component('phoneList', {
    template: '<div class="col-md-2 h-100 bg-primary"></div>',
    controller: 'mainController'
  });



testApp.filter('statusFilter', function () {
    return function (input) {
        if (input == 3 || input == 'Finished') {
            return ['Finished', 'text-success']
        } else if (input == 2 || input == 'Cleaning') {
            return ['Cleaning', 'text-warning']
        } else if (input == 1 || input == 'Printing') {
            return ['Printing', 'text-warning']
        } else {
            return ['Waiting', 'text-danger']
        }
    }
})
testApp.filter('testFilter', function () {
    return function (collection, column) {
        var total = 0;
        collection.forEach(function (item) {
            total += parseInt(item[column]);
        });
        return total;
    };
})
testApp.filter('minutesToDHM', [function () {
    return function (input) {
        var inp = new Date(0, 0, 0, 0, input, 0); // assumes minutes as an input
        var m = inp.getMinutes();
        var h = inp.getHours();
        var d = inp.getDay();
        return d + 'd ' + h + 'h ' + m + 'm ';
    };
}])
testApp.controller('removeController', ['$http', '$scope', '$log', '$resource', '$routeParams', '$location', '$route', function ($http, $scope, $log, $resource, $routeParams, $location, $route) {
    $scope.param2 = $routeParams.param2;
    $scope.deleteItem = function (itemID) {
        $http.delete(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items(" + itemID + ")", requestHeader.deleteHeader).then(function () {
                alert('successful')
                $scope.$emit('someEvent');
                $location.path("admin");
            }),
            function (response) {
                alert('remove was unsucessful')
            }
    }
}]);
testApp.controller('paramController', ['$http', '$scope', '$log', '$resource', '$routeParams', '$location', '$route', 'myService', function ($http, $scope, $log, $resource, $routeParams, $location, $route, myService) {
    $scope.param1 = $routeParams.param1;
    const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    const requestOptions = {
        headers: new Headers(headerDict),
    };
    myService.async().then(function (response) {
        getUserContent(response)
    })

    function getUserContent(data) {
        //        console.log(data)
        $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items?$select=User_x0020_Name,Project_x0020_Number,Date_x0020_Requested&$filter=(Title eq '" + data.Email + "')&$orderby=(Created) desc", requestHeader.getHeader).then(function (response) {
            //            console.log(response)
            $scope.usersData = {
                name: data.Title,
                email: data.Email,
                pn: response.data.value[0].Project_x0020_Number || '',
                date: response.data.value[0].Date_x0020_Requested || '',
                history: response.data.value
            }
            //            $log.info($scope)
        }, function (response) {
            $scope.content = "Something went wrong";
        });
    }
    $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items(" + $scope.param1 + ")", requestOptions).then(function (response) {
        $scope.editMenuItems = response.data;
        $scope.editMenuItems.JSONitem = JSON.parse($scope.editMenuItems.Sample_x0020_Names_x0020_and_x00)
        angular.forEach($scope.editMenuItems.JSONitem, function (item) {
            item.hours = parseInt(item.hours)
            item.minutes = parseInt(item.minutes)
        })
        calcCost()
        $log.info($scope)
    }, function (response) {
        $scope.content = "Something went wrong";
    });
    $scope.repop = function (index) {
        //        alert($scope.editMenuItems.JSONitem[index].hours)
        $scope.editMenuItems.JSONitem[index].hours = $scope.editMenuItems.JSONitem[index].hours
        $scope.editMenuItems.JSONitem[index].minutes = $scope.editMenuItems.JSONitem[index].minutes
        calcCost()
        //        $log.info($scope)
    }

    function calcCost() {
        if ($scope.editMenuItems.totalTime) {
            $scope.editMenuItems.totalTime = 0
        }
        angular.forEach($scope.editMenuItems.JSONitem, function (item) {
            if (!$scope.editMenuItems.totalTime) {
                $scope.editMenuItems.totalTime = (item.hours * 60 + item.minutes) * item.quantity
            } else {
                $scope.editMenuItems.totalTime += (item.hours * 60 + item.minutes) * item.quantity
            }
        })
    }
}]);

testApp.controller('mainController', ['$http', '$scope', '$log', '$resource', '$routeParams', '$location', '$route', 'myService', function ($http, $scope, $log, $resource, $routeParams, $location, $route, myService) {
    myService.async().then(function (response) {
        getUserContent(response)
    })
    $scope.pricePerHour = 21.62
    //    $scope.testing = [1, 2, 3];
    $scope.date = new Date();
    $scope.param1 = $routeParams.param1;
    $scope.searchOptions = {
        "User_x0020_Name": "Name",
        "Title": "Email",
        "Cost_x0020_Center": "Cost Center",
        "Project_x0020_Number": "Project Number",
        "Cost_x0020_Center": "Cost Center"
    };
    $scope.options = {
        legend: {
            display: true
        }
    };

    function getUserContent(data) {
        //        console.log(data)
        $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items?$select=User_x0020_Name,Project_x0020_Number,Date_x0020_Requested&$filter=(Title eq '" + data.Email + "')&$orderby=(Created) desc", requestHeader.getHeader).then(function (response) {
            //            console.log(response)
            $scope.usersData = {
                name: data.Title,
                email: data.Email,
                pn: response.data.value[0].Project_x0020_Number || '',
                date: response.data.value[0].Date_x0020_Requested || '',
                history: response.data.value
            }
            //            $log.info($scope)
        }, function (response) {
            $scope.content = "Something went wrong";
        });
    }
    $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items?$orderby=(Created) desc").then(function (response) {
        $scope.queue = response.data.value;
        $scope.headers = Object.keys($scope.queue[0])
    }, function (response) {
        $scope.content = "Something went wrong";
    });
    $scope.$emit('someEvent')
    $scope.$on('someEvent', function (event) {
        $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items?$select=User_x0020_Name,Title,Cost_x0020_Center,Print_x0020_Time_x0020_Hours,Print_x0020_Time_x0020_Minutes").then(function (response) {
            //        $scope.queue2 = response.data.value;
            $scope.reportDataPersons = {}
            $scope.reportDataCC = {}
            //        var p = []
            angular.forEach(response.data.value, function (item) {
                if (!$scope.reportDataCC[item.Cost_x0020_Center]) {
                    $scope.reportDataCC[item.Cost_x0020_Center] = {
                        'cc': item.Cost_x0020_Center,
                        'tt': Math.round((item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60) * 100) / 100,
                        'p': {}
                    }
                    if (!$scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name]) {
                        $scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name] = {
                            'name': item.User_x0020_Name,
                            'time': Math.round((item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60) * 100) / 100
                        }
                    } else {
                        $scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name].time = Math.round(($scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name].time + (item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60)) * 100) / 100
                    }
                } else {
                    $scope.reportDataCC[item.Cost_x0020_Center].tt = Math.round(($scope.reportDataCC[item.Cost_x0020_Center].tt + (item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60)) * 100) / 100
                    if (!$scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name]) {
                        $scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name] = {
                            'name': item.User_x0020_Name,
                            'time': Math.round((item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60) * 100) / 100
                        }
                    } else {
                        $scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name].time = Math.round(($scope.reportDataCC[item.Cost_x0020_Center].p[item.User_x0020_Name].time + (item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60)) * 100) / 100
                    }
                }
                if (!$scope.reportDataPersons[item.User_x0020_Name]) {
                    $scope.reportDataPersons[item.User_x0020_Name] = {
                        'name': item.User_x0020_Name,
                        'cc': item.Cost_x0020_Center,
                        'tt': Math.round((item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60) * 100) / 100
                    }
                } else {
                    $scope.reportDataPersons[item.User_x0020_Name].tt = Math.round(($scope.reportDataPersons[item.User_x0020_Name].tt + (item.Print_x0020_Time_x0020_Hours + item.Print_x0020_Time_x0020_Minutes / 60)) * 100) / 100
                }
            })
            $scope.report1cc = []
            $scope.report1t = []
            $scope.report2name = []
            $scope.report2t = []
            for (prop in $scope.reportDataCC) {
                $scope.report1cc.push($scope.reportDataCC[prop].cc)
                $scope.report1t.push($scope.reportDataCC[prop].tt)
            }
            for (prop in $scope.reportDataPersons) {
                $scope.report2name.push($scope.reportDataPersons[prop].name)
                $scope.report2t.push($scope.reportDataPersons[prop].tt)
            }
            $log.info($scope);
        }, function (response) {
            $scope.content = "Something went wrong";
        });
        //        alert('function run');
        //        $log.info($scope)
    });
}]);


//
//testApp.controller('currentUser', ['$http', '$scope', 'myService', function ($http, $scope, myService) {
//    myService.async().then(function (response) {
//        getUserContent(response)
//    })
//
//    function getUserContent(data) {
//        //        console.log(data)
//        $http.get(_spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getbytitle('Prototyping Request Data')/items?$select=User_x0020_Name,Project_x0020_Number,Date_x0020_Requested&$filter=(Title eq '" + data.Email + "')&$orderby=(Created) desc", requestHeader.getHeader).then(function (response) {
//            //            console.log(response)
//            $scope.usersData = {
//                name: data.Title,
//                email: data.Email,
//                pn: response.data.value[0].Project_x0020_Number || '',
//                date: response.data.value[0].Date_x0020_Requested || '',
//                history: response.data.value
//            }
//            //            $log.info($scope)
//        }, function (response) {
//            $scope.content = "Something went wrong";
//        });
//    }
//}]);
