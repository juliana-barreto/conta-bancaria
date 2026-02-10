import { Account } from '../model/Account';

export interface AccountRepository{

    //Métodos do CRUD 
    findByNumber(number: number): void;
    listAll(): void;
    create(account: Account): void;
    update(account: Account): void;
    delete(number: number): void;

    //Métodos Bancários
    withdraw(number: number, amount: number): void;
    deposit(number: number, amount: number): void;
    transfer(sourceNumber: number, targetNumber: number, amount: number): void;
}