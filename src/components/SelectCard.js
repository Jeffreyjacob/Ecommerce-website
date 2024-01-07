import React from 'react';
import './selectcard.css';

const SelectCard = ({ name, photoUrl, onClick }) => {
    return (
           <div className='selectcard w-100' >
            <div class="cards" style={{backgroundImage:`url('${photoUrl}')`}}>
                    <h6 class="card-title" onClick={onClick} >
                    {name}
                    </h6>
            </div>
            </div>
    )
}

export default SelectCard;