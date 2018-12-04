import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state={
      input: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed"
            onChange={this.onChange}
          />

          <SearchIcon 
            onClick={ ()=>this.props.filter(this.state.input) }
          id="Search__icon" />
        </div>
        
      </section>
    )
  }
}