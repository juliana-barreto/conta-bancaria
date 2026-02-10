import { Colors } from '../util/Colors';

export abstract class Account {

  // Atributos
  private _number: number;
  private _branch: number;
  private _holder: string;
  private _type: number;
  private _balance: number;

  // Construtor
  constructor(number: number, branch: number, holder: string, type: number, balance: number) {
    this._number = number;
    this._branch = branch;
    this._holder = holder;
    this._type = type;
    this._balance = balance;
  }

  // Getters

	public get number(): number {
		return this._number;
	}

	public get branch(): number {
		return this._branch;
	}

	public get holder(): string {
		return this._holder;
	}

	public get type(): number {
		return this._type;
	}

	public get balance(): number {
		return this._balance;
	}

  // Setters com validações

	public set number(value: number) {
    if (value <= 0) {
      console.log(Colors.fg.red, 'O número da conta deve ser positivo!', Colors.reset);
      return;
    }
		this._number = value;
	}

	public set branch(value: number) {
    if (value <= 0) {
      console.log(Colors.fg.red, 'O número da agência deve ser positivo!', Colors.reset);
      return;
    }
		this._branch = value;
	}

	public set holder(value: string) {
    if (value === '') {
      console.log(Colors.fg.red, 'O nome do titular não pode ser vazio!', Colors.reset);
      return;
    }
		this._holder = value;
	}

	public set type(value: number) {
    if (value !== 1 && value !== 2) {
<<<<<<< Updated upstream
    if (value !== 1 && value !== 2) {
      console.log(Colors.fg.red, "O tipo da conta deve ser 1 ou 2!", Colors.reset);
=======
      console.log(Colors.fg.red, 'O tipo da conta deve ser 1 ou 2!', Colors.reset);
>>>>>>> Stashed changes
      return;
    }
		this._type = value;
	}

	public set balance(value: number) {
    if (value < 0) {
      console.log(Colors.fg.red, 'O saldo não pode ser negativo!', Colors.reset);
      return;
    }
		this._balance = value;
	}

//Métodos Auxiliares
public withdraw(amount: number): boolean{

<<<<<<< Updated upstream
  if(amount <= 0){
    console.log(Colors.fg.red, "O valor deve ser positivo!", Colors.reset);
    return false;
  }

  if (amount > this._balance) {
    console.log(Colors.fg.red, "Saldo insuficiente!", Colors.reset);
    return false;
  }
=======
public withdraw(amount: number): boolean{

  if(amount <= 0){
        console.log(Colors.fg.red, 'O valor deve ser positivo!', Colors.reset);
public withdraw(amount: number): boolean{

  if(amount <= 0){
        console.log(Colors.fg.red, "O valor deve ser positivo!", Colors.reset);
        return false;
    }

  if (amount > this._balance) {
        console.log(Colors.fg.red, "Saldo insuficiente!", Colors.reset);
  if (amount > this._balance) {
        console.log(Colors.fg.red, 'Saldo insuficiente!', Colors.reset);
        return false;
    }
>>>>>>> Stashed changes
    
  this._balance -= amount;
  this._balance -= amount;
    return true;
}

public deposit(amount: number): void{
  if (amount <= 0) {
        console.log(Colors.fg.red, "Depósito inválido!", Colors.reset);
public deposit(amount: number): void{
  if (amount <= 0) {
<<<<<<< Updated upstream
      console.log(Colors.fg.red, "Depósito inválido!", Colors.reset);
      return;
    }
=======
        console.log(Colors.fg.red, 'Depósito inválido!', Colors.reset);
    }

  this._balance += amount;
>>>>>>> Stashed changes
  this._balance += amount;
}

public view(): void{

  let accountType: string;
<<<<<<< Updated upstream
    let type: string;

    switch (this._type) {
        case 1:
            type = "Conta Corrente";
            break;
        case 2:
            type = "Conta Poupança";
            break;
    
        default:
            type = "Tipo inválido!";
=======
  let accountType: string;

    switch (this._type) {
        case 1:
      accountType = 'Conta Corrente';
            accountType = "Conta Corrente";
            break;
        case 2:
      accountType = 'Conta Poupança';
            accountType = "Conta Poupança";
            break;
    
        default:
      accountType = 'Tipo inválido!';
>>>>>>> Stashed changes
            accountType = "Tipo inválido!";
            break;
    }

    console.log('\n*****************************************************');
    console.log('                    DADOS DA CONTA                     ');
    console.log('*****************************************************');
    console.log(`Número da conta: ${this._number}`);
    console.log(`Número da agência: ${this._branch}`);
    console.log(`Nome do titular: ${this._holder}`);
<<<<<<< Updated upstream
    console.log(`Tipo da conta: ${type}`);
=======
    console.log(`Tipo da conta: ${accountType}`);
>>>>>>> Stashed changes
    console.log(`Tipo da conta: ${accountType}`);
    console.log(`Saldo: R$${this._balance.toFixed(2)}`);
    console.log('*****************************************************\n');
  }
}