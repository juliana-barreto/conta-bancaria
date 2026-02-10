import { AccountController } from './src/controller/AccountController';
import { CurrentAccount } from './src/model/CurrentAccount';
import { SavingsAccount } from './src/model/SavingsAccount';
import { Colors } from './src/util/Colors';
import { formatCurrency } from './src/util/Currency';
import { Input } from './src/util/Input';

// Criar um Objeto Global da Classe AccountController
const accountController = new AccountController();

// Criar um array contendo os tipos de conta
const accountTypes = ['Conta Corrente', 'Conta Poupança'];

export function main(): void {

  let option: number;
  createTestAccounts();

  while (true) {
    console.log(Colors.bg.black, Colors.fg.yellow, '\n***********************************');
    console.log('       BANCO DO BRAZIL COM Z')
    console.log('***********************************');
    console.log('1 - Criar Conta')
    console.log('2 - Listar todas as contas')
    console.log('3 - Buscar conta por número')
    console.log('4 - Atualizar dados da conta')
    console.log('5 - Apagar conta')
    console.log('6 - Sacar')
    console.log('7 - Depositar')
    console.log('8 - Transferir valores entre contas')
    console.log('9 - Sair')
    console.log('***********************************');
    console.log(Colors.reset, '');

    option = Input.questionInt('Entre com a opção desejada: ');

    if (option == 9) {
      console.log(Colors.fg.greenstrong, '\nBanco do Brazil com Z - O seu futuro começa aqui!\n');
      about();
      console.log(Colors.reset, '');
      process.exit(0);
    }

    switch (option) {
      case 1:
        console.log(Colors.fg.greenstrong, "\n\nCriar Conta\n\n", Colors.reset);
        createAccount();
        keyPress();
        break;
      case 2:
        console.log(Colors.fg.greenstrong, "\n\nListar todas as Contas\n\n", Colors.reset);
        listAllAccounts();
        keyPress();
        break;
      case 3:
        console.log(Colors.fg.greenstrong, "\n\nConsultar dados da Conta - por número\n\n", Colors.reset);
        findAccountByNumber();
        keyPress();
        break;
      case 4:
        console.log(Colors.fg.greenstrong, "\n\nAtualizar dados da Conta\n\n", Colors.reset);
        updateAccount();
        keyPress();
        break;
      case 5:
        console.log(Colors.fg.greenstrong, "\n\nApagar uma Conta\n\n", Colors.reset);
        deleteAccountByNumber();
        keyPress();
        break;
      case 6:
        console.log(Colors.fg.greenstrong, "\n\nSaque\n\n", Colors.reset);
        withdraw();
        keyPress();
        break;
      case 7:
        console.log(Colors.fg.greenstrong, "\n\nDepósito\n\n", Colors.reset);
        deposit();
        keyPress();
        break;
      case 8:
        console.log(Colors.fg.greenstrong, "\n\nTransferência entre Contas\n\n", Colors.reset);
        transfer();
        keyPress();
        break;
      case 9:
        console.log(Colors.fg.greenstrong, "\n\Consultar dados da Conta - por titular\n\n", Colors.reset);
        findAccountByHolder();
        keyPress();
        break;
      default:
        console.log(Colors.fg.greenstrong, "\nOpção Inválida!\n", Colors.reset);
        keyPress();
    }
  }
}

/* Opção 1: Criar uma nova Conta */
function createAccount() {
  console.log("Digite o número da agência: ");
  const branch = Input.questionInt("");

  console.log("Digite o nome do titular: ");
  const holder = Input.question("");

  console.log("Selecione o tipo da conta: ");
  const accountType = Input.keyInSelect(accountTypes, "", { cancel: false }) + 1;

  console.log("Digite o saldo da conta: ");
  const balance = Input.questionFloat("");

  switch (accountType) {
    case 1:
      console.log("Digite o limite da conta: ");
      const overdraftLimit = Input.questionFloat("");
      accountController.create(new CurrentAccount(accountController.generateNumber(), branch, holder, accountType, balance, overdraftLimit));
      break;

    case 2:
      console.log("Digite o dia do aniversário da conta: ");
      const interestDay = Input.questionInt("");
      accountController.create(new SavingsAccount(accountController.generateNumber(), branch, holder, accountType, balance, interestDay));
      break;
  }
}

/* Opção 2: Lista todas as contas cadastradas */
function listAllAccounts(): void {
  accountController.listAll();
}

/* Opção 3: Procurar uma Conta pelo número */
function findAccountByNumber(): void {
  console.log("Digite o número da conta: ");
  const accountNumber = Input.questionInt("");

  accountController.findByNumber(accountNumber);
}

