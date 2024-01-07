import React from 'react';
import './spinner.css';
import HashLoader from "react-spinners/HashLoader";

const Spinner = ({ loading, color, size}) => {
    return (
        <div className='spinner'>
            <HashLoader
                color={color}
                loading={loading}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"

            />
        </div>
    )
}

export default Spinner;