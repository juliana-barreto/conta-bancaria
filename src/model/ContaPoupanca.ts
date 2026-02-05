import { Colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaPoupanca extends Conta {

  private _aniversario: number;

  constructor(numero: number, agencia: number,  titular: string, tipo: number, saldo: number, aniversario: number) {
      super(numero, agencia, titular, tipo,  saldo);
      this._aniversario = aniversario;
  }

  public get aniversario() {
      return this._aniversario;
  }

  public set aniversario(aniversario: number) {
      this._aniversario = aniversario;
  }

  // Método sobrescrito

  public visualizar(): void {
      super.visualizar();
      console.log(`Aniversário da Conta: ${this._aniversario} de cada mês`);
  }
}