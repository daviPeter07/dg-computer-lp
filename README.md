# DG Computer — site institucional e loja (vitrine)

Next.js 16 (App Router, Cache Components) + Tailwind 4 + shadcn/ui (Base UI), Magic UI e React Bits.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Início: serviços, manutenção, destaques do estoque, diferenciais |
| `/sobre` | Quem somos, áreas de atuação, diferenciais, portfólio de sites |
| `/historia` | Linha do tempo e montagens de PC Gamer |
| `/produtos` | Produtos do ERP agrupados por categoria |
| `/loja` e `/loja/[slug]` | Loja **somente para consulta** (busca, filtros, detalhe). Sem carrinho nem pagamento; a compra é pelo WhatsApp |
| `/faq` | Perguntas frequentes |
| `/contato` | Canais, mapa e formulário que abre o WhatsApp com a mensagem pronta |

## Integração com o ERP de estoque

Toda a leitura de produtos passa por `src/lib/erp/client.ts`.

- Sem `ERP_API_URL`, o site usa os dados de demonstração de `src/lib/erp/demo.ts` e mostra o aviso "Dados de demonstração".
- Com `ERP_API_URL`, faz `GET {ERP_API_URL}/produtos?ativos=true` (com `Authorization: Bearer ERP_API_TOKEN`, se definido). Ajuste a interface `ProdutoErp` e a função `mapearProduto` aos campos reais do ERP, e o mapa `gruposParaCategoria` aos grupos cadastrados nele.
- O catálogo fica em cache (`cacheLife("minutes")`, tag `erp-catalogo`). Para atualizar na hora quando o estoque mudar, configure o ERP para chamar:

  ```bash
  curl -X POST https://SEU-DOMINIO/api/estoque/revalidar -H "x-webhook-secret: $ERP_WEBHOOK_SECRET"
  ```

- Fotos hospedadas pelo ERP: defina `ERP_IMAGE_HOST` para liberar o domínio no `next/image`.

Veja `.env.example`.
