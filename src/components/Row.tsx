import React, {useState, useEffect} from 'react'
import instance from '../axios'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

export type RowPropTypes = {
    title: string
    fetchUrl: string
}

function Row({title, fetchUrl }: RowPropTypes) {
    const [movies, setMovies] = useState<any>([])

    

    useEffect(() => {
        const getMovies = async() => {
            const request = await instance.get(fetchUrl)
            setMovies(request.data.results)
        }
        getMovies()
    }, [fetchUrl])



    console.table(movies)

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters" style={{'flex-direction: row'}}>
                {movies.map((movie: any) => (
                    <img className="row__poster" src={`${baseUrl}${movie.poster_path}`} alt={movie.name} />
                ))}
            </div>
        </div>
    )
}

export default Row
