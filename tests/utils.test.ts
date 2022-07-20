import Utils from '../src/components/helpers/utils';
import bikes from '../src/components/bikeData';

describe('Clean functions', () => {
  it('should return value of property', () => {
    expect(Utils.getProperty(bikes[0], 'manufacturer')).toBe('KTM');
  });

  it('should return value of property', () => {
    expect(Utils.getTextContent('manufacturer')).toBe('Производитель');
  });
});

