let carrito = [];

document.querySelectorAll('.agregar').forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(e) {
    const productoElemento = e.target.parentElement;
    const nombreProducto = productoElemento.querySelector('h2').innerText;
    const precio = parseFloat(productoElemento.querySelector('p').innerText.replace('Precio: $', ''));
    const color = productoElemento.querySelector('.color').value;
    const talle = productoElemento.querySelector('.talle').value;
    const cantidad = parseInt(productoElemento.querySelector('.cantidad').value);

    const itemCarrito = { nombreProducto, precio, color, talle, cantidad };
    carrito.push(itemCarrito);

    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nombreProducto} (${item.color}, ${item.talle}) - $${item.precio} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    document.getElementById('total').innerText = `Total: $${total}`;
}

document.getElementById('comprar').addEventListener('click', finalizarCompra);

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('No hay productos en el carrito.');
        return;
    }

    const mensaje = carrito.map(item => `${item.nombreProducto} (${item.color}, ${item.talle}) - $${item.precio} x ${item.cantidad}`).join('%0A');
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const link = `https://wa.me/59899890542?text=${mensaje}%0ATotal: $${total}`;
    
    window.open(link, '_blank');
}
