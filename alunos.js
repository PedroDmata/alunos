const express = require('express');
const mysql = require('mysql2/promise');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
app.use(express.json());

// Configuração do banco de dados
const pool = mysql.createPool({
  user: 'root',
  password: '@Pedro2008',
  database: 'escola',
  connectionLimit: 10,
});

// Definir as opções do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Alunos Escola',
      version: '1.0.0',
    },
  },
  apis: ['app.js'], // Substitua pelo caminho do seu arquivo principal
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Rota para servir a documentação do Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Documentação da rota da API para Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         idade:
 *           type: integer
 *         nota_primeiro_semestre:
 *           type: number
 *         nota_segundo_semestre:
 *           type: number
 *         nome_professor:
 *           type: string
 *         numero_sala:
 *           type: integer
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna a lista de todos os alunos.
 *     responses:
 *       200:
 *         description: Lista de alunos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro ao buscar alunos.
 */

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro ao buscar aluno.
 */

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Adicionar um novo aluno.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro ao adicionar aluno.
 */

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar um aluno existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro ao atualizar aluno.
 */

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Excluir um aluno pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno excluído com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 *       500:
 *         description: Erro ao excluir aluno.
 */

// Implementação das rotas da API CRUD
// (Você pode adicionar o código para as rotas CRUD aqui)

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
