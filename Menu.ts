import { Colors } from './src/util/Colors';
import * as input from 'readline-sync';

let answer: number;

export function main(): void {
  while(true) {
  console.log(Colors.bg.black, Colors.fg.yellow,'\n***********************************');
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

  answer = input.questionInt('Entre com a opção desejada: ');

  if (answer == 9) {
    console.log(Colors.fg.greenstrong, '\nBanco do Brazil com Z - O seu futuro começa aqui!\n');
    about();
    console.log(Colors.reset, '');
    process.exit(0);
  }

  switch(answer) {
      case 1:
        console.log(Colors.fg.whitestrong, '\nCriar Conta\n', Colors.reset);
        keypress();
        break;
      case 2:
        console.log(Colors.fg.whitestrong, '\nListar todas as contas\n', Colors.reset);
        keypress();
        break;
      case 3:
        console.log(Colors.fg.whitestrong, '\nConsultar dados da conta - por número\n', Colors.reset);
        keypress();
        break;
      case 4:
        console.log(Colors.fg.whitestrong, '\nAtualizar dados da conta\n', Colors.reset);
        keypress();
        break;
      case 5:
        console.log(Colors.fg.whitestrong, '\nApagar uma conta\n', Colors.reset);
        keypress();
        break;
      case 6:
        console.log(Colors.fg.whitestrong, '\nSaque\n', Colors.reset);
        keypress();
        break;
      case 7:
        console.log(Colors.fg.whitestrong, '\nDepósito\n', Colors.reset);
        keypress();
        break;
      case 8:
        console.log(Colors.fg.whitestrong, '\nTransferência entre contas\n', Colors.reset);
        keypress();
        break;
      default:
        console.log(Colors.fg.whitestrong, '\nOpção inválida!\n', Colors.reset);
        keypress();
        break;
    }
  }
}

export function about(): void {
  console.log('\n******************************************');
  console.log('Projeto desenvolvido por Juliana Barreto');
  console.log('barreto.juliana@outlook.com');
  console.log('github.com/juliana-barreto');
  console.log('******************************************');
}

export function keypress(): void {
  console.log(Colors.reset, 'Pressione enter para continuar...');
  input.prompt();
}

main();