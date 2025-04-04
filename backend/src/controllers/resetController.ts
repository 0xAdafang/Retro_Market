import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const requestPasswordReset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> => {

  try {
    // 1. Trouver l'utilisateur par email ou username
    const { emailOrUsername } = req.body;

    const userQuery = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [emailOrUsername]
    );

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = userQuery.rows[0];
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h

    
    await pool.query(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, token, expiresAt]
    );
    console.log("→ TOKEN:", token);
    console.log("→ EMAIL_USER:", process.env.EMAIL_USER);
    console.log("→ EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");
    console.log("→ Target Email:", user.email);
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  
    const resetLink = `http://localhost:5173/reset/${token}`; // à adapter si déployé

    try {
        await transporter.sendMail({
          from: `"Retro Market" <${process.env.EMAIL_USER}>`,
          to: user.email,
          replyTo: process.env.EMAIL_USER,
          subject: "🔐 Réinitialisation de votre mot de passe",
          html: `
            <p>Bonjour ${user.username},</p>
            <p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p>
            <a href="${resetLink}">${resetLink}</a>
          `,
        });
        console.log("✅ Email envoyé avec succès !");
      } catch (err: any) {
        console.error("❌ Erreur d'envoi d'email :", err.response || err.message || err);
        return res.status(500).json({ message: "Échec de l'envoi de l'email." });
      }
      

    return res.json({ message: "Un email de réinitialisation a été envoyé." });
    } catch (err) {
        console.error("Erreur de réinitialisation :", err);
        next(err);
        return res.status(500).json({ message: "Erreur serveur." });
    }

};

export const resetPasswordWithToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
  
      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token et nouveau mot de passe requis." });
      }
  
      const resetRequest = await pool.query(
        "SELECT * FROM password_resets WHERE token = $1",
        [token]
      );

      const resetRequestData = resetRequest.rows[0];
      if (!resetRequestData || resetRequestData.expires_at < new Date()) {
        return res.status(400).json({ message: "Token invalide ou expiré." });
      }

     
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await pool.query(
        "UPDATE users SET password = $1 WHERE id = $2",
        [hashedPassword, resetRequestData.user_id]
      );
  
      await pool.query(
        "DELETE FROM password_resets WHERE token = $1",
        [token]
      );
  
     
  
      return res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (err) {
      console.error("Erreur de réinitialisation:", err);
      return res.status(500).json({ message: "Erreur serveur." });
    }
  };