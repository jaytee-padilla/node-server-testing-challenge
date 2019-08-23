it('should add two numbers', () => {
	// Arrange: setup the world for the test
	const valA = 2;
	const valB = 2;
	const expectedResult = 4;

	// Act: execute the code you want to test
	const actualValue = add(valA, valB);

	// Assert: check that the code works
	expect(actualValue).toBe(expectedResult);
});

function add(a, b) {
	return a + b;
}