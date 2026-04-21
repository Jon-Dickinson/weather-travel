import { clamp, scoreLabel, indoorScoreLabel } from '../scoringUtils';

describe('scoringUtils', () => {
  describe('clamp', () => {
    it('should return 0 for negative values', () => {
      expect(clamp(-10)).toBe(0);
      expect(clamp(-1)).toBe(0);
    });

    it('should return 100 for values over 100', () => {
      expect(clamp(101)).toBe(100);
      expect(clamp(150)).toBe(100);
    });

    it('should return rounded values between 0 and 100', () => {
      expect(clamp(50)).toBe(50);
      expect(clamp(75.4)).toBe(75);
      expect(clamp(75.6)).toBe(76);
    });

    it('should clamp boundary values correctly', () => {
      expect(clamp(0)).toBe(0);
      expect(clamp(100)).toBe(100);
    });
  });

  describe('scoreLabel', () => {
    it('should return "Excellent" for scores >= 80', () => {
      expect(scoreLabel(80)).toBe('Excellent');
      expect(scoreLabel(90)).toBe('Excellent');
      expect(scoreLabel(100)).toBe('Excellent');
    });

    it('should return "Good" for scores 60-79', () => {
      expect(scoreLabel(60)).toBe('Good');
      expect(scoreLabel(70)).toBe('Good');
      expect(scoreLabel(79)).toBe('Good');
    });

    it('should return "Fair" for scores 40-59', () => {
      expect(scoreLabel(40)).toBe('Fair');
      expect(scoreLabel(50)).toBe('Fair');
      expect(scoreLabel(59)).toBe('Fair');
    });

    it('should return "Poor" for scores 0-39', () => {
      expect(scoreLabel(0)).toBe('Poor');
      expect(scoreLabel(30)).toBe('Poor');
      expect(scoreLabel(39)).toBe('Poor');
    });
  });

  describe('indoorScoreLabel', () => {
    it('should return "Highly recommended" for scores >= 70', () => {
      expect(indoorScoreLabel(70)).toBe('Highly recommended');
      expect(indoorScoreLabel(85)).toBe('Highly recommended');
    });

    it('should return "Good choice" for scores 50-69', () => {
      expect(indoorScoreLabel(50)).toBe('Good choice');
      expect(indoorScoreLabel(60)).toBe('Good choice');
    });

    it('should return "Worth a visit" for scores 30-49', () => {
      expect(indoorScoreLabel(30)).toBe('Worth a visit');
      expect(indoorScoreLabel(40)).toBe('Worth a visit');
    });

    it('should return "Always viable" for scores 0-29', () => {
      expect(indoorScoreLabel(0)).toBe('Always viable');
      expect(indoorScoreLabel(25)).toBe('Always viable');
    });
  });
});
