import { convertEnum } from './convert-enum'

describe('convertEnum', () => {
	enum TestEnum {
		A = 'value_a',
		B = 'value_b'
	}

	it('should return correct enum value', () => {
		expect(convertEnum(TestEnum, 'A')).toBe(TestEnum.A)
		expect(convertEnum(TestEnum, 'B')).toBe(TestEnum.B)
	})

	it('should return undefined for invalid key', () => {
		expect(convertEnum(TestEnum, 'C')).toBeUndefined()
	})
})
