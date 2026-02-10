import * as iconv from 'iconv-lite';
 
/**
 * Classe Input - Solução para leitura de caracteres acentuados com o readline-sysnc no Windows
 *
 * PROBLEMA:
 * - No Windows, o console usa a codificação CP850 (não UTF-8)
 * - Quando você digita "João", o console envia bytes em CP850
 * - O Node.js interpreta como UTF-8 e fica "Joo" (perde os acentos)
 *
 * SOLUÇÃO:
 * - Esta classe converte automaticamente CP850 → UTF-8
 * - Você digita "João" e a variável recebe "João" corretamente!
 *
 */
export class Input {
   
    /** Controla se já detectou o encoding (detecta apenas uma vez) */
    private static configured = false;
   
    /** Armazena o encoding do console (cp850, cp1252 ou utf8) */
    private static consoleEncoding: string = 'cp850';
   
    /**
     * Detecta qual encoding o console do Windows está usando
     *
     * Executa o comando 'chcp' para descobrir o Code Page ativo:
     * - 65001 = UTF-8
     * - 850 = CP850 (padrão no Brasil)
     * - 1252 = CP1252 (Windows Latin-1)
     *
     * Esta detecção acontece apenas UMA vez (na primeira chamada)
     */
    private static detectEncoding(): void {
       
        // Se já detectou antes, não faz novamente
        if (this.configured) return;
       
        // Só precisa detectar no Windows (Linux/Mac já usam UTF-8)
        if (process.platform === 'win32') {
            try {
                // Executa o comando 'chcp' no Windows
                const { execSync } = require('child_process');
                const result = execSync('chcp', { encoding: 'utf8' }).toString();
               
                // Extrai o número do code page (ex: "850" de "Página de código ativa: 850")
                const match = result.match(/\d+/);
               
                if (match) {
                    const codePage = match[0];
                   
                    // Define o encoding baseado no code page
                    this.consoleEncoding = codePage === '65001' ? 'utf8' :
                                          codePage === '850' ? 'cp850' :
                                          codePage === '1252' ? 'cp1252' : `cp${codePage}`;
                }
            } catch (error) {
                // Se falhar, assume CP850 (padrão mais comum no Brasil)
                this.consoleEncoding = 'cp850';
            }
        } else {
            // Linux/Mac sempre usam UTF-8
            this.consoleEncoding = 'utf8';
        }
       
        // Marca como já configurado
        this.configured = true;
    }
   
    /**
     * Lê uma linha de texto com acentuação correta
     *
     * USO: Para ler TEXTO (nomes, endereços, etc.)
     *
     * COMO FUNCIONA:
     * 1. Detecta o encoding do console
     * 2. Lê a resposta como 'binary' (bytes brutos)
     * 3. Converte de CP850 → UTF-8
     * 4. Retorna a string UTF-8 correta
     *
     */
    static question(question: string): string {
 
        // Detecta o encoding (só na primeira vez)
        this.detectEncoding();
       
        const readlinesync = require('readline-sync');
       
        // Se o console NÃO está em UTF-8, precisa converter
        if (this.consoleEncoding !== 'utf8') {
 
            // Lê a resposta como 'binary' (bytes brutos em CP850)
            const rawAnswer = readlinesync.question(question, {
                encoding: 'binary'
            });
           
            // Converte os bytes de CP850 → UTF-8
            const buffer = Buffer.from(rawAnswer, 'binary');
            return iconv.decode(buffer, this.consoleEncoding);
 
        } else {
            // Console já está em UTF-8, lê direto
            return readlinesync.question(question);
        }
    }
 
    /**
     * Lê um número INTEIRO com validação automática
     *
     * USO: Para ler NÚMEROS INTEIROS (idade, quantidade, opção do menu)
     *
     */
    static questionInt(question: string): number {
        const readlinesync = require('readline-sync');
 
        // Usa o método nativo do readline-sync que já faz todas as validações
        return readlinesync.questionInt(question, {
            limitMessage: "Digite um numero inteiro"
        });
    }
 
    /**
     * Lê um número DECIMAL com validação automática
     *
     * USO: Para ler NÚMEROS DECIMAIS (preço, saldo, nota)
     *
     */
    static questionFloat(question: string): number {
        const readlinesync = require('readline-sync');
 
        // Usa o método nativo do readline-sync que já faz todas as validações
        return readlinesync.questionFloat(question, {
            limitMessage: "Digite um numero decimal"
        });
    }
 
    /**
     * Exibe um menu de opções para o usuário escolher
     *
     * USO: Para campos SELECT (escolher entre várias opções)
     *
     */
    static keyInSelect(options: string[], question: string, config?: any): number {
        const readlinesync = require('readline-sync');
 
        return readlinesync.keyInSelect(options, question, config);
    }
 
    /**
     * Pausa e aguarda o usuário pressionar ENTER
     *
     * USO: Para PAUSAR o programa (ex: "Pressione ENTER para continuar...")
     *
     */
    static prompt(): void {
        const readlinesync = require('readline-sync');
 
        readlinesync.prompt();
    }
   
    /**
     * Retorna qual encoding está sendo usado (útil para debug)
     *
     * USO: Para DEBUGAR problemas de acentuação
     *
     */
    static getEncoding(): string {
        this.detectEncoding();
 
        return this.consoleEncoding;
    }
}
 