//Core
import React from "react";
//Styles
import styles from "./styles.module.scss";

function HelpModal(props) {
  function closeModal() {
    props.onClose();
  }
  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className={styles.background} />
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.title}>Hulp</span>
          <br />
          <br />
          <p>
            Welkom bij Keytask. Hier kunnen taken worden opgegeven die developers moeten uitvoeren. Zij zijn zelf vrij in het oppakken van deze taken.
            Een nieuwe taak kan aangemaakt worden door op de kaart "Nieuwe taak aanmaken" te klikken. Hierdoor verschijnt een paneel waar de gegevens van de nieuwe taak ingevuld kunnen worden.
            </p>
            <p>
            Bij het aanmaken van een nieuwe taak kan er voor worden gekozen om punten handmatig in te voeren of deze automatisch te laten berekenen aan de hand van prioriteit en deadline.
            Een Gamemaster zal regulier controleren of hier geen misbruik van wordt gemaakt.
            </p>
          <div className={styles.button} onClick={closeModal}>
            Begrepen
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpModal;
