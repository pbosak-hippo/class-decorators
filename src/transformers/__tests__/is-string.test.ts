import { plainToClass } from 'class-transformer';

import { IsString } from '../is-string';

describe('IsString', () => {
    it('ignores properties that are not exposed', () => {
        class Fixture {
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).not.toHaveProperty('property');
    });
    it('populates missing required fields with undefined', () => {
        class Fixture {
            @IsString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null optional fields with undefined', () => {
        class Fixture {
            @IsString({
                optional: true,
            })
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates undefined required fields with undefined', () => {
        class Fixture {
            @IsString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null nullable fields with null', () => {
        class Fixture {
            @IsString({
                nullable: true,
            })
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', null);
    });
    it('populates required fields with value', () => {
        class Fixture {
            @IsString()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: 'value',
        });
        expect(obj).toHaveProperty('property', 'value');
    });
    it('converts single items to arrays if isArray is true', () => {
        class Fixture {
            @IsString({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: 'value',
        });
        expect(obj).toHaveProperty('property', ['value']);
    });
    it('handles multiple values if isArray is true', () => {
        class Fixture {
            @IsString({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: ['value1', 'value2'],
        });
        expect(obj).toHaveProperty('property', ['value1', 'value2']);
    });
});
