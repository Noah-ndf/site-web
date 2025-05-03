import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie que le token est présent
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attache les infos de l'utilisateur à la requête
    req.user = decoded;
    next(); // Passe à la suite (la route protégée)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
