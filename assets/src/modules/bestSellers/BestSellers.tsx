// Vidur Ratna 1309874
import React from "react";
import { API } from "aws-amplify";

import BestSellerProductRow from "./BestSellerProductRow";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";

interface BestSellersProps {}

interface BestSellersState {
  isLoading: boolean;
  books: { id: any; }[];
}

export default class BestSellers extends React.Component<BestSellersProps, BestSellersState> {
  constructor(props: BestSellersProps) {
    super(props);

    this.state = {
      isLoading: true,
      books: []
    };
  }

  async componentDidMount() {
    try {
      
      await API.get("bestsellers", "/bestsellers", null)
               .then((listOfIDs) => {

                  const bookIDList = [];

                  for (var i = 0; i < listOfIDs.length; i++) {
                    var hit = JSON.parse(listOfIDs[i]);
                    bookIDList.push({ bookId: hit });
                  }

                  return bookIDList
               })
               .then(async (jsonBookIDs) => {

                  const jsonBookPromises: any[] = [];
                  // start collecting promises
                  jsonBookIDs.map((book) => {
                    const bookObject = API.get("books",`/books/${book.bookId}`, null);
                    jsonBookPromises.push(bookObject)
                  })
                  // wait for all promises to come back.
                  const allBookObjects = await Promise.all(jsonBookPromises);

                  return allBookObjects
               })
               .then((listOfBooks) => {
                 const sortedListOfBooks = listOfBooks.sort((a,b) => {
                   return b.rating - a.rating
                 })

                 this.setState({
                    books: sortedListOfBooks,
                    isLoading: false
                  });
               })

    } catch(error) {
      alert(error);
    }
  }

  render() {
    return (
      <div className="Category">
        <SearchBar />
        <CategoryNavBar />
        <div>
          <div className="well-bs no-radius">
            <div className="container-category">
              <h3>Top 20 best sellers</h3>
            </div>
            {this.state.isLoading ? <div className="loader" /> :
              this.state.books.slice(0,20).map(book => <BestSellerProductRow bookId={book.id} key={book.id} />
            )}  
          </div>
        </div>
      </div>
    );
  }
}