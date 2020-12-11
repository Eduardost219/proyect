var app = angular.module("NodeJSTemplate", [])
app.controller("gatitos", function($scope, $http){

    //crear funcion que limpie el nombre del nuevo gatito
    var limpiar = function(){
        
}

    $http.get("/CrearPelusas").then(
        function(respuesta){
            $http.get("/CrearPelusas").then(function(response){
                $scope.http.Gatitos = response
        })
            console.log(respuesta);
        }
    )
})