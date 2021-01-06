import React from 'react';

import Card from '../components/Card/Card'
console.log(process.env.API);
const API = process.env.API;

class List extends React.Component{

     constructor(){
          super();
          this.state = {
               data: [],
               searchTerm: '',
               error: '',
               loading: true,
          }
     }

     // async componentDidMount(){
     //      const res = await fetch('../../assets/data.json');
     //      const resJson = await res.json();
     //      this.setState({data: resJson});
     // }

     async componentDidMount(){
          const res = await fetch(`${API}&s=spiderman`);
          const resJson = await res.json();
          this.setState({data: resJson.Search, loading: false});
          
     }

     async handleSubmit(e){
          e.preventDefault();
          if (!this.state.searchTerm){
               return this.setState({error: 'Por favor escribe un texto valido'})
          }

          const res = await fetch(`${API}&s=${this.state.searchTerm}`)
          const data = res.json()

          if (!data.Search){
               return this.setState({error: 'No hay resultados'})
          }

          this.setState({data: data.Search, error: '', searchTerm: ''})
     }

     render(){

          const { data, loading } = this.state;
          if (loading){
               return <h3 className="text-light">Loading...</h3>
          }

          return(
               <div>
                    <div className="row">
                         <div className="col-md-4 offset-md-4 p-4">
                              <form onSubmit={(e) => this.handleSubmit(e)}>
                                   <input type="text" className="form-control"  placeholder="Search" onChange={e => this.setState({searchTerm: e.target.value})} value={this.state.searchTerm} autoFocus/>
                              </form>
                              <p className="text-white">{this.state.error ? this.state.error : ''}</p>
                         </div>
                    </div>
                    <div className="row">
                         {
                              data.map((movie, i) => {
                                   return <Card movie={movie} key={i}/>
                              })
                         }
                    </div>     
               </div>
          )
     }

}

export default List;