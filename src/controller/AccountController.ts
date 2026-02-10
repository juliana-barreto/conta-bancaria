import { Account } from '../model/Account';
import { AccountRepository } from '../repository/AccountRepository';
import { Colors } from '../util/Colors';
import { formatCurrency } from '../util/Currency';
import { Input } from '../util/Input';

export class AccountController implements AccountRepository {

  private accounts = new Array<Account>();

  private nextNumber: number = 0;

  //Métodos do CRUD
  findByNumber(number: number): void {
    const foundAccount = this.findInArray(number);

    if (foundAccount !== null)
      foundAccount.view();
    else
      console.log(Colors.fg.red, '\nConta não encontrada!', Colors.reset);
  }

  listAll(): void {
    for (let account of this.accounts) {
      account.view();
    }
  }

  findByHolder(holder: string): void {
    const accountsByHolder = this.accounts.filter(account => account.holder.toLocaleUpperCase().includes(holder.toUpperCase()));

    if (accountsByHolder.length > 0) {
      accountsByHolder.forEach(account => account.view());
    } else {
      console.log('Nenhuma conta foi encontrada!');
    }
  }

  create(account: Account): void {
    this.accounts.push(account);
    console.log(`\nA Conta número ${account.number} foi cadastrada com sucesso!`);
  }

  update(account: Account): void {
    const foundAccount = this.findInArray(account.number);

    if (foundAccount !== null) {
      this.accounts[this.accounts.indexOf(foundAccount)] = account;
      console.log(`\nA Conta número ${account.number} foi atualizada com Sucesso!`);
    }
    else {
      console.log(`\nConta não encontrada!`);
    }
  }

  delete(number: number): void {
    const foundAccount = this.findInArray(number);

    if (foundAccount !== null) {

      let confirmDeletion: string;
      console.log('Para confirmar deleção, digite o nome completo do titular:', foundAccount.holder);
      confirmDeletion = Input.question('');
      if (confirmDeletion.trim().toLowerCase() === foundAccount.holder.trim().toLowerCase()) {
        this.accounts.splice(this.accounts.indexOf(foundAccount), 1);
        console.log(Colors.fg.greenstrong, `\nA Conta número${number} foi deletada com sucesso!`, Colors.reset);

      } else {
        console.log('Nome incorreto. Operação cancelada.');

      }
    }
    else {
      console.log(Colors.fg.red, '\nConta não encontrada!', Colors.reset);
    }
  }

  //Métodos Bancários
  withdraw(number: number, amount: number): void {
    const foundAccount = this.findInArray(number);

    if (foundAccount !== null) {
      // Aqui já estava correto, pois withdraw já retornava boolean
      if (foundAccount.withdraw(amount) === true) {
        console.log(Colors.fg.green, `\nO saque no valor de ${formatCurrency(amount)} na Conta número ${number} foi realizado com sucesso!`, Colors.reset);
      }
    } else {
      console.log(Colors.fg.red, '\nConta não encontrada!', Colors.reset);
    }
  }

  deposit(number: number, amount: number): void {
    const foundAccount = this.findInArray(number);

    if (foundAccount !== null) {
      // CORREÇÃO: Agora verificamos se o depósito retornou true
      if (foundAccount.deposit(amount) === true) {
        console.log(Colors.fg.green, `\nO depósito no valor de ${formatCurrency(amount)} na Conta número ${number} foi realizado com sucesso!`, Colors.reset);
      }
    } else {
      console.log(Colors.fg.red, '\nConta não encontrada!', Colors.reset);
    }
  }

  transfer(sourceNumber: number, targetNumber: number, amount: number): void {
    const sourceAccount = this.findInArray(sourceNumber);
    const targetAccount = this.findInArray(targetNumber);

    if (sourceAccount !== null && targetAccount !== null) {
      if (sourceAccount.withdraw(amount) === true) {
        if (targetAccount.deposit(amount) === true) {
          console.log(Colors.fg.green, `\nA transferência no valor ${formatCurrency(amount)} da Conta número ${sourceNumber} para a conta número ${targetNumber} foi feita com sucesso!`, Colors.reset);
        } else {

          sourceAccount.deposit(amount);
          console.log(Colors.fg.red, '\nFalha na transferência. Valor estornado para a conta de origem.', Colors.reset);
        }
      }
    } else {
      console.log(Colors.fg.red, '\nConta de origem e/ou destino não encontradas!', Colors.reset);
    }
  }

  //Métodos Auxiliares

  public generateNumber(): number {
    return ++this.nextNumber;
  }

  public findInArray(number: number): Account | null {
    for (let account of this.accounts) {
      if (account.number === number) {
        return account;
      }

    }
    return null;
  }
}