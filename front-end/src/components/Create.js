import React, { useState } from "react";

 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   curPrice: "",
   industry: "",
   metrics: "",
 });

 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5001/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", curPrice: "", industry: "", metrics: ""  });

 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="curPrice">Current Price</label>
         <input
           type="text"
           className="form-control"
           id="curPrice"
           value={form.curPrice}
           onChange={(e) => updateForm({ curPrice: e.target.value })}
         />
       </div>
       
       <div className="form-group">
         <label htmlFor="industry">Industry</label>
         <input
           type="text"
           className="form-control"
           id="industry"
           value={form.industry}
           onChange={(e) => updateForm({ industry: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="metrics">Metrics</label>
         <input
           type="text"
           className="form-control"
           id="metrics"
           value={form.metrics}
           onChange={(e) => updateForm({ metrics: e.target.value })}
         />
       </div>

       <div className="form-group">
         <input
           type="submit"
           value="Create new stock"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}