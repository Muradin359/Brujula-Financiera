// =========================================
// Validación y formato de números
// =========================================

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", function () {

        this.value = formatearNumero(this.value);

    });

});

function formatearNumero(valor){

    valor = valor.replace(/\D/g,'');

    if(valor === ""){
        return "";
    }

    return Number(valor).toLocaleString("es-CL");

}

function obtenerNumero(id){

    return Number(

        document
        .getElementById(id)
        .value
        .replace(/\./g,"")

    ) || 0;

}

// =========================================
// Cálculo principal
// =========================================

function calcular(){

    // ---------- Entradas ----------

    let ingresos = obtenerNumero("ingresos");
    let arriendo = obtenerNumero("arriendo");
    let servicios = obtenerNumero("servicios");
    let alimentacion = obtenerNumero("alimentacion");
    let transporte = obtenerNumero("transporte");
    let deuda = obtenerNumero("deuda");
    let otros = obtenerNumero("otros");

    // ---------- Cálculos ----------

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

    // ---------- Mensaje ----------

    let mensaje = "";

    if(dineroLibre > ingresos * 0.20){

        mensaje =
        "🧭 Tu brújula apunta a un buen rumbo financiero.";

    }
    else if(dineroLibre >= 0){

        mensaje =
        "🧭 Vas por buen camino, pero con poco margen.";

    }
    else{

        mensaje =
        "🧭 Tu brújula indica que es momento de ajustar el rumbo.";

    }

    // ---------- Porcentajes ----------

    let porcentajeBasicos = 0;
    let porcentajeDeuda = 0;
    let porcentajeOtros = 0;
    let porcentajeLibre = 0;

    if(ingresos > 0){

        porcentajeBasicos = (gastosBasicos / ingresos) * 100;
        porcentajeDeuda = (deuda / ingresos) * 100;
        porcentajeOtros = (otros / ingresos) * 100;
        porcentajeLibre = (dineroLibre / ingresos) * 100;

    }

    porcentajeBasicos = Math.max(0, Math.min(100, porcentajeBasicos));
    porcentajeDeuda = Math.max(0, Math.min(100, porcentajeDeuda));
    porcentajeOtros = Math.max(0, Math.min(100, porcentajeOtros));
    porcentajeLibre = Math.max(0, Math.min(100, porcentajeLibre));

    // ---------- Resultado ----------

    document.getElementById("resultado").innerHTML = `

        <div class="card">

            <h2>Resultado</h2>

            <h3>${mensaje}</h3>

            <h2>Distribución de tus ingresos</h2>

            <div class="barra-item">

                <span>
                    Costo de vida (${porcentajeBasicos.toFixed(0)}%)
                </span>

                <div class="barra">

                    <div
                        class="relleno basicos"
                        style="width:${porcentajeBasicos}%">
                    </div>

                </div>

            </div>

            <div class="barra-item">

                <span>
                    Deuda mensual (${porcentajeDeuda.toFixed(0)}%)
                </span>

                <div class="barra">

                    <div
                        class="relleno deuda"
                        style="width:${porcentajeDeuda}%">
                    </div>

                </div>

            </div>

            <div class="barra-item">

                <span>
                    Otros gastos (${porcentajeOtros.toFixed(0)}%)
                </span>

                <div class="barra">

                    <div
                        class="relleno otros"
                        style="width:${porcentajeOtros}%">
                    </div>

                </div>

            </div>

            <div class="barra-item">

                <span>
                    Dinero libre (${porcentajeLibre.toFixed(0)}%)
                </span>

                <div class="barra">

                    <div
                        class="relleno libre"
                        style="width:${porcentajeLibre}%">
                    </div>

                </div>

            </div>

            <hr>

            <p>

                Dinero después de cubrir lo básico:

                <strong>

                    $${despuesBasicos.toLocaleString("es-CL")}

                </strong>

            </p>

            <p>

                Dinero después de pagar tus deudas:

                <strong>

                    $${despuesDeuda.toLocaleString("es-CL")}

                </strong>

            </p>

            <p>

                Dinero real disponible:

                <strong>

                    $${dineroLibre.toLocaleString("es-CL")}

                </strong>

            </p>

        </div>

    `;

}
async function enviarEncuesta(){

    const boton = document.querySelector(".encuesta button");

    const datos = {

        nombre: document.getElementById("nombre").value.trim(),

        utilidad: document.getElementById("utilidad").value,

        usaria: document.getElementById("usaria").value,

        precio: document.getElementById("precio").value,

        funcion: document.getElementById("funcion").value,

        comentario: document.getElementById("comentario").value.trim()

    };

    // Validación

    if(datos.nombre === ""){

        alert("Por favor ingresa un nombre o alias.");

        return;

    }

    if(datos.utilidad === ""){

        alert("Selecciona si la evaluación te fue útil.");

        return;

    }

    if(datos.usaria === ""){

        alert("Selecciona si utilizarías Brújula Financiera.");

        return;

    }

    if(datos.precio === ""){

        alert("Selecciona cuánto estarías dispuesto a pagar.");

        return;

    }

    if(datos.funcion === ""){

        alert("Selecciona la función que más te interesa.");

        return;

    }

    boton.disabled = true;

    boton.textContent = "Enviando...";

    try{

        const respuesta = await fetch("https://script.google.com/macros/s/AKfycbzTBCQr6emOdcYck-LnDnW8BFzCA5YVwYHeU6PcMiTCRWnQ0CBtPUzM7ZQBfrmmBEoK9w/exec",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        });

        const resultado = await respuesta.json();

        if(resultado.estado === "ok"){

            alert("🧭 ¡Muchas gracias!\n\nTu opinión fue registrada correctamente.");

            document.getElementById("nombre").value = "";

            document.getElementById("utilidad").value = "";

            document.getElementById("usaria").value = "";

            document.getElementById("precio").value = "";

            document.getElementById("funcion").value = "";

            document.getElementById("comentario").value = "";

        }
        else{

            alert("Ocurrió un problema al guardar la encuesta.");

        }

    }
    catch(error){

        console.error(error);

        alert("No fue posible conectar con el servidor.");

    }

    boton.disabled = false;

    boton.textContent = "Enviar opinión";

    }