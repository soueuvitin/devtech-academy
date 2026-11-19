// Exercício 4: Relatórios com filter, map, reduce, sort e forEach
// Os métodos de array não alteram o array "alunos": cada um retorna um novo resultado.
const resultadoRelatorio = document.getElementById('resultado-relatorio');

// Guarda o último relatório aberto para refazê-lo quando os dados mudarem
let relatorioAtual = null;

const atualizarRelatorio = () => {
    if (relatorioAtual !== null) {
        relatorioAtual();
    }
};

// Mostra o título e a lista de linhas do relatório na página
const exibirRelatorio = (titulo, linhas) => {
    resultadoRelatorio.innerHTML = '';

    const tituloRelatorio = document.createElement('h4');
    tituloRelatorio.appendChild(document.createTextNode(titulo));
    resultadoRelatorio.appendChild(tituloRelatorio);

    if (alunos.length === 0) {
        const aviso = document.createElement('p');
        aviso.appendChild(document.createTextNode('Nenhum aluno cadastrado.'));
        resultadoRelatorio.appendChild(aviso);
        return;
    }

    const lista = document.createElement('ul');

    // forEach: cria um <li> para cada linha do relatório
    linhas.forEach(linha => {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(linha));
        lista.appendChild(item);
    });

    resultadoRelatorio.appendChild(lista);
};

// 1. Alunos aprovados (notaFinal >= 7) -> filter + map
const relatorioAprovados = () => {
    const aprovados = alunos
        .filter(aluno => aluno.isAprovado())
        .map(aluno => `${aluno.nome} - Nota: ${aluno.notaFinal.toFixed(1)}`);

    exibirRelatorio(
        'Alunos aprovados (nota >= 7)',
        aprovados.length > 0 ? aprovados : ['Nenhum aluno aprovado.']
    );
    console.log('Aprovados:', aprovados);
};

// 2. Média das notas finais -> reduce
const relatorioMediaNotas = () => {
    const soma = alunos.reduce((acumulador, aluno) => acumulador + aluno.notaFinal, 0);
    const media = alunos.length > 0 ? soma / alunos.length : 0;

    exibirRelatorio('Média das notas finais', [`Média: ${media.toFixed(2)}`]);
    console.log('Média das notas:', media);
};

// 3. Média das idades -> map + reduce
const relatorioMediaIdades = () => {
    const idades = alunos.map(aluno => aluno.idade);
    const soma = idades.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
    const media = alunos.length > 0 ? soma / alunos.length : 0;

    exibirRelatorio('Média das idades', [`Média: ${media.toFixed(1)} anos`]);
    console.log('Média das idades:', media);
};

// 4. Nomes em ordem alfabética -> map + sort
// O map cria um novo array, então o sort não altera a ordem do array "alunos"
const relatorioOrdemAlfabetica = () => {
    const nomes = alunos
        .map(aluno => aluno.nome)
        .sort((a, b) => a.localeCompare(b));

    exibirRelatorio('Nomes em ordem alfabética', nomes);
    console.log('Nomes ordenados:', nomes);
};

// 5. Quantidade de alunos por curso -> reduce
const relatorioPorCurso = () => {
    const contagem = alunos.reduce((acumulador, aluno) => {
        acumulador[aluno.curso] = acumulador[aluno.curso] + 1;
        return acumulador;
    }, { JavaScript: 0, Python: 0, Java: 0 });

    const linhas = Object.keys(contagem).map(curso => `${curso}: ${contagem[curso]} aluno(s)`);

    exibirRelatorio('Quantidade de alunos por curso', linhas);
    console.log('Alunos por curso:', contagem);
};

// ---------- Eventos dos botões de relatório (funções anônimas) ----------

document.getElementById('botao-aprovados').addEventListener('click', function () {
    relatorioAtual = relatorioAprovados;
    relatorioAprovados();
});

document.getElementById('botao-media-notas').addEventListener('click', function () {
    relatorioAtual = relatorioMediaNotas;
    relatorioMediaNotas();
});

document.getElementById('botao-media-idades').addEventListener('click', function () {
    relatorioAtual = relatorioMediaIdades;
    relatorioMediaIdades();
});

document.getElementById('botao-ordem-alfabetica').addEventListener('click', function () {
    relatorioAtual = relatorioOrdemAlfabetica;
    relatorioOrdemAlfabetica();
});

document.getElementById('botao-por-curso').addEventListener('click', function () {
    relatorioAtual = relatorioPorCurso;
    relatorioPorCurso();
});
