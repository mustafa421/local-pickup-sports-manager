const sum = (x, y) => x + y;

describe("Sample test suite", () => {
  test("Test that this test function works", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
