let nombreUsuario = document.querySelector("#exampleInputEmail1");
let contrasena = document.querySelector("#exampleInputPassword");

nombreUsuario.addEventListener("input" ,function () {
    console.log(nombreUsuario.value);
    if (nombreUsuario.value === "") {
        alert ( "ingrese un usuario valido")
     }
 }
 )
 
 /* Respuesta de registro del formulario  */
 
 let formulario = document.querySelector("#formulario");
 
 let info = document.querySelector(".info");
 
 const pintarinfo = formulario.addEventListener("submit", function (e) {
     e.preventDefault();
     info.innerHTML = `
     <div class="alert alert-warning" role="alert">
     <h4> ¡Gracias ${nombreUsuario.value} por registrarse! </h4></div>
     `;
 });
 
 const lista = document.querySelector("#listado")
 
 fetch("data.json")
 .then((resp) => resp.json())
 .then((data) => {
     data.forEach((producto) => {
         const li = document.createElement("div");
         li.innerHTML= `
             <div class="card mb-3" style="width: 18rem;">
                 <div class="card-body">
                 <h5 class="card-title">${producto.nombre}</h5>
                 <p class="card-text">Disponibilidad:${producto.texto}</p>
                 <p class="card-price">Precio: S${producto.precio}</p>
                 <a href="#" class="bPrueba btn btn-primary data-id=1">Comprar</a>
                 </div>
             </div>
         `;
         lista.append(li);
     }
 )
 const btnComprar = document.querySelectorAll(".bPrueba");
 btnComprar.forEach((btn)=>{
     btn.addEventListener("click" , (e)=>{
         chequearPruducto(e.target.parentElement)
     })
 })
})

 
/* Agregar productos y mostrarlos en el carrito    */

// Array vacio para productos

let productosCarrito = []

function chequearPruducto(producto) {
 const infoProducto = {
     titulo: producto.querySelector(".card-title").textContent,
         texto: producto.querySelector(".card-text").textContent,
         precio: producto.querySelector(".card-price").textContent.match(/\d+/g),
         id : producto.querySelector(".btn").getAttribute("data-id"),
     };
     
     
     
     //agrega productos al carrito 
     productosCarrito = [...productosCarrito, infoProducto];
     carritoHtml();
    
     localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
 }
 
 //para que no se repitan los productos cada vez que selecciono "comprar"
  //mostrar los productos en el carrito
 
 
 const carrito = document.querySelector("#carrito");
 
 function carritoHtml() {

     if (productoAgregado) {
         Toast.fire({
           icon: 'success',
           title: 'Producto agregado al carrito!'
         })
       }

     limpiarHtml();
     productosCarrito.forEach((producto)=> {
         
         const agregado = document.createElement("p");
         agregado.innerHTML =  `
         <div class="container">
         <h5>${producto.titulo}</h5>
         <p>${producto.texto}</p>
         <P>${producto.precio}<p>
         <button class="btn btn-danger" id="${producto.id}">Eliminar</button>
         </div>
         `;
         carrito.appendChild(agregado);
     });
     //eliminar productos del carrito 
     let botonesEliminar = document.querySelectorAll(".btn-danger");
     botonesEliminar.forEach((btn) => {
         btn.addEventListener("click" , eliminarProducto)
     });
     //calcular el total 
     let precioTotal = 0;
     productosCarrito.forEach((producto) => {
         console.log(producto)
         precioTotal += parseFloat(producto.precio);
     });
     
     //pintar el total
     let total = document.querySelector("#total");
     if (total) { 
         total.innerHTML = `
         <div class="container">
         <h3>Total: $${precioTotal}</h3>
         <button class="btn btn-success">Confirmar compra!</button>
         </div>
         `;
     }
     //evento boton compra 
     let confirmarCompra = document.querySelectorAll(".btn-success");
     confirmarCompra.forEach((btn) => {
         btn.addEventListener("click" , vaciarCarrito)
      });
 
     
 } 
 function vaciarCarrito(){
     // alert de confirmar compra
     Swal.fire({
         title: 'Finalizar compra?',
         text: " ",
         icon: 'info',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, es mio!'
       }).then((result) => {
         if (result.isConfirmed) {
             Swal.fire(
                 'Gracias por confiar!',
                 'Su compra se ha realizado con exito.',
                 'success'
                 )
                 // vaciar array y locals  
                 productosCarrito = [];
                 localStorage.removeItem("productosCarrito");
                 setTimeout(function(){ location.reload(true); }, 3000);
             }
       })
     
 }
 

 let confirmarCompra = document.querySelectorAll(".btn-success");
     confirmarCompra.forEach((btn) => {
         btn.addEventListener("click" , vaciarCarrito)
     });
     
     // cdn de swet alert
     const Toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: true,
         didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
       }
     })

     let productoAgregado = true;

     

     function eliminarProducto(e) {
         console.log(e);
         console.log(e.target.id);
         
         let id = e.target.id;
         let indiceProducto;
         
         productosCarrito.forEach((producto, index) => {
             if(producto.id === id) {
                 indiceProducto = index;
             }
         });
         
         productosCarrito.splice(indiceProducto,1);
         carritoHtml();

      }  


         function limpiarHtml() {
             carrito.innerHTML = "";
         }

 const limpiarCarrito = document.querySelectorAll("#prueba");
 limpiarCarrito.forEach((prueba)=>{
     btn.addEventListener("click" , (e)=>{
         filtrarDelete()
 })
})

function filtrarDelete () {
 productosCarrito.filter(productosCarrito => titulo.texto != limpiarCarrito)
}

let productosCarritoLocalStorage = JSON.parse(localStorage.getItem("productosCarrito"));
 if(productosCarritoLocalStorage) {
     productosCarrito = productosCarritoLocalStorage;
     carritoHtml();
} 

