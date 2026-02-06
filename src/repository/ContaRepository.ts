import { Account } from "../model/Account";

export interface AccountRepository {
  findByNumber(number: number): Account;
  listAll(): void;
  create(account: Account): void;
  update(account: Account): void;
  delete(accountNumber: number): void;
  withdraw(accountNumber: number, value: number): void;
  deposit(accountNumber: number, value:number): void;
  transfer(originAccount: number, targetAccount: number, value:number): void;
}
