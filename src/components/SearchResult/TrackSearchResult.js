import React from 'react';
import { inject } from 'mobx-react';

@inject('searchModel')
export default class TrackSearchResult extends React.Component {
   render() {
       return (
           <div>
               Track Search Result
           </div>
       );
   }
}
