import Popover from 'react-bootstrap/Popover';

export const popover = (
  <Popover id="popover-basic">
    
    <Popover.Body>
       <option onClick={()=>console.log("this is profile")} style={{cursor:"pointer"}}>profile</option>
       <option>Logout</option>
    </Popover.Body>
  </Popover>
);


