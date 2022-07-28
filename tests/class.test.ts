import AppView from '../src/components/view/appView';
import BikeStorage from '../src/components/controller/bikeStorage';
import Filters from '../src/components/controller/applyFilters';

describe('Class', () => {
  describe('AppView', () => {
    it('should be instance of class AppView', () => {
      expect(new AppView()).toBeInstanceOf(AppView);
    });
  });

  describe('BikeStorage', () => {
    it('should be instance of class BikeStorage', () => {
      expect(new BikeStorage()).toBeInstanceOf(BikeStorage);
    });

    describe('method', () => {
      it('getBikesFromStorage() should return defined value', () => {
        expect(new BikeStorage().getBikesFromStorage()).toBeDefined();
      });

      it('resetFilters() should be void', () => {
        expect(new Filters().resetFilters()).toBeUndefined();
      });
    });
  });
});
