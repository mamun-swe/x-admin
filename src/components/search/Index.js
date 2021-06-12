import React from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { useForm } from 'react-hook-form'
import { search } from 'react-icons-kit/feather'

const Index = (props) => {
    const { register, handleSubmit, errors } = useForm()

    const onClearSearch = event => {
        const value = event.target.value
        if (!value) props.clear()
    }

    // Submit Form
    const onSubmit = data => props.search(data)

    return (
        <div className="search-component">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <input
                        type="text"
                        name="query"
                        ref={register({ required: true })}
                        placeholder={`Search ${props.placeholder}`}
                        onChange={onClearSearch}
                        className={errors.query ? "form-control form-control-sm shadow-none error" : "form-control form-control-sm shadow-none"}
                    />

                    <button type="submit" className="btn btn-sm shadow-none" disabled={props.loading}>
                        {props.loading ? <div className="btn-loader"></div> : <Icon icon={search} size={18} />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Index;
