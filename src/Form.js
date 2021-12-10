import React from "react";
import { useState } from "react";

export default function Form() {

    const [newBounty, setNewBounty] = useState({})

    const handleChange = (e) => {
        setNewBounty({...newBounty, [e.target.name]:e.target.value})
    }

    const handleCheck = (e) => {
        setNewBounty({...newBounty, [e.target.name]:e.target.checked})
    }

    const postBounty = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newBounty.name,
            wantedFor: newBounty.wantedFor,
            client: newBounty.client,
            reward: Number(newBounty.reward),
            captured: Boolean(newBounty.captured)
        }
        fetch('http://localhost:8000/bounties', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response=>response.json())
        .then(postedBounty=> {
            console.log('Posted the bounty successfully!')
            setNewBounty({})
        })
        .catch(console.error)
    }

  return (
    <form onSubmit={postBounty}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name"  onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="wantedFor">Wanted For:</label>
        <input type="text" name="wantedFor" id="wantedFor" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="client">Client:</label>
        <input type="text" name="client" id="client" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="reward">Reward:</label>
        <input type="text" name="reward" id="reward" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="captured">Captured:</label>
        <input type="checkbox" name="captured" id="captured" onChange={handleCheck}/>
      </div>
      <input type="submit" value="Post" />
    </form>
  );
}
