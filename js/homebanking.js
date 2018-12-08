//Declaración de variables

var nombreUsuario = "";
var saldoCuenta = 10000;
var limiteExtraccion = 1000;
var acumulacionDeExtracciones = 0;
var servicio = '';
    //Cuentas Amigas
var cuentasAmigas = {
    1234567: 'Josue' ,
    7654321: 'Gustavo'
}

//Declaracion de funciones.

function sumarDineroCuenta(monto){
    saldoCuenta = saldoCuenta + monto;
}

function restarDineroCuenta (monto){
    saldoCuenta = saldoCuenta - monto;
}

    // Función utilizadad para entregar unicamente billetes de 100.
function multiploDeCien (extraccion){
    return (extraccion % 100) === 0;
}

    //Impide que se supere el limite de extracción guardando las extracciones realizadas en una variable.
function controlLimiteDeExtraccion (extraccion){
    var control = acumulacionDeExtracciones + extraccion;
    if (control <= limiteExtraccion){
        acumulacionDeExtracciones = acumulacionDeExtracciones + extraccion;
        return true;
    } 
}

    //Pregunta al usuario que servicio desea pagar.
function eleccionDeServicio (){
    servicio = prompt('INGRESE EL NÚMERO QUE CORRESPONDA AL SERVICIO QUE DESEA PAGAR.' + '\n' + '\n' + '1-Agua' +
     '\n' + '2-Telefono' + '\n' + '3-Luz' + '\n' + '4-Internet');
        servicio = parseInt(servicio);
}
    //Confirmación pago servicio

    function confirmacionPagoServicio(nombre, costo){
        
        var confirmacion = confirm('El servicio de ' + nombre + ' tiene un costo de: $' + costo + '.' +
        '\n' + '¿Desea realizar el pago?');
        if (confirmacion === true){
            saldoCuenta = saldoCuenta - costo;
                alert('El servicio de AGUA se pago correctamente.');
                actualizarSaldoEnPantalla();
            }
    }

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.

window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar

function cambiarLimiteDeExtraccion(limite) {
    
    var limite = prompt('Define un limite de extraccion');
    limite = parseInt(limite);
        if (!isNaN(limite)){
           limiteExtraccion = limite;
           alert('Su nuevo limite de extraccion es de: $' + limiteExtraccion);
           actualizarLimiteEnPantalla();
        } else{
            alert('Ingrese un monto valido');
        }
}

function extraerDinero(extraccion) {
    
    var saldoAnterior = saldoCuenta;
    var extraccion = prompt('¿Cuanto dinero desea retirar?');
        extraccion = parseInt(extraccion);
        
        if(Number.isInteger(extraccion)){
            if (extraccion <= saldoCuenta){
                if (controlLimiteDeExtraccion(extraccion)){
                    if (multiploDeCien(extraccion)){
                        restarDineroCuenta(extraccion);
                        alert('DATOS DE LA OPERACION ' + '\n' + '\n' + 'Monto extraido : $' + extraccion + '\n' + 'Saldo anterior : $' +
                        saldoAnterior + '\n' + 'Saldo actual : $' + saldoCuenta );
                        actualizarSaldoEnPantalla();
                    } else{
                        alert( 'Unicamente entregamos billetes de 100 pesos');
                    }
                } else{
                    alert('A superado el limite de exraccion');
                }
                  
            } else{
                alert('Saldo insuficiente');
            }
        } else {
            alert('Ingrese un monto valido');
        } 
}

function depositarDinero(deposito) {
    
    var saldoAnterior = saldoCuenta;
    var deposito = prompt('¿Cuanto dinero desea depositar?');
        deposito = parseInt(deposito);
        
        if (Number.isInteger(deposito)){
           sumarDineroCuenta(deposito);
           alert('DATOS DE LA OPERACION ' + '\n' + '\n' + 'Monto depositado : $' + deposito + '\n' + 'Saldo anterior : $' + saldoAnterior +
           '\n' + 'Saldo actual : $' + saldoCuenta );
           actualizarSaldoEnPantalla();
        } else {
            alert('Ingrese un monto valido');
        }
}

function pagarServicio() {
    
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;
        eleccionDeServicio();
            if (saldoCuenta > servicio){
                switch (servicio){
                    
                    case 1:
                        var costo = agua;
                        var nombre = 'Agua';
                        confirmacionPagoServicio(nombre, costo);
                        break
                    case 2:
                        var costo = telefono;
                        var nombre = 'Teléfono';
                        confirmacionPagoServicio(nombre, costo);
                        break
                    case 3:
                        var costo = luz;
                        var nombre = 'Luz';
                        confirmacionPagoServicio(nombre, costo);
                        break
                    case 4:
                        var costo = internet;
                        var nombre = 'Internet';
                        confirmacionPagoServicio(nombre, costo);
                        break
                    default:
                        alert('El servicio seleccionado no existe'); 
                    }
        } else if (saldoCuenta < servicio){
            alert('No hay dinero suficiente en su cuenta para pagar el/los servicios');
    }
}

function transferirDinero() {
    var montoATransferir = prompt('Cuanto dinero desea transferir');
        montoATransferir = parseInt(montoATransferir);
        if (Number.isInteger(montoATransferir)){
            if (montoATransferir <= saldoCuenta) {
                var numeroDeCuenta = prompt('Ingrese el numero de cuenta destino.');
                    numeroDeCuenta = parseInt(numeroDeCuenta);
                if (cuentasAmigas[numeroDeCuenta] !== undefined && cuentasAmigas[numeroDeCuenta] === 'Josue' ||
                    cuentasAmigas[numeroDeCuenta] === 'Gustavo') {
                    var confirmacionDeTransferencia = confirm('CONFIRMACIÓN DE LA TRANSFERENCIA' + '\n' +
                    + '\n' + 'Monto: $' + montoATransferir + '\n' + 'Cuenta destino: ' + numeroDeCuenta);
                    if (confirmacionDeTransferencia === true){
                        saldoCuenta = saldoCuenta - montoATransferir;
                            alert('Se han transferido: $' + montoATransferir + '\n' +
                            'Cuenta destino: ' + numeroDeCuenta);
                            actualizarSaldoEnPantalla();
                    }
                } else {
                            alert('La cuenta destino es incorrecta.');
                }
            } else {
                alert('Saldo Insuficiente');
            }
        }else {
            alert('Ingrese un monto valido');
        }
}


function iniciarSesion() {
    var baseDeDatosUsuarios = {Pablo: '1238' , Juan:'3265' , Rodrigo: '3293' , Santiago: '4321'}; 
    var usuario = prompt('Ingrese su usuario');
    var contraseña = prompt(usuario + '\n' +' Ingrese su contraseña');
        if(usuario !== undefined && contraseña !== undefined && baseDeDatosUsuarios[usuario] === contraseña){
            alert('Bienvenido ' + usuario + ' ya podes empezar a realizar operaciones!');
            nombreUsuario = usuario;
        } else{
                alert('Su nombre de usuario o contraseña son incorrectos');
                saldoCuenta = 0;
        }
}

//Funciones que actualizan el valor de las variables en el HTML

function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}