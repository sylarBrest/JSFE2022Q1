import AppView from '../src/components/view/appView';
import BikeStorage from '../src/components/controller/bikeStorage';
import Filters from '../src/components/controller/applyFilters';

describe('Class objects', () => {
  it('should be instance of class', () => {
    expect(new AppView()).toBeInstanceOf(AppView);
  });

  it('should be instance of class', () => {
    expect(new BikeStorage()).toBeInstanceOf(BikeStorage);
  });

  it('should be defined', () => {
    expect(new BikeStorage().getBikesFromStorage()).toBeDefined();
  });

  it('should be undefined', () => {
    expect(new Filters().resetFilters()).toBeUndefined();
  });
});
