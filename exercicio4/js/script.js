// Exercício 4: CRUD (mesmo código do Exercício 3)
// Os relatórios estão logo abaixo do CRUD.
const alunos = [];

// Quando vale -1, o formulário está no modo de cadastro
let indiceEdicao = -1;

// Referências aos elementos da página
const campoNome = document.getElementById('nome');
const campoIdade = document.getElementById('idade');
const campoCurso = document.getElementById('curso');
const campoNota = document.getElementById('nota-final');
const botaoCadastrar = document.getElementById('botao-cadastrar');
const botaoCancelar = document.getElementById('botao-cancelar');
const tituloFormulario = document.getElementById('titulo-formulario');
const tabela = document.getElementById('tabela-alunos');

// ---------- Operações sobre os dados (arrow functions) ----------

const lerFormulario = () => new Aluno(
    campoNome.value.trim(),
    parseInt(campoIdade.value),
    campoCurso.value,
    parseFloat(campoNota.value)
);

const formularioValido = (aluno) => {
    if (aluno.nome === '' || aluno.curso === '' || isNaN(aluno.idade) || isNaN(aluno.notaFinal)) {
        alert('Preencha todos os campos.');
        return false;
    }
    if (aluno.idade <= 0) {
        alert('A idade deve ser maior que zero.');
        return false;
    }
    if (aluno.notaFinal < 0 || aluno.notaFinal > 10) {
        alert('A nota final deve estar entre 0 e 10.');
        return false;
    }
    return true;
};

const adicionarAluno = (aluno) => alunos.push(aluno);

const atualizarAluno = (indice, aluno) => alunos[indice] = aluno;

const removerAluno = (indice) => alunos.splice(indice, 1)[0];

const preencherFormulario = (indice) => {
    const aluno = alunos[indice];
    campoNome.value = aluno.nome;
    campoIdade.value = aluno.idade;
    campoCurso.value = aluno.curso;
    campoNota.value = aluno.notaFinal;

    indiceEdicao = indice;
    tituloFormulario.textContent = 'Editar Aluno';
    botaoCadastrar.textContent = 'Salvar';
};

const limparFormulario = () => {
    campoNome.value = '';
    campoIdade.value = '';
    campoCurso.value = '';
    campoNota.value = '';

    indiceEdicao = -1;
    tituloFormulario.textContent = 'Cadastrar Aluno';
    botaoCadastrar.textContent = 'Cadastrar';
};

// ---------- Criação de elementos na tabela ----------

const criarCelula = (texto) => {
    const celula = document.createElement('td');
    celula.appendChild(document.createTextNode(texto));
    return celula;
};

const criarBotao = (texto, classes) => {
    const botao = document.createElement('button');
    botao.appendChild(document.createTextNode(texto));
    botao.setAttribute('class', classes);
    return botao;
};

// Célula da situação com um badge do Bootstrap (verde ou vermelho)
const criarCelulaSituacao = (aluno) => {
    const celula = document.createElement('td');
    const badge = document.createElement('span');
    badge.setAttribute('class', aluno.isAprovado() ? 'badge bg-success' : 'badge bg-danger');
    badge.appendChild(document.createTextNode(aluno.isAprovado() ? 'Aprovado' : 'Reprovado'));
    celula.appendChild(badge);
    return celula;
};

const renderizarTabela = () => {
    tabela.innerHTML = '';

    alunos.forEach((aluno, indice) => {
        const linha = document.createElement('tr');

        linha.appendChild(criarCelula(aluno.nome));
        linha.appendChild(criarCelula(aluno.idade));
        linha.appendChild(criarCelula(aluno.curso));
        linha.appendChild(criarCelula(aluno.notaFinal.toFixed(1)));
        linha.appendChild(criarCelulaSituacao(aluno));

        const celulaAcoes = document.createElement('td');
        const botaoEditar = criarBotao('Editar', 'btn btn-sm btn-warning me-1');
        const botaoExcluir = criarBotao('Excluir', 'btn btn-sm btn-danger');

        // Evento do botão Editar (função anônima)
        botaoEditar.addEventListener('click', function () {
            preencherFormulario(indice);
            console.log('Editando aluno: ' + aluno.toString());
        });

        // Evento do botão Excluir (função anônima)
        botaoExcluir.addEventListener('click', function () {
            if (confirm(`Deseja excluir o aluno ${aluno.nome}?`)) {
                const removido = removerAluno(indice);
                limparFormulario();
                renderizarTabela();
                alert(`Aluno ${removido.nome} excluído com sucesso!`);
                console.log('Excluído -> ' + removido.toString());
            }
        });

        celulaAcoes.appendChild(botaoEditar);
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);
    });

    // Atualiza o relatório que estiver aberto com os dados novos
    atualizarRelatorio();
};

// ---------- Eventos do formulário (funções anônimas) ----------

botaoCadastrar.addEventListener('click', function () {
    const aluno = lerFormulario();

    if (!formularioValido(aluno)) {
        return;
    }

    if (indiceEdicao === -1) {
        adicionarAluno(aluno);
        alert(`Aluno ${aluno.nome} cadastrado com sucesso!`);
        console.log('Cadastrado -> ' + aluno.toString());
    } else {
        atualizarAluno(indiceEdicao, aluno);
        alert(`Aluno ${aluno.nome} editado com sucesso!`);
        console.log('Editado -> ' + aluno.toString());
    }

    limparFormulario();
    renderizarTabela();
});

botaoCancelar.addEventListener('click', function () {
    limparFormulario();
    console.log('Edição cancelada.');
});
