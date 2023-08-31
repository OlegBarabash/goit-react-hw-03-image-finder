import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppSection } from './App,styled';
import { fetchPictures } from '../../services/request';

import { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('Submit', evt.target.elements[1].value);
    this.setState({
      query: `${Date.now()}/${evt.target.elements[1].value}`,
      images: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const queryWord = query
      .split('')
      .slice(query.indexOf('/') + 1)
      .join('');
    if (prevState.query !== query || prevState.page !== page) {
      try {
        // this.setState({ loading: true, error: false });

        const resp = await fetchPictures(queryWord, page);
        console.log(resp);
        // this.setState({ quizItems: quizzes });
      } catch (error) {
        // this.setState({ error: true });
      } finally {
        // this.setState({ loading: false });
      }

      // HTTP REQUEST
      // axios.get(`/search?${this.state.query}}`).then(data => {
      //   this.setState({ images: data });
      // });
    }
  }

  render() {
    return (
      <AppSection>
        <Searchbar onSubmit={this.handleSubmit} />
      </AppSection>
    );
  }
}
