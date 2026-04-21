import {
  isClearOrPartlyCloudy,
  isOvercast,
  isThunderstorm,
  hasPrecipitation,
  isHeavySnow,
} from '../weatherHelpers';

describe('weatherHelpers', () => {
  describe('isClearOrPartlyCloudy', () => {
    it('should return true for clear weather codes', () => {
      expect(isClearOrPartlyCloudy(0)).toBe(true);
      expect(isClearOrPartlyCloudy(1)).toBe(true);
      expect(isClearOrPartlyCloudy(2)).toBe(true);
    });

    it('should return false for non-clear codes', () => {
      expect(isClearOrPartlyCloudy(3)).toBe(false);
      expect(isClearOrPartlyCloudy(45)).toBe(false);
      expect(isClearOrPartlyCloudy(51)).toBe(false);
      expect(isClearOrPartlyCloudy(95)).toBe(false);
    });
  });

  describe('isOvercast', () => {
    it('should return true for overcast codes', () => {
      expect(isOvercast(3)).toBe(true);
      expect(isOvercast(45)).toBe(true);
      expect(isOvercast(48)).toBe(true);
    });

    it('should return false for non-overcast codes', () => {
      expect(isOvercast(0)).toBe(false);
      expect(isOvercast(51)).toBe(false);
      expect(isOvercast(71)).toBe(false);
    });
  });

  describe('isThunderstorm', () => {
    it('should return true for thunderstorm codes', () => {
      expect(isThunderstorm(95)).toBe(true);
      expect(isThunderstorm(96)).toBe(true);
      expect(isThunderstorm(99)).toBe(true);
    });

    it('should return false for non-thunderstorm codes', () => {
      expect(isThunderstorm(0)).toBe(false);
      expect(isThunderstorm(51)).toBe(false);
      expect(isThunderstorm(71)).toBe(false);
    });
  });

  describe('hasPrecipitation', () => {
    it('should return true for precipitation codes', () => {
      expect(hasPrecipitation(51)).toBe(true); // Light drizzle
      expect(hasPrecipitation(61)).toBe(true); // Slight rain
      expect(hasPrecipitation(63)).toBe(true); // Moderate rain
    });

    it('should return true for snow codes', () => {
      expect(hasPrecipitation(71)).toBe(true);
      expect(hasPrecipitation(73)).toBe(true);
      expect(hasPrecipitation(75)).toBe(true);
    });

    it('should return true for thunderstorm codes', () => {
      expect(hasPrecipitation(95)).toBe(true);
      expect(hasPrecipitation(96)).toBe(true);
      expect(hasPrecipitation(99)).toBe(true);
    });

    it('should return false for clear/overcast codes', () => {
      expect(hasPrecipitation(0)).toBe(false);
      expect(hasPrecipitation(1)).toBe(false);
      expect(hasPrecipitation(3)).toBe(false);
      expect(hasPrecipitation(45)).toBe(false);
    });
  });

  describe('isHeavySnow', () => {
    it('should return true for heavy snow codes', () => {
      expect(isHeavySnow(75)).toBe(true);
      expect(isHeavySnow(86)).toBe(true);
    });

    it('should return false for other snow codes', () => {
      expect(isHeavySnow(71)).toBe(false);
      expect(isHeavySnow(73)).toBe(false);
      expect(isHeavySnow(77)).toBe(false);
      expect(isHeavySnow(85)).toBe(false);
    });

    it('should return false for non-snow codes', () => {
      expect(isHeavySnow(0)).toBe(false);
      expect(isHeavySnow(51)).toBe(false);
      expect(isHeavySnow(95)).toBe(false);
    });
  });
});
