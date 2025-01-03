import MainPage from "../../../shared/UIElements/mainpage"
import ListView from "../../../shared/UIElements/listview"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LibraryReusable = () => {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // MONTH IS ZERO-BASED, SO ADD 1
    const day = String(date.getDate()).padStart(2, "0");
    let dates = `${day}-${month}-${year}`

    const [search, setSearch] = useState("")
    const [autoid, setAutoid] = useState("");  // Stores the generated ID

    const navigate = useNavigate()

    const columns = ['Book Id', 'Book Name', 'Description', 'No of Copies', 'Author', 'category', 'price', 'Status']
    const rows = ["book_id", "book_name", "book_description", "copies", "book_author", "book_category", "book_price", "book_status"]

    const [allbooks, setAllbooks] = useState([])

    useEffect(() => {
        getBooksdata()
    }, [])

    const getBooksdata = async () => {
        // const url =search.length!==0 ?  `http://localhost:5000/api/schools/get/${search}`:"http://localhost:5000/api/schools"
        const url = "http://localhost:5000/api/book"

        const options = {
            method: "GET",
        }

        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            setAutoid(responseData.newId)
            // console.log(responseData)
            const books = responseData.books || []; // Default empty array
            if (books.length > 0) {
                const filterdata = books.filter(book => (book.book_name !== "" && book.book_name !== "1"))
                setAllbooks(filterdata)

            }
        } catch (err) {
            console.log(err)
        }
    }


    const filteredBooks = allbooks.filter(book =>
        book.book_name.toLowerCase().includes(search.toLowerCase()) ||
        book.book_id.toLowerCase().includes(search.toLowerCase()) ||
        book.book_category.toLowerCase().includes(search.toLowerCase()) ||
        book.copies.toLowerCase().includes(search.toLowerCase()) ||
        book.book_price.toLowerCase().includes(search.toLowerCase()) ||
        book.book_author.toLowerCase().includes(search.toLowerCase()) ||
        book.book_description.toLowerCase().includes(search.toLowerCase()) ||
        book.book_status.toLowerCase().includes(search.toLowerCase())
    );


    const onAdd = async () => {
        const url = "http://localhost:5000/api/book"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                book_id: autoid,
                book_name: "1",
                book_description: "1",
                book_publishers:"1",
                book_purchase_date:"1",
                copies: "1",
                book_author: "1",
                book_category: "1",
                book_price: "1",
                book_status: "1",

                book_created_at: dates
            })
        }
        try {
            const response = await fetch(url, options)
            const responseData = await response.json()
            console.log(responseData)
        } catch (err) {
            console.log(err)
        }

        navigate('/createBook', { state: { autoid } })
    }
    const toDetailView = (e) => {
        navigate(`/booksDetailView/${e}`)
    }

    return (
        <MainPage work={<ListView name='Books Details' search={search} setSearch={setSearch} buttonname='add' addfun={onAdd} headings={columns} rows={rows} pass='book_id' datas={filteredBooks} editfun={toDetailView} />} />

    )
}
export default LibraryReusable