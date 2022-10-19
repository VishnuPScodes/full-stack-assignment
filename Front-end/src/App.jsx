import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';
import {Button, Stack} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0);
  const [deleteis,setDeleteis]=useState(false);
  const [page,setPage]=useState(1);
  const [data,setData]=useState([]);
  const [sort,setSort]=useState(1);
  const [totalPage,setTotalPage]=useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(()=>{
    axios.get(`http://localhost:4000/users?page=${page}&sort=${sort}`).then((res)=>{
        setData(res.data.data);
        let total=+res.data.totalPages;
        setTotalPage(total)
       
    })
  },[page,sort,deleteis]);
  console.log(data)
  //function to handle the sort functionality;
  const handleSort=(e)=>{
    let value=e.target.value;
     setSort(value);
  }
  //function to do the deletion
  const handleDelete=(e)=>{
    console.log(e)
  }

  //model
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
 
  return (
    <div className="App">
        <div className='main'>
          {/* Search functionality */}
          <div className='search'>
          <Input placeholder='Search name' />
          <Button>Search</Button>  
          </div>  
        

          <label htmlFor="">Sort by</label>
          <select name="" onChange={handleSort} id="">
            <option value="1">Ascending </option>
            <option value="-1">Descending</option>
          </select>
            <table>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
           {/* model */}
           <div className='model'> 
           <div id="myModal" class="modal">
                <div class="modal-content">
                  <span class="close">close</span>
                  <input placeholder="name" /> <br/>
                  <button>Submit</button>
                </div>
             </div>
            </div>
            {data.map((e)=>{
              return  <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.address}</td>
              <td>{e.phone}</td>
              <td><button onClick={onOpen} id='myBtn'>Edit</button></td>
              <td><button onClick={(()=>{
                axios.delete(`http://localhost:4000/users/${e._id}`).then(()=>{
                  setDeleteis(!deleteis);
                  alert('Deleted');
                })
              })}>Delete</button></td>
           </tr>  
            })}
           
            </table>
            <div className='btns'>
               <button disabled={page==1} onClick={(()=>{
                setPage((page)=>page-1);
               })} >Prev</button>
               <div><i>Page number :{page}</i></div>
               <button onClick={(()=>{
                setPage((page)=>page+1);
               })} disabled={page==totalPage}>Next</button>
            </div>
        </div>
    </div>
  )
}

export default App
