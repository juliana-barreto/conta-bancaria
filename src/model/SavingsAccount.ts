import { Colors } from "../util/Colors";
import { Account } from "./Account";

export class SavingsAccount extends Account {

  private _interestDay: number;

  constructor(number: number, branch: number, holder: string, type: number, balance: number, interestDay: number) {
      super(number, branch, holder, type, balance);
      this._interestDay = interestDay;
  }

  public get interestDay(): number {
      return this._interestDay;
  }

  public set interestDay(interestDay: number) {
      this._interestDay = interestDay;
  }

  // Método sobrescrito

    public view(): void {
    super.view();
    console.log(`Aniversário da Conta: ${this._interestDay} de cada mês`);
  }
}