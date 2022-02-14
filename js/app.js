const ingresos=[
    new Ingreso('Sueldo',2100.00),
    new Ingreso('Venta Coche',1500)
];

const egresos=[
    new Egreso('Renta Departamento',900),
    new Egreso('Ropa',400)
];

let cargarApp=()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let totalIngresos=()=>{
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso +=ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos=()=>{
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
let cargarCabecero=()=>{
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso=totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML=formatoMoneda(presupuesto); 
    document.getElementById('porcentaje').innerHTML= formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML=formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());
}

const formatoMoneda=(valor)=>{

   return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}
const formatoPorcentaje=(valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2})
}

const cargarIngresos=()=>{
    let ingresosHTML='';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;
}

const crearIngresoHTML=(ingreso)=>{
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">
        <p>${ingreso.descripcion}</p>
    </div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">
            <p>+ ${formatoMoneda(ingreso.valor)}</p>
        </div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" 
                onclick='eliminarIngreso(${ingreso.id})' ></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso=(id)=>{
let indiceEliminar=ingresos.findIndex(ingreso=> ingreso.id === id);
 ingresos.splice(indiceEliminar,1);
cargarCabecero();
cargarIngresos();

}
const cargarEgresos=()=>{
    let egresosHTML='';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=egresosHTML;
}

const crearEgresosHTML=(egreso)=>{
    let egresoHTML=` <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">
        <p>${egreso.descripcion}</p>
    </div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">
            <p>- ${formatoMoneda(egreso.valor)}</p>
        </div>
        <div class="elemento_porcentaje">
            <p> ${formatoPorcentaje(egreso.valor/totalEgresos())}</p>
        </div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" 
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
  
</div>
    `;
    return egresoHTML;
}
const eliminarEgreso=(id)=>{
let indiceEliminar=egresos.findIndex(egreso=>egreso.id===id);
egresos.splice(indiceEliminar,1);
cargarCabecero();
cargarEgresos();
}

const agregarDato=()=>{
    let forma=document.forms['forma'];
    let tipo=forma['tipo'];
    let descripcion=forma['descripcion'];
    let valor=forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value ==='ingreso'){
            ingresos.push(new Ingreso( descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}