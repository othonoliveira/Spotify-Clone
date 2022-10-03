import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    buttonState: true,
    loading: false,
  };

  handleName = (event) => {
    this.setState({ name: event.target.value }, this.toggleButton);
  };

  toggleButton = () => {
    const { name } = this.state;
    const MIN_LENGTH = 3;
    if (name.length >= MIN_LENGTH) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  };

  userCreation = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    const user = await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
    console.log(user);
  };

  render() {
    const { buttonState, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading ? <p>Carregando...</p>
          : (
            <form>
              <label htmlFor="name-input">
                <input
                  type="text"
                  name="name-input"
                  data-testid="login-name-input"
                  onChange={ this.handleName }
                />
              </label>
              <button
                disabled={ buttonState }
                data-testid="login-submit-button"
                type="button"
                onClick={ this.userCreation }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
