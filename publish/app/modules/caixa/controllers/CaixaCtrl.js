(function () {
    //'use strict';

    angular
        .module('app')
        .controller('CaixaCtrl', CaixaCtrl);


    CaixaCtrl.$inject = ['$scope', '$http', 'CaixaRepository'];


    //app.filter('UnsafeHtml', ["$sce",
    //    function ($sce) {
    //        return function (val) {
    //            return $sce.trustAsHtml(val);
    //        };
    //    }
    //]);

    function CaixaCtrl($scope, $http, CaixaRepository) {
        $scope.todo = {
            id: 0,
            descricao: '',
            valor: 0,
            tipo: 0,
            saldo: 0,
            data: null,
            dataInsercao: null
        }

        $scope.HtmlData = "<b>Hi Roadid. </b>";
        $scope.todos = [];

        Load();
       
        //VoteLoad();



        $scope.click = function () {
            //    console.log("button clicked");
            //  $scope.order.showPopupAddedToCart = !$scope.order.showPopupAddedToCart;

            var doc = new jsPDF();
            doc.text(20, 20, 'Relatorio do Caixa');


            var text = []
            for (let x = 0; x < $scope.todos.length; x = x + 1) {
                var date = new Date($scope.todos[x].data);
                date = format(date, 'dd-MM-yyyy hh:mm');

                if ($scope.todos[x].tipo == 0) {

                    text.push(date + ' - ' + ' ' + $scope.todos[x].descricao + ' \t (' + $scope.todos[x].valor + ')');
                } else {
                    // doc.text(20, 20, '\n' + $scope.todos[x].data + ' - ' + $scope.todos[x].valor + ' ' + $scope.todos[x].descricao);
                    text.push(date + ' - ' + ' ' + $scope.todos[x].descricao + ' \t ' + $scope.todos[x].valor);
                }
            }
                      
           
            doc.text(text, 10, 30)
            var date = new Date();
            date = format(date, 'dd-MM-yyyy');
            // Save the PDF
            doc.save('RelatorioCaixa_' + date+'.pdf');


        };


        $scope.loadSaldo = function () {
          
            var saldo=0;
            angular.forEach($scope.todos, function (todo) {
                if (todo.tipo == 0) {
                    saldo = saldo - todo.valor;
                } else {
                    saldo = saldo + todo.valor;
                }
            });

           
            return saldo.toFixed(2);


        };



        $scope.loadDespesa = function () {
            //    console.log("button clicked");
            //  $scope.order.showPopupAddedToCart = !$scope.order.showPopupAddedToCart;

            var despesa = 0;
            angular.forEach($scope.todos, function (todo) {
                if (todo.tipo == 0) {
                    despesa = despesa + todo.valor;
                } 
            });

            // Save the PDF
            return despesa.toFixed(2);


        };

        $scope.loadReceita = function () {
            //    console.log("button clicked");
            //  $scope.order.showPopupAddedToCart = !$scope.order.showPopupAddedToCart;

            var receita = 0;
            angular.forEach($scope.todos, function (todo) {
                if (todo.tipo != 0) {
                    receita = receita + todo.valor;
                } 
            });

            // Save the PDF
            return receita.toFixed(2);


        };





        //$scope.HTMLclick = function () {

        //    console.log("starting HTMLclick");
        //    var pdf = new jsPDF('p', 'pt', 'letter');

        //    // source can be HTML-formatted string, or a reference
        //    // to an actual DOM element from which the text will be scraped.

        //    var source = $scope.HtmlData;

        //    // we support special element handlers. Register them with jQuery-style 
        //    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        //    // There is no support for any other type of selectors 
        //    // (class, of compound) at this time.

        //    var specialElementHandlers = {
        //        // element with id of "bypass" - jQuery style selector
        //        '#bypassme': function (element, renderer) {
        //            // true = "handled elsewhere, bypass text extraction"
        //            return true;
        //        }
        //    };

        //    var margins = {
        //        top: 80,
        //        bottom: 60,
        //        left: 40,
        //        width: 522
        //    };

        //    console.log("Building  HTML" + source);
        //    // all coords and widths are in jsPDF instance's declared units
        //    // 'inches' in this case
        //    pdf.fromHTML(
        //        source // HTML string or DOM elem ref.
        //        , margins.left // x coord
        //        , margins.top // y coord
        //        , {
        //            'width': margins.width // max width of content on PDF
        //            ,
        //            'elementHandlers': specialElementHandlers
        //        },
        //        function (dispose) {
        //            // dispose: object with X, Y of the last line add to the PDF 
        //            //          this allow the insertion of new lines after html

        //            //Didn't work
        //            //   console.log("Saving HTMLclick");
        //            // pdf.save('Test.pdf');
        //        },
        //        margins
        //    );

        //    console.log("after from HTML.");
        //    pdf.save('Test.pdf');

        //};



        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.statusTarefa ? 0 : 1;
            });
            return count;
        };

        $scope.remainingVote = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.statusTarefa ? 0 : 1;
            });
            return count;
        };

        $scope.user = function () {
            loadUser();
            return $scope.usuario.nome;
        };

        $scope.loadPanel = function (valor) {
            return getNum(valor);


        };

        $scope.checkCaixaTipo = function (tipo) {

            if (tipo != null) {
                var valor = tipo.valor.toFixed(2);

                if (tipo.tipo == "0") {

                    document.getElementById('saldo' + tipo.id).innerHTML = '<i class=\"fa fa-minus\" style=\'color: red;\'></i>' + valor;

                }
                else {

                    document.getElementById('saldo' + tipo.id).innerHTML = '<i class=\"fa fa-plus\" style=\'color: green;\'></i>' + valor;



                }
                loadSaldo();
            }
        };


        function loadUser() {


            $scope.usuario = {
                id: localStorage.getItem('id'),
                nome: localStorage.getItem('nome'),
                email: localStorage.getItem('email'),
                tipo: localStorage.getItem('tipo')
            };
            checkUser();
        };



        $scope.upVote = function (todo) {

            toastr.warning("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Voce só poderá votar 1 vez nesta enquete, está certo do seu voto?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            $scope.usuarioVoto = {
                                enquete: todo.id,
                                usuario: localStorage.getItem('id'),
                                tipoVoto: 1,
                            };
                            if (todo.id > 0) {
                                VoteTask($scope.usuarioVoto);
                                todo.enableVote = false;
                            } else {

                                toastr.error("Salve a enquete antes para poder votar!!!");
                            }
                        });
                    }
                });


        };

        $scope.downVote = function (todo) {
            toastr.warning("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Voce só poderá votar 1 vez nesta enquete, está certo do seu voto?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            $scope.usuarioVoto = {
                                enquete: todo.id,
                                usuario: localStorage.getItem('id'),
                                tipoVoto: 0,
                            };
                            if (todo.id > 0) {

                                VoteTask($scope.usuarioVoto);
                            } else {

                                toastr.error("Salve a enquete antes para poder votar!!!");
                            }
                        });
                    }
                });

        };

        $scope.sync = function () {
            Sync();
            VoteLoad();
            //location.reload();
        }

        $scope.save = function (todo,tipe) {


            if (todo.id == 0 && todo.descricao != '' && todo.valor> 0) {


                if (tipe == 'plus') {
                    todo.tipo = '1';

                }
                else {
                    todo.tipo = '0';
                }

                var date = new Date();
                todo.data = format(date, 'yyyy-MM-dd hh:mm');
                todo.dataInsercao = format(date, 'yyyy-MM-ddThh:mm');
                Save($scope.todo);
                Sync();
              
            } else {
                toastr.warning('Por favor preencha corretamente todos os campos obrigatórios!');
            }
            New();
        }

        format = function date2str(x, y) {
            var z = {
                M: x.getMonth() + 1,
                d: x.getDate(),
                h: x.getHours(),
                m: x.getMinutes(),
                s: x.getSeconds()
            };
            y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
            });

            return y.replace(/(y+)/g, function (v) {
                return x.getFullYear().toString().slice(-v.length)
            });
        }

        $scope.new = function () {
            New();
        }

        $scope.edit = function (todo) {
            $scope.todo = todo;
        }

        $scope.delete = function (todo) {
            toastr.error("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Sim</button>", 'Deseja realmente apagar?',
                {

                    allowHtml: true,
                    onShown: function (toast) {
                        $("#confirmationRevertYes").click(function () {
                            Delete(todo);
                            var index = $scope.todos.indexOf(todo)
                            $scope.todos.splice(index, 1);
                        });
                    }
                });

        }

      

        function Save(item) {
            //item.id = $scope.todos.length + 1;

            $scope.todos.push(item);
        }

        function Delete(item) {
            CaixaRepository
                .delete(item)
                .then(
                    function (result) {

                        toastr.info(result.data, "Deletado com sucesso!")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function VoteTask(item) {
            CaixaRepository
                .vote(item)
                .then(
                    function (result) {

                        toastr.info(result.data, "Votado com sucesso!")
                        VoteLoad();
                    },
                    function (error) {
                        toastr.error(error.data, "Falha no voto");
                    });
        }


        function getNum(val) {
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }

        //function VoteLoad() {
        //    CaixaRepository
        //        .loadVote()
        //        .then(
        //            function (result) {
        //                for (let i = 0; i < $scope.todos.length; i = i + 1) {
        //                    $scope.todos[i].negativeVote = 0;
        //                    $scope.todos[i].positiveVote = 0;

        //                    for (let x = 0; x < result.data.length; x = x + 1) {

        //                        if (result.data[x].enquete == $scope.todos[i].id) {

        //                            if (result.data[x].tipoVoto == 0) {
        //                                if (isNaN($scope.todos[i].negativeVote)) {
        //                                    $scope.todos[i].negativeVote = 0;
        //                                    $scope.todos[i].negativeVote = $scope.todos[i].negativeVote + 1;

        //                                } else {
        //                                    $scope.todos[i].negativeVote = $scope.todos[i].negativeVote + 1;
        //                                }



        //                            } else {

        //                                if (isNaN($scope.todos[i].positiveVote)) {
        //                                    $scope.todos[i].positiveVote = 0;
        //                                    $scope.todos[i].positiveVote = $scope.todos[i].positiveVote + 1;
        //                                } else {

        //                                    $scope.todos[i].positiveVote = $scope.todos[i].positiveVote + 1;
        //                                }




        //                            }

        //                        }



        //                    }
        //                    //result.data[0]

        //                }

        //                toastr.info(result.data, "Votos Carregados!")
        //            },
        //            function (error) {
        //                toastr.error(error.data, "Falha no voto");
        //            });
        //}

        function New() {
            var date = new Date();
            var dateformated = format(date, 'yyyy-MM-ddThh:mm');
            $scope.todo = {
                id: 0,
                descricao: '',
                valor: 0,
                tipo: 0,
                saldo: 0,
                data: dateformated,
                dataInsercao: dateformated

            }
        }




        function Load() {
            if (navigator.onLine) {
                ReadCloud();
                document.getElementById("mySidenav").style.visibility = "visible";
            } else {
                ReadLocal();
                document.getElementById("mySidenav").style.visibility = "visible";
            }
        }

        function Sync() {
            if (navigator.onLine) {
                SaveCloud();
            } else {
                SaveLocal();
            }
        }

        function ReadLocal() {
            $scope.todos = angular.fromJson(localStorage.getItem("todos"));
            toastr.info('Informações carregadas do disco local...', 'Tudo certo!');
        }

        function SaveLocal() {
            localStorage.setItem("todos", angular.toJson($scope.todos));
            toastr.warning('Informações persistidas localmente...', 'Sincronizando');
        }

        function ReadCloud() {
            CaixaRepository
                .getTodos()
                .then(
                    function (result) {
                        for (let i = 0; i < result.data.length; i = i + 1) {


                            result.data[i].data = result.data[i].data.replace(' ', 'T');

                            if (result.data[i].dataInsercao != null) {
                                result.data[i].dataInsercao = result.data[i].dataInsercao.replace(' ', 'T');
                            }
                        }
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }



        function ReadVote() {
            CaixaRepository
                .getTodos()
                .then(
                    function (result) {
                        for (let i = 0; i < result.data.length; i = i + 1) {
                            result.data[i].data = result.data[i].data.replace(' ', 'T');
                            result.data[i].dataInsercao = result.data[i].dataInsercao.replace(' ', 'T');
                        }
                        $scope.todos = result.data;
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }

        function SaveCloud() {
            CaixaRepository
                .sync($scope.todos)
                .then(
                    function (result) {

                        for (let i = 0; i < $scope.todos.length; i = i + 1) {

                            $scope.todos[i].id = result.data[i].id;
                            $scope.todos[i].data = $scope.todos[i].data.replace(' ', 'T');
                            $scope.todos[i].dataInsercao = $scope.todos[i].dataInsercao.replace(' ', 'T');

                        }
                        toastr.info(result.data, "Sincronização completa")
                    },
                    function (error) {
                        toastr.error(error.data, "Falha na requisição");
                    });
        }
    }
})();
