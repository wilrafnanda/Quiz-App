export  function calculatePages(numberofItemPerpage, numberOfItems){
          
            //calculating the number of pages 
            
            const numberOfPages = Math.ceil(numberOfItems / numberofItemPerpage);

            return numberOfPages;
    }
    