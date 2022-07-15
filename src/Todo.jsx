import { useState,useEffect } from "react"
import axios from "axios"
function Todo(){

    const[todo,Settodo]=useState("")
    const[newtodo,Setnewtodo]=useState([])
    const [pageNo, setPageNo] = useState(1)

       
   const  handlechange=(e)=>{
       Settodo(e.target.value)
   } 
    
   const handleClick=()=>{
       
    
       axios({
            url:" http://localhost:8081/data",
            method:"POST",
            data:{
                
                title:todo 
            }
            }).then(res =>{
                Setnewtodo([...newtodo,res])
            
        })
   }
      

     
    

         useEffect(()=>{
            const gett=async()=>{
                const r = await axios.get(`http://localhost:8081/data?_page=${pageNo}`)
                    Setnewtodo(r.data)
               }
             gett()
          },[pageNo]);
      

    return(
        <div>
       
        <div>
        <input onChange={handlechange}></input>
        <button onClick={handleClick}>submit</button>
        

        
        {newtodo.map((todo) => (
          <h2>{todo.title}</h2>
        ))}
        </div> 
    
        
        <button
              disabled={pageNo <= 1}
          onClick={() => setPageNo(pageNo - 1)}>Prev</button>
          <button onClick={() => setPageNo(pageNo + 1)}> Next </button>

    </div>
    )
        }
export default Todo;



// useEffect(()=>{
//     const get=async()=>{
//     setloading(true)
//     // setSearchParams({page})
//     const r=await axios.get(`http://localhost:8080/${value}?_page=${page}&_limit=${limit}`)
    
//       setloading(false)
//       setdata(r.data)
//       settotal(Number(r.headers["x-total-count"]))
//     }
//     get()
//   },[page,value])