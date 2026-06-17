function calcular(){

    let ingresos =
        Number(document.getElementById("ingresos").value);

    let arriendo =
        Number(document.getElementById("arriendo").value);

    let servicios =
        Number(document.getElementById("servicios").value);

    let alimentacion =
        Number(document.getElementById("alimentacion").value);

    let transporte =
        Number(document.getElementById("transporte").value);

    let deuda =
        Number(document.getElementById("deuda").value);

    let otros =
        Number(document.getElementById("otros").value);

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

        </div>
    `;
}