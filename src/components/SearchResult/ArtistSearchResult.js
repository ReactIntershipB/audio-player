import React from 'react';
import { inject } from 'mobx-react';

@inject('searchModel')
export default class ArtistSearchResult extends React.Component {
   componentDidMount() {
       console.log('Artist', this.props);
   }
   render() {
       return (
           <div>
               Artist Search Result
           </div>
       );
   }
}
