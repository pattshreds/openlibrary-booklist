import React, { useState, useEffect } from "react";
import axios from 'axios';

const GetBooks = () => {

const [books, setBooks] = useState([]);
const [works, setWorks] = useState([]);

    const fetchData = () => {
        axios.get(`https://openlibrary.org/search.json?q=${document.getElementById('input').value}`)
            .then((res) => {
                const booksArray = [res.data.docs]
                setBooks(res.data.docs);
                const keyArray = [];
                booksArray.forEach(books => {
                    books.forEach(book => {
                        keyArray.push(book.key);
                    })
                    keyArray.forEach(key => {
                        axios.get(`https://openlibrary.org${key}.json`)
                        .then((res) => {
                            setWorks((prev) => [...prev, res.data]);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // useEffect(() => {
    //     console.log('works', works);
    //     // console.log('books', books);
    // }, [works,books])


    return(
        <>
            <h1 id='pageTitle'>Welcome to React Books</h1>
            <input type="text" id="input" />
            <button onClick={fetchData} id='searchBtn'>Search</button>

            <ol id='resultsList'>
                {books.map((book) => {
                    return(
                        <li key={book.key} className='resultsListLi'>
                            <h3 className='bookTitle'>{book.title}</h3>
                            <p id='author_name'>Written by {book.author_name}
                            </p>
                            <p id='publish_year'>Published {book.first_publish_year}
                            </p>

                            {works.map((work) => {
                                return(
                                    <li>
                                        {work.description && typeof work.description === 'string' &&
                                            <p>
                                                {work.description}
                                            </p>
                                        }
                                    </li>
                                )   
                            })}

                            <hr className='bookDivider' />
                        </li>
                    )   
                })}
            </ol>
        </>
    )
}

export default GetBooks;