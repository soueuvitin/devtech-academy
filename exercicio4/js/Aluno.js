// Exercício 2: Classe Aluno com atributos, construtor e métodos
class Aluno {
    // O construtor inicializa os atributos de cada novo aluno
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Retorna true se a nota final for maior ou igual a 7
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Retorna os dados do aluno formatados em uma string
    toString() {
        const situacao = this.isAprovado() ? 'Aprovado' : 'Reprovado';
        return `Nome: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | Nota Final: ${this.notaFinal.toFixed(1)} | Situação: ${situacao}`;
    }
}
