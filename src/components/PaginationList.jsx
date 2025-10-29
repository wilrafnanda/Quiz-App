

import Category from './Category.jsx';
import topics from '../../topics.js';

const PaginationList = ({currentPage, itemsPerPage, setModalShow ,category, setCategory}) => {
    
   
    //calculating the starting index
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
  //slice the data for the current page

    const currentData = topics.slice(startIndex, endIndex);
    
  return (
    <>
      {
        currentData.map((item) => <Category key={item.id}
                                                   data ={item} 
                                                   setModalShow={setModalShow}
                                                   item={item}
                                                   setCategory={setCategory}/>)
      }
    </>
  )
}

export default PaginationList
