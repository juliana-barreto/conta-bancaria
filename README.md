# Projeto Conta Bancária

<br />

<div align="center">
    <img src="https://i.imgur.com/izFuHID.png" title="Logo do Projeto" width="35%"/>
</div>

<br />

<div align="center">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
    <br />
    <img src="https://img.shields.io/github/last-commit/juliana-barreto/conta-bancaria?style=flat-square&color=orange" />
    <img src="https://img.shields.io/github/languages/count/juliana-barreto/conta-bancaria?style=flat-square&color=blue" />
    <img src="https://img.shields.io/github/repo-size/juliana-barreto/conta-bancaria?style=flat-square&color=green" />
</div>

---

## Visão Geral do Projeto

Este repositório hospeda a implementação de um sistema bancário simulado via console desenvolvido como projeto final do módulo de lógica de programação do Bootcamp Full Stack da [Generation Brasil](https://brazil.generation.org/).

O objetivo principal desta aplicação é consolidar os conhecimentos de **Programação Orientada a Objetos (POO)** utilizando **TypeScript**. Diferente de exercícios isolados de lógica, este projeto simula uma arquitetura de software real dividida em responsabilidades, onde o foco deixa de ser apenas a sintaxe e passa a ser a escalabilidade, a manutenção do código e a implementação de regras de negócio complexas.

A aplicação gerencia o ciclo de vida de contas bancárias e permite a execução de operações financeiras essenciais através de um menu interativo, garantindo a integridade dos dados através de encapsulamento rigoroso e tipagem estática.

## Arquitetura e Conceitos Aplicados

O desenvolvimento foi estruturado para refletir a progressão das aulas de TypeScript (da Aula 03 em diante). Cada funcionalidade do banco foi desenhada para exercitar um pilar específico da orientação a objetos.

Abaixo apresento a correlação entre as regras de negócio implementadas e os conceitos técnicos abordados:

| Componente Bancário | Regra de Negócio | Conceito Técnico (POO) |
| :--- | :--- | :--- |
| **Conta (Genérica)** | Define o modelo base para qualquer conta, impedindo a criação de contas sem tipo específico. | [Classe Abstrata](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-members) e Encapsulamento de atributos protegidos. |
| **Conta Corrente** | Possui atributos exclusivos como limite de cheque especial e regras próprias de saque. | [Herança](https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses) e Sobrescrita de Métodos (`override`). |
| **Repositório** | Define o contrato de métodos que o controlador deve obrigatoriamente implementar (CRUD). | [Interface](https://www.typescriptlang.org/docs/handbook/2/objects.html) e Abstração. |
| **Controller** | Gerencia a lista de contas em memória e processa as operações solicitadas pelo usuário. | Implementação de Interface e Manipulação de Coleções. |
| **Menu** | Interface de usuário via terminal para entrada e saída de dados. | Tratamento de exceções com `try/catch` para prevenir crash na aplicação. |

## Estrutura de Diretórios

O projeto segue uma organização de pastas que separa a definição dos modelos (o que é uma conta) da regra de negócio (como a conta funciona) e da execução (menu).

```text
conta-bancaria/
├── src/
│   ├── model/           # Classes bases (Conta) e filhas (ContaCorrente, ContaPoupanca)
│   ├── controller/      # Lógica de controle e implementação dos métodos da interface
│   ├── repository/      # Interfaces que definem os contratos do sistema
│   └── Menu.ts          # Ponto de entrada (Main) com a interface de usuário
│
├── package.json         # Dependências e scripts de execução
└── tsconfig.json        # Configurações do compilador TypeScript
