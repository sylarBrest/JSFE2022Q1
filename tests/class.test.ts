import AppView from '../src/components/view/appView';
import BikeStorage from '../src/components/controller/bikeStorage';

describe('Class objects', () => {
  it('should be undefined', () => {
    expect(new AppView()).toBeInstanceOf(AppView);
  });

  it('should be defined', () => {
    expect(new BikeStorage().getBikesFromStorage()).toBeDefined();
  });

});
