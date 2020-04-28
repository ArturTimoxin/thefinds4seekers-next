import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'semantic-ui-react'

export default class SearchBox extends React.Component {
  componentDidMount() {
    if (process.browser) {
        // client-side-only code
        google = window.google;
    }
    const input = ReactDOM.findDOMNode(this.refs.searchboxInput);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    google.maps.event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }

  render() {
    const { onPlacesChanged, placeholder } = this.props;

    return (
      <div className="ui input icon searchbox-input">
        <input 
          ref="searchboxInput" 
          onChange={onPlacesChanged}
          placeholder={placeholder}
          type="text" 
          className='input-serch-place'
        />
        <i className="search icon icon-z"></i>
      </div>
    );
  }
}