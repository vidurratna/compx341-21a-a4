import { API } from 'aws-amplify'
import React, { Component } from 'react'
import StarRating from '../../common/starRating/StarRating'

interface OverviewProps {
    match: any;
}

interface OverviewState {
    book: any,
    isLoading: boolean
}
export default class Overview extends Component<OverviewProps, OverviewState> {

    id = this.props.match.params.id

    constructor(props: OverviewProps){
        super(props)

        this.state = {
            book: null,
            isLoading: true,
        }
    }

    getBook() {
        return API.get("books", `/books/${this.id}`, null)
    }

    async componentDidMount(){
        try {
            const book = await this.getBook()

            this.setState({
                book: book,
                isLoading: false
            })
            
        } catch(error){
            alert(error)
        }
    }
    
    render() {

        if(!this.id) return null;

        return (
            <div className="Category">
            <div>
              {this.state.isLoading ? <div className="loader" />:
                <div className="well-bs no-radius">
                    <div className="container-category">
                        <h3>{this.state.book.name}</h3>
                    </div>
                    <div>
                        <div>
                            <h5>Author:</h5>
                            <span>{this.state.book.author}</span>
                            <h5>Category: {this.state.book.category}</h5>
                            <h5>Price: ${this.state.book.price}</h5>
                            <h5>Rating: <StarRating stars={this.state.book.rating}/></h5>
                            <br/>
                            <h5>Description</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                </div>}
            </div>
          </div>
        )
    }
}
