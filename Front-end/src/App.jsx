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
  const [edit,setEdit]=useState([])
  const [loading,setLoading]=useState(true)
  const [count, setCount] = useState(0);
  const [deleteis,setDeleteis]=useState(false);
  const [page,setPage]=useState(1);
  const [data,setData]=useState([]);
  const [sort,setSort]=useState(1);
  const [totalPage,setTotalPage]=useState(1);
  const [search,setSearch]=useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(()=>{
    setLoading(true)
    axios.get(`https://final-bk.herokuapp.com/users?page=${page}&sort=${sort}&q=${search}`).then((res)=>{
        setData(res.data.data);
        let total=+res.data.totalPages;
        setTotalPage(total)
        setLoading(false)
    })
  },[page,sort,deleteis,search]);
  console.log(data)

  //function to handle the sort functionality;

  const handleSort=(e)=>{
    let value=e.target.value;
     setSort(value);
  }

  
  //model
  setTimeout(()=>{
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
  },1000)

  //function to do seaching 

  const handleSearch=()=>{
    setLoading(true)
    axios.post(`https://final-bk.herokuapp.com/users/search?q=${search}`).then((res)=>{
      setData(res.data)
    }).then(()=>{
      setLoading(false)
    })
  
  }

//function to store the data for editing

const handleChange1=(e)=>{
  const {id,value}=e.target;
  setEdit({...edit,
  [id]:value
  })
}
//function to edit the data by sending the network request
const handleEdit=()=>{
  axios.patch(`https://final-bk.herokuapp.com/users`,edit)
}

  return (
    <div className="App">
        <div className='main'>

          {/* Search functionality */}

          <div className='search'>
          <Input placeholder='Search name' onChange={((e)=>{setSearch(e.target.value)})} />
          <Button onClick={handleSearch} >Search</Button>  
          </div>

          {/* Loading indicator   */}
           <div>{loading&&"Loading..."}</div>

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
         

            {data.map((e)=>{
              return  <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.address}</td>
              <td>{e.phone}</td>
              <td><button  id='myBtn' onclick={(()=>{
                   var modal = document.getElementById("myModal");
                   
              })}>Edit</button></td>

              {/* deletion */}

              <td><button onClick={(()=>{
                setLoading(true)
                axios.delete(`https://final-bk.herokuapp.com/users/${e._id}`).then(()=>{
                  setDeleteis(!deleteis);
                 
                })
                setLoading(false)
              })}>Delete</button></td>
           </tr>  
            })}

            {/* model  for editing*/}

            <div className='model'> 
           <div id="myModal" class="modal">
           <div class="modal-content">
           <span class="close">close</span>
           <input placeholder="name" id='name' onChange={handleChange1} /> <br/>
           <input placeholder="Address" id='address'  onChange={handleChange1}/> <br/>
           <input placeholder="Phone" id='phone'  onChange={handleChange1}/> <br/>
           <button onClick={handleEdit}>Submit</button>
           </div>
            </div>
            </div>
           
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
