import Utils from '../src/components/helpers/utils';
import bikes from '../src/components/bikeData';

describe('Function', () => {
  describe('getProperty()', () => {
    it('should return correct value of existed property', () => {
      expect(Utils.getProperty(bikes[0], 'manufacturer')).toBe('KTM');
    });
  });
  
  describe('getTextContent()', () => {
    it('should return correct value of existed property', () => {
      expect(Utils.getTextContent('manufacturer')).toBe('Производитель');
    });
  });
});

