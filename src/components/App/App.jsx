import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppSection } from './App,styled';
import { fetchPictures } from '../../services/request';

import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  getQuery = () => {
    const { query } = this.state;
    return query
      .split('')
      .slice(query.indexOf('/') + 1)
      .join('');
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements[1].value}`,
      images: [],
      page: 1,
      loading: false,
      error: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false });

        const resp = await fetchPictures(this.getQuery(), page);
        const imgArr = resp.data.hits.map(img => {
          return {
            id: img.id,
            webformatURL: img.webformatURL,
            largeImageURL: img.largeImageURL,
          };
        });
        imgArr.unshift(...this.state.images);
        this.setState({ images: imgArr });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <AppSection>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.loading && <Loader />}
        {this.state.images.length ? (
          <Button nextPage={this.handleLoadMore} />
        ) : (
          <></>
        )}
      </AppSection>
    );
  }
}
