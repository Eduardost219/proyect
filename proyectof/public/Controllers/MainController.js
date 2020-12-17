var app = angular.module("njst", [])

app.controller("gatitos", function($scope, $http){
    $scope.Gatos = [ ]

    $scope.gato = {    }

    
    var ActualizarUI = function(){
        $http.get("/MostrarGatitos").then(function (response) {
            $scope.Gatitos = response.data;
            $scope.gato.name = "";
        })
    }

    ActualizarUI()
    

    $scope.Agregar = function (){
        $http.post("/CrearGatito", $scope.gato).then(function (response){
            console.log(response)
            ActualizarUI()
        })
    }

    $scope.Actualizar = function (id){
        $http.get("/ObtenerGatito/" + id, $scope.gato).then(function (response){
            $scope.Gato = response.data;
        })
    }
    
    $scope.Borrar = function (id){
        $http.delete("/BorrarGatito/" + id ).then(function(response){
            console.log(response)
            ActualizarUI()
        })
    }


    


})