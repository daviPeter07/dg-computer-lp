import { revalidateTag } from "next/cache"
import type { NextRequest } from "next/server"

import { TAG_CATALOGO } from "@/lib/erp/client"

// Webhook chamado pelo ERP quando estoque, preço ou cadastro de produto mudar.
// O ERP deve enviar o cabeçalho `x-webhook-secret` igual a ERP_WEBHOOK_SECRET.
export async function POST(request: NextRequest) {
  const segredo = process.env.ERP_WEBHOOK_SECRET
  if (!segredo || request.headers.get("x-webhook-secret") !== segredo) {
    return Response.json({ ok: false, erro: "Não autorizado" }, { status: 401 })
  }

  revalidateTag(TAG_CATALOGO, "max")
  return Response.json({ ok: true, revalidado: TAG_CATALOGO })
}
