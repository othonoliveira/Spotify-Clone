import React from 'react';
import { getUser } from '../services/userAPI';

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
      </header>
    );
  }
}

export default Header;
