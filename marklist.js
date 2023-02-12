import { useRef, useState,useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "./marklist.css";

export default function Marklist({stud,logout}){

    const studRef=useRef();
    const subRef=useRef();
    const marksRef=useRef();
    const [ranks,setRanks]=useState([]);
    const [subject,setSubject]=useState("");
    const [subuni,setSubuni]=useState("");
    const [marks,setMarks]=useState(null);
    const [id,setId]=useState(null);
    const [show, setShow] = useState(false);
    const [shown, setShown] = useState(false);
    const [hide, setHide] = useState(true);
    var newMark;
    function handleClose(){setShow(false);}
    function handleShow(){setShow(true);}
    
    const handleSubmit =async(e)=>{
       
        const stuMarks={
            name:stud,
            subject:subRef.current.value,
            marks:marksRef.current.value,
        }
        setShown(false);
        
        try{
                 
            await axios.post("http://localhost:7000/api/marks/marks",stuMarks);
            window.location.reload();
        }catch(err){

            console.log(err);
        }

      }

    useEffect(()=>{
            const getMarks =async ()=>{
              try{
                var res =await axios.get(`http://localhost:7000/api/marks/find/${stud}`);
                setRanks(res.data);
                setSubject(ranks[0].subject); 
                setMarks(ranks[0].marks); 
                setId(ranks[0]._id);
               
                console.log(ranks);
                console.log(subject);
                console.log(id);
                console.log(marks);
 
                
                } catch(err){
                 console.log(err);
                }
             };
             getMarks()
           },[]);
           
      function deleteUser(id,subj){
                var option =window.confirm(`Are you sure to delete ${subj} ?`)
               if(option)
               {
                   axios.delete(`http://localhost:7000/api/marks/del/${id}`).then(res=>{
                       window.location.reload();
                       })
               }
           }    
        

        function selectUser(data)
        {
          setSubject(data.subject); 
          setMarks(data.marks); 
          setId(data._id);
        }

        function updateUser()
        {
          let item={name:stud,subject:subject,marks:marks,_id:id}
          console.log(item);
          axios.put("http://localhost:7000/api/marks/update/",item);
          window.location.reload();
                 
          }

  
         const handleSearchChange =async (e)=>{
          const results= ranks.filter(post=>post.subject.includes(e.target.value))
           setSubuni(results);
           if(subuni.length>0)
            {setShown(true);
            setHide(false);
            }
            else
            {setHide(true);
            setShown(false);
            }
          }

         const handleSearchUpdate =async (e)=>{
            newMark=e.target.value;
                          
         
         }

    const handleUpdate =async()=>{

      if((subuni.length>0)&&(newMark!==NaN))
          { 
            
            const total=(parseInt(subuni[0].marks) + parseInt(newMark));
            let item1={name:stud,subject:subuni[0].subject,marks:total,_id:subuni[0]._id}
            console.log(item1);
            await axios.put("http://localhost:7000/api/marks/update/",item1);
            window.location.reload();
          }

    }
       
    return(<div>
                
                    <div className="marklist">
                        <div>
                        <h2>Students please add and view your Marks below! <button className="signup" onClick={logout}>Logout</button></h2>
                        
                        </div>
                        <div className="addmark">
                            <input type="text" placeholder="Name" disabled="true" ref={studRef} value={stud}/>
                            <input type="text" placeholder="Subject" onChange={(e)=>{handleSearchChange(e)}} ref={subRef} />
                            <input type="number" placeholder="Marks" onChange={(e)=>{handleSearchUpdate(e)}} ref={marksRef}/>
                            <button className="signup" hidden={shown}   onClick={handleSubmit}>Add</button>
                            <button className="signup" hidden={hide}onClick={handleUpdate}>Update</button>
                        </div>
                        <table className="table table table-bordered table table-hover">
    <thead>
      <tr >
        <th scope="col">Name</th>
        <th scope="col">Subject</th>
        <th scope="col">Marks</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
     </tr>
    </thead>
    <tbody>
      {
          ranks.map(e=>
                    <tr key={e._id}>
                     <td>{e.name}</td>
                        <td>{e.subject}</td>
                        <td>{e.marks}</td>
                        <td> <Button variant="primary" onClick={()=>{selectUser(e); handleShow()}}>
                            Edit</Button></td> 
                                         
                        <td><button type="submit" className="btn btn-danger" onClick={()=>{deleteUser(e._id,e.subject)}}>Delete</button></td>
                    </tr>
             )
        
        }
      </tbody>
  </table>

  <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
                         
            <>
            <input type="text"  value={stud}/>
            <input type="text"  value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
            <input type="number" value={marks} onChange={(e)=>{setMarks(e.target.value)}} />
           
            </>           
         
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={()=>{updateUser()}}>
            Update
          </Button>
          <Button variant="primary" onClick={handleClose}>
           Close
          </Button>
        </Modal.Footer>
      </Modal>
     </div>


                
                
        </div>
        );
}
