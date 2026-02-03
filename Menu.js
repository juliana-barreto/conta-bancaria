"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
exports.about = about;
exports.keypress = keypress;
var Colors_1 = require("./src/util/Colors");
var input = require("readline-sync");
var answer;
function main() {
    while (true) {
        console.log(Colors_1.Colors.bg.black, Colors_1.Colors.fg.yellow, '\n***********************************');
        console.log('       BANCO DO BRAZIL COM Z');
        console.log('***********************************');
        console.log('1 - Criar Conta');
        console.log('2 - Listar todas as contas');
        console.log('3 - Buscar conta por número');
        console.log('4 - Atualizar dados da conta');
        console.log('5 - Apagar conta');
        console.log('6 - Sacar');
        console.log('7 - Depositar');
        console.log('8 - Transferir valores entre contas');
        console.log('9 - Sair');
        console.log('***********************************');
        console.log(Colors_1.Colors.reset, '');
        answer = input.questionInt('Entre com a opção desejada: ');
        if (answer == 9) {
            console.log(Colors_1.Colors.fg.greenstrong, '\nBanco do Brazil com Z - O seu futuro começa aqui!\n');
            about();
            console.log(Colors_1.Colors.reset, '');
            process.exit(0);
        }
        switch (answer) {
            case 1:
                console.log(Colors_1.Colors.fg.whitestrong, '\nCriar Conta\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 2:
                console.log(Colors_1.Colors.fg.whitestrong, '\nListar todas as contas\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 3:
                console.log(Colors_1.Colors.fg.whitestrong, '\nConsultar dados da conta - por número\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 4:
                console.log(Colors_1.Colors.fg.whitestrong, '\nAtualizar dados da conta\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 5:
                console.log(Colors_1.Colors.fg.whitestrong, '\nApagar uma conta\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 6:
                console.log(Colors_1.Colors.fg.whitestrong, '\nSaque\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 7:
                console.log(Colors_1.Colors.fg.whitestrong, '\nDepósito\n', Colors_1.Colors.reset);
                keypress();
                break;
            case 8:
                console.log(Colors_1.Colors.fg.whitestrong, '\nTransferência entre contas\n', Colors_1.Colors.reset);
                keypress();
                break;
            default:
                console.log(Colors_1.Colors.fg.whitestrong, '\nOpção inválida!\n', Colors_1.Colors.reset);
                keypress();
                break;
        }
    }
}
function about() {
    console.log('\n******************************************');
    console.log('Projeto desenvolvido por Juliana Barreto');
    console.log('barreto.juliana@outlook.com');
    console.log('github.com/juliana-barreto');
    console.log('******************************************');
}
function keypress() {
    console.log(Colors_1.Colors.reset, 'Pressione enter para continuar...');
    input.prompt();
}
main();
