import { Colors } from '../util/Colors';
import { Account } from './Account';

export class CurrentAccount extends Account {

  private _overdraftLimit: number;

  constructor(number: number, branch: number, holder: string, type: number, balance: number, overdraftLimit: number) {
      super(number, branch, holder, type, balance);
      this._overdraftLimit = overdraftLimit;
  }
  
  public get overdraftLimit() {
      return this._overdraftLimit;
  }

  public set overdraftLimit(overdraftLimit: number) {
      this._overdraftLimit = overdraftLimit;
  }

  // Métodos sobrescritos

  public withdraw(amount: number): boolean {

      if (amount <= 0) {
          console.log(Colors.fg.red, "O valor deve ser positivo! ", Colors.reset);
          return false;
      }

      if (amount > this.balance + this._overdraftLimit) {
          console.log(Colors.fg.red, "Saldo Insuficiente! ", Colors.reset);
          return false;
      }
      this.balance -= amount;
      return true;
  }

  public view(): void {
      super.view();
      console.log(`Limite da conta: R$ ${this._overdraftLimit.toFixed(2)}`);
  }

}