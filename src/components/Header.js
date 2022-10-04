import React from 'react';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await getUser();
    this.setState({ userName: user.name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <p>Carregando...</p>
            : (
              <h1 data-testid="header-user-name">{userName}</h1>
            )
        }
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
