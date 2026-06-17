function calcular(){
    document.querySelectorAll('input').forEach(input => {

    input.addEventListener('input', function () {

        this.value = this.value.replace(/\D/g, '');

    });

});

    let ingresos =
    parseInt(document.getElementById("ingresos").value) || 0;

    let arriendo =
    parseInt(document.getElementById("arriendo").value) || 0;

    let servicios =
    parseInt(document.getElementById("servicios").value) || 0;

    let alimentacion =
    parseInt(document.getElementById("alimentacion").value) || 0;

    let transporte =
    parseInt(document.getElementById("transporte").value) || 0;

    let deuda =
    parseInt(document.getElementById("deuda").value) || 0;

    let otros =
    parseInt(document.getElementById("otros").value) || 0;

    let gastosBasicos =
        arriendo +
        servicios +
        alimentacion +
        transporte;

    let despuesBasicos =
        ingresos -
        gastosBasicos;

    let despuesDeuda =
        despuesBasicos -
        deuda;

    let dineroLibre =
        despuesDeuda -
        otros;

    let mensaje = "";

    if(dineroLibre > ingresos * 0.20){

        mensaje =
        "🟢 Buen margen";

    }else if(dineroLibre >= 0){

        mensaje =
        "🟡 Bien pero algo pretado";

    }else{

        mensaje =
        "🔴 Tus números no están cerrando";

    }

    document.getElementById("resultado").innerHTML = `
        <div class="card">

            <h2>Resultado</h2>

            <p>
            Dinero después de cubrir lo básico:
            <strong>$${despuesBasicos.toLocaleString()}</strong>
            </p>

            <p>
            Dinero después de pagar deudas:
            <strong>$${despuesDeuda.toLocaleString()}</strong>
            </p>

            <p>
            Dinero real disponible:
            <strong>$${dineroLibre.toLocaleString()}</strong>
            </p>

            <h3>${mensaje}</h3>
            document.querySelectorAll('input[type="number"]').forEach(input => {

        input.addEventListener("wheel", function(e){

        e.target.blur();

    });

});

        </div>
    `;
}