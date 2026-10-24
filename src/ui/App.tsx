import { useEffect, useState } from 'react';
import { asignatura as A } from '../contenido/asignatura';
import { cargar, guardar } from '../estado/almacen';
import { cerrarJornada, iniciarJornada, leerBoletin, progresoInicial, siguienteJornada } from '../motor/partida';
import type { InformeJornada, Progreso } from '../motor/tipos';
import { Boletin } from './Boletin';
import { Informe } from './Informe';
import { Inicio } from './Inicio';
import { Mesa } from './Mesa';
import { PantallaProgreso } from './PantallaProgreso';

type Pantalla = 'inicio' | 'progreso' | 'boletin' | 'mesa' | 'informe';

export function App() {
  const [progreso, setProgreso] = useState<Progreso>(() => cargar(A));
  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [informe, setInforme] = useState<InformeJornada | null>(null);

  useEffect(() => {
    guardar(A, progreso);
  }, [progreso]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pantalla]);

  const terminar = (p: Progreso) => {
    const r = cerrarJornada(A, p);
    setProgreso(r.progreso);
    setInforme(r.informe);
    setPantalla('informe');
  };

  const empezar = (numero: number, base: Progreso = progreso) => {
    setProgreso(iniciarJornada(A, { ...base, jornadaEnCurso: null }, numero));
    setPantalla('boletin');
  };

  const continuar = (base: Progreso = progreso) => {
    const s = siguienteJornada(A, base);
    const j = base.jornadaEnCurso;
    if (s.enCurso && j) {
      if (j.terminada) return terminar(base);
      setPantalla(j.boletinLeido ? 'mesa' : 'boletin');
      return;
    }
    empezar(s.numero, base);
  };

  switch (pantalla) {
    case 'progreso':
      return <PantallaProgreso asig={A} progreso={progreso} onVolver={() => setPantalla('inicio')} />;
    case 'boletin':
      if (!progreso.jornadaEnCurso) return null;
      return (
        <Boletin
          asig={A}
          progreso={progreso}
          onSalir={() => setPantalla('inicio')}
          onAbrirVentanilla={() => {
            setProgreso(leerBoletin(A, progreso));
            setPantalla('mesa');
          }}
        />
      );
    case 'mesa':
      if (!progreso.jornadaEnCurso) return null;
      return <Mesa asig={A} progreso={progreso} setProgreso={setProgreso} onSalir={() => setPantalla('inicio')} onTerminar={(p) => terminar(p)} />;
    case 'informe':
      return informe ? <Informe asig={A} progreso={progreso} informe={informe} onContinuar={() => continuar()} onMenu={() => setPantalla('inicio')} /> : null;
    default:
      return (
        <Inicio
          asig={A}
          progreso={progreso}
          onContinuar={() => continuar()}
          onJornada={(n) => empezar(n)}
          onProgreso={() => setPantalla('progreso')}
          onImportar={(p) => setProgreso(p)}
          onReiniciar={() => setProgreso(progresoInicial(A))}
        />
      );
  }
}
