const db = require('../models/db');

const addEmotion = async (req, res) => {
  const { user_id, emotion_type } = req.body;

  if (!user_id || !emotion_type) {
    return res.status(400).json({ error: 'Campos obrigatórios: user_id e emotion_type' });
  }

  try {
    await db.query(
      'INSERT INTO emotions (user_id, emotion_type) VALUES ($1, $2)',
      [user_id, emotion_type]
    );
    res.status(201).json({ message: 'Emoção registrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar emoção:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const getEmotionsByMonth = async (req, res) => {
  const { mes, ano, user_id } = req.query;

  if (!mes || !ano || !user_id) {
    return res.status(400).json({ error: 'Campos obrigatórios: mes, ano e user_id' });
  }

  try {
    const result = await db.query(
      `SELECT emotion_type, COUNT(*) as total
       FROM emotions
       WHERE EXTRACT(MONTH FROM created_at) = $1
         AND EXTRACT(YEAR FROM created_at) = $2
         AND user_id = $3
       GROUP BY emotion_type`,
      [mes, ano, user_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar emoções:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = { addEmotion, getEmotionsByMonth };
