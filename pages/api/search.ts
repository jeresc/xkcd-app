import { search } from '@/services/search'

import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { q },
  } = req

  if (typeof q !== 'string') {
    return res.status(200).json([])
  }

  const { results } = await search({ query: q })

  return res.status(200).json(results)
}
