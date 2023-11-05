import { Injectable } from '@nestjs/common'

import { Cat } from './interfaces/cat.interface'

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        console.log(cat, 'cats');
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        console.log(this.cats)
        return this.cats;
    }

    findOne(id:number): Cat {
        return this.cats[id];
    }
}