const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, name, email, bio FROM psychologists');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar psicólogos' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT id, name, email, bio FROM psychologists WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Psicólogo não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar psicólogo' });
  }
};

exports.create = async (req, res) => {
  const { name, email, password, bio } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await db.query(
      'INSERT INTO psychologists (name, email, password, bio) VALUES ($1, $2, $3, $4) RETURNING id, name, email, bio',
      [name, email, hash, bio]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao cadastrar psicólogo', error: err.detail });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  try {
    await db.query(
      'UPDATE psychologists SET name = $1, email = $2, bio = $3 WHERE id = $4',
      [name, email, bio, id]
    );
    res.json({ message: 'Dados atualizados com sucesso' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar dados' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM psychologists WHERE id = $1', [id]);
    res.json({ message: 'Conta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir psicólogo' });
  }
};
