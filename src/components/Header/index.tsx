import { useSelector } from 'react-redux'
import * as S from './styles'
import { RootState } from '../../store'

const Header = () => {
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)

  const valorTotal = carrinho.reduce((acc, item) => acc + item.preco, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{carrinho.length} itens no carrinho</span>
        <span>Valor total: R$ {valorTotal.toFixed(2)}</span>
      </div>
    </S.Header>
  )
}

export default Header
