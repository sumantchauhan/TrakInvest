import React from 'react'
import Table from 'react-bootstrap/Table';

 class Home extends React.Component {
     constructor(props){
         super(props);
         this.state = {
             name:'',
             rating:'',
             duration:'',
             movieList:[],
             searchText:'',
             searchItemList:[]
         }
     }

     handleChange = (event) =>{
        const value = event.target.value;
        this.setState({[event.target.name]: value})
     }

     handleSubmit = (event) => {
        event.preventDefault();
        let id = this.state.movieList.length;
        if(this.state.name !=='' && this.state.rating !=='' && this.state.duration !==""){
            console.log("hii")
            let movie = {
                id:id,
                name:this.state.name,
                rating:this.state.rating,
                duration:this.state.duration
            }
            this.state.movieList.push(movie);
            this.setState({movieList:this.state.movieList})
            this.sortMovie();
        }else{
            console.log("field is empty!");
        }
     }

     sortMovie = () => {
         let arr = this.state.movieList;
         arr.sort((x,y) => {
            return y.rating -x.rating
         })
         console.log("arr",arr);
     }

     handleSearch  = (event) => {
        this.setState({searchText:event.target.value});
     }

     handleTextSearch = event => {
         event.preventDefault();
         console.log("search");
         let searchResult;
         let movieList = this.state.movieList;
         if(movieList.length>0){
             searchResult = movieList.filter(
                 movies => event.target.value.length>1 
                 && movies.name.substring(0,event.target.value.length) === event.target.value
                 || event.target.value === movies.rating
             )
         }
         this.setState({searchItemList:searchResult})
     }

     render(){
         
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <label htmlFor="name"></label>
                Name:
                <input 
                    className="form-control" 
                    id="name" type="text" 
                    value={this.state.name} 
                    onChange={this.handleChange}
                    name='name'
                    />
                </div>
                <div className="form-group">
                <label htmlFor="rating"></label>
                Ratings:
                <input 
                    className="form-control" 
                    id="rating" type="text" 
                    value={this.state.rating} 
                    onChange={this.handleChange}
                    name="rating"
                    />
                </div>
                
                <div className="form-group">
                <label htmlFor="duration"></label>
                Duration:
                <input 
                    className="form-control" 
                    id="duration" type="text" 
                    value={this.state.duration} 
                    name="duration"
                    onChange={this.handleChange} />
                </div>
                <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
                <form onChange={this.handleTextSearch}>               
                <div className="search_box form-group">
                <input 
                    className="form-control" 
                    id="search" type="text" 
                    value={this.state.searchText} 
                    name="search"
                    onChange={this.handleSearch} />
                </div>
                </form>
                {
                this.state.movieList.length>0 && this.state.searchItemList.length ===0 ?
                 (   
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Ratings</th>
                        <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.movieList.map(movie => (
                        <tr>
                        <td>{movie.name}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.duration}</td>
                        </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                 )
                 :
                 <div></div>
                }

                <div style={{marginTop:"20px"}}>
                {
                this.state.searchItemList.length>0 ?
                 (       
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Ratings</th>
                        <th>Duration</th>
                        <th>search</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.searchItemList.map(movie => (
                        <tr>
                        <td>{movie.name}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.duration}</td>
                        <td>Search</td>
                        </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                 )
                 :
                 <div></div>
                }
                </div>
            </div>
        )
     }
    
}

export default Home;