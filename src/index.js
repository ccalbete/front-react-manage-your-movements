import React from 'react';
import ReactDOM from 'react-dom';

function MostrarHola({ texto, segundoTexto, children }) {
  return (<>
    <p>mostrar Hola</p>
    <p>texto</p>
    <p>segundoTexto</p>
    {children}
  </>);
}

ReactDOM.render(
  <div>
    <MostrarHola texto="Primer texto" segundoTexto="Segundo"><p>"prueba"</p></MostrarHola>
  </div>,
  document.getElementById('root')
);