# Backend Unit Testing Guide

## Setup Overview

Jest has been configured for TypeScript testing with the following:

- **Test Framework**: Jest with ts-jest preset
- **Test Environment**: Node.js
- **TypeScript Support**: Full type checking with ts-jest

## Getting Started

### 1. Install Dependencies

From the `backend/` directory:

```bash
npm install
```

This will install Jest, ts-jest, @types/jest, and other development dependencies.

### 2. Run Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are located in `src/__tests__/` or co-located with source files with `.test.ts` suffix.

Current test files:
- `src/services/__tests__/scoringUtils.test.ts` - Tests for scoring utilities
- `src/services/__tests__/weatherHelpers.test.ts` - Tests for weather categorization helpers

## Creating New Tests

### Test File Naming
- Place tests in a `__tests__` folder, or
- Use the `.test.ts` suffix next to the source file

### Example Test Structure

```typescript
import { functionToTest } from '../yourModule';

describe('Module Name', () => {
  describe('functionToTest', () => {
    it('should do something specific', () => {
      const result = functionToTest('input');
      expect(result).toBe('expected output');
    });
  });
});
```

### Common Assertions

```typescript
// Equality
expect(value).toBe(expected);
expect(obj).toEqual(expected);

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);

// Arrays/Strings
expect(array).toContain(item);
expect(string).toMatch(/pattern/);

// Exceptions
expect(() => functionThatThrows()).toThrow();
```

## Coverage

Run `npm run test:coverage` to generate a coverage report. This shows:
- **Statements**: % of code statements executed
- **Branches**: % of conditional branches tested
- **Functions**: % of functions called
- **Lines**: % of lines executed

Aim for high coverage on critical business logic (services, utils) while 100% isn't always necessary.

## Configuration

Jest configuration is in `jest.config.js`:
- Tests run in Node.js environment
- TypeScript files are transpiled automatically
- Coverage reports exclude node_modules and dist

## Next Steps

1. Run `npm install` to install the testing dependencies
2. Run `npm test` to verify the setup works
3. Add more tests for critical functionality (services, resolvers, etc.)
4. Consider adding tests to your CI/CD pipeline

## Tips

- Focus tests on business logic (services, utilities, resolvers)
- Mock external dependencies (API calls, database queries)
- Keep tests focused and descriptive (one assertion per test when possible)
- Use `describe` blocks to organize related tests
