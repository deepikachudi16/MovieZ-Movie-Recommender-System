import React from 'react';
import {HomeNavigationBar} from "../HomeComponent/HomeNavigationBar";
import MovieServiceClient from "../../services/MovieService";
import {MovieSearchResultItem} from "./MovieSearchResultItem";
import UserService from "../../services/UserService";
import FooterComponent from "../../components/HomeComponent/FooterComponent";
import posed from "react-pose";

const AnimatedDiv = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1}
});

export default class MovieSearchComponent extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.state = {
            searchResults: [],
            userProfile: '',
            searchQuery: '',
            searchType: 'movie',
            isVisible: false
        }

        this.searchTextUpdated = this.searchTextUpdated.bind(this);
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
        this.searchTypeUpdated = this.searchTypeUpdated.bind(this);
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ isVisible: !this.state.isVisible });
        }, 500);

        MovieServiceClient.instance.searchMovieForQuery(this.props.match.params.query).then(response => {
            console.log(response.results);
            this.setState({
                searchResults: response.results
            })
        });

        this.userService.getProfile().then(
            response => this.setState({
                userProfile: response
            })
        )
    }

    searchTextUpdated(event) {
        this.setState({
            searchQuery: event.target.value
        })
    }

    searchTypeUpdated(event) {
        this.setState({
            searchType: event.target.value
        })
    }

    searchButtonClicked() {
        if (this.state.searchQuery !== '') {
            if (this.state.searchType === 'movie') {
                this.props.history.push('/movie/search/' + this.state.searchQuery);
                window.location.reload(false);
            }
            else {
                this.props.history.push('/user/search/' + this.state.searchQuery);
                window.location.reload(false);
            }
        }
        else {
            alert("Enter a search query first!");
        }
    }

    renderSearchResults() {
        if(this.state.searchResults) {
            if (this.state.searchResults.length === 0) {
                return <h4 className="white-title ml-4">No results found</h4>
            }
            else {
                let items = this.state.searchResults
                    .map(function (result) {
                        return <MovieSearchResultItem searchResult={result}/>;
                    });
                return (items);
            }
        }
    }

    render() {
        return (
            <AnimatedDiv pose={this.state.isVisible ? 'visible' : 'hidden'}>
                {
                    this.state.userProfile.message === 'You are not logged in' &&
                    <HomeNavigationBar loggedIn={false}/>

                }
                {
                    this.state.userProfile.username !== undefined &&
                    <div>
                        <HomeNavigationBar loggedIn={true}
                                           username={this.state.userProfile.username}
                                           logout={this.logout}/>
                    </div>
                }
                <div className="row  justify-content-center mt-4">
                        <div className="col-md-3">
                            <input
                                style={{backgroundColor: 'rgb(0,0,0,0.3)', caretColor: 'rgb(255,255,0)', color: 'white', backgroundBlendMode: 'overlay', borderRadius: '5px', height: '40px', fontSize: '20px'}}
                                className="form-control" type="text" onChange={this.searchTextUpdated}
                                placeholder="Search" value={this.state.searchQuery}
                                aria-label="Search"/>
                        </div>
                        <div className="col-md-3">
                            <select 
                                    style={{backgroundColor: 'rgb(0,0,0,0.3)', caretColor: 'rgb(255,255,0)', color: 'white', backgroundBlendMode: 'overlay', borderRadius: '5px', height: '40px', fontSize: '20px'}}
                               
                                    className="w-100" onChange={this.searchTypeUpdated}>
                                <option value="movie">Movies</option>
                                <option value="user">Users</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button type='btn' style={{height:"40px"}} className=" w-100 text-white btn btn-outline-primary ml-3" onClick={this.searchButtonClicked}>
                                Search
                            </button>
                        </div>
                </div>
                <div className="container-fluid ml-0 ">
                    <h6 className={'mt-4 col-12 white-title text-center'}> Search results for "{this.props.match.params.query}" </h6>
                
                <div className='row'>
                    <div className='col-2'></div>
                    <div className="col-8 mt-4 justify-content-center" style={{height:"80vh",overflowY:"scroll"}} >
                        <ul className="list-group " >
                            {this.renderSearchResults()}
                        </ul>
                    </div>
                </div>
                </div>
                <FooterComponent/>
            </AnimatedDiv>
        );
    }
}