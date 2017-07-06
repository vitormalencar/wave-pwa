import {h} from 'preact';

const ActionButton = ({randomTrack}) => (
  <section class="shuffle" onClick={randomTrack}>
    <p>
      Random
    </p>
  </section>

);

export default ActionButton;
