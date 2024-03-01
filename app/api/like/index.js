// pages/api/like.js

import { serialize } from 'cookie';
import prisma from '../../../utils/prisma'; // Adjust based on your Prisma setup location

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.cookies.alreadyLiked) {
      return res.status(409).json({ message: 'You have already liked' });
    }

    try {
      const like = await prisma.like.update({
        where: { id: 1 },
        data: { count: { increment: 1 } },
      });

      res.setHeader('Set-Cookie', serialize('alreadyLiked', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365, httpOnly: true }));
      return res.status(200).json({ message: 'Liked successfully', count: like.count });
    } catch (error) {
      return res.status(500).json({ error: 'Error processing like' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
