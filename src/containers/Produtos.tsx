import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import * as S from './styles'
import { RootState } from '../store'
import { adicionarAoCarrinho } from '../store/slices/carrinhoSlice'

const ProdutosComponent = ({ produtos }: { produtos: ProdutoType[] }) => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.carrinho.itens)

  const produtoEstaNosFavoritos = (produto: ProdutoType) =>
    favoritos.some((item) => item.id === produto.id)

  const produtoJaNoCarrinho = (produto: ProdutoType) =>
    favoritos.some((item) => item.id === produto.id)

  const handleComprar = (produto: ProdutoType) => {
    if (produtoJaNoCarrinho(produto)) {
      toast.warn(`O produto "${produto.nome}" já está no carrinho.`)
    } else {
      dispatch(adicionarAoCarrinho(produto))
      toast.success(`O produto "${produto.nome}" foi adicionado ao carrinho.`)
    }
  }

  return (
    <S.Produtos>
      {produtos.map((produto) => (
        <Produto
          estaNosFavoritos={produtoEstaNosFavoritos(produto)}
          key={produto.id}
          produto={produto}
          favoritar={() => dispatch(adicionarAoCarrinho(produto))}
          aoComprar={() => handleComprar(produto)}
        />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent
