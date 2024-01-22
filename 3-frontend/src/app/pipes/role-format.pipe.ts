import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roleFormat'
})
export class RoleFormatPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/_/g, ' ').replace(/ROLE/g, '').toUpperCase();
    }
}
