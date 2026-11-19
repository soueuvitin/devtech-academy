// Exercício 2: Refatoração do CRUD usando a classe Aluno
// Cada registro do array agora é uma instância (objeto) da classe Aluno.
const alunos = [];

// Guarda a posição do aluno que está sendo editado.
// Quando vale -1, o formulário está no modo de cadastro.
let indiceEdicao = -1;

// Lê os campos do formulário e devolve uma nova instância de Aluno
function lerFormulario() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('nota-final').value;

    return new Aluno(nome.trim(), parseInt(idade), curso, parseFloat(notaFinal));
}

// Confere se todos os campos foram preenchidos corretamente
function formularioValido(aluno) {
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
}

// Chamada pelo botão "Cadastrar" (onclick)
function cadastrarAluno() {
    const aluno = lerFormulario();

    if (!formularioValido(aluno)) {
        return;
    }

    if (indiceEdicao === -1) {
        // Modo cadastro: adiciona o novo aluno no array
        alunos.push(aluno);
        console.log('Cadastrado -> ' + aluno.toString());
    } else {
        // Modo edição: substitui o aluno na mesma posição
        alunos[indiceEdicao] = aluno;
        console.log('Editado -> ' + aluno.toString());
    }

    limparFormulario();
    renderizarTabela();
}

// Chamada pelo botão "Editar" de cada linha
function editarAluno(indice) {
    const aluno = alunos[indice];

    // Preenche o formulário com os dados do aluno escolhido
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('nota-final').value = aluno.notaFinal;

    indiceEdicao = indice;
    document.getElementById('titulo-formulario').textContent = 'Editar Aluno';
    document.getElementById('botao-cadastrar').textContent = 'Salvar';
}

// Chamada pelo botão "Excluir" de cada linha
function excluirAluno(indice) {
    if (confirm(`Deseja excluir o aluno ${alunos[indice].nome}?`)) {
        // splice remove 1 elemento a partir da posição indicada
        alunos.splice(indice, 1);
        limparFormulario();
        renderizarTabela();
    }
}

// Limpa os campos e volta o formulário para o modo cadastro
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('nota-final').value = '';

    indiceEdicao = -1;
    document.getElementById('titulo-formulario').textContent = 'Cadastrar Aluno';
    document.getElementById('botao-cadastrar').textContent = 'Cadastrar';
}

// Cria uma célula <td> com o texto informado
function criarCelula(texto) {
    const celula = document.createElement('td');
    const textoDaCelula = document.createTextNode(texto);
    celula.appendChild(textoDaCelula);
    return celula;
}

// Cria um botão com o texto, as classes do Bootstrap e a função chamada no onclick
function criarBotao(texto, classes, acao) {
    const botao = document.createElement('button');
    botao.appendChild(document.createTextNode(texto));
    botao.setAttribute('class', classes);
    botao.setAttribute('onclick', acao);
    return botao;
}

// Cria a célula da situação com um badge do Bootstrap (verde ou vermelho)
function criarCelulaSituacao(aluno) {
    const celula = document.createElement('td');
    const badge = document.createElement('span');

    if (aluno.isAprovado()) {
        badge.setAttribute('class', 'badge bg-success');
        badge.appendChild(document.createTextNode('Aprovado'));
    } else {
        badge.setAttribute('class', 'badge bg-danger');
        badge.appendChild(document.createTextNode('Reprovado'));
    }

    celula.appendChild(badge);
    return celula;
}

// Monta novamente todas as linhas da tabela a partir do array
function renderizarTabela() {
    const tabela = document.getElementById('tabela-alunos');

    // Remove as linhas antigas
    tabela.innerHTML = '';

    for (let i = 0; i < alunos.length; i++) {
        const aluno = alunos[i];

        // 1. Cria a linha <tr>
        const linha = document.createElement('tr');

        // 2. Cria as células com os dados do aluno
        linha.appendChild(criarCelula(aluno.nome));
        linha.appendChild(criarCelula(aluno.idade));
        linha.appendChild(criarCelula(aluno.curso));
        linha.appendChild(criarCelula(aluno.notaFinal.toFixed(1)));

        // Usa o método isAprovado() da classe para mostrar a situação
        linha.appendChild(criarCelulaSituacao(aluno));

        // 3. Cria a célula de ações com os botões Editar e Excluir
        const celulaAcoes = document.createElement('td');
        celulaAcoes.appendChild(criarBotao('Editar', 'btn btn-sm btn-warning me-1', `editarAluno(${i})`));
        celulaAcoes.appendChild(criarBotao('Excluir', 'btn btn-sm btn-danger', `excluirAluno(${i})`));
        linha.appendChild(celulaAcoes);

        // 4. Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}
