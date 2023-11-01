const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Configuração do banco de dados
const pool = mysql.createPool({
  user: 'root',
  password: '@Pedro2008',
  database: 'escola',
  connectionLimit: 10,
});

// Rotas da API
app.post('/alunos', async (req, res) => {
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO alunos (nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar aluno' });
  }
});

app.get('/alunos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alunos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
});

app.get('/alunos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM alunos WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

app.put('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala } = req.body;

  try {
    await pool.query(
      'UPDATE alunos SET nome = ?, idade = ?, nota_primeiro_semestre = ?, nota_segundo_semestre = ?, nome_professor = ?, numero_sala = ? WHERE id = ?',
      [nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala, id]
    );

    res.json({ id, nome, idade, nota_primeiro_semestre, nota_segundo_semestre, nome_professor, numero_sala });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM alunos WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Aluno excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir aluno' });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
