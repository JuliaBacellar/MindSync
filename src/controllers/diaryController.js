const pool = require('../models/db'); // conexão com banco

// Criar uma nova entrada no diário
exports.createEntry = async (req, res) => {
  const { user_id, content } = req.body;

  try {
    await pool.query(
      'INSERT INTO diary_entries (user_id, content) VALUES ($1, $2)',
      [user_id, content]
    );

    res.status(201).json({ message: 'Entrada criada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar entrada' });
  }
};

// Listar todas entradas do usuário
exports.getEntries = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query(
      'SELECT * FROM diary_entries WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar entradas' });
  }
};

// Atualizar entrada
exports.updateEntry = async (req, res) => {
  const entryId = req.params.id;
  const { content } = req.body;

  try {
    await pool.query(
      'UPDATE diary_entries SET content = $1 WHERE id = $2',
      [content, entryId]
    );

    res.status(200).json({ message: 'Entrada atualizada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar entrada' });
  }
};

// Deletar entrada
exports.deleteEntry = async (req, res) => {
  const entryId = req.params.id;

  try {
    await pool.query('DELETE FROM diary_entries WHERE id = $1', [entryId]);
    res.status(200).json({ message: 'Entrada deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar entrada' });
  }
};
