import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const PickCategory = () => {
  return (
    < div id="category" className='container mt-3'>
        <h2 className='wrapper text-center'>Pick One Category</h2>
        <div className='container mt-3 text-center'>
            <Button className='px-5 me-5'> <Link to={'/category/'+'Fruit'} className='text-light h4'>Fruit</Link>  </Button>
            <Button className='px-4'> <Link to={'/category/'+'Vegetable'} className='text-light h4'>Vegetable</Link> </Button>
        </div>
    </div>
  )
};

export default PickCategory;
