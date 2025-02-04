import { plainToClass } from 'class-transformer';

import { IsUUID } from '../is-uuid';

describe('IsUUID', () => {
    it('ignores properties that are not exposed', () => {
        class Fixture {
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).not.toHaveProperty('property');
    });
    it('populates missing required fields with undefined', () => {
        class Fixture {
            @IsUUID()
            property!: string;
        }

        const obj = plainToClass(Fixture, {});
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null optional fields with undefined', () => {
        class Fixture {
            @IsUUID({
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
            @IsUUID()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('populates null nullable fields with null', () => {
        class Fixture {
            @IsUUID({
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
            @IsUUID()
            property!: string;
        }

        const obj = plainToClass(Fixture, {
            property: '00000000-0000-4000-8000-000000000000',
        });
        expect(obj).toHaveProperty('property', '00000000-0000-4000-8000-000000000000');
    });
    it('converts single items to arrays if isArray is true', () => {
        class Fixture {
            @IsUUID({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: '00000000-0000-4000-8000-000000000000',
        });
        expect(obj).toHaveProperty('property', ['00000000-0000-4000-8000-000000000000']);
    });
    it('handles multiple values if isArray is true', () => {
        class Fixture {
            @IsUUID({
                isArray: true,
            })
            property!: string[];
        }

        const obj = plainToClass(Fixture, {
            property: ['00000000-0000-4000-8000-000000000000'],
        });
        expect(obj).toHaveProperty('property', ['00000000-0000-4000-8000-000000000000']);
    });
    it('returns null if isArray and nullable options are true', () => {
        class Fixture {
            @IsUUID({
                isArray: true,
                nullable: true,
            })
            property!: string[] | null;
        }

        const obj = plainToClass(Fixture, {
            property: null,
        });
        expect(obj).toHaveProperty('property', null);
    });

    it('returns undefined if isArray and optional are true ', () => {
        class Fixture {
            @IsUUID({
                isArray: true,
                optional: true,
            })
            property?: string[];
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);
    });
    it('returns null or undefined if isArray, nullable and optional are true ', () => {
        class Fixture {
            @IsUUID({
                isArray: true,
                optional: true,
                nullable: true,
            })
            property?: string[] | null;
        }

        const obj = plainToClass(Fixture, {
            property: undefined,
        });
        expect(obj).toHaveProperty('property', undefined);

        const obj2 = plainToClass(Fixture, {
            property: null,
        });
        expect(obj2).toHaveProperty('property', null);
    });
});
