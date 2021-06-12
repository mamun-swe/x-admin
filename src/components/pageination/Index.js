import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useHistory, useLocation } from 'react-router-dom'

const Pageinate = (props) => {
    const location = useLocation()
    const history = useHistory()

    const handlePageination = page => {
        const currentLocation = location.pathname
        history.push(`${currentLocation}?page=${page}&limit=${props.data.limit}`)
    }

    return (
        <div>
            <Pagination size={'sm'}>
                {[...Array(props.data.totalPage).keys()] && [...Array(props.data.totalPage).keys()].map((page, i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            active={page + 1 === props.data.currentPage}
                            onClick={() => handlePageination(page + 1)}
                        >{page + 1}</Pagination.Item>
                    )
                })}
            </Pagination>
        </div>
    );
};

export default Pageinate;