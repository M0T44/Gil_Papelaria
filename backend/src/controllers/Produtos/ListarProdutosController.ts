import { Request, Response } from "express";
import { ListarProdutosServices } from "../../services/Produtos/ListarProdutosServices";

class ListarProdutosController {
    async handle(req: Request, res: Response) {
        try {
            const listarProdutosServices = new ListarProdutosServices()
            const resposta = await listarProdutosServices.execute()
            return res.json(resposta)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar produtos.' });
        }
    }
}

export { ListarProdutosController }