/* Opção 4: Atualizar os dados de uma Conta */
function updateAccount(): void {
  console.log("Digite o número da conta: ");
  const accountNumber = Input.questionInt("");

  const account = accountController.findInArray(accountNumber);

  if (account !== null) {

    let branch: number = account.branch;
    let holder: string = account.holder;
    const accountType = account.type;
    let balance: number = account.balance;

    // Atualização da Agência
    console.log(`\nAgência Atual: ${branch}`);
    branch = Input.questionInt("Digite o número da nova Agência: ", { defaultInput: branch });

    // Atualização do Titular
    console.log(`\nNome do atual titular: ${holder}`);
    holder = Input.question("Digite o nome do titular: ", { defaultInput: holder });

    // Atualização do Saldo
    console.log(`\nSaldo atual: ${formatCurrency(balance)}`);
    balance = Input.questionFloat("Digite o valor do novo saldo: ", { defaultInput: balance });

    // Atualização do Tipo
    switch (accountType) {
      case 1: { // Conta Corrente
        let overdraftLimit: number = (account as CurrentAccount).overdraftLimit;

        console.log(`\nLimite Atual: ${formatCurrency(overdraftLimit)}`);
        overdraftLimit = Input.questionFloat("Digite o valor do novo limite: ", { defaultInput: overdraftLimit });

        accountController.update(new CurrentAccount(
          accountNumber, branch, holder, accountType, balance, overdraftLimit));
        break;

      } case 2: { // Conta Poupança
        let interestDay: number = (account as SavingsAccount).interestDay;

        console.log(`\nAniversário Atual: ${interestDay}`);
        interestDay = Input.questionInt("Digite o novo dia do aniversário: ", { defaultInput: interestDay });

        accountController.update(new SavingsAccount(
          accountNumber, branch, holder, accountType, balance, interestDay));
        break;
      }
    }

  } else {
    console.log(Colors.fg.greenstrong, `A conta número ${accountNumber} não existe!`, Colors.reset);
  }
}

/* Opção 5: Deletar uma Conta pelo número */
function deleteAccountByNumber(): void {
  console.log("Digite o número da conta: ");
  const accountNumber = Input.questionInt("");

  const account = accountController.findInArray(accountNumber);

  if (account !== null) {
    if (Input.keyInYNStrict(`\nTem certeza que deseja deletar a conta número ${accountNumber}?`)) {
      accountController.delete(accountNumber);
    } else {
      console.log(Colors.fg.red, "\nOperação cancelada!", Colors.reset);
    }
  } else {
    console.log(Colors.fg.red, `A conta número ${accountNumber} não foi encontrada!`, Colors.reset);
  }
}

function withdraw(): void {
  console.log("Digite o número da conta: ");
  const accountNumber = Input.questionInt("");

  const account = accountController.findInArray(accountNumber);

  if (account !== null) {
    console.log("Digite o valor do saque: ");
    const amount = Input.questionFloat("");

    accountController.withdraw(accountNumber, amount);
  } else {
    console.log(Colors.fg.red, `A conta número ${accountNumber} não foi encontrada!`, Colors.reset);
  }
}

function deposit(): void {
  console.log("Digite o número da conta: ");
  const accountNumber = Input.questionInt("");

  const account = accountController.findInArray(accountNumber);

  if (account !== null) {
    console.log("Digite o valor do depósito: ");
    const amount = Input.questionFloat("");

    accountController.deposit(accountNumber, amount);
  } else {
    console.log(Colors.fg.red, `A conta número ${accountNumber} não foi encontrada!`, Colors.reset);
  }
}

function transfer(): void {
  console.log("Digite o número da conta de origem: ");
  const sourceNumber = Input.questionInt("");

  console.log("Digite o número da conta de destino: ");
  const targetNumber = Input.questionInt("");

  const sourceAccount = accountController.findInArray(sourceNumber);
  const targetAccount = accountController.findInArray(targetNumber);

  if (sourceAccount === null) {
    console.log(Colors.fg.red, `A Conta de Origem número ${sourceNumber} não foi encontrada!`, Colors.reset);
  } else if (targetAccount === null) {
    console.log(Colors.fg.red, `A Conta de Destino número ${targetNumber} não foi encontrada!`, Colors.reset);
  } else {
    console.log("Digite o valor da transferência: ");
    const amount = Input.questionFloat("");
    accountController.transfer(sourceNumber, targetNumber, amount);
  }
}

function findAccountByHolder(): void {
  console.log("Digite o Nome do Titular: ");
  const holder = Input.question("");

  accountController.findByHolder(holder);
}

export function about(): void {
  console.log('\n******************************************');
  console.log('Projeto desenvolvido por Juliana Barreto');
  console.log('barreto.juliana@outlook.com');
  console.log('github.com/juliana-barreto');
  console.log('******************************************');
}

export function keyPress(): void {
  console.log(Colors.reset, '\nPressione enter para continuar...');
  Input.prompt();
}

function createTestAccounts(): void {
  accountController.create(new CurrentAccount(accountController.generateNumber(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
  accountController.create(new CurrentAccount(accountController.generateNumber(), 4578, 'João da Silva', 1, 1000.00, 100.00));

  accountController.create(new SavingsAccount(accountController.generateNumber(), 5789, "Geana Almeida", 2, 10000, 10));
  accountController.create(new SavingsAccount(accountController.generateNumber(), 5698, "Jean Lima", 2, 15000, 15));
}

main();