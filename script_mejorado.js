let pedido = [];
let total = 0;

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function agregarProducto(nombre, precio, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    for (let i = 0; i < qty; i++) {
        const item = { nombre: nombre, precio: precio };
        pedido.push(item);
        total += precio;
    }

    const li = document.createElement('li');
    li.textContent = `${nombre} - $${precio}`;
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌ Eliminar';
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.style.backgroundColor = '#ff4d4d';
    btnEliminar.style.color = 'white';
    btnEliminar.style.border = 'none';
    btnEliminar.style.borderRadius = '5px';
    btnEliminar.style.cursor = 'pointer';

    btnEliminar.onclick = function() {
        const index = pedido.indexOf(item);
        if (index > -1) {
            pedido.splice(index, 1);
            total -= precio;
            li.remove();
            actualizarMensajeInstagram();
        }
    };

    li.appendChild(btnEliminar);
    document.getElementById('listaPedido').appendChild(li);

    actualizarMensajeInstagram();
}

function actualizarMensajeInstagram() {
    const mensajeDiv = document.getElementById('mensajeInstagram');
    if (pedido.length === 0) {
        mensajeDiv.textContent = 'Tu pedido aparecerá aquí cuando agregues productos';
        document.getElementById('total').textContent = '$0';
        return;
    }
    let mensaje = '🍬 *Pedido para Candy Lul* 🍬\n\n';
    pedido.forEach(item => {
        mensaje += `  *${item.nombre}* $${item.precio}\n`;
    });
    mensaje += `\nTotal: $${total}\n\nEnviado desde https://candylul.github.io/dulce-tentacion/`;
    mensajeDiv.textContent = mensaje;
    document.getElementById('total').textContent = `$${total}`;
}

function copiarMensaje() {
    const mensajeDiv = document.getElementById('mensajeInstagram').textContent;
    navigator.clipboard.writeText(mensajeDiv).then(() => {
        alert('Mensaje copiado al portapapeles ✅');
    }).catch(err => {
        alert('Error al copiar el mensaje ❌');
    });
}

function enviarInstagram() {
    const mensaje = encodeURIComponent(document.getElementById('mensajeInstagram').textContent);
    const url = `https://www.instagram.com/_candy_lul_/`;
    window.open(url, '_blank');
}
