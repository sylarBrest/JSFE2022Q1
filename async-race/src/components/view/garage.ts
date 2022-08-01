interface Garage {
  drawCar(color: string): string;
}

class Garage implements Garage {
  drawCar(color: string): string {
    return `
    <svg class="car-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 125" width="454px" height="125px"><rect x="0" y="0" width="454" height="125" style="fill: white; fill-opacity: 0; pointer-events: none;"/><g transform="matrix(0.9765625596046448, 0, 0, 0.9765625596046448, -23.21494859303357, -188.74765682228812)"><path fill="${color}" d="M355.975 292.25a24.82 24.82 0 1 0 24.82-24.81 24.84 24.84 0 0 0-24.82 24.81zm-253-24.81a24.81 24.81 0 1 1-24.82 24.81 24.84 24.84 0 0 1 24.81-24.81zm-76.67-71.52h67.25l-13.61 49.28 92-50.28h57.36l1.26 34.68 32 14.76 11.74-14.44h15.62l3.16 16c137.56-13 192.61 29.17 192.61 29.17s-7.52 5-25.93 8.39c-3.88 3.31-3.66 14.44-3.66 14.44h24.2v16h-52v-27.48c-1.84.07-4.45.41-7.06.47a40.81 40.81 0 1 0-77.25 23h-204.24a40.81 40.81 0 1 0-77.61-17.67c0 1.24.06 2.46.17 3.67h-36z"/></g></svg>
      `;
  }
}

export default Garage;
