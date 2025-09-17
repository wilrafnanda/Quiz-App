
import data from '../../topics.js'
import Category from './Category.jsx';

const PaginationList = ({currentPage, itemsPerPage,setModalShow}) => {
    
   
    //calculating the starting index
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    //slice the data for the current page

    const currentData = data.slice(startIndex, endIndex);
    
  return (
    <>
      {
        currentData.map((item, index) => <Category key={index} data ={item} setModalShow={setModalShow}/>)
      }
    </>
  )
}

export default PaginationList
