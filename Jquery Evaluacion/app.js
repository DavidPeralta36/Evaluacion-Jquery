let baraja = [];
let carta;
let totalPuntosJugador = 0;
let totalPuntosComputadora = 0;
const letrasss = ['J','Q','K','A'];

function crearbaraja(){
    baraja=[];
    const numeros = [2,3,4,5,6,7,8,9,10];
    const letras = ['J','Q','K','A'];
    const palo = ['C','D','H','S'];

    for(const n of numeros){
        for(const p of palo){
            baraja.push(n + p)
        }
    }

    letras.forEach((l)=>{
        palo.forEach((p)=>{
            baraja.push(l + p)
        })
    })

    baraja = _.shuffle(baraja);
    console.log(baraja);

}


function valor(carta){
    let valorcarta = carta.substring(0, carta.length -1);

    if(letrasss.includes(valorcarta)){
        return valorcarta === 'A' ? 11:10;
    } else{
        return parseInt (valorcarta);
    }

}


function turnoJugador(){
    carta = baraja.shift();
    $('#cartasJugador').html($('#cartasJugador').html()+`<img src='./cartas/${carta}.png'>`);
    totalPuntosJugador += valor(carta);
    $('#puntosJugador').text(totalPuntosJugador);
    if(totalPuntosJugador > 21){
        $('#btn-card').attr('disabled','true');
        $('#btn-stop').attr('disabled','true');
        turnoComputadora();
    }

}

$('#btn-card').click(function(){
    turnoJugador();
});

function mensajeJugador(mensajeJugador){
    $('#mensajeGanador').text(mensajeJugador);
    $('#mensajeGanador').removeClass('hidden');
}

function turnoComputadora(){
    let ganajugador = true;

    do{
        carta = baraja.shift();
        $('#cartasComputadora').html($('#cartasComputadora').html() + `<img src='./cartas/${carta}.png'>`);
        totalPuntosComputadora += valor(carta);
        $('#puntosComputadora').text(totalPuntosComputadora);
        if(totalPuntosJugador > 21){
            ganajugador = false;
            mensajeJugador(ganajugador ? 'El jugador gano' : 'La computadora gana');
            break;
        }
    } while (totalPuntosComputadora <= 21 && totalPuntosComputadora < totalPuntosJugador);

    if(totalPuntosComputadora <= 21 && totalPuntosComputadora >= totalPuntosComputadora){
        ganajugador = false;
        mensajeJugador (ganajugador ? 'El jugador gano' : 'La computadora gana');
    }

    mensajeJugador (ganajugador ? 'El jugador gano' : 'La computadora gana');

    if(ganajugador){
        $('#mensajeGanador').removeClass('lose');
        $('#mensajeGanador').addClass('win');
    }else{
        $('#mensajeGanador').removeClass('win');
        $('#mensajeGanador').addClass('lose');
    }
}


$('#btn-stop').click(function(){
    turnoComputadora();
    $('#btn-card').attr('disabled','true');
    $('#btn-stop').attr('disabled','true');
});

function nuevoJuego(){
    $('#cartasJugador').html('');
    $('#cartasComputadora').html('');
    console.clear();
    crearbaraja();
    totalPuntosComputadora =0;
    totalPuntosJugador=0;
    $('#puntosJugador').text(totalPuntosJugador);
    $('#puntosComputadora').text(totalPuntosComputadora);
    $('#btn-card').removeAttr('disabled');
    $('#btn-stop').removeAttr('disabled');
    $('#mensajeGanador').addClass('hidden');
}

$('#btn-new').click(function(){
    nuevoJuego();
})

/////
crearbaraja();