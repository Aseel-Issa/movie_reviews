import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import Movie from './classes/movie';
import Review from './classes/review';
import AllMovies from './components/AllMovies'
import { BrowserRouter as Router, Route, Link as RouterLink, HashRouter, Routes, useNavigate } from 'react-router-dom'
import ReviewsTable from './components/ReviewsTable';
import AddReview from './components/AddReview';
import CreateMovie from './components/CreateMovie';
import LoginRegisterationForm from './components/LoginRegisterationForm'
import axios from 'axios'
const Base_Url = ''
// 'http://localhost:3000'


class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: {},
      isLoggedIn: false,
      movies: [new Movie('1', 'Jaws 4', [new Review('Rick', 0, 'You would morty ...'), new Review('Morty', 3, 'Like it ...')])]
    }
  }

  login = async (user) => {
    let results = await axios.get(Base_Url+'/api/movies', { withCredentials: true })
    let newList = results.data.map(m => {
      let reviews = m.reviews.map(r => { return new Review(r.user._id, r.user.firstName, r.rating, r.review)})
      return new Movie(m._id, m.title, reviews)
      })
    this.setState({
      loggedInUser: user,
      isLoggedIn: true,
      movies: newList
    }, () => {
      console.log(this.state)
    })

  }

  logout = async () => {
    // clear cookies from server side
    let result = await axios.get(Base_Url+'/api/logout')
    // logout client side
    if (result.status == 200) {
      this.setState({
        loggedInUser: {},
        isLoggedIn: false
      })
    }
  }

  async componentWillUnmount() {
    if (this.state.isLoggedIn) {
      this.logout()
    }
  }


  updateMovie = async (movie) => {
    let formatedReviews = movie.reviews.map(r => {return {user: r.user_id, rating: r.rating, review: r.content}})
    let formatedMovie = {...movie}
    formatedMovie.reviews = formatedReviews
    // console.log(formatedMovie)
    try{
      let result = await axios.put(Base_Url+'/api/movie', formatedMovie)
      // console.log(result)
    }catch(e){
      console.log(e)
      return
    }
    let index = this.state.movies.findIndex(m => {
      return m._id == movie._id
    })
    let newList = [...this.state.movies]
    newList.splice(index, 1, movie)
    this.setState({
      movies: newList
    })
  }

  deleteMovie = async (_id) => {
    try{
      let result = await axios.delete(Base_Url+'/api/movie/'+_id)
      console.log(result)
    }catch(e){
      console.log(e)
      return
    }
    let index = this.state.movies.findIndex(m => {
      return m._id == _id
    })
    let newList = [...this.state.movies]
    newList.splice(index, 1)
    this.setState({
      movies: newList
    })
  }

  addMovie = async (movie) => {
    let formatedReviews = movie.reviews.map(r => {return {user: r.user_id, rating: r.rating, review: r.content}})
    let formatedMovie = {title: movie.title, avgRating: movie.avgRating, reviews: formatedReviews}
    formatedMovie.reviews = formatedReviews
    // console.log(formatedMovie)
    try{
      let result = await axios.post(Base_Url+'/api/movie/new', formatedMovie)
      movie._id = result.data._id
      console.log(result)
    }catch(e){
      console.log(e)
      return
    }
    let newList = [...this.state.movies]
    newList.push(movie)
    this.setState({
      movies: newList
    })
  }

  render() {

    let page
    if (!this.state.isLoggedIn) {
      page = (
        <Router>
          <Routes>
            <Route path='/' exact element={<LoginRegisterationForm login={this.login}></LoginRegisterationForm>}></Route>
          </Routes>
        </Router>
      )
    }else{
      page = (<div>
<div className='header'>
          <div className='header-title'>
            <h1>Moldy Tomatoes</h1>
          </div>
          <div className='header-btn'>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>

        <div className='content'>
        <Router>
          <Routes>
            <Route path='/' exact element={<AllMovies movies={this.state.movies}></AllMovies>}></Route>
            <Route path='/movies' exact element={<AllMovies movies={this.state.movies}></AllMovies>}></Route>
            <Route path='/movies/:id' exact element={<ReviewsTable movies={this.state.movies} deleteMovie={this.deleteMovie} updateMovie={this.updateMovie} loggedInUser={this.state.loggedInUser}></ReviewsTable>}></Route>
            <Route path='/movies/:id/review' exact element={<AddReview movies={this.state.movies} updateMovie={this.updateMovie} user={this.state.loggedInUser}></AddReview>}></Route>
            <Route path='/movies/new' exact element={<CreateMovie addMovie={this.addMovie} user={this.state.loggedInUser} ></CreateMovie>}></Route>
          </Routes>
        </Router>
        </div>
      </div>
      )
    }
    return (
      <div className="App">
        {page}

      </div>
    );
  }
}

export default App;
