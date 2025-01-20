import { plainToClass } from 'class-transformer';

import { IsNumber } from '../is-number';

describe('IsNumber', () => {
    it('ignores properties that are not exposed', () => {
        class Fixture {
            property!: number;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).not.toHaveProperty('property');
    });
    it('populates missing required fields with undefined', () => {
        class Fixture {
            @IsNumber()
            property!: number;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null optional fields with undefined', () => {
        class Fixture {
            @IsNumber({
                optional: true,
            })
            property!: number;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates undefined required fields with undefined', () => {
        class Fixture {
            @IsNumber()
            property!: number;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null nullable fields with null', () => {
        class Fixture {
            @IsNumber({
                nullable: true,
            })
            property!: number;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', null);
    });
    it('populates string required fields with number', () => {
        class Fixture {
            @IsNumber()
            property!: number;
        }

        const obj = plainToClass(Fixture, {
            property: '42.1',
        });
        expect(obj).toHaveProperty('property', 42.1);
    });
    it('populates number required fields with number', () => {
        class Fixture {
            @IsNumber()
            property!: number;
        }

        const obj = plainToClass(Fixture, {
            property: 42.1,
        });
        expect(obj).toHaveProperty('property', 42.1);
    });
    it('converts single items to arrays if isArray is true', () => {
        class Fixture {
            @IsNumber({
                isArray: true,
            })
            property!: number[];
        }

        const obj = plainToClass(Fixture, {
            property: 42.1,
        });
        expect(obj).toHaveProperty('property', [42.1]);
    });
    it('handles multiple values if isArray is true', () => {
        class Fixture {
            @IsNumber({
                isArray: true,
            })
            property!: number[];
        }

        const obj = plainToClass(Fixture, {
            property: [42.1, 42.2],
        });
        expect(obj).toHaveProperty('property', [42.1, 42.2]);
    });
});
